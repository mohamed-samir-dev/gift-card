"use client";

import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import toast from "react-hot-toast";
import { OrderResult, FormData } from "./types";
import { translateError } from "../utils/apiErrors";
import CheckoutForm from "./CheckoutForm";
import CheckoutSuccess from "./CheckoutSuccess";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user, token } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [placing, setPlacing] = useState(false);
  const [results, setResults] = useState<OrderResult[]>([]);

  const [form, setForm] = useState<FormData>({
    fullName: user?.name ?? "",
    phone: "",
    city: "",
    district: "",
    street: "",
    buildingNo: "",
    notes: "",
    paymentMethod: "cod",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const itemsCount = items.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    if (!user || !token) { router.replace("/login?returnUrl=/checkout"); }
    else if (items.length === 0 && step === 1) { router.replace("/cart"); }
  }, [user, token, items.length, step]);

  if (!user || !token || (items.length === 0 && step === 1)) return null;

  function validate() {
    const e: Partial<FormData> = {};
    if (!form.fullName.trim()) e.fullName = "الاسم مطلوب";
    if (!form.phone.trim()) e.phone = "رقم الجوال مطلوب";
    else if (form.phone.trim().length !== 10) e.phone = "رقم الجوال يجب أن يكون 10 أرقام";
    if (!form.city.trim()) e.city = "المدينة مطلوبة";
    if (!form.street.trim()) e.street = "اسم الشارع مطلوب";
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const order: (keyof FormData)[] = ["fullName", "phone", "city", "district", "street", "buildingNo"];
      const firstKey = order.find(k => e[k]);
      if (firstKey) {
        const el = document.getElementById(`field-${firstKey}`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus();
      }
      return false;
    }
    return true;
  }

  async function handlePlaceOrder() {
    if (!validate()) return;
    setPlacing(true);
    const collected: OrderResult[] = [];
    try {
      for (const item of items) {
        for (let i = 0; i < item.qty; i++) {
          const res = await fetch(`${API}/api/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ productId: item.productId, paymentMethod: form.paymentMethod }),
          });
          if (!res.ok) { const err = await res.json(); throw new Error(translateError(err.message) || "فشل الشراء"); }
          const data = await res.json();
          collected.push({
            productTitle: item.title,
            pin: data.card?.pin,
            serial: data.card?.serial,
            cardNumber: data.card?.cardNumber,
            total: data.order?.price ?? item.price,
          });
        }
      }
      clearCart();
      setResults(collected);
      setStep(2);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? translateError(err.message) : "حدث خطأ");
    } finally {
      setPlacing(false);
    }
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "Tajawal, sans-serif", background: "var(--bg-main)" }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #6c4dff 0%, #4f7bff 100%)" }} className="py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {step === 1 && (
                <button onClick={() => router.push("/cart")}
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>
                  <ArrowRight size={18} />
                </button>
              )}
              <div>
                <h1 className="text-base sm:text-lg font-black text-white leading-tight">
                  {step === 1 ? "إتمام الطلب" : "تم الطلب بنجاح 🎉"}
                </h1>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {step === 1 ? `${itemsCount} منتج · ${form.paymentMethod === "wallet" ? "الدفع من المحفظة" : "الدفع عند الاستلام"}` : "شكراً لثقتك بنا"}
                </p>
              </div>
            </div>

            {/* Steps - desktop */}
            <div className="hidden sm:flex items-center gap-3">
              {["بيانات التوصيل", "تأكيد الطلب"].map((label, i) => {
                const s = i + 1;
                const active = step >= s;
                return (
                  <div key={s} className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-all"
                        style={{ background: active ? "#fff" : "rgba(255,255,255,0.2)", color: active ? "#6c4dff" : "rgba(255,255,255,0.6)" }}>
                        {step > s ? <Check size={12} /> : s}
                      </div>
                      <span className="text-xs font-semibold" style={{ color: active ? "#fff" : "rgba(255,255,255,0.5)" }}>{label}</span>
                    </div>
                    {s < 2 && <div className="w-6 h-px" style={{ background: "rgba(255,255,255,0.25)" }} />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Steps - mobile progress bar */}
          <div className="sm:hidden mt-3 flex items-center gap-2">
            {["بيانات التوصيل", "تأكيد الطلب"].map((label, i) => {
              const s = i + 1;
              const active = step >= s;
              return (
                <div key={s} className="flex-1 flex flex-col gap-1">
                  <div className="h-1 rounded-full transition-all" style={{ background: active ? "#fff" : "rgba(255,255,255,0.25)" }} />
                  <span className="text-[10px] font-semibold" style={{ color: active ? "#fff" : "rgba(255,255,255,0.5)" }}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {step === 1 && (
        <CheckoutForm
          items={items}
          totalPrice={totalPrice}
          form={form}
          setForm={setForm}
          errors={errors}
          setErrors={setErrors}
          placing={placing}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {step === 2 && (
        <CheckoutSuccess results={results} form={form} />
      )}
    </div>
  );
}
