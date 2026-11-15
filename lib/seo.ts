/**
 * The public address of the website, used for canonical links, the sitemap and
 * social-share previews. Set NEXT_PUBLIC_SITE_URL (e.g. https://www.dawatrestaurant.in)
 * in your hosting settings. On Vercel the production domain is used automatically.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const SEO = {
  name: "Dawat Restaurant",
  title: "Dawat Restaurant Kheda – Mughlai, BBQ, Biryani & Seafood",
  description:
    "Dawat Restaurant on NH-8 Kajipura, Kheda, Gujarat: authentic Mughlai curries, charcoal BBQ & tandoor, Raan Biryani, sizzlers and seafood. Garden & rooftop seating, kids play area, free parking. Open daily 1 PM – 1 AM.",
  keywords: [
    "Dawat Restaurant",
    "Dawat Restaurant Kheda",
    "restaurant in Kheda",
    "best restaurant Kheda",
    "Mughlai restaurant Gujarat",
    "non veg restaurant Kheda",
    "BBQ restaurant Kheda",
    "Raan Biryani",
    "biryani in Kheda",
    "family restaurant NH-8",
    "restaurant near Kajipura",
    "rooftop restaurant Kheda",
  ],
  locale: "en_IN",
};

/** Public pages listed in the sitemap. */
export const PAGES = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/menu", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
] as const;
