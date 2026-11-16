"use client";

import { useEffect, useState } from "react";

/** Full-screen loader that fades out once the page has finished loading. */
export default function Preloader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const finish = () => {
      setLoaded(true);
      document.body.classList.add("loaded");
    };

    if (document.readyState === "complete") {
      finish();
      return;
    }

    // Never keep visitors waiting on one slow image: hide the loader after 3s at most.
    const fallback = window.setTimeout(finish, 3000);
    window.addEventListener("load", finish);
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("load", finish);
    };
  }, []);

  return (
    <div className={`preload${loaded ? " loaded" : ""}`} aria-hidden="true">
      <div className="circle" />
      <p className="text">Dawat</p>
    </div>
  );
}
