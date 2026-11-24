import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/page-meta";
import { ButtonLink, SectionHeading } from "@/components/Button";
import Facilities from "@/components/Facilities";
import Gallery from "@/components/gallery/Gallery";
import { getSite } from "@/lib/content";
import { primaryTel } from "@/lib/site";
import "./gallery.css";

export const metadata: Metadata = pageMetadata("/gallery", "Gallery – Food & Ambience", "Photos of Dawat Restaurant, Kheda: Mughlai and BBQ dishes, sizzlers, the AC hall, open-air garden and rooftop seating on NH-8 Kajipura.");

export default async function GalleryPage() {
  const site = await getSite();
  const PRIMARY_TEL = primaryTel(site);

  return (
    <>
      <section className="page-hero text-center" style={{ backgroundImage: "url('/images/about-overlay-opt.webp')" }}>
        <div className="container">
          <Breadcrumbs name="Gallery" path="/gallery" />
          <p className="label-2 section-subtitle">{site.tagline}</p>
          <h1 className="display-1 hero-title">Our Gallery</h1>
          <p className="body-2 hero-text">
            A taste of Dawat before you visit — our dishes, our garden and the evenings that make them special.
          </p>
        </div>
      </section>

      <section className="section gallery text-center" aria-labelledby="gallery-label">
        <div className="container">
          <SectionHeading subtitle="Moments at Dawat" title="Food, Ambience & Memories" id="gallery-label" center />

          <Gallery />
        </div>
      </section>

      <Facilities />

      <section className="section gallery-cta-section text-center" aria-label="Share your moments">
        <div className="container">
          <div className="gallery-cta">
            <p className="title-2 gallery-cta-title">Visited us? Share your moments!</p>
            <p className="gallery-cta-text">
              Tag us on Instagram and your photo could be featured here.
            </p>
            <div className="btn-group">
              <ButtonLink href={site.social.instagram} label="Follow on Instagram" />
              <ButtonLink href={PRIMARY_TEL} label="Book A Table" hoverLabel={site.phones.primary.label} variant="secondary" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
