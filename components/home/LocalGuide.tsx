import Link from "next/link";
import FaqList from "../FaqList";
import { SectionHeading } from "../Button";
import { getSite } from "@/lib/content";
import { getHomeFaqs } from "@/lib/faq";
import { primaryTel } from "@/lib/site";

/**
 * Short, factual answer block + quick facts + FAQ, written for the searches people
 * make ("best restaurant in Kheda", "restaurant near Ahmedabad on highway") and easy
 * for Google's snippets and AI answers to quote.
 */
export default async function LocalGuide() {
  const site = await getSite();

  const facts = [
    { label: "Location", value: <>NH-8, Kajipura, Kheda, Gujarat 387120 — easy drive from Ahmedabad &amp; Nadiad</> },
    { label: "Timings", value: <>Open every day, {site.hours}</> },
    { label: "Cuisine", value: <>Mughlai, BBQ &amp; Tandoor, Biryani, Seafood, Chinese, Veg</> },
    { label: "Seating", value: <>AC hall, open garden &amp; rooftop, kids play area</> },
    { label: "Parking", value: <>Large free parking on the highway</> },
    {
      label: "Bookings",
      value: (
        <>
          Call <a href={primaryTel(site)}>{site.phones.primary.label}</a> or{" "}
          <Link href="/contact#reservation">book online</Link>
        </>
      ),
    },
  ];

  return (
    <section className="section local-guide bg-black-10" aria-labelledby="local-guide-label">
      <div className="container">
        <SectionHeading
          subtitle="Kheda's Favourite Family Restaurant"
          title="Best Restaurant in Kheda, Right On NH-8"
          id="local-guide-label"
          center
        >
          <p className="section-text local-guide-summary">
            {site.name} is a family restaurant on NH-8 at Kajipura, Kheda, an easy drive from Ahmedabad and
            Nadiad. We serve authentic Mughlai curries, charcoal BBQ and tandoor, Raan Biryani, sizzlers, seafood
            and veg specials, with an AC hall, garden and rooftop seating, a kids play area and free parking.
          </p>
        </SectionHeading>

        <dl className="local-facts">
          {facts.map(({ label, value }) => (
            <div key={label} className="local-fact">
              <dt className="label-2">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <h2 className="headline-2 local-faq-title text-center">Questions Guests Ask</h2>
        <FaqList faqs={getHomeFaqs(site)} />

        <p className="local-guide-links text-center">
          See our <Link href="/menu">full menu with prices</Link>, <Link href="/gallery">photos of the restaurant</Link>{" "}
          and <Link href="/contact">directions &amp; contact details</Link>.
        </p>
      </div>
    </section>
  );
}
