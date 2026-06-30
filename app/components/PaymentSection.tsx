import Image from "next/image";
import { ShieldCheck } from "lucide-react";

const paymentMethods = [
  { src: "/visa.webp", alt: "Visa" },
  { src: "/master.webp", alt: "Mastercard" },
  { src: "/mada.webp", alt: "مدى" },
  { src: "/pay.webp", alt: "Apple Pay" },
];

export default function PaymentSection() {
  return (
    <>
      <style>{`
        .payment-section {
          background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
          padding: clamp(3rem, 6vw, 5rem) clamp(1rem, 5vw, 4rem);
          text-align: center;
        }
        .payment-inner {
          max-width: 720px;
          margin: 0 auto;
        }
        .payment-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(108,77,255,0.12);
          margin-bottom: 1.25rem;
        }
        .payment-heading {
          font-weight: 900;
          font-size: clamp(1.35rem, 4vw, 2.1rem);
          color: #1e1b4b;
          margin: 0 0 0.75rem;
          line-height: 1.4;
        }
        .payment-desc {
          color: #4b5563;
          font-size: clamp(0.85rem, 2.5vw, 1rem);
          line-height: 1.8;
          font-weight: 500;
          margin: 0 auto 2.5rem;
          max-width: 500px;
        }
        .payment-logos {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: clamp(0.75rem, 2vw, 1.5rem);
        }
        .payment-logo-card {
          background: #fff;
          border-radius: 14px;
          padding: 12px 20px;
          box-shadow: 0 2px 12px rgba(108,77,255,0.08);
          border: 1px solid rgba(108,77,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 100px;
          height: 60px;
        }

        @media (max-width: 480px) {
          .payment-logos {
            gap: 0.65rem;
          }
          .payment-logo-card {
            min-width: calc(50% - 0.65rem);
            flex: 1 1 calc(50% - 0.65rem);
            height: 56px;
            padding: 10px 12px;
          }
          .payment-desc {
            margin-bottom: 1.75rem;
          }
        }
      `}</style>

      <section className="payment-section">
        <div className="payment-inner">
          {/* Icon */}
          <div className="payment-icon-wrap">
            <ShieldCheck size={30} color="#6c4dff" strokeWidth={2} />
          </div>

          {/* Heading */}
          <h2 className="payment-heading">نضمن لك تجربة دفع آمنة</h2>

          {/* Description */}
          <p className="payment-desc">
            جميع عمليات الدفع مشفرة وآمنة 100% — بياناتك محمية بأحدث تقنيات التشفير
            لضمان تجربة شراء موثوقة في كل مرة.
          </p>

          {/* Payment logos */}
          <div className="payment-logos">
            {paymentMethods.map(({ src, alt }) => (
              <div key={alt} className="payment-logo-card">
                <Image
                  src={src}
                  alt={alt}
                  width={80}
                  height={36}
                  style={{ objectFit: "contain", maxWidth: "100%", height: "auto" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
