import type { NextConfig } from "next";

/** Allow next/image to show menu photos uploaded to Supabase Storage. */
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const isProd = process.env.NODE_ENV === "production";

/**
 * Content Security Policy: only this site, Supabase (data + photos) and the
 * Google Maps embed may load. Applied in production only, because the dev
 * server needs eval() for hot reloading.
 */
const supabaseOrigin = supabaseHost ? `https://${supabaseHost}` : "";
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${supabaseOrigin}`,
  "font-src 'self' data:",
  `connect-src 'self' ${supabaseOrigin} ${supabaseHost ? `wss://${supabaseHost}` : ""}`,
  "frame-src https://maps.google.com https://www.google.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
]
  .map((d) => d.replace(/\s+/g, " ").trim())
  .join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ...(isProd ? [{ key: "Content-Security-Policy", value: csp }] : []),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: supabaseHost
      ? [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }]
      : [],
  },
  // Old static-site addresses (and common variants) go straight to the new pages,
  // with a permanent redirect so any Google ranking they had carries over.
  async redirects() {
    const pages: [string, string][] = [
      ["/index.html", "/"],
      ["/home", "/"],
      ["/menu.html", "/menu"],
      ["/menus", "/menu"],
      ["/about.html", "/about"],
      ["/about-us", "/about"],
      ["/gallery.html", "/gallery"],
      ["/contact.html", "/contact"],
      ["/contact-us", "/contact"],
      ["/privacy", "/privacy-policy"],
      ["/terms", "/terms-and-conditions"],
    ];
    return pages.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Admin pages and the refresh API must never be cached or indexed.
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex" },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
      // Photos: cache for a day, then refresh in the background (a photo can be
      // replaced under the same file name, so it is not cached "forever").
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
