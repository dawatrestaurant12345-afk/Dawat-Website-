import type { Metadata } from "next";
import { IoCallOutline, IoCarOutline, IoLocationOutline, IoNavigateOutline, IoTimeOutline } from "react-icons/io5";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ButtonLink, SectionHeading } from "@/components/Button";
import FaqList from "@/components/FaqList";
import { getSite } from "@/lib/content";
import { DIRECTION_FROM, directionsUrl, getLocationFaqs } from "@/lib/location";
import { pageMetadata } from "@/lib/page-meta";
import { primaryTel } from "@/lib/site";
import "../contact/contact.css";
import "./location.css";

export const metadata: Metadata = pageMetadata(
  "/location",
  "Ahmedabad Highway, Near Nadiad",
  "Dawat Restaurant is on the Ahmedabad highway (NH-8) at Kajipura, Kheda, near Nadiad. Opp. Sumar Logistics. Directions from Ahmedabad, Nadiad & Kheda, parking.",
);

export default async function LocationPage() {
  const site = await getSite();
  const PRIMARY_TEL = primaryTel(site);

  const cards = [
    { icon: IoLocationOutline, title: "Address", body: site.address.full },
    { icon: IoTimeOutline, title: "Timings", body: `Open every day, ${site.hours}` },
    { icon: IoCarOutline, title: "Parking", body: "Large free parking right on the NH-8 highway" },
    { icon: IoCallOutline, title: "Need Help Finding Us?", body: `Call ${site.phones.primary.label}` },
  ];

  return (
    <>
      <section className="page-hero text-center" style={{ backgroundImage: "url('/images/about-overlay-opt.webp')" }}>
        <div className="container">
          <Breadcrumbs name="Location" path="/location" />
          <p className="label-2 section-subtitle">On The Ahmedabad Highway · Near Nadiad</p>
          <h1 className="display-1 hero-title">Dawat Restaurant Location</h1>
          <p className="body-2 hero-text">
            Opposite Sumar Logistics, near Coca-Cola, on the highway at Kajipura, Kheda. An easy drive from
            Ahmedabad and Nadiad, with plenty of free parking.
          </p>
          <div className="btn-group">
            <ButtonLink href={directionsUrl(site)} label="Get Directions" hoverLabel="Open Google Maps" />
            <ButtonLink href={PRIMARY_TEL} label={`Call ${site.phones.primary.label}`} variant="secondary" />
          </div>
        </div>
      </section>

      <section className="section contact-cards-section" aria-label="Address and timings">
        <div className="container">
          <ul className="contact-cards">
            {cards.map(({ icon: Icon, title, body }) => (
              <li key={title} className="contact-card">
                <div className="contact-card-icon">
                  <Icon aria-hidden="true" />
                </div>
                <h2 className="title-2 contact-card-title">{title}</h2>
                <div className="contact-card-body">
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section contact-map-section" aria-labelledby="directions-label">
        <div className="container">
          <SectionHeading subtitle="Directions" title="How To Reach Us" id="directions-label" center>
            <p className="section-text contact-map-intro">
              Tap your town for live Google Maps directions to {site.name}, Kajipura, Kheda.
            </p>
          </SectionHeading>

          <ul className="directions-list">
            {DIRECTION_FROM.map((town) => (
              <li key={town}>
                <a href={directionsUrl(site, town)} target="_blank" rel="noopener noreferrer" className="directions-link">
                  <IoNavigateOutline aria-hidden="true" />
                  <span>Directions from {town}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="contact-map">
            <iframe
              src={site.social.mapEmbed}
              title="Map showing Dawat Restaurant, Kajipura, Kheda"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a href={site.social.maps} target="_blank" rel="noopener noreferrer" className="contact-map-btn">
              <IoNavigateOutline aria-hidden="true" />
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      <section className="section contact-faq bg-black-10" aria-labelledby="location-faq-label">
        <div className="container">
          <SectionHeading subtitle="Good To Know" title="Location Questions" id="location-faq-label" center />
          <FaqList faqs={getLocationFaqs(site)} />
          <div className="btn-group location-cta">
            <ButtonLink href="/menu" label="See The Menu" />
            <ButtonLink href="/contact#reservation" label="Book A Table" variant="secondary" />
          </div>
        </div>
      </section>
    </>
  );
}
