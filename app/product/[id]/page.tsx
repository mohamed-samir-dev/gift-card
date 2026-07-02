"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { ArrowRight, FileText, BookOpen, Tag, CreditCard, ShoppingBag, Send, Clock, MapPin, ChevronDown, ChevronUp, Info, ShoppingCart, Shield, Mail, Gamepad2 } from "lucide-react";
import { Product } from "./types";
import { productStyles } from "./styles";
import LoadingSkeleton from "./components/LoadingSkeleton";
import ProductInfo from "./components/ProductInfo";

const HOW_TO_STEPS = [
  { icon: <ShoppingCart size={20} />, title: "اختر وادفع", desc: "اختر الكمية وانقر اشتري الآن" },
  { icon: <Shield size={20} />, title: "دفع آمن", desc: "أكمل الدفع بأي طريقة تفضلها" },
  { icon: <Mail size={20} />, title: "استلم الكود", desc: "يصلك الكود فوراً على بريدك" },
  { icon: <Gamepad2 size={20} />, title: "استمتع", desc: "استخدم الكود على المنصة واستمتع" },
];

// const TRUST_BADGES = [
//   { icon: "🔒", label: "دفع آمن 100%", cls: "purple" },
//   { icon: "⚡", label: "توصيل فوري", cls: "blue" },
//   { icon: "🎧", label: "دعم 24/7", cls: "gold" },
// ];

const DETAIL_ICONS: Record<string, React.ReactNode> = {
  'العلامة': <Tag size={14} />,
  'نوع البطاقة': <CreditCard size={14} />,
  'الاستخدام': <ShoppingBag size={14} />,
  'طريقة الاستلام': <Send size={14} />,
  'الصلاحية': <Clock size={14} />,
  'المنطقة': <MapPin size={14} />,
};

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [buying, setBuying] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => setProduct(data))
      .catch(() => toast.error("فشل تحميل المنتج"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBuy = () => {
    toast.success("تم إضافة البطاقة بنجاح! 🎉");
  };

  if (loading) return <><style>{productStyles}</style><LoadingSkeleton /></>;

  if (!product) return (
    <div className="pd-error">
      <style>{productStyles}</style>
      <p>المنتج مش موجود</p>
      <button onClick={() => router.back()}>ارجع للخلف</button>
    </div>
  );

  const total = (product.price * qty).toFixed(2);

  return (
    <>
      <style>{productStyles}</style>
      <Toaster position="top-center" toastOptions={{ style: { fontFamily: "Tajawal, sans-serif", fontWeight: 700 } }} />
      <div className="pd-page">
        <div className="pd-bg">
          <div className="pd-blob pd-blob-1" />
          <div className="pd-blob pd-blob-2" />
        </div>
        <div className="pd-content">
          <motion.button className="pd-back" onClick={() => router.back()} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <ArrowRight size={15} />
            رجوع
          </motion.button>
          <div className="pd-grid">
            <motion.div className="pd-img-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <div className="pd-img-wrap">
                <Image src={product.image || "/placeholder.webp"} alt={product.title} fill style={{ objectFit: "cover" }} priority />
                <div className="pd-img-overlay" />
                {product.category?.name && <div className="pd-img-badge">🏷️ {product.category.name}</div>}
              </div>
              {/* <div className="pd-badges">
                {TRUST_BADGES.map((b) => (
                  <div key={b.label} className="pd-badge-item">
                    <div className={`pd-badge-icon ${b.cls}`}>{b.icon}</div>
                    <span className="pd-badge-label">{b.label}</span>
                  </div>
                ))}
              </div> */}
            </motion.div>
            <ProductInfo product={product} qty={qty} buying={buying} total={total} onQtyChange={setQty} onBuy={handleBuy} />
          </div>
          <div className="pd-bottom">
            {(product.description || product.details) && (
              <motion.div className="pd-desc-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                <h2 className="pd-section-title">
                  <span className="pd-section-icon"><FileText size={15} /></span>
                  تفاصيل المنتج
                </h2>
                {product.description && (
                  <div className="pd-desc-wrap">
                    <p className={`pd-desc-text ${descExpanded ? 'expanded' : ''}`}>{product.description}</p>
                    <button className="pd-read-more" onClick={() => setDescExpanded(!descExpanded)}>
                      {descExpanded ? <><ChevronUp size={14} /> عرض أقل</> : <><ChevronDown size={14} /> عرض المزيد</>}
                    </button>
                  </div>
                )}
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
              </motion.div>
            )}
            <motion.div className="pd-how-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <h2 className="pd-section-title">
                <span className="pd-section-icon"><BookOpen size={15} /></span>
                طريقة الاستخدام
              </h2>
              <div className="pd-how-steps">
                {HOW_TO_STEPS.map((step, i) => (
                  <div key={i} className="pd-how-step">
                    <div className="pd-how-icon-wrap">
                      <div className="pd-how-icon">{step.icon}</div>
                      {i < HOW_TO_STEPS.length - 1 && <div className="pd-how-connector" />}
                    </div>
                    <div className="pd-how-text">
                      <span className="pd-how-title">{step.title}</span>
                      <span className="pd-how-desc">{step.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
