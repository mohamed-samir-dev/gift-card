"use client";

import Image from "next/image";

const brands = [
  { name: "noon", logo: "/noon-2.webp" },
  { name: "Amazon", logo: "/logo-amazon.webp" },
  { name: "Google Play", logo: "/gp.png" },
  { name: "PUBG", logo: "/dddd.webp" },
  { name: "iTunes", logo: "/apple-itunes.webp" },
  { name: "Steam", logo: "/steam.png" },
  { name: "PlayStation", logo: "/pngegg.png" },
];

export default function BrandsSection() {
  return (
    <section
      style={{
        background: "var(--bg-section)",
        padding: "clamp(2rem, 5vw, 3.5rem) 1rem",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Header with lines */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          maxWidth: 900,
          margin: "0 auto 2.5rem",
          padding: "0 1rem",
        }}
      >
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        <p
          style={{
            color: "var(--text-para)",
            fontWeight: 700,
            fontSize: "clamp(0.85rem, 2vw, 1rem)",
            whiteSpace: "nowrap",
            margin: 0,
          }}
        >
          نحن ندعم أشهر البطاقات العالمية
        </p>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      </div>

      {/* Brands marquee */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(33.333%); }
        }
        .brands-track {
          display: flex;
          align-items: center;
          gap: clamp(1.2rem, 4vw, 4rem);
          width: max-content;
          animation: marquee 18s linear infinite;
        }
        .brand-logo {
          width: clamp(52px, 10vw, 95px);
          height: clamp(28px, 6vw, 52px);
          position: relative;
          flex-shrink: 0;
        }
        @media (max-width: 480px) {
          .brands-track { gap: 1.2rem; }
          .brand-logo { width: 52px; height: 28px; }
        }
      `}</style>
      <div style={{ overflow: "hidden", maxWidth: 900, margin: "0 auto" }}>
        <div className="brands-track">
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <div key={i} className="brand-logo">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
