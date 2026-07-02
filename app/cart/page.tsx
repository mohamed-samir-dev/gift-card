"use client";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, Zap, ShieldCheck, Tag } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function CartPage() {
  const { items, removeFromCart, updateQty, clearCart, totalPrice } = useCart();
  const { user, token } = useAuth();
  const router = useRouter();
  const [buying, setBuying] = useState(false);

  const handleCheckout = async () => {
    if (!user || !token) {
      toast.error("سجل دخولك أولاً لإتمام الشراء");
      router.push("/login?returnUrl=/cart");
      return;
    }
    setBuying(true);
    try {
      for (const item of items) {
        for (let i = 0; i < item.qty; i++) {
          const res = await fetch(`${API}/api/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ productId: item.productId }),
          });
          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "فشل الشراء");
          }
        }
      }
      clearCart();
      toast.success("تمت جميع الطلبات بنجاح 🎉");
      router.push("/");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      setBuying(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4" style={{ fontFamily: "Tajawal, sans-serif" }}>
        <div className="w-28 h-28 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #ece5ff 0%, #dde8ff 100%)" }}>
          <ShoppingCart size={52} className="text-[#6c4dff] opacity-60" />
        </div>
        <div className="text-center">
          <p className="text-2xl font-black mb-2" style={{ color: "var(--text-heading)" }}>سلتك فارغة!</p>
          <p className="text-sm" style={{ color: "var(--text-para)" }}>لم تضف أي منتجات بعد، تصفح متجرنا واختر ما يعجبك</p>
        </div>
        <Link href="/" className="btn-gradient text-white font-bold px-8 py-3 rounded-2xl text-sm flex items-center gap-2">
          <ShoppingCart size={16} />
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  const itemsCount = items.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen" style={{ fontFamily: "Tajawal, sans-serif", background: "var(--bg-main)" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #6c4dff 0%, #4f7bff 100%)" }} className="py-6 sm:py-8 px-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-colors shrink-0"
            style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
          >
            <ArrowRight size={20} />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">سلة التسوق</h1>
            <p className="text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{itemsCount} منتج في سلتك</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white"
              style={{ boxShadow: "0 4px 24px rgba(108,77,255,0.08)", border: "1px solid var(--border)" }}
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0" style={{ background: "#f3f0ff" }}>
                <Image src={item.image || "/placeholder.webp"} alt={item.title} fill style={{ objectFit: "cover" }} />
              </div>

              <div className="flex-1 min-w-0 flex flex-col">
                <p className="font-bold text-sm sm:text-base truncate mb-1" style={{ color: "var(--text-heading)" }}>{item.title}</p>
                <p className="text-xs mb-3" style={{ color: "var(--text-para)" }}>
                  سعر الوحدة: <span className="font-bold text-[#6c4dff]">{item.price.toFixed(2)} {item.currency}</span>
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 rounded-xl overflow-hidden" style={{ border: "1.5px solid var(--border)" }}>
                    <button
                      onClick={() => updateQty(item.productId, item.qty - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[#f3f0ff] transition-colors"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center font-black text-sm" style={{ color: "var(--text-heading)" }}>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.productId, item.qty + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[#f3f0ff] transition-colors"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-red-50 text-red-400 transition-colors"
                    style={{ border: "1.5px solid #fee2e2" }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="text-left shrink-0 self-start sm:self-auto">
                <p className="text-lg font-black" style={{ color: "var(--primary)" }}>
                  {(item.price * item.qty).toFixed(2)}
                </p>
                <p className="text-xs font-semibold" style={{ color: "var(--text-para)" }}>{item.currency}</p>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-xs text-red-400 hover:text-red-600 transition-colors self-start flex items-center gap-1 mt-1"
          >
            <Trash2 size={13} />
            إفراغ السلة
          </button>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div
            className="rounded-2xl p-4 sm:p-6 bg-white lg:sticky lg:top-6"
            style={{ boxShadow: "0 4px 24px rgba(108,77,255,0.10)", border: "1px solid var(--border)" }}
          >
            <h2 className="text-base font-black mb-5" style={{ color: "var(--text-heading)" }}>ملخص الطلب</h2>

            <div className="flex flex-col gap-3 mb-5">
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--text-para)" }}>عدد المنتجات</span>
                <span className="font-bold" style={{ color: "var(--text-heading)" }}>{itemsCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--text-para)" }}>المجموع الفرعي</span>
                <span className="font-bold" style={{ color: "var(--text-heading)" }}>{totalPrice.toFixed(2)} SAR</span>
              </div>
              <div className="h-px" style={{ background: "var(--border)" }} />
              <div className="flex justify-between">
                <span className="font-bold" style={{ color: "var(--text-heading)" }}>الإجمالي</span>
                <span className="text-xl font-black" style={{ color: "var(--primary)" }}>{totalPrice.toFixed(2)} SAR</span>
              </div>
            </div>

            {!user && (
              <div className="flex items-start gap-2 text-xs rounded-xl p-3 mb-4" style={{ background: "#fffbeb", border: "1px solid #fde68a", color: "#92400e" }}>
                <span className="mt-0.5">⚠️</span>
                <span>سجل دخولك لإتمام الشراء — سلتك محفوظة ولن تضيع</span>
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={buying}
              className="btn-gradient w-full text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm mb-4"
            >
              {buying
                ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <><Zap size={17} /> إتمام الشراء الآن</>
              }
            </button>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-para)" }}>
                <ShieldCheck size={14} className="text-green-500 shrink-0" />
                دفع آمن ومشفر 100%
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-para)" }}>
                <Zap size={14} className="text-[#6c4dff] shrink-0" />
                تسليم فوري بعد الدفع
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-para)" }}>
                <Tag size={14} className="text-blue-500 shrink-0" />
                أفضل الأسعار مضمونة
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
