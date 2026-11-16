/**
 * Default Privacy Policy and Terms & Conditions.
 *
 * These are the DEFAULTS. Once edited in the admin panel (Legal Pages tab) the saved
 * versions are stored in Supabase (table `site_content`, keys "privacy" and "terms").
 *
 * The text describes how this website actually works (no online payments, no
 * customer accounts, bookings sent through WhatsApp). Have it reviewed by a
 * professional before relying on it as legal advice.
 */

export type LegalSection = { heading: string; body: string };

export type LegalDoc = {
  title: string;
  /** Shown as "Last updated: …". */
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export const LEGAL_KEYS = { privacy: "privacy", terms: "terms" } as const;

export const DEFAULT_PRIVACY: LegalDoc = {
  title: "Privacy Policy",
  updated: "16 November 2026",
  intro:
    "This Privacy Policy explains what information Dawat Restaurant (\"we\", \"us\") collects when you use this website, how it is used, and the choices you have. By using this website you agree to this policy.",
  sections: [
    {
      heading: "Information we collect",
      body:
        "This website does not ask you to create an account and does not take online payments.\n\nWhen you use the table booking form, the details you type (your name, phone number, number of guests, date, time and any message) are used to prepare a WhatsApp message to the restaurant. These details are not stored on our website; they are sent only when you choose to send the message in WhatsApp.\n\nIf you call us, message us on WhatsApp or contact us on social media, we receive the details you share in that conversation.",
    },
    {
      heading: "How we use your information",
      body:
        "We use the information you share only to respond to you, confirm and manage your table booking, and serve you better when you visit. We do not sell, rent or trade your personal information.",
    },
    {
      heading: "Cookies and website data",
      body:
        "This website does not use advertising or tracking cookies. Our hosting and website services may keep basic technical logs (such as your browser type and the pages visited) to keep the website secure and working properly.",
    },
    {
      heading: "Third-party services",
      body:
        "Some features are provided by other services, which handle your information under their own privacy policies:\n\n• WhatsApp – when you send a booking or message.\n• Google Maps – the map shown on our Contact and About pages.\n• Facebook and Instagram – when you follow links to our social media pages.\n• Our website hosting and database providers, which store the website's content.",
    },
    {
      heading: "Data security",
      body:
        "We take reasonable steps to protect the information we receive. However, no method of sending or storing information over the internet is completely secure.",
    },
    {
      heading: "Your choices",
      body:
        "You can ask us to correct or delete the personal information you have shared with us (for example in a WhatsApp conversation) by contacting us using the details below. You can also choose not to use the booking form and call us instead.",
    },
    {
      heading: "Children",
      body:
        "This website is meant for a general audience and does not knowingly collect personal information from children.",
    },
    {
      heading: "Changes to this policy",
      body:
        "We may update this Privacy Policy from time to time. The latest version will always be available on this page, with the date it was last updated.",
    },
  ],
};

export const DEFAULT_TERMS: LegalDoc = {
  title: "Terms & Conditions",
  updated: "16 November 2026",
  intro:
    "These Terms & Conditions apply to your use of the Dawat Restaurant website and to table bookings requested through it. By using this website you agree to these terms.",
  sections: [
    {
      heading: "Menu and prices",
      body:
        "Menu items, prices and availability shown on this website may change without notice and may differ from the menu at the restaurant. The price charged at the restaurant applies. Items marked \"As Per Size\" are priced at the restaurant according to size. Applicable taxes and charges are as per the bill at the restaurant.",
    },
    {
      heading: "Food photos",
      body:
        "Photos of dishes are for illustration only. Actual presentation, portion size and garnish may vary.",
    },
    {
      heading: "Table bookings",
      body:
        "A booking request sent through this website or WhatsApp is confirmed only after the restaurant confirms it. Please arrive on time; we may not be able to hold a table for late arrivals during busy hours. For large groups and family functions, please call us in advance.",
    },
    {
      heading: "Food allergies and dietary needs",
      body:
        "Our kitchen handles nuts, dairy, gluten, eggs, seafood and other common allergens. Please tell our staff about any allergy or dietary requirement before ordering. We cannot guarantee that any dish is completely free of allergens.",
    },
    {
      heading: "Use of this website",
      body:
        "You agree to use this website only for lawful purposes and not to misuse it, attempt to gain unauthorised access to it, or interfere with how it works.",
    },
    {
      heading: "Content and copyright",
      body:
        "The text, photos, logo and design of this website belong to Dawat Restaurant or are used with permission. You may not copy or reuse them for commercial purposes without our written permission.",
    },
    {
      heading: "Links to other websites",
      body:
        "This website links to other services such as WhatsApp, Google Maps, Facebook and Instagram. We are not responsible for the content or practices of those websites.",
    },
    {
      heading: "Limitation of liability",
      body:
        "We work to keep the information on this website accurate and up to date, but we do not guarantee that it is always complete or error-free. To the extent allowed by law, we are not liable for any loss arising from the use of this website.",
    },
    {
      heading: "Governing law",
      body:
        "These terms are governed by the laws of India. Any disputes are subject to the jurisdiction of the courts of Gujarat.",
    },
    {
      heading: "Changes to these terms",
      body:
        "We may update these Terms & Conditions from time to time. The latest version will always be available on this page, with the date it was last updated.",
    },
  ],
};
