"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, MapPin, Zap, Copy, Check, Printer } from "lucide-react";
import { OrderResult, FormData } from "./types";

interface Props {
  results: OrderResult[];
  form: FormData;
}

export default function CheckoutSuccess({ results, form }: Props) {
  const router = useRouter();
  const [copied, setCopied] = useState<string | null>(null);

  const orderDate = new Date().toLocaleString("ar-SA", { dateStyle: "full", timeStyle: "short" });

  const totalAll = results.reduce((s, r) => s + r.total, 0);

  function printReceipt() {
    window.print();
  }

  function copyText(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-10 flex flex-col gap-4 sm:gap-6" id="receipt-area">

      {/* رسيت الطباعة - مخفي على الشاشة */}
      <div id="print-receipt" style={{ display: "none" }}>
        <div className="print-header">
          <h1>إيصال الطلب</h1>
          <p>{orderDate}</p>
        </div>

        <div className="print-section-title">بيانات العميل</div>
        <div className="print-row"><span className="print-label">الاسم</span><span className="print-value">{form.fullName}</span></div>
        <div className="print-row"><span className="print-label">الجوال</span><span className="print-value">{form.phone}</span></div>
        {form.city && <div className="print-row"><span className="print-label">المدينة</span><span className="print-value">{[form.street, form.district, form.city].filter(Boolean).join("، ")}</span></div>}
        <div className="print-row"><span className="print-label">طريقة الدفع</span><span className="print-value">{form.paymentMethod === "wallet" ? "المحفظة" : "عند الاستلام"}</span></div>

        {results.map((r, idx) => (
          <div key={idx}>
            <div className="print-section-title">{r.productTitle}</div>
            {r.cardNumber && <div className="print-row"><span className="print-label">رقم البطاقة</span><span className="print-value">{r.cardNumber}</span></div>}
            {r.serial && <div className="print-row"><span className="print-label">السيريال</span><span className="print-value">{r.serial}</span></div>}
            {r.pin && <div className="print-row"><span className="print-label">الـ PIN</span><span className="print-value print-pin">{r.pin}</span></div>}
            <div className="print-row"><span className="print-label">المبلغ</span><span className="print-value">{r.total.toFixed(2)} ر.س</span></div>
          </div>
        ))}

        <div className="print-row" style={{ marginTop: 8, borderTop: "2px solid #111", fontWeight: 900 }}>
          <span>الإجمالي</span>
          <span>{totalAll.toFixed(2)} ر.س</span>
        </div>

        <div className="print-footer">احتفظ بهذا الإيصال كدليل على عملية الشراء</div>
      </div>

      {/* Success Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center gap-3"
        style={{ border: "1px solid #bbf7d0", boxShadow: "0 4px 30px rgba(22,163,74,0.1)" }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #dcfce7, #bbf7d0)" }}>
          <CheckCircle2 size={44} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-black" style={{ color: "var(--text-heading)" }}>تم تأكيد طلبك!</h2>
        <p className="text-sm" style={{ color: "var(--text-para)" }}>سيتم التواصل معك قريباً لتأكيد موعد التوصيل</p>
        <p className="text-xs print-only-date" style={{ color: "var(--text-light)" }}>{orderDate}</p>
      </div>

      {/* بيانات التوصيل */}
      <div className="bg-white rounded-2xl p-4 sm:p-5" style={{ border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-2 mb-4">
          <MapPin size={16} style={{ color: "#6c4dff" }} />
          <h3 className="font-black text-sm" style={{ color: "var(--text-heading)" }}>بيانات التوصيل</h3>
        </div>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <span style={{ color: "var(--text-para)" }}>الاسم</span>
          <span className="font-bold" style={{ color: "var(--text-heading)" }}>{form.fullName}</span>
          <span style={{ color: "var(--text-para)" }}>الجوال</span>
          <span className="font-bold" style={{ color: "var(--text-heading)" }}>{form.phone}</span>
          <span style={{ color: "var(--text-para)" }}>العنوان</span>
          <span className="font-bold" style={{ color: "var(--text-heading)" }}>
            {[form.street, form.district, form.city].filter(Boolean).join("، ")}
          </span>
        </div>
      </div>

      {/* تفاصيل البطاقات */}
      {results.map((r, idx) => (
        <div key={idx} className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
          <div className="px-4 sm:px-5 py-3 flex items-center gap-2" style={{ background: "linear-gradient(135deg, #f5f3ff, #eef2ff)", borderBottom: "1px solid var(--border)" }}>
            <Zap size={15} style={{ color: "#6c4dff" }} />
            <p className="font-black text-sm truncate" style={{ color: "var(--text-heading)" }}>{r.productTitle}</p>
          </div>
          <div className="p-4 sm:p-5 flex flex-col gap-3">
            {r.cardNumber && (
              <div className="flex justify-between items-center gap-2">
                <span className="text-sm shrink-0" style={{ color: "var(--text-para)" }}>رقم البطاقة</span>
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-black font-mono text-sm truncate" style={{ color: "var(--primary)" }}>{r.cardNumber}</span>
                  <button onClick={() => copyText(r.cardNumber!, `cn-${idx}`)} className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#f3f0ff" }}>
                    {copied === `cn-${idx}` ? <Check size={13} className="text-green-500" /> : <Copy size={13} style={{ color: "#6c4dff" }} />}
                  </button>
                </div>
              </div>
            )}
            {r.serial && (
              <div className="flex justify-between items-center gap-2">
                <span className="text-sm shrink-0" style={{ color: "var(--text-para)" }}>السيريال</span>
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-black font-mono text-sm truncate" style={{ color: "var(--primary)" }}>{r.serial}</span>
                  <button onClick={() => copyText(r.serial!, `sr-${idx}`)} className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#f3f0ff" }}>
                    {copied === `sr-${idx}` ? <Check size={13} className="text-green-500" /> : <Copy size={13} style={{ color: "#6c4dff" }} />}
                  </button>
                </div>
              </div>
            )}
            {r.pin && (
              <div className="flex justify-between items-center gap-2 p-3 rounded-xl" style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)", border: "1px solid #bbf7d0" }}>
                <span className="text-sm font-bold shrink-0" style={{ color: "#166534" }}>الـ PIN</span>
                <div className="flex items-center gap-2">
                  <span className="font-black font-mono text-lg sm:text-xl" style={{ color: "#16a34a" }}>{r.pin}</span>
                  <button onClick={() => copyText(r.pin!, `pin-${idx}`)} className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#bbf7d0" }}>
                    {copied === `pin-${idx}` ? <Check size={13} className="text-green-600" /> : <Copy size={13} className="text-green-600" />}
                  </button>
                </div>
              </div>
            )}
            <div className="flex justify-between items-center pt-2" style={{ borderTop: "1px solid var(--border)" }}>
              <span className="text-sm" style={{ color: "var(--text-para)" }}>المبلغ المدفوع</span>
              <span className="font-black flex items-center gap-1" style={{ color: "var(--primary)" }}>
                {r.total.toFixed(2)}
                <img src="/money-icon.webp" alt="ريال" style={{ width: 20, height: 20, objectFit: "contain" }} />
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* أزرار */}
      <div className="flex flex-col sm:flex-row gap-3 no-print">
        <button
          onClick={printReceipt}
          className="flex-1 flex items-center justify-center gap-2 font-black py-4 rounded-2xl border-2 transition-all hover:opacity-80"
          style={{ borderColor: "var(--primary)", color: "var(--primary)", background: "#f5f3ff" }}
        >
          <Printer size={18} />
          طباعة الرسيت
        </button>
        <button onClick={() => router.push("/")} className="btn-gradient flex-1 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2">
          العودة للرئيسية
        </button>
      </div>
    </div>
  );
}
