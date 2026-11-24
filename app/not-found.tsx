import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/** Shown for any address that doesn't exist on the website. */
export default function NotFound() {
  return (
    <main className="not-found">
      <Link href="/" className="logo" aria-label="Dawat Restaurant home">
        <Image src="/images/logo-dawat.png" width={160} height={50} alt="Dawat Restaurant" priority />
      </Link>
      <p className="label-2 section-subtitle">Error 404</p>
      <h1 className="headline-1">This page isn&apos;t on the menu</h1>
      <p className="body-4 not-found-text">The page you were looking for doesn&apos;t exist or has moved.</p>
      <div className="btn-group">
        <Link href="/" className="btn btn-primary">
          <span className="text text-1">Back To Home</span>
          <span className="text text-2" aria-hidden="true">Back To Home</span>
        </Link>
        <Link href="/menu" className="btn btn-secondary">
          <span className="text text-1">View Menu</span>
          <span className="text text-2" aria-hidden="true">View Menu</span>
        </Link>
      </div>
    </main>
  );
}
