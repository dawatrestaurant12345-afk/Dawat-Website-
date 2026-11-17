import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { getLegalDoc, getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/page-meta";
import "../legal.css";

export const metadata: Metadata = pageMetadata(
  "/terms-and-conditions",
  "Terms & Conditions",
  "Terms for using the Dawat Restaurant, Kheda website: menu and prices, table bookings, food allergies, content and liability.",
);

export default async function TermsPage() {
  const [doc, site] = await Promise.all([getLegalDoc("terms"), getSite()]);
  return <LegalPage doc={doc} site={site} path="/terms-and-conditions" other={{ href: "/privacy-policy", label: "Privacy Policy" }} />;
}
