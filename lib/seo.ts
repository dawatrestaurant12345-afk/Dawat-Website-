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
  title: "Dawat Restaurant – Best Restaurant in Kheda | Mughlai & BBQ",
  description:
    "Best family restaurant in Kheda on NH-8 Kajipura, near Ahmedabad & Nadiad: Mughlai, charcoal BBQ, Raan Biryani & seafood. Free parking. Open daily 1 PM–1 AM.",
  keywords: [
    "Dawat Restaurant",
    "Dawat Restaurant Kheda",
    "best restaurant in Kheda",
    "top restaurant in Kheda",
    "restaurant in Kheda",
    "family restaurant in Kheda",
    "non veg restaurant in Kheda",
    "restaurant near Ahmedabad on highway",
    "restaurant near Nadiad",
    "highway restaurant NH-8 Gujarat",
    "Mughlai restaurant Gujarat",
    "BBQ restaurant Kheda",
    "biryani in Kheda",
    "Raan Biryani",
    "rooftop restaurant Kheda",
    "garden restaurant with kids play area",
    "halal restaurant Kheda",
    "restaurant near Kajipura",
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
  { path: "/location", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" },
] as const;
