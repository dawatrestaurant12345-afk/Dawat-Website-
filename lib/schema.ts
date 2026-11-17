import type { MenuCategory } from "./menu";
import { SITE_URL } from "./seo";

/** Absolute URL for a site path ("/" → the home page). */
export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/** The restaurant node defined sitewide in RestaurantSchema; other schemas point at it. */
export const RESTAURANT_ID = `${SITE_URL}/#restaurant`;

export type Crumb = { name: string; path: string };

/** schema.org BreadcrumbList, so Google shows "Dawat Restaurant › Menu" instead of a raw URL. */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export type Faq = { q: string; a: string };

/** schema.org FAQPage: the same questions and answers that are visible on the page. */
export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** schema.org Menu with every dish and its price in ₹, built from the live menu. */
export function menuSchema(categories: MenuCategory[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${absoluteUrl("/menu")}#menu`,
    name: "Dawat Restaurant Menu",
    url: absoluteUrl("/menu"),
    inLanguage: "en-IN",
    hasMenuSection: categories.map((cat) => ({
      "@type": "MenuSection",
      name: cat.title,
      url: `${absoluteUrl("/menu")}#${cat.id}`,
      hasMenuItem: cat.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        ...(item.image && item.image.startsWith("/") ? { image: absoluteUrl(item.image) } : {}),
        ...(item.image && item.image.startsWith("http") ? { image: item.image } : {}),
        ...(typeof item.price === "number"
          ? { offers: { "@type": "Offer", price: item.price.toFixed(2), priceCurrency: "INR" } }
          : {}),
      })),
    })),
  };
}
