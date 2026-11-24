import type { Faq } from "./schema";
import type { Site } from "./site";

/** Nearby towns people drive in from; each gets a live Google Maps directions link. */
export const DIRECTION_FROM = ["Ahmedabad", "Nadiad", "Kheda", "Mehmedabad", "Matar", "Anand"] as const;

/** Google Maps directions from a town to the restaurant (opens the Maps app on phones). */
export function directionsUrl(site: Site, from?: string): string {
  const params = new URLSearchParams({ api: "1", destination: site.mapQuery });
  if (from) params.set("origin", `${from}, Gujarat`);
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export const getLocationFaqs = (site: Site): Faq[] => [
  {
    q: "Where is Dawat Restaurant in Kheda?",
    a: `${site.name} is at ${site.address.full}. Look for us opposite Sumar Logistics, near the Coca-Cola plant, right on the NH-8 highway at Kajipura.`,
  },
  {
    q: "How do I reach Dawat Restaurant from Ahmedabad?",
    a: `We are an easy drive from Ahmedabad on NH-8 at Kajipura, Kheda. Tap "Directions from Ahmedabad" on this page to open live Google Maps directions, or call ${site.phones.primary.label} and we will guide you.`,
  },
  {
    q: "Is Dawat Restaurant near Nadiad and Kheda?",
    a: `Yes. We are at Kajipura on NH-8 in Kheda, a short drive from Nadiad, Mehmedabad and Matar. Tap "Directions from Nadiad" or "Directions from Kheda" on this page for live Google Maps directions.`,
  },
  {
    q: "Is Dawat Restaurant a good stop on the Ahmedabad highway?",
    a: `Yes. We are right on NH-8 with a large free parking area, clean seating in an AC hall, garden and rooftop, and we are open every day from ${site.hours}, so it is easy to stop for lunch or a late dinner.`,
  },
  {
    q: "Is there parking for cars and buses?",
    a: "Yes, we have a huge free parking space right on the highway, with room for cars and bigger groups.",
  },
];
