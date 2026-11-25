import { getMenu, getSite } from "@/lib/content";
import { getAboutFaqs } from "@/lib/faq";
import { absoluteUrl } from "@/lib/schema";
import { LISTINGS } from "@/lib/site";

/** /llms.txt — a plain summary of the restaurant for AI assistants and AI search. */
export const revalidate = 300;

export async function GET() {
  const [site, menu] = await Promise.all([getSite(), getMenu()]);

  const lines = [
    `# ${site.name}, Kheda`,
    "",
    `> Family restaurant on NH-8 at Kajipura, Kheda, Gujarat (India), an easy drive from Ahmedabad and Nadiad. Authentic Mughlai, charcoal BBQ & tandoor, Raan Biryani, sizzlers, seafood, Chinese and veg dishes. AC hall, garden & rooftop seating, kids play area, free parking. Open daily ${site.hours}.`,
    "",
    `- Address: ${site.address.full}`,
    `- Phone: ${site.phones.primary.label} (primary), ${site.phones.secondary.label} (bookings)`,
    `- Hours: every day, ${site.hours}`,
    `- Google Maps: ${site.social.maps}`,
    `- Justdial: ${LISTINGS.justdial}`,
    "",
    "## Pages",
    "",
    `- [Home](${absoluteUrl("/")}): overview, signature dishes and table booking`,
    `- [Menu with prices](${absoluteUrl("/menu")}): ${menu.reduce((n, c) => n + c.items.length, 0)} dishes in ${menu.length} categories, prices in INR`,
    `- [About Us](${absoluteUrl("/about")}): our story and specialities`,
    `- [Gallery](${absoluteUrl("/gallery")}): photos of food, AC hall, garden and rooftop`,
    `- [Best restaurant in Kheda, near Ahmedabad](${absoluteUrl("/best-restaurant-in-kheda")}): why guests choose Dawat, signature dishes, at-a-glance facts`,
    `- [Location & directions](${absoluteUrl("/location")}): address, landmarks, directions from Ahmedabad, Nadiad and Kheda`,
    `- [Contact & table booking](${absoluteUrl("/contact")}): phone, WhatsApp, map and FAQs`,
    "",
    "## Menu categories",
    "",
    ...menu.map((c) => `- ${c.title} (${c.items.length} dishes)`),
    "",
    "## FAQ",
    "",
    ...getAboutFaqs(site).flatMap(({ q, a }) => [`### ${q}`, "", a, ""]),
    "## Optional",
    "",
    `- [Privacy Policy](${absoluteUrl("/privacy-policy")})`,
    `- [Terms & Conditions](${absoluteUrl("/terms-and-conditions")})`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
