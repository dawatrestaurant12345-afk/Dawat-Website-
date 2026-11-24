import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import type { LegalDoc } from "@/lib/legal";
import { primaryTel, type Site } from "@/lib/site";

/** Splits text into paragraphs on blank lines; lines starting with "•" or "-" become a list. */
function Body({ text }: { text: string }) {
  const blocks = text
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim());
        if (lines.every((l) => /^[•\-*]\s+/.test(l))) {
          return (
            <ul key={i} className="legal-list">
              {lines.map((l, j) => (
                <li key={j}>{l.replace(/^[•\-*]\s+/, "")}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="legal-text">
            {block}
          </p>
        );
      })}
    </>
  );
}

/** Privacy Policy / Terms & Conditions page body. */
export default function LegalPage({
  doc,
  site,
  path,
  other,
}: {
  doc: LegalDoc;
  site: Site;
  path: string;
  other: { href: string; label: string };
}) {
  return (
    <>
      <section className="page-hero text-center" style={{ backgroundImage: "url('/images/about-overlay-opt.webp')" }}>
        <div className="container">
          <Breadcrumbs name={doc.title} path={path} />
          <p className="label-2 section-subtitle">{site.name}</p>
          <h1 className="display-1 hero-title">{doc.title}</h1>
          {doc.updated && <p className="body-2 hero-text">Last updated: {doc.updated}</p>}
        </div>
      </section>

      <section className="section legal">
        <div className="container legal-container">
          {doc.intro && <p className="legal-intro">{doc.intro}</p>}

          {doc.sections.map((s, i) => (
            <article key={i} className="legal-section">
              <h2 className="legal-heading">
                <span className="legal-number">{String(i + 1).padStart(2, "0")}</span>
                {s.heading}
              </h2>
              <Body text={s.body} />
            </article>
          ))}

          <aside className="legal-contact">
            <h2 className="legal-heading">Questions?</h2>
            <p className="legal-text">
              Contact {site.name}, {site.address.full}.
            </p>
            <p className="legal-text">
              Phone: <a href={primaryTel(site)}>{site.phones.primary.label}</a>
              {" · "}
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              {" · "}
              <Link href="/contact">Contact page</Link>
            </p>
          </aside>

          <p className="legal-other">
            See also: <Link href={other.href}>{other.label}</Link>
          </p>
        </div>
      </section>
    </>
  );
}
