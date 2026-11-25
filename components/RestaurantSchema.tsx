import JsonLd from "./JsonLd";
import { LISTINGS, type Site } from "@/lib/site";
import { SEO, SITE_URL } from "@/lib/seo";
import { RESTAURANT_ID, absoluteUrl } from "@/lib/schema";

/**
 * Sitewide structured data (schema.org Restaurant + WebSite) so Google can show the
 * restaurant's address, phone, opening hours, cuisine and menu in search and Maps.
 * Only real details from the restaurant settings are used — no invented ratings or reviews.
 */
export default function RestaurantSchema({ site }: { site: Site }) {
  const sameAs = [site.social.facebook, site.social.instagram, site.social.maps, LISTINGS.justdial].filter(Boolean);

  const restaurant = {
    "@type": "Restaurant",
    "@id": RESTAURANT_ID,
    name: site.name,
    alternateName: ["Dawat Restaurant Kheda", "Dawat Kheda", "Dawat Restaurant Kajipura"],
    url: SITE_URL,
    image: [
      absoluteUrl("/opengraph-image"),
      absoluteUrl("/images/hero-slider-1.jpg"),
      absoluteUrl("/images/about-main.webp"),
    ],
    logo: absoluteUrl("/images/logo.png"),
    description:
      "Family restaurant on the Ahmedabad highway (NH-8) at Kajipura, Kheda, Gujarat, near Nadiad. Authentic Mughlai, charcoal BBQ & tandoor, Raan Biryani, sizzlers, seafood and veg specials, with an AC hall, garden and rooftop seating, kids play area and free parking.",
    slogan: site.tagline,
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
    areaServed: ["Kheda", "Kajipura", "Nadiad", "Mehmedabad", "Matar", "Ahmedabad", "Kheda district"].map(
      (name) => ({ "@type": "Place", name }),
    ),
    servesCuisine: ["Mughlai", "North Indian", "Tandoor", "Barbecue", "Biryani", "Seafood", "Chinese", "Vegetarian"],
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    acceptsReservations: true,
    hasMenu: `${absoluteUrl("/menu")}#menu`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "13:00",
        closes: "01:00",
      },
    ],
    amenityFeature: [
      "Outdoor garden seating",
      "Rooftop seating",
      "Air-conditioned hall",
      "Kids play area",
      "Free parking",
      "Family friendly",
      "Halal food",
    ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    keywords: SEO.keywords.join(", "),
    ...(sameAs.length ? { sameAs } : {}),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    // The site name Google shows above results ("Dawat Restaurant").
    name: site.name,
    alternateName: ["Dawat Restaurant Kheda", "Dawat Kheda"],
    inLanguage: "en-IN",
    publisher: { "@id": RESTAURANT_ID },
  };

  return <JsonLd data={{ "@context": "https://schema.org", "@graph": [restaurant, website] }} />;
}
