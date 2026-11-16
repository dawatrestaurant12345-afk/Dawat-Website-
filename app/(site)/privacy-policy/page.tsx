import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { getLegalDoc, getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/page-meta";
import "../legal.css";

export const metadata: Metadata = pageMetadata(
  "/privacy-policy",
  "Privacy Policy",
  "How Dawat Restaurant, Kheda handles the information you share through our website, table booking form, WhatsApp and phone.",
);

export default async function PrivacyPolicyPage() {
  const [doc, site] = await Promise.all([getLegalDoc("privacy"), getSite()]);
  return <LegalPage doc={doc} site={site} other={{ href: "/terms-and-conditions", label: "Terms & Conditions" }} />;
}
