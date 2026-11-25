import type { Metadata } from "next";
import Link from "next/link";
import {
  IoCarOutline,
  IoFlameOutline,
  IoHappyOutline,
  IoLeafOutline,
  IoMoonOutline,
  IoNavigateOutline,
  IoRestaurantOutline,
} from "react-icons/io5";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ButtonLink, SectionHeading } from "@/components/Button";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import { getMenu, getSite } from "@/lib/content";
import { directionsUrl } from "@/lib/location";
import { pageMetadata } from "@/lib/page-meta";
import { primaryTel } from "@/lib/site";
import "../contact/contact.css";
import "../location/location.css";
import "./best.css";

export const metadata: Metadata = pageMetadata(
  "/best-restaurant-in-kheda",
  "Best Restaurant in Kheda Near Ahmedabad",
  "Looking for the best restaurant in Kheda or near Ahmedabad? Dawat on NH-8 Kajipura serves Mughlai, BBQ, Raan Biryani & seafood. AC hall, garden, free parking.",
);

const reasons = [
  {
    icon: IoFlameOutline,
    title: "Charcoal BBQ & Mughlai",
    body: "Tandoori starters, sizzlers and slow-cooked Mughlai curries, cooked fresh to order.",
  },
  {
    icon: IoRestaurantOutline,
    title: "Dawat Special Raan",
    body: "Our signature Raan and Raan Biryani, plus Barbeque and Seafood Platters for the table.",
  },
  {
    icon: IoLeafOutline,
    title: "Veg Specials Too",
    body: "Veg soups, starters, paneer, Veg. Dawat Special dishes, Chinese, breads and desserts.",
  },
  {
    icon: IoHappyOutline,
    title: "Made For Families",
    body: "AC hall, open garden and rooftop seating, with a kids play area and jhula.",
  },
  {
    icon: IoCarOutline,
    title: "Easy Highway Stop",
    body: "Right on NH-8 at Kajipura with a large free parking area for cars and groups.",
  },
  {
    icon: IoMoonOutline,
    title: "Open Late, Every Day",
    body: "Lunch to late dinner, seven days a week.",
  },
];

export default async function BestRestaurantPage() {
  const [site, menu] = await Promise.all([getSite(), getMenu()]);
  const dishCount = menu.reduce((n, c) => n + c.items.length, 0);

  const glance: [string, React.ReactNode][] = [
    ["Location", <>NH-8, Kajipura, Kheda, Gujarat 387120 — on the Ahmedabad highway, near Nadiad</>],
    ["Timings", <>Every day, {site.hours}</>],
    ["Cuisine", <>Mughlai, BBQ &amp; Tandoor, Biryani, Seafood, Chinese, Veg</>],
    ["Menu", <><Link href="/menu">{dishCount} dishes in {menu.length} categories</Link>, with prices</>],
    ["Seating", <>AC hall, garden, rooftop; family functions and big parties</>],
    ["Parking", <>Large free parking on the highway</>],
    ["Booking", <><a href={primaryTel(site)}>{site.phones.primary.label}</a>, WhatsApp or <Link href="/contact#reservation">online</Link></>],
  ];

  return (
    <>
      <section className="page-hero text-center" style={{ backgroundImage: "url('/images/hero-slider-1-bg.webp')" }}>
        <div className="container">
          <Breadcrumbs name="Best Restaurant in Kheda" path="/best-restaurant-in-kheda" />
          <p className="label-2 section-subtitle">Dawat Restaurant Kheda</p>
          <h1 className="display-1 hero-title">Best Restaurant in Kheda, Near Ahmedabad</h1>
          <p className="body-2 hero-text">
            {site.name} is a family restaurant on the Ahmedabad highway (NH-8) at Kajipura, Kheda, near Nadiad. Guests
            come for charcoal BBQ, Mughlai curries, Raan Biryani and seafood, the AC hall, garden and rooftop seating,
            and the big free parking. Open every day, {site.hours}.
          </p>
          <div className="btn-group">
            <ButtonLink href="/contact#reservation" label="Book A Table" />
            <ButtonLink href={directionsUrl(site, "Ahmedabad")} label="Directions From Ahmedabad" variant="secondary" />
          </div>
        </div>
      </section>

      <section className="section contact-cards-section" aria-labelledby="why-label">
        <div className="container">
          <SectionHeading subtitle="Why Guests Choose Us" title="What Makes Dawat Special" id="why-label" center />
          <ul className="contact-cards best-reasons">
            {reasons.map(({ icon: Icon, title, body }) => (
              <li key={title} className="contact-card">
                <div className="contact-card-icon">
                  <Icon aria-hidden="true" />
                </div>
                <h3 className="title-2 contact-card-title">{title}</h3>
                <div className="contact-card-body">
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FeaturedMenu />

      <section className="section best-glance bg-black-10" aria-labelledby="glance-label">
        <div className="container">
          <SectionHeading subtitle="At A Glance" title="Dawat Restaurant Kheda" id="glance-label" center />
          <table className="glance-table">
            <tbody>
              {glance.map(([label, value]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section contact-map-section" aria-labelledby="reach-label">
        <div className="container">
          <SectionHeading subtitle="Coming From Ahmedabad Or Nadiad?" title="Easy To Reach On NH-8" id="reach-label" center>
            <p className="section-text contact-map-intro">
              Tap your town for live Google Maps directions, or see the{" "}
              <Link href="/location" className="best-inline-link">
                full location page
              </Link>
              .
            </p>
          </SectionHeading>
          <ul className="directions-list">
            {["Ahmedabad", "Nadiad", "Kheda"].map((town) => (
              <li key={town}>
                <a href={directionsUrl(site, town)} target="_blank" rel="noopener noreferrer" className="directions-link">
                  <IoNavigateOutline aria-hidden="true" />
                  <span>Directions from {town}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="btn-group">
            <ButtonLink href="/menu" label="See The Full Menu" />
            <ButtonLink href="/gallery" label="View Photos" variant="secondary" />
          </div>
        </div>
      </section>
    </>
  );
}
