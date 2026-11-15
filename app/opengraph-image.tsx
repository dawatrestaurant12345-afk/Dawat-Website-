import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/** 1200×630 preview shown when the website is shared on WhatsApp, Facebook, X, etc. */
export const alt = "Dawat Restaurant, Kheda – Mughlai, BBQ, Biryani & Seafood";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public/images/menu/barbeque-platter.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0d0c0a" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={630} height={630} style={{ objectFit: "cover" }} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 56px",
            color: "#ffffff",
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#e4c590", textTransform: "uppercase" }}>
            Kheda, Gujarat
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, marginTop: 18 }}>Dawat Restaurant</div>
          <div style={{ fontSize: 30, color: "#e4c590", marginTop: 22 }}>Mughlai · BBQ · Biryani · Seafood</div>
          <div style={{ fontSize: 22, color: "#a6a6a6", marginTop: 30 }}>
            NH-8 Kajipura · Open daily 1 PM – 1 AM
          </div>
        </div>
      </div>
    ),
    size,
  );
}
