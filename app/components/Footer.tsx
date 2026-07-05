import Image from "next/image";
import { ShieldCheck, Zap, HeadphonesIcon, MapPin, Mail, Phone } from "lucide-react";

const paymentMethods = [
  { src: "/visa.webp", alt: "Visa" },
  { src: "/master.webp", alt: "Mastercard" },
  { src: "/pay.webp", alt: "Apple Pay" },
];

const quickLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "تصفح البطاقات", href: "/cards" },
  { label: "شحن المحفظة", href: "/recharge" },
  { label: "السلة", href: "/cart" },
  { label: "تسجيل الدخول", href: "/login" },
  { label: "إنشاء حساب", href: "/register" },
];

const categories = [
  { label: "بطاقات نون", href: "/cards" },
  { label: "بطاقات أمازون", href: "/cards" },
  { label: "جوجل بلاي", href: "/cards" },
  { label: "iTunes & App Store", href: "/cards" },
  { label: "PUBG Mobile", href: "/cards" },
  { label: "Steam", href: "/cards" },
];


export default function Footer() {
  return (
    <>
      <style>{`
        .footer-root {
          background: linear-gradient(160deg, #1e1b4b 0%, #2d2470 50%, #1a1744 100%);
          color: #fff;
          margin-top: auto;
        }

        /* ── Features bar ── */
        .footer-features {
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 2rem clamp(1rem, 5vw, 4rem);
        }
        .footer-features-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .footer-features-inner { grid-template-columns: 1fr; gap: 0.75rem; }
        }
        .footer-feat-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 1rem 1.25rem;
        }
        .footer-feat-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(108,77,255,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .footer-feat-title {
          font-weight: 800;
          font-size: 0.9rem;
          color: #fff;
          margin-bottom: 2px;
        }
        .footer-feat-desc {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.55);
          font-weight: 500;
        }

        /* ── Main grid ── */
        .footer-main {
          padding: 3rem clamp(1rem, 5vw, 4rem) 2rem;
        }
        .footer-main-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1.2fr;
          gap: 2.5rem;
        }
        @media (max-width: 1024px) {
          .footer-main-inner {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          .footer-brand-col { grid-column: 1 / -1; }
          .footer-tagline { max-width: 100%; }
        }
        @media (max-width: 640px) {
          .footer-main { padding: 2rem 1rem 1.5rem; }
          .footer-main-inner {
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }
          .footer-brand-col { grid-column: 1 / -1; }
        }
        @media (max-width: 400px) {
          .footer-main-inner { grid-template-columns: 1fr; }
        }

        .footer-logo {
          font-size: 1.75rem;
          font-weight: 900;
          background: linear-gradient(135deg, #a78bfa 0%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.6rem;
          display: inline-block;
        }
        .footer-tagline {
          color: rgba(255,255,255,0.55);
          font-size: 0.875rem;
          line-height: 1.8;
          font-weight: 500;
          margin-bottom: 1.25rem;
          max-width: 280px;
        }
        .footer-contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255,255,255,0.6);
          font-size: 0.82rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-contact-item:hover { color: #a78bfa; }

        .footer-col-title {
          font-weight: 800;
          font-size: 0.95rem;
          color: #fff;
          margin-bottom: 1rem;
          position: relative;
          padding-bottom: 0.6rem;
        }
        .footer-col-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 28px;
          height: 2px;
          background: linear-gradient(90deg, #6c4dff, #4f7bff);
          border-radius: 2px;
        }
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }
        .footer-links a {
          color: rgba(255,255,255,0.55);
          font-size: 0.855rem;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s, padding-right 0.2s;
          display: inline-block;
        }
        .footer-links a:hover {
          color: #a78bfa;
          padding-right: 4px;
        }

        /* newsletter */
        .footer-newsletter-input {
          width: 100%;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          padding: 0.65rem 0.9rem;
          color: #fff;
          font-size: 0.85rem;
          font-family: inherit;
          outline: none;
          margin-bottom: 0.6rem;
          transition: border-color 0.2s;
        }
        .footer-newsletter-input::placeholder { color: rgba(255,255,255,0.35); }
        .footer-newsletter-input:focus { border-color: rgba(108,77,255,0.6); }
        .footer-newsletter-btn {
          width: 100%;
          background: linear-gradient(135deg, #6c4dff 0%, #4f7bff 100%);
          color: #fff;
          font-weight: 800;
          font-size: 0.875rem;
          font-family: inherit;
          border: none;
          border-radius: 10px;
          padding: 0.65rem;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
          box-shadow: 0 6px 20px rgba(108,77,255,0.35);
        }
        .footer-newsletter-btn:hover { opacity: 0.9; transform: translateY(-1px); }

        /* ── Bottom bar ── */
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 1.25rem clamp(1rem, 5vw, 4rem);
        }
        .footer-bottom-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }
        @media (max-width: 640px) {
          .footer-bottom { padding: 1rem; }
          .footer-bottom-inner {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.75rem;
          }
        }
        .footer-copy {
          color: rgba(255,255,255,0.4);
          font-size: 0.8rem;
          font-weight: 500;
        }
        .footer-payments {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
        }
        .footer-pay-label {
          color: rgba(255,255,255,0.4);
          font-size: 0.78rem;
          font-weight: 500;
          margin-left: 0.25rem;
          width: 100%;
          text-align: center;
        }
        @media (min-width: 641px) {
          .footer-pay-label { width: auto; }
        }
        .footer-pay-card {
          background: #fff;
          border-radius: 8px;
          padding: 5px 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 34px;
        }
      `}</style>

      <footer className="footer-root">

        {/* ── Main grid ── */}
        <div className="footer-main">
          <div className="footer-main-inner">

            {/* Brand col */}
            <div className="footer-brand-col">
              <div className="footer-logo">كارد زون</div>
              <p className="footer-tagline">
                وجهتك الأولى لشراء البطاقات الرقمية بأفضل الأسعار.
                نوفر لك مئات البطاقات من أشهر المنصات العالمية مع ضمان التوصيل الفوري والأمان الكامل.
              </p>
              <a href="mailto:support@cardzone.com" className="footer-contact-item">
                <Mail size={14} color="#a78bfa" />
                support@cardzone.com
              </a>
              <a href="tel:+966500000000" className="footer-contact-item">
                <Phone size={14} color="#a78bfa" />
                +966 50 000 0000
              </a>
              <div className="footer-contact-item">
                <MapPin size={14} color="#a78bfa" />
                المملكة العربية السعودية
              </div>
            </div>

            {/* Quick links */}
            <div>
              <div className="footer-col-title">روابط سريعة</div>
              <ul className="footer-links">
                {quickLinks.map((l) => (
                  <li key={l.label}><a href={l.href}>{l.label}</a></li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <div className="footer-col-title">الفئات</div>
              <ul className="footer-links">
                {categories.map((c) => (
                  <li key={c.label}><a href={c.href}>{c.label}</a></li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <div className="footer-col-title">ابقَ على اطلاع</div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", lineHeight: 1.75, fontWeight: 500, marginBottom: "1rem" }}>
                اشترك في نشرتنا البريدية واحصل على أحدث العروض والبطاقات الجديدة أولاً بأول.
              </p>
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="footer-newsletter-input"
              />
              <button className="footer-newsletter-btn">اشترك الآن</button>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <span className="footer-copy">
              © {new Date().getFullYear()} كارد زون — جميع الحقوق محفوظة
            </span>
            <div className="footer-payments">
              <span className="footer-pay-label">وسائل الدفع المقبولة:</span>
              {paymentMethods.map(({ src, alt }) => (
                <div key={alt} className="footer-pay-card">
                  <Image
                    src={src}
                    alt={alt}
                    width={54}
                    height={24}
                    style={{ objectFit: "contain", height: "auto" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}
