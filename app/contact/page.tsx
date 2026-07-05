"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, ChevronDown, MessageCircle, Headphones, ShieldCheck } from "lucide-react";
import { FaWhatsapp, FaTelegram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const contactInfo = [
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    value: "support@cardzone.com",
    sub: "نرد خلال 24 ساعة",
    color: "#6c4dff",
    bg: "#ece5ff",
    href: "mailto:support@cardzone.com",
  },
  {
    icon: Phone,
    title: "رقم الهاتف",
    value: "+966 50 000 0000",
    sub: "السبت – الخميس",
    color: "#4f7bff",
    bg: "#e0e9ff",
    href: "tel:+966500000000",
  },
  {
    icon: MapPin,
    title: "الموقع",
    value: "المملكة العربية السعودية",
    sub: "الرياض، حي العليا",
    color: "#8b5cf6",
    bg: "#f3e8ff",
    href: "#",
  },
  {
    icon: Clock,
    title: "ساعات العمل",
    value: "9 ص – 11 م",
    sub: "طوال أيام الأسبوع",
    color: "#06b6d4",
    bg: "#e0f7fa",
    href: "#",
  },
];

const faqs = [
  {
    q: "كيف أستلم البطاقة بعد الشراء؟",
    a: "بعد إتمام عملية الدفع بنجاح، يتم إرسال كود البطاقة فوراً إلى بريدك الإلكتروني المسجل، كما يظهر في صفحة تأكيد الطلب مباشرةً.",
  },
  {
    q: "ما هي طرق الدفع المتاحة؟",
    a: "نقبل الدفع عبر بطاقات Visa وMastercard وApple Pay ومدى. جميع المعاملات مشفرة وآمنة 100%.",
  },
  {
    q: "هل يمكنني استرداد المبلغ بعد الشراء؟",
    a: "نظراً لطبيعة المنتجات الرقمية، لا يمكن استرداد المبلغ بعد ظهور الكود. في حال وجود مشكلة تقنية، تواصل معنا فوراً وسنحل المشكلة.",
  },
  {
    q: "هل الأكواد أصلية ومضمونة؟",
    a: "نعم، جميع البطاقات المتاحة على منصتنا أصلية 100% ومصدرها مباشر من الموزعين الرسميين.",
  },
  {
    q: "كم يستغرق وصول الكود؟",
    a: "التسليم فوري في معظم الحالات. في حالات نادرة قد يستغرق حتى 5 دقائق. إذا لم تستلم الكود بعد 10 دقائق، تواصل مع الدعم.",
  },
  {
    q: "هل يمكنني استخدام البطاقة خارج المملكة؟",
    a: "يعتمد ذلك على نوع البطاقة. بطاقات Google Play وiTunes وSteam تعمل عالمياً، بينما بطاقات نون وأمازون السعودية مخصصة للسوق المحلي.",
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <>
      <style>{`
        /* ── Hero ── */
        .contact-hero {
          background: linear-gradient(135deg, #6c4dff 0%, #7b61ff 45%, #4f7bff 100%);
          padding: clamp(3rem, 8vw, 5.5rem) clamp(1rem, 4vw, 2rem);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .contact-hero-blob {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          pointer-events: none;
        }

        /* ── Info cards grid ── */
        .contact-info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(0.75rem, 2vw, 1.25rem);
        }
        @media (min-width: 768px) {
          .contact-info-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .contact-info-card {
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: 20px;
          padding: clamp(1.1rem, 3vw, 1.5rem) clamp(0.85rem, 2vw, 1.25rem);
          text-align: center;
          box-shadow: 0 4px 24px rgba(108,77,255,0.07);
          transition: transform 0.28s cubic-bezier(.22,.68,0,1.2), box-shadow 0.28s;
          text-decoration: none;
          display: block;
        }
        .contact-info-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(108,77,255,0.14);
        }

        /* ── Main grid ── */
        .contact-main-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(1.25rem, 3vw, 2rem);
        }
        @media (min-width: 860px) {
          .contact-main-grid { grid-template-columns: 1.15fr 0.85fr; }
        }

        /* ── Sidebar ── */
        .contact-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* ── Form ── */
        .contact-form-card {
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: 24px;
          padding: clamp(1.5rem, 4vw, 2.5rem);
          box-shadow: 0 8px 40px rgba(108,77,255,0.09);
        }
        .contact-input {
          width: 100%;
          background: var(--bg-main);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          font-family: inherit;
          color: var(--text-heading);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          text-align: right;
        }
        .contact-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(108,77,255,0.1);
        }
        .contact-input::placeholder { color: var(--text-light); }
        textarea.contact-input { resize: vertical; min-height: 130px; }

        /* ── Social sidebar ── */
        .contact-social-card {
          background: linear-gradient(135deg, #1e1b4b 0%, #2d2470 100%);
          border-radius: 24px;
          padding: clamp(1.5rem, 4vw, 2rem);
          color: #fff;
        }
        .contact-social-btn {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.9rem 1.1rem;
          border-radius: 14px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          text-decoration: none;
          color: #fff;
          font-weight: 700;
          font-size: 0.9rem;
          transition: background 0.2s, transform 0.2s;
          margin-bottom: 0.75rem;
        }
        .contact-social-btn:hover {
          background: rgba(255,255,255,0.15);
          transform: translateX(-4px);
        }
        .contact-social-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 1.1rem;
        }

        /* ── FAQ ── */
        .faq-item {
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          transition: box-shadow 0.2s;
        }
        .faq-item.open {
          box-shadow: 0 8px 32px rgba(108,77,255,0.1);
          border-color: rgba(108,77,255,0.3);
        }
        .faq-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: clamp(1rem, 2.5vw, 1.25rem) clamp(1rem, 3vw, 1.5rem);
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-weight: 800;
          font-size: clamp(0.875rem, 2vw, 0.95rem);
          color: var(--text-heading);
          text-align: right;
          gap: 1rem;
        }
        .faq-chevron {
          flex-shrink: 0;
          transition: transform 0.3s;
          color: var(--primary);
        }
        .faq-chevron.open { transform: rotate(180deg); }
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, padding 0.3s;
          padding: 0 clamp(1rem, 3vw, 1.5rem);
          color: var(--text-para);
          font-size: clamp(0.82rem, 2vw, 0.9rem);
          line-height: 1.85;
        }
        .faq-answer.open {
          max-height: 200px;
          padding: 0 clamp(1rem, 3vw, 1.5rem) clamp(1rem, 2.5vw, 1.25rem);
        }

        /* ── Success toast ── */
        .contact-toast {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #ecfdf5;
          border: 1.5px solid #6ee7b7;
          border-radius: 14px;
          padding: 1rem 1.25rem;
          color: #065f46;
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 1.25rem;
        }
      `}</style>

      <main className="min-h-screen" style={{ background: "var(--bg-main)" }}>

        {/* ── Hero ── */}
        <section className="contact-hero">
          <div className="contact-hero-blob" style={{ width: 320, height: 320, top: -100, right: -80 }} />
          <div className="contact-hero-blob" style={{ width: 240, height: 240, bottom: -80, left: -60 }} />
          <div className="contact-hero-blob" style={{ width: 160, height: 160, top: "40%", left: "20%" }} />

          <div style={{ position: "relative", maxWidth: 640, margin: "0 auto" }}>
            <div
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff", fontWeight: 700, fontSize: "0.8rem",
                padding: "5px 16px", borderRadius: 999, marginBottom: "1.25rem",
                backdropFilter: "blur(8px)",
              }}
            >
              💬 نحن هنا لمساعدتك
            </div>
            <h1
              style={{
                fontWeight: 900, fontSize: "clamp(1.8rem, 6vw, 3rem)",
                color: "#fff", margin: "0 0 1rem", lineHeight: 1.3,
              }}
            >
              تواصل معنا
            </h1>
            <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)", lineHeight: 1.8, margin: 0, fontWeight: 500 }}>
              فريق الدعم متاح على مدار الساعة للإجابة على استفساراتك وحل أي مشكلة تواجهها.
            </p>
          </div>
        </section>

        {/* ── Info Cards ── */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(2rem, 5vw, 3.5rem) clamp(1rem, 4vw, 1.5rem)" }}>
          <div className="contact-info-grid">
            {contactInfo.map(({ icon: Icon, title, value, sub, color, bg, href }) => (
              <a key={title} href={href} className="contact-info-card">
                <div
                  style={{
                    width: 50, height: 50, borderRadius: 14, background: bg,
                    display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.85rem",
                  }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <div style={{ fontWeight: 800, fontSize: "clamp(0.8rem, 2vw, 0.9rem)", color: "var(--text-heading)", marginBottom: 4 }}>
                  {title}
                </div>
                <div style={{ fontWeight: 700, fontSize: "clamp(0.78rem, 2vw, 0.875rem)", color, marginBottom: 3 }}>
                  {value}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-light)", fontWeight: 500 }}>
                  {sub}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Form + Sidebar ── */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 1.5rem) clamp(2.5rem, 6vw, 4rem)" }}>
          <div className="contact-main-grid">

            {/* Form */}
            <div className="contact-form-card">
              <div style={{ marginBottom: "1.75rem" }}>
                <h2 style={{ fontWeight: 900, fontSize: "clamp(1.2rem, 3vw, 1.5rem)", color: "var(--text-heading)", margin: "0 0 0.4rem" }}>
                  أرسل لنا رسالة
                </h2>
                <p style={{ color: "var(--text-para)", fontSize: "0.875rem", margin: 0 }}>
                  سنرد عليك في أقرب وقت ممكن
                </p>
              </div>

              {sent && (
                <div className="contact-toast">
                  <span style={{ fontSize: "1.2rem" }}>✅</span>
                  تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-heading)" }}>الاسم</label>
                    <input
                      className="contact-input"
                      type="text"
                      placeholder="اسمك الكريم"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-heading)" }}>البريد الإلكتروني</label>
                    <input
                      className="contact-input"
                      type="email"
                      placeholder="example@email.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-heading)" }}>الموضوع</label>
                  <select
                    className="contact-input"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    required
                  >
                    <option value="" disabled>اختر موضوع الرسالة</option>
                    <option value="support">مشكلة تقنية</option>
                    <option value="order">استفسار عن طلب</option>
                    <option value="payment">مشكلة في الدفع</option>
                    <option value="refund">طلب استرداد</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-heading)" }}>الرسالة</label>
                  <textarea
                    className="contact-input"
                    placeholder="اكتب رسالتك هنا..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gradient"
                  style={{
                    color: "#fff", fontWeight: 800, fontSize: "0.95rem",
                    padding: "0.85rem 2rem", borderRadius: 12, border: "none",
                    cursor: "pointer", display: "flex", alignItems: "center",
                    justifyContent: "center", gap: 8, marginTop: "0.25rem",
                  }}
                >
                  <Send size={17} strokeWidth={2.5} />
                  إرسال الرسالة
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="contact-sidebar">

              {/* Support channels */}
              <div className="contact-social-card">
                <h3 style={{ fontWeight: 900, fontSize: "1rem", margin: "0 0 1.25rem", color: "#fff" }}>
                  تواصل عبر
                </h3>

                <a href="https://wa.me/966500000000" target="_blank" rel="noreferrer" className="contact-social-btn">
                  <div className="contact-social-icon" style={{ background: "#25d366" }}>
                    <FaWhatsapp size={22} color="#fff" />
                  </div>
                  <div>
                    <div>واتساب</div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>رد فوري</div>
                  </div>
                </a>

                <a href="https://t.me/cardzone" target="_blank" rel="noreferrer" className="contact-social-btn">
                  <div className="contact-social-icon" style={{ background: "#229ed9" }}>
                    <FaTelegram size={22} color="#fff" />
                  </div>
                  <div>
                    <div>تيليجرام</div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>خلال دقائق</div>
                  </div>
                </a>

                <a href="mailto:support@cardzone.com" className="contact-social-btn">
                  <div className="contact-social-icon" style={{ background: "#6c4dff" }}>
                    <MdEmail size={22} color="#fff" />
                  </div>
                  <div>
                    <div>البريد الإلكتروني</div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>خلال 24 ساعة</div>
                  </div>
                </a>
              </div>

              {/* Trust badges */}
              <div
                style={{
                  background: "#fff", border: "1.5px solid var(--border)",
                  borderRadius: 20, padding: "1.25rem",
                  boxShadow: "0 4px 24px rgba(108,77,255,0.07)",
                }}
              >
                <h3 style={{ fontWeight: 900, fontSize: "0.95rem", color: "var(--text-heading)", margin: "0 0 1rem" }}>
                  لماذا تثق بنا؟
                </h3>
                {[
                  { icon: ShieldCheck, text: "دفع آمن ومشفر 100%", color: "#6c4dff", bg: "#ece5ff" },
                  { icon: Headphones, text: "دعم على مدار الساعة", color: "#4f7bff", bg: "#e0e9ff" },
                  { icon: MessageCircle, text: "رد سريع خلال دقائق", color: "#8b5cf6", bg: "#f3e8ff" },
                ].map(({ icon: Icon, text, color, bg }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={17} style={{ color }} />
                    </div>
                    <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-heading)" }}>{text}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ background: "linear-gradient(180deg, #f8f9ff 0%, #eef0ff 100%)", padding: "clamp(2.5rem, 7vw, 5rem) clamp(1rem, 4vw, 2rem)" }}>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>

            <div style={{ textAlign: "center", marginBottom: "clamp(1.75rem, 5vw, 3rem)" }}>
              <div
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "rgba(108,77,255,0.1)", border: "1px solid rgba(108,77,255,0.25)",
                  color: "var(--primary)", fontWeight: 700, fontSize: "0.8rem",
                  padding: "5px 16px", borderRadius: 999, marginBottom: "0.85rem",
                }}
              >
                ✦ الأسئلة الشائعة
              </div>
              <h2 style={{ fontWeight: 900, fontSize: "clamp(1.4rem, 5vw, 2.2rem)", color: "var(--text-heading)", margin: "0 0 0.6rem" }}>
                إجابات على{" "}
                <span style={{ background: "var(--gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  أكثر الأسئلة
                </span>
              </h2>
              <p style={{ color: "var(--text-para)", fontSize: "clamp(0.85rem, 2vw, 0.95rem)", margin: 0 }}>
                لم تجد إجابتك؟ تواصل معنا مباشرةً
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {faqs.map((faq, i) => (
                <div key={i} className={`faq-item${openFaq === i ? " open" : ""}`}>
                  <button className="faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className={`faq-chevron${openFaq === i ? " open" : ""}`} />
                  </button>
                  <div className={`faq-answer${openFaq === i ? " open" : ""}`}>
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>
    </>
  );
}
