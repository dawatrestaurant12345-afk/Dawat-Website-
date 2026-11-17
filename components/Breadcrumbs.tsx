import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

/** "Home › Menu" trail at the top of inner pages, plus BreadcrumbList data for Google. */
export default function Breadcrumbs({ name, path }: { name: string; path: string }) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name, path },
  ];

  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li aria-current="page">{name}</li>
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
