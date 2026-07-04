import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, FileText, BookOpen, Tag, CreditCard, ShoppingBag, Send, Clock, MapPin, Info } from "lucide-react";
import { productStyles } from "./styles";
import ProductClient from "./components/ProductClient";
import { Product } from "./types";
import BackButton from "./components/BackButton";

const DETAIL_ICONS: Record<string, React.ReactNode> = {
  'العلامة': <Tag size={14} />,
  'نوع البطاقة': <CreditCard size={14} />,
  'الاستخدام': <ShoppingBag size={14} />,
  'طريقة الاستلام': <Send size={14} />,
  'الصلاحية': <Clock size={14} />,
  'المنطقة': <MapPin size={14} />,
};

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) notFound();

  return (
    <>
      <style>{productStyles}</style>
      <div className="pd-page">
        <div className="pd-bg">
          <div className="pd-blob pd-blob-1" />
          <div className="pd-blob pd-blob-2" />
        </div>
        <div className="pd-content">
          <BackButton />
          <div className="pd-grid">
            <div className="pd-img-col">
              <div className="pd-img-wrap">
                <Image src={product.image || "/placeholder.webp"} alt={product.title} fill style={{ objectFit: "cover" }} priority />
                <div className="pd-img-overlay" />
                {product.category?.name && <div className="pd-img-badge">🏷️ {product.category.name}</div>}
              </div>
            </div>
            <ProductClient product={product} />
          </div>
          <div className="pd-bottom">
            {(product.description || product.details) && (
              <div className="pd-desc-card">
                <h2 className="pd-section-title">
                  <span className="pd-section-icon"><FileText size={15} /></span>
                  تفاصيل المنتج
                </h2>
                {product.description && <p className="pd-desc-text expanded">{product.description}</p>}
                {product.details && Object.keys(product.details).length > 0 && (
                  <div className="pd-details-table">
                    {Object.entries(product.details).map(([key, val]) => (
                      <div key={key} className="pd-detail-row">
                        <div className="pd-detail-key">
                          <span className="pd-detail-icon">{DETAIL_ICONS[key] ?? <Info size={14} />}</span>
                          {key}
                        </div>
                        <div className="pd-detail-val">{val}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className="pd-how-card">
              <h2 className="pd-section-title">
                <span className="pd-section-icon"><BookOpen size={15} /></span>
                طريقة الاستخدام
              </h2>
              <div className="pd-how-steps">
                {[
                  { icon: "🛒", title: "اختر وادفع", desc: "اختر الكمية وانقر اشتري الآن" },
                  { icon: "🔒", title: "دفع آمن", desc: "أكمل الدفع بأي طريقة تفضلها" },
                  { icon: "📧", title: "استلم الكود", desc: "يصلك الكود فوراً على بريدك" },
                  { icon: "🎮", title: "استمتع", desc: "استخدم الكود على المنصة واستمتع" },
                ].map((step, i) => (
                  <div key={i} className="pd-how-step">
                    <div className="pd-how-icon-wrap">
                      <div className="pd-how-icon">{step.icon}</div>
                      {i < 3 && <div className="pd-how-connector" />}
                    </div>
                    <div className="pd-how-text">
                      <span className="pd-how-title">{step.title}</span>
                      <span className="pd-how-desc">{step.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
