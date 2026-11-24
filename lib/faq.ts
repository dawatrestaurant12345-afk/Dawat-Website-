import type { Faq } from "./schema";
import type { Site } from "./site";

/**
 * Questions people search for on Google ("best restaurant in Kheda", "restaurant near
 * Ahmedabad on highway"…). Shown on the home page and sent to Google as FAQPage data.
 */
export const getHomeFaqs = (site: Site): Faq[] => [
  {
    q: "Which is the best family restaurant in Kheda?",
    a: `${site.name} on NH-8 at Kajipura, Kheda is a favourite with families for authentic Mughlai food, charcoal BBQ, Raan Biryani and seafood. It has an AC hall, garden and rooftop seating, a kids play area and free parking, and is open every day from ${site.hours}.`,
  },
  {
    q: "Is there a good non-veg restaurant near Ahmedabad on the highway?",
    a: `Yes. ${site.name} is on NH-8 at Kajipura, Kheda, an easy drive from Ahmedabad and Nadiad. Travellers stop for our BBQ platters, sizzlers, tandoori starters and Raan Biryani, with plenty of free parking right on the highway.`,
  },
  {
    q: "What is Dawat Restaurant famous for?",
    a: "Our Dawat Special Raan, Raan Biryani, Barbeque and Seafood Platters, Chicken Malai Tikka and Barbeque Sizzlers, Leg Dhamaka and slow-cooked Mughlai curries from the Mughal Darbar section of our menu.",
  },
  {
    q: "Do you serve vegetarian food?",
    a: "Yes. Alongside our non-veg specialities we serve veg soups, veg starters, paneer and Veg. Dawat Special dishes, veg main course, Chinese, noodles and rice, Indian breads and desserts.",
  },
  {
    q: "Where exactly is Dawat Restaurant?",
    a: `${site.address.full}. Our Location page has live Google Maps directions from Ahmedabad, Nadiad and Kheda. Call ${site.phones.primary.label} if you need help finding us.`,
  },
];

/** Practical questions on the Contact page. */
export const getContactFaqs = (site: Site): Faq[] => [
  {
    q: "What are your opening hours?",
    a: `We are open every day of the week, from ${site.hours}.`,
  },
  {
    q: "How can I book a table?",
    a: `Call us on ${site.phones.primary.label}, send us a WhatsApp message, or fill the reservation form on this page. It sends your booking details to us on WhatsApp.`,
  },
  {
    q: "Can I book for a family function or big party?",
    a: "Yes. Choose “Family / Big Party” in the form or call us, and we will arrange seating for your group.",
  },
  {
    q: "Is the restaurant good for kids?",
    a: "Absolutely. We have a kids play area, jhula (swings) and an open garden, so the whole family can relax.",
  },
  {
    q: "Is parking available?",
    a: "Yes, we have a huge free parking space right on the NH-8 highway.",
  },
  {
    q: "Is your food halal?",
    a: "Yes, we serve authentic halal Non-Veg, Mughlai, BBQ and seafood, along with veg specials and sizzlers.",
  },
];
