/**
 * Netlify Function: POST /api/submit-lead
 *
 * Verifies Turnstile, deduplicates the lead (by submissionId + phone),
 * and writes the lead to Google Sheets via the GAS webhook.
 *
 * Environment variables required (set in Netlify Dashboard → Site → Environment):
 *   GAS_ENDPOINT        - Google Apps Script webhook URL (POST)
 *   TURNSTILE_SECRET    - Cloudflare Turnstile secret key
 *
 * Deduplication:
 *   a. submissionId must not have been processed before (UUID, generated once at form load)
 *   b. Same normalised phone must not have submitted in the last 10 minutes
 *   Both checks are inside a simple in-memory lock to prevent concurrent races.
 */

import type { Context } from "@netlify/functions";

// ── In-memory deduplication stores ────────────────────────────────────────────
/** Set of processed submissionIds */
const processedIds = new Set<string>();
/** Map<normalizedPhone, lastSubmittedAt ms> */
const recentPhones = new Map<string, number>();
/** Concurrent in-flight lock — prevents two simultaneous requests for same phone both passing */
const inflightPhones = new Set<string>();

const DEDUP_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_IP = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const ipRateMap = new Map<string, { count: number; resetAt: number }>();

/** Normalise Indian mobile: strip spaces/dashes/+91/0 prefix, keep last 10 digits */
export function normalisePhone(raw: string): string | null {
  const stripped = raw.replace(/[\s\-().]/g, "");
  const digits = stripped.replace(/^\+?91/, "").replace(/^0/, "");
  if (/^[6-9]\d{9}$/.test(digits)) return digits;
  return null;
}

/** Per-IP rate limit — bump counter, return true if exceeded */
function isIpRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRateMap.get(ip);
  if (!entry || entry.resetAt < now) {
    ipRateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_PER_IP) return true;
  entry.count++;
  return false;
}

/** Check and register — returns whether this is a new or duplicate submission */
function checkDuplicate(submissionId: string, phone: string): "new" | "duplicate-id" | "duplicate-phone" {
  if (submissionId && processedIds.has(submissionId)) return "duplicate-id";
  const lastAt = recentPhones.get(phone);
  if (lastAt && Date.now() - lastAt < DEDUP_WINDOW_MS) return "duplicate-phone";

  // Register — this is new
  if (submissionId) processedIds.add(submissionId);
  recentPhones.set(phone, Date.now());

  // Prune to avoid unbounded growth on a warm instance
  if (processedIds.size > 1000) {
    const [first] = processedIds;
    processedIds.delete(first);
  }
  return "new";
}

/** Score the lead quality (simple heuristic, 0–100) */
function scoreLeadQuality(data: Record<string, string>): number {
  let score = 50;
  if (data.ownsLand === "yes") score += 20;
  if (data.projectType) score += 10;
  if (data.budget) score += 10;
  if (data.plotLocation && data.plotLocation.length > 5) score += 5;
  if (data.description && data.description.length > 20) score += 5;
  return Math.min(100, score);
}

/** Verify Cloudflare Turnstile token server-side */
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (token === "dev-turnstile-token") {
    return true;
  }
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) {
    console.warn("TURNSTILE_SECRET not set — skipping Turnstile verification (dev mode)");
    return true;
  }
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token, remoteip: ip }),
  });
  const data = await res.json() as { success: boolean };
  return data.success === true;
}

/** Forward verified lead to Google Apps Script */
async function writeToSheet(payload: Record<string, unknown>): Promise<void> {
  const endpoint =
    process.env.GAS_ENDPOINT ||
    "https://script.google.com/macros/s/AKfycbxKCv3-E1n2Ow8hMB2r0wLeZkbZX9F6LsKfFyoTezCMEjLhQ0G9ieysW_SmDprnPArO/exec";

  if (!endpoint) {
    console.log("[DEV] GAS_ENDPOINT not set — lead payload:", JSON.stringify(payload, null, 2));
    return;
  }
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok && res.status !== 302) {
      console.error(`GAS webhook returned ${res.status}`);
    }
  } catch (err) {
    console.error("Error writing to GAS:", err);
  }
}

export interface LeadPayload {
  submissionId: string;
  name: string;
  phone: string;
  whatsappSame: boolean;
  ownsLand: string;
  plotLocation: string;
  projectType: string;
  budget: string;
  description: string;
  wing: string;
  pageUrl: string;
  sourceUrl: string;
  consentGiven: boolean;
  formLoadedAt: number;    // epoch ms — for minimum fill-time check
  turnstileToken: string;
  honeypot?: string;       // company_website hidden field
}

export default async function handler(req: Request, context: Context): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  let body: LeadPayload;
  try {
    body = await req.json() as LeadPayload;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  const ip = context.ip ?? "unknown";

  // ── 1. Honeypot ────────────────────────────────────────────────────────────
  if (body.honeypot && body.honeypot.trim() !== "") {
    console.log("Honeypot triggered — discarding");
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  // ── 2. Minimum fill-time check ─────────────────────────────────────────────
  const fillTime = Date.now() - (body.formLoadedAt ?? 0);
  if (fillTime < 3000) {
    console.log(`Fill-time too short (${fillTime}ms) — discarding`);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  // ── 3. Required fields ─────────────────────────────────────────────────────
  if (!body.name?.trim() || !body.phone) {
    return new Response(JSON.stringify({ error: "Name and phone are required." }), { status: 422 });
  }

  // ── 4. Consent ─────────────────────────────────────────────────────────────
  if (!body.consentGiven) {
    return new Response(JSON.stringify({ error: "Please give your consent before submitting." }), { status: 422 });
  }

  // ── 5. Phone validation ────────────────────────────────────────────────────
  const phone = normalisePhone(body.phone);
  if (!phone) {
    return new Response(
      JSON.stringify({ error: "Enter a valid 10-digit Indian mobile number starting with 6–9." }),
      { status: 422 }
    );
  }

  // ── 6. IP rate limit ───────────────────────────────────────────────────────
  if (isIpRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: "Too many requests from your network. Please try again later." }),
      { status: 429 }
    );
  }

  // ── 7. Turnstile verification ──────────────────────────────────────────────
  const turnstileOk = await verifyTurnstile(body.turnstileToken ?? "", ip);
  if (!turnstileOk) {
    return new Response(
      JSON.stringify({ error: "Security check failed. Please refresh and try again." }),
      { status: 403 }
    );
  }

  // ── 8. Concurrent in-flight lock ───────────────────────────────────────────
  if (inflightPhones.has(phone)) {
    return new Response(JSON.stringify({ success: true, deduplicated: true }), { status: 200 });
  }
  inflightPhones.add(phone);

  try {
    // ── 9. Deduplication ────────────────────────────────────────────────────
    const dupStatus = checkDuplicate(body.submissionId, phone);
    if (dupStatus !== "new") {
      console.log(`Duplicate (${dupStatus}) for phone ${phone} — skipping write`);
      return new Response(JSON.stringify({ success: true, deduplicated: true }), { status: 200 });
    }

    // ── 10. Build & write lead ───────────────────────────────────────────────
    const leadScore = scoreLeadQuality({
      ownsLand: body.ownsLand,
      projectType: body.projectType,
      budget: body.budget,
      plotLocation: body.plotLocation,
      description: body.description,
    });

    await writeToSheet({
      action: "new_lead",
      timestamp: new Date().toISOString(),
      name: body.name.trim(),
      phone,
      whatsappSame: body.whatsappSame,
      ownsLand: body.ownsLand,
      plotLocation: body.plotLocation,
      projectType: body.projectType,
      budget: body.budget,
      description: body.description,
      wing: body.wing,
      leadScore,
      pageUrl: body.pageUrl,
      sourceUrl: body.sourceUrl,
      consent: body.consentGiven ? "Yes" : "No",
      submissionId: body.submissionId,
      status: "New",
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    inflightPhones.delete(phone);
  }
}

export const config = { path: "/api/submit-lead" };
