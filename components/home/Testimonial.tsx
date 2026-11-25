import { getSite } from "@/lib/content";
import { LISTINGS } from "@/lib/site";

/**
 * A short note from the restaurant (not a customer review), with links for guests
 * to leave their own review on Google or Justdial.
 */
export default async function Testimonial() {
  const site = await getSite();

  return (
    <section
      className="section testi text-center has-bg-image"
      style={{ backgroundImage: "url('/images/testimonial-bg.webp')" }}
      aria-labelledby="dawat-note-label"
    >
      <div className="container">
        <p className="label-2 section-subtitle" id="dawat-note-label">
          A Note From Us
        </p>

        <div className="quote" aria-hidden="true">
          ”
        </div>

        <blockquote className="headline-2 testi-text">
          Every plate at Dawat is cooked fresh, from our slow-cooked Raan to the charcoal BBQ, the way we would
          serve our own family. Thank you for making us part of your dinners, celebrations and highway stops.
        </blockquote>

        <div className="wrapper">
          <div className="separator" />
          <div className="separator" />
          <div className="separator" />
        </div>

        <p className="label-2 profile-name">The Dawat Family, Kheda</p>

        <div className="testi-reviews">
          <p className="body-4 testi-reviews-text">Enjoyed your meal? Your review helps other families find us.</p>
          <div className="btn-group">
            <a href={site.social.maps} target="_blank" rel="noopener noreferrer" className="btn btn-primary testi-review-btn">
              <span className="text text-1">Review Us On Google</span>
              <span className="text text-2" aria-hidden="true">
                Review Us On Google
              </span>
            </a>
            <a href={LISTINGS.justdial} target="_blank" rel="noopener noreferrer" className="btn btn-secondary testi-review-btn">
              <span className="text text-1">Review Us On Justdial</span>
              <span className="text text-2" aria-hidden="true">
                Review Us On Justdial
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
