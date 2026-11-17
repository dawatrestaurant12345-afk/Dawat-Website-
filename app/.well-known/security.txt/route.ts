import { absoluteUrl } from "@/lib/schema";

/** /.well-known/security.txt (RFC 9116): how to report a security problem with this website. */
export const dynamic = "force-static";

export function GET() {
  // Valid for one year from each deploy, as the standard asks for an expiry date.
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
  const body = [
    `Contact: ${absoluteUrl("/contact")}`,
    "Contact: https://www.noortechnolab.online/",
    `Expires: ${expires}`,
    "Preferred-Languages: en, hi, gu",
    `Canonical: ${absoluteUrl("/.well-known/security.txt")}`,
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
