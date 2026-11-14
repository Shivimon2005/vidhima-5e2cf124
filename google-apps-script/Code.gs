/**
 * Vidhima Construction CRM — Google Apps Script
 * ═══════════════════════════════════════════════
 * Version: 2.0 (OTP-verified lead intake, dedup-safe)
 *
 * HOW TO DEPLOY
 * ─────────────
 * 1. Open script.google.com and create a new project.
 * 2. Paste this entire file into Code.gs.
 * 3. Run > Run function > testSetup once to verify the sheet tabs are created.
 * 4. Deploy > New deployment > Web App
 *      Execute as: Me
 *      Who has access: Anyone
 * 5. Copy the /exec URL — set it as GAS_ENDPOINT in Netlify environment variables.
 * 6. The script now receives JSON from the Netlify Function (not no-cors from browser),
 *    so it CAN return useful CORS headers.
 *
 * SHEET COLUMNS
 * ─────────────
 * "CRM Leads" tab:
 *   Timestamp | Name | Phone | WhatsApp Same | Land Owned | Location |
 *   Project Type | Budget | Scope Summary | Lead Score | Page URL |
 *   Source URL | Consent | Submission ID | Status | Wing
 *
 * "Interactions" tab:
 *   Timestamp | Lead Name | Phone | Event | Details
 *
 * HOW TO CLEAN OLD TEST ROWS
 * ──────────────────────────
 * 1. Open the "CRM Leads" sheet.
 * 2. Filter column B (Name) for "Test Lead", "TEST", etc.
 * 3. Select those rows and delete them.
 * OR run the cleanTestRows() function from the script editor.
 */

// ── Config ─────────────────────────────────────────────────────────────────
const SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId(); // uses bound spreadsheet
const LEADS_TAB = "CRM Leads";
const INTERACTIONS_TAB = "Interactions";

// ── CORS helper ─────────────────────────────────────────────────────────────
function corsResponse(body, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
  // Note: GAS web apps cannot set arbitrary response headers, but returning JSON
  // with the right content type is sufficient for server-to-server calls
  // from the Netlify Function (which sends the request server-side, not from browser).
  return output;
}

// ── Main entry point ────────────────────────────────────────────────────────
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Acquire an exclusive lock for up to 10 seconds to prevent concurrent writes
    lock.waitLock(10000);

    var payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (err) {
      return corsResponse({ error: "Invalid JSON" }, 400);
    }

    var action = payload.action || "new_lead";

    if (action === "new_lead") {
      return handleNewLead(payload);
    } else if (action === "interaction") {
      return handleInteraction(payload);
    } else {
      return corsResponse({ error: "Unknown action" }, 400);
    }

  } catch (err) {
    Logger.log("Error: " + err.toString());
    return corsResponse({ error: "Script error: " + err.toString() }, 500);
  } finally {
    lock.releaseLock();
  }
}

// ── New lead handler ────────────────────────────────────────────────────────
function handleNewLead(payload) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = getOrCreateSheet(ss, LEADS_TAB, [
    "Timestamp", "Name", "Phone", "WhatsApp Same", "Land Owned", "Location",
    "Project Type", "Budget", "Scope Summary", "Lead Score", "Page URL",
    "Source URL", "Consent", "Submission ID", "Status", "Wing"
  ]);

  var phone = normalizePhone(payload.phone || "");
  if (!phone) {
    return corsResponse({ error: "Invalid phone" }, 422);
  }

  // ── Sheet-level dedup (second line of defence after the Netlify Function) ──
  // Check by submissionId
  var submissionId = payload.submissionId || "";
  if (submissionId && rowExistsWithValue(sheet, 14, submissionId)) {
    // Already exists — log an interaction and return success
    logInteraction(ss, payload.name, phone, "Duplicate submission (by ID)", submissionId);
    return corsResponse({ success: true, deduplicated: true }, 200);
  }

  // Check by phone + recent timestamp (10-minute window)
  var existingRow = findRecentLeadByPhone(sheet, phone, 10);
  if (existingRow > 0) {
    // Repeat from same phone within window — append note to existing row, don't create new
    logInteraction(ss, payload.name, phone, "Duplicate submission (by phone, within window)", payload.pageUrl || "");
    return corsResponse({ success: true, deduplicated: true }, 200);
  }

  var now = new Date();
  var scopeSummary = buildScopeSummary(payload);

  sheet.appendRow([
    now.toISOString(),
    payload.name || "",
    phone,
    payload.whatsappSame ? "Yes" : "No",
    formatOwnsLand(payload.ownsLand),
    payload.plotLocation || "",
    formatProjectType(payload.projectType),
    payload.budget || "",
    scopeSummary,
    payload.leadScore || 50,
    payload.pageUrl || "",
    payload.sourceUrl || "",
    payload.consent || "Yes",
    submissionId,
    payload.status || "New",
    payload.wing || "realty"
  ]);

  // Log initial interaction
  logInteraction(ss, payload.name, phone, "Lead Created", payload.pageUrl || "");

  return corsResponse({ success: true }, 200);
}

// ── Interaction handler ─────────────────────────────────────────────────────
function handleInteraction(payload) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var phone = normalizePhone(payload.phone || "");
  logInteraction(ss, payload.name, phone, payload.event, payload.details || "");
  return corsResponse({ success: true }, 200);
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function logInteraction(ss, name, phone, event, details) {
  var sheet = getOrCreateSheet(ss, INTERACTIONS_TAB, [
    "Timestamp", "Lead Name", "Phone", "Event", "Details"
  ]);
  sheet.appendRow([new Date().toISOString(), name || "", phone || "", event || "", details || ""]);
}

function getOrCreateSheet(ss, tabName, headers) {
  var sheet = ss.getSheetByName(tabName);
  if (!sheet) {
    sheet = ss.insertSheet(tabName);
    sheet.appendRow(headers);
    // Bold header row
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
  return sheet;
}

/** Normalise Indian mobile: strip non-digits, remove 91/0 prefix, keep last 10 */
function normalizePhone(raw) {
  var digits = raw.replace(/[\s\-().+]/g, "");
  digits = digits.replace(/^91/, "").replace(/^0/, "");
  digits = digits.slice(-10);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

/** Returns true if any row in the given 1-based column contains the value */
function rowExistsWithValue(sheet, col, value) {
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) { // start at 1 to skip header
    if (String(data[i][col - 1]).trim() === String(value).trim()) return true;
  }
  return false;
}

/**
 * Returns the row index (1-based) of the most recent lead with this phone
 * submitted within the last `windowMinutes` minutes, or -1 if none found.
 */
function findRecentLeadByPhone(sheet, phone, windowMinutes) {
  var cutoff = new Date(Date.now() - windowMinutes * 60 * 1000);
  var data = sheet.getDataRange().getValues();
  for (var i = data.length - 1; i >= 1; i--) {
    var rowPhone = normalizePhone(String(data[i][2]));
    if (rowPhone === phone) {
      var rowTime = new Date(data[i][0]);
      if (rowTime >= cutoff) return i + 1;
    }
  }
  return -1;
}

function formatOwnsLand(val) {
  if (val === "yes") return "Yes — owns land";
  if (val === "no") return "No — planning to buy";
  return val || "";
}

function formatProjectType(val) {
  if (!val) return "";
  return val.charAt(0).toUpperCase() + val.slice(1);
}

function buildScopeSummary(payload) {
  var parts = [];
  if (payload.projectType) parts.push(formatProjectType(payload.projectType));
  if (payload.budget) parts.push("Budget: " + payload.budget);
  if (payload.plotLocation) parts.push("Location: " + payload.plotLocation);
  if (payload.description) parts.push(payload.description.trim());
  return parts.join(" | ");
}

// ── Utility: clean test rows ────────────────────────────────────────────────
/**
 * Run this function manually from the Apps Script editor to delete test rows.
 * It deletes rows where Name contains "test", "TEST", or "Test Lead" (case-insensitive).
 */
function cleanTestRows() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(LEADS_TAB);
  if (!sheet) return;

  var data = sheet.getDataRange().getValues();
  var rowsToDelete = [];
  for (var i = data.length - 1; i >= 1; i--) {
    var name = String(data[i][1]).toLowerCase();
    if (name.includes("test") || name === "" ) {
      rowsToDelete.push(i + 1);
    }
  }
  rowsToDelete.forEach(function(row) { sheet.deleteRow(row); });
  Logger.log("Deleted " + rowsToDelete.length + " test rows.");
}

// ── Utility: test setup ─────────────────────────────────────────────────────
function testSetup() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  getOrCreateSheet(ss, LEADS_TAB, [
    "Timestamp", "Name", "Phone", "WhatsApp Same", "Land Owned", "Location",
    "Project Type", "Budget", "Scope Summary", "Lead Score", "Page URL",
    "Source URL", "Consent", "Submission ID", "Status", "Wing"
  ]);
  getOrCreateSheet(ss, INTERACTIONS_TAB, [
    "Timestamp", "Lead Name", "Phone", "Event", "Details"
  ]);
  Logger.log("Setup complete.");
}

// ── GET handler (for health check) ─────────────────────────────────────────
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ status: "ok", version: "2.0" }))
    .setMimeType(ContentService.MimeType.JSON);
}
