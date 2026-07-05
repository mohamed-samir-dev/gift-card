import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Tag, Zap, Headphones, Users, ShoppingBag, Star, Globe } from "lucide-react";

const features = [
  { icon: ShieldCheck, label: "دفع آمن 100%" },
  { icon: Tag, label: "أفضل الأسعار" },
  { icon: Zap, label: "تسليم فوري" },
  { icon: Headphones, label: "دعم على مدار الساعة" },
];

const stats = [
  { icon: Users, value: "+5000", label: "عميل راضي" },
  { icon: ShoppingBag, value: "+200", label: "بطاقة متاحة" },
  { icon: Star, value: "4.9", label: "تقييم المستخدمين" },
  { icon: Globe, value: "+15", label: "منصة عالمية" },
];

const values = [
  {
    title: "الأمان أولاً",
    desc: "نستخدم أحدث تقنيات التشفير لحماية بياناتك ومعاملاتك المالية.",
    color: "#6c4dff",
    bg: "#ece5ff",
  },
  {
    title: "سرعة التسليم",
    desc: "تصلك البطاقة فوراً بعد إتمام الدفع، بدون انتظار أو تأخير.",
    color: "#4f7bff",
    bg: "#e0e9ff",
  },
  {
    title: "أسعار تنافسية",
    desc: "نضمن لك أفضل الأسعار في السوق مع عروض وخصومات دورية.",
    color: "#8b5cf6",
    bg: "#f3e8ff",
  },
];

export default function AboutPage() {
  return (
    <>
      <style>{`
        /* ── Stat card ── */
        .about-stat-card {
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: 20px;
          padding: clamp(1.25rem, 3vw, 1.75rem) clamp(0.75rem, 2vw, 1.25rem);
          text-align: center;
          box-shadow: 0 4px 24px rgba(108,77,255,0.07);
          transition: transform 0.28s cubic-bezier(.22,.68,0,1.2), box-shadow 0.28s;
        }
        .about-stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(108,77,255,0.14);
        }

        /* ── Value card ── */
        .about-value-card {
          border-radius: 16px;
          padding: clamp(0.85rem, 2vw, 1.1rem) clamp(0.9rem, 2vw, 1.25rem);
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          transition: transform 0.25s cubic-bezier(.22,.68,0,1.2);
        }
        .about-value-card:hover { transform: translateX(-4px); }

        /* ── Shared section layout ── */
        .about-hero-section,
        .about-mission-section {
          max-width: 1152px;
          margin: 0 auto;
          padding: clamp(2.5rem, 7vw, 5rem) clamp(1rem, 4vw, 1.5rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(2rem, 5vw, 3rem);
        }
        @media (min-width: 768px) {
          .about-hero-section { flex-direction: row-reverse; }
          .about-mission-section { flex-direction: row-reverse; }
        }

        /* ── Shared half-width ── */
        .about-half {
          width: 100%;
        }
        @media (min-width: 768px) {
          .about-half { width: 50%; }
        }

        /* ── Stats grid ── */
        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(0.75rem, 2vw, 1.25rem);
        }
        @media (min-width: 640px) {
          .about-stats-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* ── Features grid ── */
        .about-features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(0.6rem, 2vw, 1rem);
          border-radius: 1rem;
          padding: clamp(0.85rem, 2vw, 1.25rem);
          background: var(--bg-section);
          box-shadow: var(--shadow-card);
          border: 1px solid var(--border);
        }

        /* ── CTA section ── */
        .about-cta-section {
          padding: clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 2rem);
          text-align: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #6c4dff 0%, #7b61ff 45%, #4f7bff 100%);
        }
        .about-cta-btns {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: clamp(0.75rem, 2vw, 1rem);
        }
      `}</style>

      <main className="min-h-screen" style={{ background: "var(--bg-main)" }}>

        {/* ── Section 1 - Hero ── */}
        <section className="about-hero-section">
          <div className="about-half rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/about1.webp"
              alt="من نحن"
              width={600}
              height={420}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="about-half text-right flex flex-col gap-5">
            <span
              className="text-sm font-bold px-4 py-1 rounded-full self-start"
              style={{ background: "var(--glow-violet)", color: "var(--primary)" }}
            >
              من نحن
            </span>

            <h1
              style={{
                fontWeight: 900,
                fontSize: "clamp(1.6rem, 5vw, 2.6rem)",
                color: "var(--text-heading)",
                lineHeight: 1.35,
                margin: 0,
              }}
            >
              منصتك الموثوقة لشراء
              <br />
              <span style={{ background: "var(--gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                البطاقات الرقمية
              </span>
            </h1>

            <p style={{ color: "var(--text-para)", fontSize: "clamp(0.875rem, 2vw, 1rem)", lineHeight: 1.85, margin: 0 }}>
              كارد زون هي منصة متخصصة في بيع البطاقات الرقمية لأشهر المنصات
              العالمية. نوفر لك تجربة شراء سهلة وآمنة مع تسليم فوري وأسعار
              تنافسية، لأننا نؤمن أن الترفيه الرقمي يجب أن يكون في متناول الجميع.
            </p>

            <div className="about-features-grid">
              {features.map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ width: 38, height: 38, background: "var(--glow-violet)" }}
                  >
                    <Icon size={18} style={{ color: "var(--primary)" }} />
                  </div>
                  <span style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)", fontWeight: 600, color: "var(--text-heading)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 2 - Stats ── */}
        <section style={{ background: "linear-gradient(180deg, #f8f9ff 0%, #eef0ff 100%)", padding: "clamp(2.5rem, 7vw, 5rem) clamp(1rem, 4vw, 2rem)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>

            <div style={{ textAlign: "center", marginBottom: "clamp(1.75rem, 5vw, 3rem)" }}>
              <div
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "rgba(108,77,255,0.1)", border: "1px solid rgba(108,77,255,0.25)",
                  color: "var(--primary)", fontWeight: 700, fontSize: "0.8rem",
                  padding: "5px 16px", borderRadius: 999, marginBottom: "0.85rem",
                }}
              >
                ✦ أرقام تتحدث عنا
              </div>
              <h2 style={{ fontWeight: 900, fontSize: "clamp(1.4rem, 5vw, 2.4rem)", color: "var(--text-heading)", margin: 0 }}>
                ثقة{" "}
                <span style={{ background: "var(--gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  آلاف العملاء
                </span>
              </h2>
            </div>

            <div className="about-stats-grid">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="about-stat-card">
                  <div
                    style={{
                      width: "clamp(40px, 8vw, 52px)", height: "clamp(40px, 8vw, 52px)",
                      borderRadius: 14, background: "var(--glow-violet)",
                      display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.85rem",
                    }}
                  >
                    <Icon size={22} style={{ color: "var(--primary)" }} />
                  </div>
                  <div
                    style={{
                      fontWeight: 900, fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
                      background: "var(--gradient)", WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent", lineHeight: 1.1, marginBottom: "0.35rem",
                    }}
                  >
                    {value}
                  </div>
                  <div style={{ color: "var(--text-para)", fontWeight: 600, fontSize: "clamp(0.75rem, 2vw, 0.9rem)" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 3 - Mission + Image ── */}
        <section className="about-mission-section">
          <div className="about-half rounded-3xl overflow-hidden shadow-lg flex-shrink-0">
            <Image
              src="/about2.webp"
              alt="رسالتنا"
              width={600}
              height={420}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="about-half text-right flex flex-col gap-5">
            <span
              className="text-sm font-bold px-4 py-1 rounded-full self-start"
              style={{ background: "var(--glow-violet)", color: "var(--primary)" }}
            >
              رسالتنا
            </span>

            <h2
              style={{
                fontWeight: 900, fontSize: "clamp(1.6rem, 5vw, 2.6rem)",
                color: "var(--text-heading)", lineHeight: 1.35, margin: 0,
              }}
            >
              نجعل الترفيه الرقمي
              <br />
              <span style={{ background: "var(--gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                في متناول الجميع
              </span>
            </h2>

            <p style={{ color: "var(--text-para)", fontSize: "clamp(0.875rem, 2vw, 1rem)", lineHeight: 1.85, margin: 0 }}>
              نسعى دائماً لتوفير أفضل تجربة تسوق رقمية، من خلال منصة سهلة الاستخدام
              تضم أكبر تشكيلة من البطاقات الرقمية لأشهر المنصات العالمية والمحلية.
            </p>

            <div className="flex flex-col gap-3">
              {values.map(({ title, desc, color, bg }) => (
                <div
                  key={title}
                  className="about-value-card"
                  style={{ background: bg, border: `1.5px solid ${color}22` }}
                >
                  <div
                    style={{
                      width: 36, height: 36, borderRadius: 10, background: color,
                      flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#fff" }} />
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, color: "var(--text-heading)", marginBottom: 3, fontSize: "clamp(0.85rem, 2vw, 0.95rem)" }}>
                      {title}
                    </div>
                    <div style={{ color: "var(--text-para)", fontSize: "clamp(0.78rem, 2vw, 0.85rem)", lineHeight: 1.75 }}>
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 4 - CTA ── */}
        <section className="about-cta-section">
          <div style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, left: -60, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />

          <div style={{ position: "relative", maxWidth: 580, margin: "0 auto" }}>
            <h2
              style={{
                fontWeight: 900, fontSize: "clamp(1.4rem, 5vw, 2.4rem)",
                color: "#fff", margin: "0 0 0.85rem", lineHeight: 1.35,
              }}
            >
              جاهز تبدأ التسوق؟
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.8)", fontSize: "clamp(0.875rem, 2vw, 1rem)",
                lineHeight: 1.8, fontWeight: 500, margin: "0 0 2rem",
              }}
            >
              تصفح مئات البطاقات الرقمية واحصل على بطاقتك فوراً بأفضل الأسعار.
            </p>
            <div className="about-cta-btns">
              <Link
                href="/cards"
                style={{
                  background: "#fff", color: "var(--primary)", fontWeight: 800,
                  fontSize: "clamp(0.875rem, 2vw, 1rem)",
                  padding: "clamp(10px, 2vw, 14px) clamp(20px, 4vw, 36px)",
                  borderRadius: 12, display: "inline-flex", alignItems: "center",
                  gap: 8, textDecoration: "none",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.15)", whiteSpace: "nowrap",
                }}
              >
                <ShoppingBag size={17} strokeWidth={2.5} />
                تصفح البطاقات
              </Link>
              <Link
                href="/register"
                style={{
                  background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.4)",
                  color: "#fff", fontWeight: 700, fontSize: "clamp(0.875rem, 2vw, 1rem)",
                  padding: "clamp(10px, 2vw, 14px) clamp(20px, 4vw, 36px)",
                  borderRadius: 12, display: "inline-flex", alignItems: "center",
                  textDecoration: "none", whiteSpace: "nowrap", backdropFilter: "blur(8px)",
                }}
              >
                إنشاء حساب مجاني
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
