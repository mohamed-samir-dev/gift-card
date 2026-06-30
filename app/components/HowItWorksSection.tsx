"use client";

import Image from "next/image";

const steps = [
  {
    number: "01",
    image: "/step1.webp",
    title: "اختر البطاقة",
    description: "اختر البطاقة اللتي تريدها من بين مئات الخيارات",
  },
  {
    number: "02",
    image: "/step2.webp",
    title: "ادخل البيانات",
    description: "ادخل معلومات البطاقة وكمية الشحن",
  },
  {
    number: "03",
    image: "/step3.webp",
    title: "ادفع بأمان",
    description: "اخنر وسيلة الدفع المناسبة واكمل عملية الدفع",
  },
  {
    number: "04",
    image: "/step4.webp",
    title: "استلم فوراً",
    description: "استلم البطاقة الرقميه في ثوان وبكل أمان",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      style={{
        background: "linear-gradient(180deg, #f8f9ff 0%, #eef0ff 100%)",
        padding: "clamp(2.5rem, 7vw, 6rem) clamp(1rem, 4vw, 2rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .hiw-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
          max-width: 1050px;
          margin: 0 auto;
          align-items: stretch;
          position: relative;
        }
        @media (min-width: 900px) {
          .hiw-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: clamp(1rem, 2.5vw, 1.5rem);
          }
        }
        .hiw-connector {
          display: none;
        }
        @media (min-width: 900px) {
          .hiw-connector {
            display: block;
            position: absolute;
            top: calc(clamp(80px, 12vw, 110px) / 2 + 2rem);
            right: 12.5%;
            left: 12.5%;
            height: 2px;
            border-top: 2.5px dashed rgba(108,77,255,0.2);
            z-index: 0;
            pointer-events: none;
          }
        }
        .hiw-img {
          position: relative;
          width: 100%;
          height: clamp(90px, 28vw, 180px);
          background: linear-gradient(135deg, #ece5ff 0%, #e0e9ff 100%);
          flex-shrink: 0;
        }
        @media (min-width: 900px) {
          .hiw-img {
            height: clamp(130px, 18vw, 180px);
          }
        }
        .hiw-title {
          font-weight: 800;
          font-size: clamp(0.85rem, 3vw, 1.05rem);
          color: var(--text-heading);
          margin: 0;
        }
        .hiw-desc {
          color: var(--text-para);
          font-size: clamp(0.72rem, 2.5vw, 0.855rem);
          line-height: 1.85;
          margin: 0;
          font-weight: 500;
          flex: 1;
        }
        .hiw-next {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--primary);
          font-weight: 700;
          font-size: clamp(0.7rem, 2vw, 0.8rem);
        }
        .hiw-done {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(108,77,255,0.1);
          color: var(--primary);
          font-weight: 700;
          font-size: clamp(0.68rem, 2vw, 0.78rem);
          padding: 3px 10px;
          border-radius: 999px;
        }
      `}</style>

      {/* Background decorative blobs */}
      <div
        style={{
          position: "absolute",
          top: -80,
          left: -80,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(108,77,255,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -60,
          right: -60,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,123,255,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "clamp(1.75rem, 5vw, 4rem)", position: "relative" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(108,77,255,0.1)",
            border: "1px solid rgba(108,77,255,0.25)",
            color: "var(--primary)",
            fontWeight: 700,
            fontSize: "0.8rem",
            padding: "5px 16px",
            borderRadius: 999,
            marginBottom: "1rem",
            letterSpacing: 0.5,
          }}
        >
          ✦ خطوات بسيطة
        </div>
        <h2
          style={{
            fontWeight: 900,
            fontSize: "clamp(1.4rem, 5vw, 2.6rem)",
            color: "var(--text-heading)",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          ازاي تعمل{" "}
          <span
            style={{
              background: "var(--gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            cardy ؟
          </span>
        </h2>
        <p
          style={{
            color: "var(--text-para)",
            fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
            marginTop: "0.75rem",
            fontWeight: 500,
          }}
        >
          في 4 خطوات بسيطة تقدر تشتري بطاقتك وتستخدمها فوراً
        </p>
      </div>

      {/* Steps grid */}
      <div className="hiw-grid">
        <div className="hiw-connector" />

        {steps.map((step, index) => (
          <div key={step.number} style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                background: "#fff",
                border: "1.5px solid var(--border)",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(108,77,255,0.07)",
                transition: "transform 0.28s cubic-bezier(.22,.68,0,1.2), box-shadow 0.28s",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-8px)";
                el.style.boxShadow = "0 24px 60px rgba(108,77,255,0.16)";
                el.style.borderColor = "rgba(108,77,255,0.35)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 4px 24px rgba(108,77,255,0.07)";
                el.style.borderColor = "var(--border)";
              }}
            >
              {/* Step number */}
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--gradient)",
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: "0.7rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 14px rgba(108,77,255,0.4)",
                  zIndex: 2,
                }}
              >
                {step.number}
              </div>

              {/* Image */}
              <div className="hiw-img">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  style={{ objectFit: "contain", padding: "12px" }}
                />
              </div>

              {/* Content */}
              <div
                style={{
                  padding: "0.85rem 0.9rem 1rem",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <h3 className="hiw-title">{step.title}</h3>
                <p className="hiw-desc">{step.description}</p>

                <div style={{ marginTop: 6 }}>
                  {index < steps.length - 1 ? (
                    <span className="hiw-next">
                      الخطوة التالية
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M6 8H13M6 8L9 5M6 8L9 11" stroke="#6c4dff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  ) : (
                    <span className="hiw-done">✓ اتهنى بيها!</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
