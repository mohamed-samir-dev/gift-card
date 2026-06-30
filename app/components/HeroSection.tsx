"use client";

import Link from "next/link";
import { ShoppingBag, BadgeCheck, Zap, Tag } from "lucide-react";

const features = [
  { icon: Tag, label: "أفضل الأسعار" },
  { icon: BadgeCheck, label: "أمان 100%" },
];

export default function HeroSection() {
  return (
    <>
      <style>{`
        .hero-section {
          position: relative;
          width: 100%;
          min-height: calc(100vh - 56px);
          display: flex;
          align-items: center;
          background-image: url('/hero-background.webp');
          background-size: cover;
          background-position: center top;
          background-repeat: no-repeat;
        }

        /* overlay شفاف فقط على الموبايل عشان الكلام يبان */
        .hero-overlay {
          display: none;
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.55);
        }

        @media (max-width: 767px) {
          .hero-section {
            min-height: 55svh;
            background-position: center center;
            align-items: flex-start;
            padding-top: 28px;
          }
          .hero-overlay {
            display: block;
          }
          .hero-heading {
            font-size: 1.65rem !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-section {
            min-height: calc(100vh - 56px);
            background-position: center top;
          }
          .hero-heading {
            font-size: 2.6rem !important;
          }
        }

        @media (min-width: 1024px) {
          .hero-heading {
            font-size: 3.4rem !important;
          }
        }
      `}</style>

      <section className="hero-section">
        {/* Overlay - موبايل فقط */}
        <div className="hero-overlay" />

        {/* Content */}
        <div
          className="relative z-10 w-full max-w-7xl mx-auto"
          style={{ padding: "clamp(1.5rem, 5vw, 5rem) clamp(1rem, 5vw, 4rem)" }}
        >
          <div style={{ maxWidth: 560 }}>

            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(108,77,255,0.15)",
                border: "1px solid rgba(108,77,255,0.35)",
                color: "#4c1d95",
                fontWeight: 700,
                fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                padding: "5px 14px",
                borderRadius: 999,
                marginBottom: "1.25rem",
                backdropFilter: "blur(4px)",
              }}
            >
              ✨ الوجهة الأولى للبطاقات الرقمية
            </div>

            {/* Heading */}
            <h1
              className="hero-heading"
              style={{
                fontWeight: 900,
                color: "#1e1b4b",
                lineHeight: 1.35,
                margin: "0 0 1rem",
              }}
            >
              كل البطاقات الرقمية
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #6c4dff 0%, #7b61ff 50%, #4f7bff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                في مكان واحد
              </span>
            </h1>

            {/* Subtext */}
            <p
              style={{
                color: "#374151",
                fontSize: "clamp(0.875rem, 2vw, 1rem)",
                lineHeight: 1.85,
                fontWeight: 500,
                margin: "0 0 1.75rem",
                maxWidth: 460,
              }}
            >
              اشتري بطاقات نون، أمازون، جوجل بلاي، PUBG، iTunes وأكثر بأفضل
              الأسعار مع ضمان التوصيل الفوري والأمان الكامل.
            </p>

            {/* Feature chips */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "clamp(0.5rem, 1.5vw, 0.75rem)",
                marginBottom: "clamp(1.5rem, 3vw, 2rem)",
              }}
            >
              {features.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(255,255,255,0.75)",
                    border: "1px solid rgba(108,77,255,0.25)",
                    backdropFilter: "blur(8px)",
                    borderRadius: 10,
                    padding: "7px 14px",
                    color: "#1e1b4b",
                    fontSize: "clamp(0.75rem, 1.8vw, 0.875rem)",
                    fontWeight: 700,
                    boxShadow: "0 2px 8px rgba(108,77,255,0.08)",
                  }}
                >
                  <Icon size={14} strokeWidth={2.2} color="#6c4dff" />
                  {label}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(0.75rem, 2vw, 1rem)" }}>
              <Link
                href="/cards"
                className="btn-gradient"
                style={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "clamp(0.875rem, 2vw, 1rem)",
                  padding: "clamp(10px,2vw,14px) clamp(20px,4vw,32px)",
                  borderRadius: 12,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                <ShoppingBag size={17} strokeWidth={2.5} />
                تصفح البطاقات
              </Link>

              <Link
                href="/offers"
                style={{
                  color: "#4c1d95",
                  fontWeight: 700,
                  fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  borderBottom: "1.5px solid #6c4dff",
                  paddingBottom: 2,
                  whiteSpace: "nowrap",
                }}
              >
                العروض الحالية ←
              </Link>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
