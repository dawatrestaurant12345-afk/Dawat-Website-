import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-meta";
import { ButtonLink } from "@/components/Button";
import MenuBrowser from "@/components/menu/MenuBrowser";
import { getMenu, getSite } from "@/lib/content";
import "./menu.css";

export const metadata: Metadata = pageMetadata("/menu", "Menu – Mughlai, BBQ, Biryani & Seafood", "Dawat Restaurant Kheda menu with prices: tandoori & kebabs, Mughlai curries, Raan, sizzlers, biryani, seafood, Chinese, breads and dessert.");

export default async function MenuPage() {
  const [site, menuCategories] = await Promise.all([getSite(), getMenu()]);

  return (
    <>
      <section className="page-hero text-center" style={{ backgroundImage: "url('/images/hero-slider-1.jpg')" }}>
        <div className="container">
          <p className="label-2 section-subtitle">{site.tagline}</p>
          <h1 className="display-1 hero-title">Our Complete Menu</h1>
          <p className="body-2 hero-text">
            Authentic Non-Veg, Mughlai curries, sizzling tandoori starters, fresh coastal seafood &amp; sizzlers
            prepared fresh daily at Dawat Restaurant, Kheda.
          </p>

        </div>
      </section>

      <MenuBrowser categories={menuCategories} />

      <section className="section menu-cta-section">
        <div className="container">
          <div className="order-cta-box text-center">
            <p className="label-2 section-subtitle">Ready To Experience Authentic Taste?</p>
            <h2 className="headline-1 order-cta-title">Book Your Table</h2>
            <p className="body-2 order-cta-text">
              Enjoy rooftop dining and spacious outdoor garden seating at Dawat Restaurant, Kheda, Gujarat.
            </p>
            <div className="btn-group">
              <ButtonLink href="/contact#reservation" label="Book A Table" variant="secondary" />
              <ButtonLink href="/" label="Back To Home" hoverLabel="Home Page" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
