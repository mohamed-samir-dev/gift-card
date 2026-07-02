"use client";

import Image from "next/image";
import {
  User, Phone, MapPin, Home, Building2, Hash,
  CreditCard, Truck, ShieldCheck, Zap,
} from "lucide-react";
import { FormData } from "./types";
import { CartItem } from "../context/CartContext";

interface Props {
  items: CartItem[];
  totalPrice: number;
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Partial<FormData>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<FormData>>>;
  placing: boolean;
  onPlaceOrder: () => void;
}

function Field({
  label, name, icon: Icon, placeholder, type = "text", form, setForm, errors, setErrors,
}: {
  label: string; name: keyof FormData; icon: React.ElementType;
  placeholder: string; type?: string;
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Partial<FormData>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<FormData>>>;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold" style={{ color: "var(--text-para)" }}>{label}</label>
      <div className="relative">
        <span className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none" style={{ color: errors[name] ? "#ef4444" : "#6c4dff" }}>
          <Icon size={15} />
        </span>
        <input
          id={`field-${name}`}
          type={type}
          value={form[name]}
          onChange={e => { 
            if (name === "phone" && e.target.value.replace(/\D/g, "").length > 10) return;
            setForm(f => ({ ...f, [name]: e.target.value })); setErrors(er => ({ ...er, [name]: "" })); }}
          placeholder={placeholder}
          className="w-full pr-9 pl-4 py-2.5 rounded-xl text-sm outline-none transition-all"
          style={{
            border: `1.5px solid ${errors[name] ? "#ef4444" : "var(--border)"}`,
            background: errors[name] ? "#fff5f5" : "#fafbff",
            color: "var(--text-heading)",
            fontFamily: "Tajawal, sans-serif",
          }}
          onFocus={e => { if (!errors[name]) e.target.style.borderColor = "#6c4dff"; e.target.style.background = "#fff"; }}
          onBlur={e => { if (!errors[name]) { e.target.style.borderColor = "var(--border)"; e.target.style.background = "#fafbff"; } }}
        />
      </div>
      {errors[name] && <p className="text-xs text-red-500">{errors[name]}</p>}
    </div>
  );
}

export default function CheckoutForm({ items, totalPrice, form, setForm, errors, setErrors, placing, onPlaceOrder }: Props) {
  const fieldProps = { form, setForm, errors, setErrors };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-5 sm:py-8 grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">

      {/* Left: Form */}
      <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-5">

        {/* بيانات شخصية */}
        <div className="bg-white rounded-2xl p-4 sm:p-6" style={{ border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#ede9fe" }}>
              <User size={16} style={{ color: "#6c4dff" }} />
            </div>
            <h2 className="font-black text-base" style={{ color: "var(--text-heading)" }}>البيانات الشخصية</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="الاسم الكامل *" name="fullName" icon={User} placeholder="محمد أحمد" {...fieldProps} />
            <Field label="رقم الجوال *" name="phone" icon={Phone} placeholder="رقم الجوال" type="tel" {...fieldProps} />
          </div>
        </div>

        {/* عنوان التوصيل */}
        <div className="bg-white rounded-2xl p-4 sm:p-6" style={{ border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#ede9fe" }}>
              <MapPin size={16} style={{ color: "#6c4dff" }} />
            </div>
            <h2 className="font-black text-base" style={{ color: "var(--text-heading)" }}>عنوان التوصيل</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="المدينة *" name="city" icon={Building2} placeholder="الرياض" {...fieldProps} />
            <Field label="الحي" name="district" icon={MapPin} placeholder="حي النزهة" {...fieldProps} />
            <Field label="اسم الشارع *" name="street" icon={Home} placeholder="شارع الملك فهد" {...fieldProps} />
            <Field label="رقم المبنى" name="buildingNo" icon={Hash} placeholder="١٢٣" {...fieldProps} />
          </div>
          <div className="mt-4 flex flex-col gap-1.5">
            <label className="text-xs font-bold" style={{ color: "var(--text-para)" }}>ملاحظات إضافية</label>
            <textarea
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              placeholder="أي تعليمات خاصة للتوصيل..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none transition-all"
              style={{ border: "1.5px solid var(--border)", background: "#fafbff", color: "var(--text-heading)", fontFamily: "Tajawal, sans-serif" }}
              onFocus={e => { e.target.style.borderColor = "#6c4dff"; e.target.style.background = "#fff"; }}
              onBlur={e => { e.target.style.borderColor = "var(--border)"; e.target.style.background = "#fafbff"; }}
            />
          </div>
        </div>

        {/* طريقة الدفع */}
        <div className="bg-white rounded-2xl p-4 sm:p-6" style={{ border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#ede9fe" }}>
              <CreditCard size={16} style={{ color: "#6c4dff" }} />
            </div>
            <h2 className="font-black text-base" style={{ color: "var(--text-heading)" }}>طريقة الدفع</h2>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl"
            style={{ border: "2px solid #6c4dff", background: "linear-gradient(135deg, #f5f3ff 0%, #eef2ff 100%)" }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#ede9fe" }}>
              <Truck size={22} style={{ color: "#6c4dff" }} />
            </div>
            <div className="flex-1">
              <p className="font-black text-sm" style={{ color: "var(--text-heading)" }}>الدفع عند الاستلام</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-para)" }}>ادفع نقداً عند استلام طلبك بأمان تام</p>
            </div>
            <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0" style={{ borderColor: "#6c4dff" }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#6c4dff" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Right: Order Summary */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl p-4 sm:p-6 lg:sticky lg:top-6" style={{ border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
          <h2 className="font-black text-base mb-5" style={{ color: "var(--text-heading)" }}>ملخص الطلب</h2>

          <div className="flex flex-col gap-3 mb-4 sm:mb-5">
            {items.map(item => (
              <div key={item.productId} className="flex items-center gap-2 sm:gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0" style={{ background: "#f3f0ff" }}>
                  <Image src={item.image || "/placeholder.webp"} alt={item.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-xs truncate" style={{ color: "var(--text-heading)" }}>{item.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-para)" }}>الكمية: {item.qty}</p>
                </div>
                <span className="font-black text-sm flex items-center gap-1 shrink-0" style={{ color: "var(--primary)" }}>
                  {(item.price * item.qty).toFixed(2)}
                  <img src="/money-icon.webp" alt="ريال" style={{ width: 18, height: 18, objectFit: "contain" }} />
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 py-4" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--text-para)" }}>المجموع الفرعي</span>
              <span className="font-bold flex items-center gap-1" style={{ color: "var(--text-heading)" }}>
                {totalPrice.toFixed(2)} <img src="/money-icon.webp" alt="ريال" style={{ width: 18, height: 18, objectFit: "contain" }} />
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--text-para)" }}>رسوم التوصيل</span>
              <span className="font-bold text-green-600">مجاني</span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-3 sm:mt-4 mb-4 sm:mb-6">
            <span className="font-black" style={{ color: "var(--text-heading)" }}>الإجمالي</span>
            <span className="text-2xl font-black flex items-center gap-1" style={{ color: "var(--primary)" }}>
              {totalPrice.toFixed(2)}
              <img src="/money-icon.webp" alt="ريال" style={{ width: 26, height: 26, objectFit: "contain" }} />
            </span>
          </div>

          <button
            onClick={onPlaceOrder}
            disabled={placing}
            className="btn-gradient w-full text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 text-sm"
          >
            {placing
              ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : <><Zap size={17} /> تأكيد الطلب الآن</>
            }
          </button>

          <div className="flex flex-col gap-2 mt-3 sm:mt-4">
            <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-para)" }}>
              <ShieldCheck size={13} className="text-green-500 shrink-0" /> دفع آمن ومشفر 100%
            </div>
            <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-para)" }}>
              <Truck size={13} className="shrink-0" style={{ color: "#6c4dff" }} /> توصيل سريع لباب بيتك
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
