import type { Metadata } from "next";

/** The generated 1200×630 share image (app/opengraph-image.tsx). */
const SHARE_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Dawat Restaurant, Kheda – Mughlai, BBQ, Biryani & Seafood",
};

/** Title, description, canonical link and share preview for one public page. */
export function pageMetadata(path: string, title: string, description: string): Metadata {
  const fullTitle = `${title} | Dawat Restaurant, Kheda`;
  return {
    title,
    description,
    alternates: { canonical: path },
    // A page's own openGraph replaces the site-wide one, so the image is listed again here.
    openGraph: { title: fullTitle, description, url: path, type: "website", images: [SHARE_IMAGE] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [SHARE_IMAGE.url] },
  };
}
