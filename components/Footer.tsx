import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "./Button";
import { getSite } from "@/lib/content";
import { primaryTel, telHref } from "@/lib/site";

const pageLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About Us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact#reservation", label: "Book a Table" },
  { href: "/contact", label: "Contact Us" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
];

export default async function Footer() {
  const site = await getSite();
  const { primary, secondary } = site.phones;

  const socialLinks = [
    { href: site.social.instagram, label: "Instagram" },
    { href: site.social.facebook, label: "Facebook" },
    { href: site.whatsapp, label: "WhatsApp" },
    { href: site.social.maps, label: "Google Maps" },
  ];

  return (
    <footer
      id="contact"
      className="footer section has-bg-image text-center"
      style={{ backgroundImage: "url('/images/footer-bg.jpg')" }}
    >
      <div className="container">
        <div className="footer-top grid-list">
          <div className="footer-brand has-before has-after">
            <Link href="/" className="logo">
              <Image src="/images/logo.svg" width={160} height={50} alt="Dawat Restaurant Home" />
            </Link>

            <address className="body-4">{site.address.full}</address>

            <a href={primaryTel(site)} className="body-4 contact-link">
              Primary: {primary.label}
            </a>
            <a href={telHref(secondary.tel)} className="body-4 contact-link">
              Booking: {secondary.label}
            </a>

            <p className="body-4">Daily : {site.hours} (Open Daily)</p>

            <div className="wrapper">
              <div className="separator" />
              <div className="separator" />
              <div className="separator" />
            </div>

            <p className="title-1">{site.tagline}</p>

            <p className="label-1">
              Follow us &amp; stay updated with our latest <span className="span">Specials &amp; Offers.</span>
            </p>

            <div className="footer-cta">
              <ButtonLink href={site.social.instagram} label="Follow on Instagram" variant="secondary" />
            </div>
          </div>

          <nav className="footer-col" aria-labelledby="footer-explore">
            <h2 className="footer-heading" id="footer-explore">
              Explore
            </h2>
            <ul className="footer-list">
              {pageLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="label-2 footer-link hover-underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h2 className="footer-heading" id="footer-follow">
              Follow Us
            </h2>
            <ul className="footer-list" aria-labelledby="footer-follow">
              {socialLinks.map(({ href, label }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="label-2 footer-link hover-underline">
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="footer-heading footer-heading-spaced" id="footer-legal">
              Legal
            </h2>
            <ul className="footer-list" aria-labelledby="footer-legal">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="label-2 footer-link hover-underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} {site.name}, Kheda, Gujarat. All rights reserved.
          </p>
          <p className="footer-bottom-links">
            {legalLinks.map(({ href, label }) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
            <span className="footer-powered">
              Powered by{" "}
              <a href="https://www.noortechnolab.online/" target="_blank" rel="noopener" className="credit">
                Noor Technolab
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
