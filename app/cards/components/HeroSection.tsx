"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BRANDS } from "../types";

interface HeroSectionProps {
  selectedBrand: string | null;
  onBrandClick: (brandName: string | null) => void;
}

export default function HeroSection({ selectedBrand, onBrandClick }: HeroSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const scroll = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir === "left" ? -260 : 260, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .cp-hero {
          background: linear-gradient(135deg, #f8f9ff 0%, #eef0ff 100%);
          padding: clamp(1.5rem, 5vw, 4.5rem) clamp(1rem, 5vw, 3rem) clamp(1.5rem, 4vw, 3.5rem);
          position: relative; overflow: hidden; border-bottom: 1px solid var(--border);
        }
        .cp-hero-blob {
          position: absolute; border-radius: 50%; pointer-events: none;
          width: 420px; height: 420px; top: -120px; left: -80px;
          background: radial-gradient(circle, rgba(108,77,255,0.1) 0%, transparent 65%);
        }
        .cp-hero-blob2 {
          position: absolute; border-radius: 50%; pointer-events: none;
          width: 300px; height: 300px; bottom: -80px; right: -60px;
          background: radial-gradient(circle, rgba(79,123,255,0.1) 0%, transparent 65%);
        }
        .cp-hero-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }
        .cp-tag {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(108,77,255,0.12); border: 1px solid rgba(108,77,255,0.28);
          color: var(--primary); font-weight: 700; font-size: 0.78rem;
          padding: 5px 16px; border-radius: 999px; margin-bottom: 1rem;
        }
        .cp-heading {
          font-weight: 900; font-size: clamp(1.8rem, 5vw, 3rem);
          color: var(--text-heading); margin: 0 0 0.75rem; line-height: 1.25;
        }
        .cp-heading span {
          background: var(--gradient);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .cp-sub {
          color: var(--text-para); font-size: clamp(0.82rem, 2vw, 1rem);
          font-weight: 500; margin: 0 0 1.25rem; max-width: 500px;
        }
        @media (max-width: 480px) {
          .cp-sub { display: none; }
        }

        /* ── brands label ── */
        .cp-brands-label {
          display: flex; align-items: center; gap: 10px; margin-bottom: 1rem;
        }
        .cp-brands-label-line { flex: 1; height: 1px; background: var(--border); }
        .cp-brands-label-text {
          font-size: 0.72rem; font-weight: 700; color: var(--text-light);
          white-space: nowrap; letter-spacing: 0.8px; text-transform: uppercase;
        }

        /* ── slider wrap ── */
        .cp-brands-wrap { display: flex; align-items: center; gap: 12px; }
        .cp-brands-scroll {
          flex: 1; overflow-x: auto; scroll-behavior: smooth;
          scrollbar-width: none; -ms-overflow-style: none;
          display: flex; align-items: stretch; gap: 12px; padding: 6px 2px 10px;
        }
        .cp-brands-scroll::-webkit-scrollbar { display: none; }

        /* ── brand card ── */
        .cp-brand-card {
          flex-shrink: 0;
          display: flex; flex-direction: column; align-items: center;
          gap: 8px;
          width: clamp(78px, 22vw, 130px);
          background: #fff;
          border-radius: 16px;
          border: 1.5px solid var(--border);
          padding: clamp(8px, 2vw, 16px) clamp(6px, 1.5vw, 14px);
          box-shadow: 0 2px 12px rgba(108,77,255,0.06);
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(.22,.68,0,1.2),
                      box-shadow 0.25s, border-color 0.25s;
          position: relative; overflow: hidden;
        }
        .cp-brand-card::before {
          content: '';
          position: absolute; inset: 0;
          opacity: 0;
          transition: opacity 0.25s;
          border-radius: inherit;
        }
        .cp-brand-card:hover {
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 14px 36px rgba(108,77,255,0.18);
        }
        .cp-brand-card:hover::before { opacity: 1; }

        /* logo container */
        .cp-brand-logo-wrap {
          position: relative;
          width: clamp(36px, 10vw, 64px);
          height: clamp(36px, 10vw, 64px);
          border-radius: 12px;
          overflow: hidden;
          flex-shrink: 0;
          transition: transform 0.25s;
        }
        .cp-brand-card:hover .cp-brand-logo-wrap { transform: scale(1.08); }

        /* name */
        .cp-brand-name {
          font-size: clamp(0.65rem, 1.4vw, 0.78rem);
          font-weight: 800;
          color: var(--text-heading);
          text-align: center;
          line-height: 1.2;
          letter-spacing: 0.2px;
          transition: color 0.2s;
          position: relative; z-index: 1;
        }

        /* colored dot indicator */
        .cp-brand-dot {
          width: 6px; height: 6px; border-radius: 50%;
          flex-shrink: 0; transition: transform 0.2s;
          position: relative; z-index: 1;
        }
        .cp-brand-card:hover .cp-brand-dot { transform: scale(1.4); }

        /* ── arrows ── */
        .cp-arrow {
          width: 34px; height: 34px; border-radius: 50%;
          border: 1.5px solid var(--border); background: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0; color: var(--primary);
          box-shadow: 0 2px 10px rgba(108,77,255,0.1);
          transition: background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .cp-arrow:hover {
          background: var(--primary); color: #fff;
          border-color: var(--primary); transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(108,77,255,0.3);
        }
        @media (max-width: 480px) {
          .cp-arrow { display: none; }
          .cp-brands-scroll { padding-bottom: 6px; }
        }
      `}</style>

      <section className="cp-hero">
        <div className="cp-hero-blob" />
        <div className="cp-hero-blob2" />
        <div className="cp-hero-inner">
          <div className="cp-tag">🎁 متجر البطاقات الرقمية</div>
          <h1 className="cp-heading">
            تصفح جميع <span>البطاقات</span>
          </h1>
          <p className="cp-sub">
            اختار بطاقتك من أشهر الماركات العالمية واستلمها فوراً بأفضل الأسعار
          </p>

          {/* label */}
          <div className="cp-brands-label">
            <div className="cp-brands-label-line" />
            <span className="cp-brands-label-text">الماركات المتاحة</span>
            <div className="cp-brands-label-line" />
          </div>

          {/* slider */}
          <div className="cp-brands-wrap">
            <button className="cp-arrow" onClick={() => scroll("right")} aria-label="السابق">
              <ChevronRight size={17} strokeWidth={2.5} />
            </button>

            <div className="cp-brands-scroll" ref={trackRef}>
              {BRANDS.map((b) => {
                const isActive = selectedBrand === b.name;
                const isHovered = hovered === b.name;
                const highlight = isActive || isHovered;
                return (
                  <div
                    key={b.name}
                    className="cp-brand-card"
                    onClick={() => onBrandClick(isActive ? null : b.name)}
                    onMouseEnter={() => setHovered(b.name)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      borderColor: highlight ? b.color : undefined,
                      boxShadow: highlight ? `0 14px 36px ${b.color}33` : undefined,
                      outline: isActive ? `2.5px solid ${b.color}` : undefined,
                      outlineOffset: "2px",
                    }}
                  >
                    {/* colored glow bg */}
                    <div style={{
                      position: "absolute", inset: 0, borderRadius: "inherit",
                      background: `${b.color}${isActive ? "1a" : "0d"}`,
                      opacity: highlight ? 1 : 0,
                      transition: "opacity 0.25s",
                      pointerEvents: "none",
                    }} />

                    <div className="cp-brand-logo-wrap" style={{ background: `${b.color}18` }}>
                      <Image src={b.logo} alt={b.name} fill style={{ objectFit: "contain", padding: "6px" }} />
                    </div>

                    <span className="cp-brand-name" style={{ color: highlight ? b.color : undefined }}>
                      {b.name}
                    </span>

                    {/* active check or dot */}
                    {isActive ? (
                      <span style={{
                        fontSize: "0.6rem", fontWeight: 800, color: b.color,
                        background: `${b.color}18`, borderRadius: 999,
                        padding: "1px 8px", position: "relative", zIndex: 1,
                      }}>
                        ✓ محدد
                      </span>
                    ) : (
                      <div className="cp-brand-dot" style={{ background: b.color }} />
                    )}
                  </div>
                );
              })}
            </div>

            <button className="cp-arrow" onClick={() => scroll("left")} aria-label="التالي">
              <ChevronLeft size={17} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
