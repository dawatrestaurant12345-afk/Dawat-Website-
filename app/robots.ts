import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/** Private areas no search engine or AI crawler should visit. */
const PRIVATE = ["/admin", "/admin/", "/api/"];

/**
 * Every public page, image, script and style is open to Google, Bing and AI search
 * (so the full page renders for them); only the admin panel and API are closed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: ["Googlebot", "Googlebot-Image", "Bingbot"], allow: "/", disallow: PRIVATE },
      // AI assistants and AI search (ChatGPT, Claude, Perplexity, Gemini) may read and cite the site.
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended"],
        allow: "/",
        disallow: PRIVATE,
      },
      { userAgent: "*", allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
