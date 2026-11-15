import type { Site } from "@/lib/site";
import { SITE_URL } from "@/lib/seo";

/**
 * Structured data (schema.org Restaurant) so Google can show the restaurant's
 * address, phone, opening hours, cuisine and menu link in search results.
 * Only real details from the restaurant settings are used — no invented ratings.
 */
export default function RestaurantSchema({ site }: { site: Site }) {
  const sameAs = [site.social.facebook, site.social.instagram].filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#restaurant`,
    name: site.name,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    logo: `${SITE_URL}/images/logo.png`,
    description:
      "Family restaurant on NH-8 Kajipura, Kheda serving authentic Mughlai, charcoal BBQ & tandoor, Raan Biryani, sizzlers and seafood.",
    telephone: site.phones.primary.tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: "NH-8, Kajipura, Opposite Sumar Logistics, Nearby Coca-Cola",
      addressLocality: "Kheda",
      addressRegion: "Gujarat",
      postalCode: "387120",
      addressCountry: "IN",
    },
    hasMap: site.social.maps,
    servesCuisine: ["Mughlai", "North Indian", "Tandoor", "Barbecue", "Biryani", "Seafood", "Chinese"],
    priceRange: "₹₹",
    acceptsReservations: true,
    hasMenu: `${SITE_URL}/menu`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "13:00",
        closes: "01:00",
      },
    ],
    amenityFeature: ["Outdoor seating", "Rooftop seating", "Kids play area", "Free parking", "Air-conditioned hall"].map(
      (name) => ({ "@type": "LocationFeatureSpecification", name, value: true }),
    ),
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped cannot break out of the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
