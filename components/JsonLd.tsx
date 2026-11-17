/**
 * Renders schema.org structured data for Google, Bing and AI search.
 * JSON.stringify output with "<" escaped cannot break out of the script tag.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
