import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

const BASE_URL = "https://vidhimaconstruction.com";

const MONTH_MAP: Record<string, string> = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

function parseDate(d: string): string {
  const [mon, yr] = d.trim().split(" ");
  return `${yr}-${MONTH_MAP[mon] ?? "01"}-01`;
}

function generateSitemapPlugin(): Plugin {
  return {
    name: "generate-sitemap",
    apply: "build",
    closeBundle() {
      const blogSrc = fs.readFileSync("./src/data/blogPosts.ts", "utf-8");
      const blogSlugDates = [...blogSrc.matchAll(/slug:\s*["']([^"']+)["'][\s\S]*?date:\s*["']([^"']+)["']/g)]
        .map(m => ({ slug: m[1], date: parseDate(m[2]) }));

      const projSrc = fs.readFileSync("./src/data/projects.ts", "utf-8");
      const projSlugs = [...projSrc.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);

      const staticPages = [
        { path: "/",                    priority: "1.0", freq: "weekly"  },
        { path: "/services",            priority: "0.9", freq: "monthly" },
        { path: "/contact",             priority: "0.9", freq: "monthly" },
        { path: "/about",               priority: "0.8", freq: "monthly" },
        { path: "/faq",                 priority: "0.8", freq: "monthly" },
        { path: "/government-tenders",  priority: "0.8", freq: "monthly" },
        { path: "/sub-contracting",     priority: "0.8", freq: "monthly" },
        { path: "/projects",            priority: "0.8", freq: "monthly" },
        { path: "/blog",                priority: "0.8", freq: "weekly"  },
        { path: "/why-choose-us",       priority: "0.7", freq: "monthly" },
        { path: "/leadership",          priority: "0.6", freq: "monthly" },
        { path: "/careers",             priority: "0.5", freq: "monthly" },
        { path: "/csr",                 priority: "0.5", freq: "monthly" },
      ];

      const u = (loc: string, priority: string, freq: string, lastmod?: string) =>
        `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}<changefreq>${freq}</changefreq><priority>${priority}</priority></url>`;

      const lines = [
        ...staticPages.map(p => u(`${BASE_URL}${p.path}`, p.priority, p.freq)),
        ...projSlugs.map(s => u(`${BASE_URL}/projects/${s}`, "0.7", "monthly")),
        ...blogSlugDates.map(({ slug, date }) => u(`${BASE_URL}/blog/${slug}`, "0.8", "monthly", date)),
      ];

      const xml = [
        `<?xml version="1.0" encoding="UTF-8"?>`,
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
        ``,
        ...lines,
        ``,
        `</urlset>`,
        ``,
      ].join("\n");

      fs.writeFileSync("./dist/sitemap.xml", xml);
    },
  };
}

function devApiPlugin(): Plugin {
  return {
    name: "dev-api-endpoints",
    configureServer(server) {
      server.middlewares.use("/api/submit-lead", (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        let bodyRaw = "";
        req.on("data", (chunk: Buffer) => {
          bodyRaw += chunk.toString();
        });
        req.on("end", async () => {
          try {
            const body = JSON.parse(bodyRaw);
            console.log("[Dev API] Received lead:", body.name, body.phone);

            // Forward to GAS if configured or existing default
            const gasUrl =
              process.env.GAS_ENDPOINT ||
              "https://script.google.com/macros/s/AKfycbxKCv3-E1n2Ow8hMB2r0wLeZkbZX9F6LsKfFyoTezCMEjLhQ0G9ieysW_SmDprnPArO/exec";

            try {
              await fetch(gasUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
              });
            } catch (err) {
              console.warn("[Dev API] GAS notification:", err);
            }

            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true }));
          } catch {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Invalid JSON" }));
          }
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5173,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), generateSitemapPlugin(), devApiPlugin(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
