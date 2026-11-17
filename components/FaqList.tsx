import { IoChevronDown } from "react-icons/io5";
import JsonLd from "./JsonLd";
import { faqSchema, type Faq } from "@/lib/schema";

/** Open/close questions plus matching FAQPage data for Google and AI answers. */
export default function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <>
      <div className="faq-list">
        {faqs.map(({ q, a }, i) => (
          <details key={q} className="faq-item" open={i === 0}>
            <summary className="faq-question">
              <h3 className="faq-question-text">{q}</h3>
              <IoChevronDown aria-hidden="true" />
            </summary>
            <p className="faq-answer">{a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
