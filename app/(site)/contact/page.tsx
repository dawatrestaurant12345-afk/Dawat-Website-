import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-meta";
import {
  IoCallOutline,
  IoLocationOutline,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoWhatsapp,
  IoNavigateOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { ButtonLink, SectionHeading } from "@/components/Button";
import Reservation from "@/components/home/Reservation";
import { getSite } from "@/lib/content";
import { primaryTel, telHref } from "@/lib/site";
import FaqList from "@/components/FaqList";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getContactFaqs } from "@/lib/faq";
import "./contact.css";

export const metadata: Metadata = pageMetadata("/contact", "Contact & Table Booking", "Call, WhatsApp or visit Dawat Restaurant on NH-8 Kajipura, Kheda, Gujarat. Open daily 1 PM – 1 AM. Book your table online for family dinners and parties.");

export default async function ContactPage() {
  const site = await getSite();
  const PRIMARY_TEL = primaryTel(site);
  const { primary, secondary } = site.phones;

  const cards = [
    {
      icon: IoCallOutline,
      title: "Call Us",
      body: (
        <>
          <a href={PRIMARY_TEL}>{primary.label}</a>
          <a href={telHref(secondary.tel)}>{secondary.label}</a>
        </>
      ),
      action: { href: PRIMARY_TEL, label: "Call Now" },
    },
    {
      icon: IoLogoWhatsapp,
      title: "WhatsApp",
      body: <p>Message us to book a table or ask about today&apos;s specials.</p>,
      action: { href: site.whatsapp, label: "Chat Now" },
    },
    {
      icon: IoLocationOutline,
      title: "Visit Us",
      body: <address>{site.address.full}</address>,
      action: { href: site.social.maps, label: "Get Directions" },
    },
    {
      icon: IoTimeOutline,
      title: "Opening Hours",
      body: (
        <>
          <p className="contact-card-highlight">Daily : {site.hours}</p>
          <p>Open all 7 days, lunch &amp; dinner</p>
        </>
      ),
      action: { href: "#reservation", label: "Book A Table" },
    },
  ];

  return (
    <>
      {/* Page hero */}
      <section className="page-hero text-center" style={{ backgroundImage: "url('/images/about-overlay-opt.webp')" }}>
        <div className="container">
          <Breadcrumbs name="Contact Us" path="/contact" />
          <p className="label-2 section-subtitle">We&apos;d Love To Host You</p>
          <h1 className="display-1 hero-title">Contact Us</h1>
          <p className="body-2 hero-text">
            Call, WhatsApp or drop by. Book a table for dinner, a family function or a big celebration.
          </p>
          <div className="btn-group">
            <ButtonLink href={PRIMARY_TEL} label={`Call ${primary.label}`} hoverLabel="Call Now" />
            <ButtonLink href={site.whatsapp} label="WhatsApp Us" variant="secondary" />
          </div>
        </div>
      </section>

      {/* Quick contact cards */}
      <section className="section contact-cards-section" aria-label="Ways to reach us">
        <div className="container">
          <ul className="contact-cards">
            {cards.map(({ icon: Icon, title, body, action }) => {
              const external = action.href.startsWith("http");
              return (
                <li key={title} className="contact-card">
                  <div className="contact-card-icon">
                    <Icon aria-hidden="true" />
                  </div>
                  <h2 className="title-2 contact-card-title">{title}</h2>
                  <div className="contact-card-body">{body}</div>
                  <a
                    href={action.href}
                    className="btn-text hover-underline label-2 contact-card-link"
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {action.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Booking form (sends to WhatsApp) */}
      <Reservation standalone />

      {/* Map + social */}
      <section className="section contact-map-section" aria-labelledby="map-label">
        <div className="container">
          <SectionHeading subtitle="Find Us" title="Right On NH-8, Kajipura" id="map-label" center>
            <p className="section-text contact-map-intro">
              Opposite Sumar Logistics, near Coca-Cola, Kheda. Easy to reach from the highway, with plenty of free
              parking.
            </p>
          </SectionHeading>

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

          <div className="contact-social">
            <p className="label-2 contact-social-label">Follow Dawat</p>
            <div className="contact-social-links">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <IoLogoInstagram aria-hidden="true" />
                <span>Instagram</span>
              </a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <IoLogoFacebook aria-hidden="true" />
                <span>Facebook</span>
              </a>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <IoLogoWhatsapp aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section contact-faq bg-black-10" aria-labelledby="faq-label">
        <div className="container">
          <SectionHeading subtitle="Good To Know" title="Frequently Asked Questions" id="faq-label" center />

          <FaqList faqs={getContactFaqs(site)} />
        </div>
      </section>
    </>
  );
}
