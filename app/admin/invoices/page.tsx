"use client";

import { useEffect, useState } from "react";
import { Search, Printer, Eye, FileText, DollarSign, TrendingUp } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

interface Invoice {
  _id: string; invoiceNumber: string;
  subtotal: number; tax: number; total: number;
  paymentMethod: string; createdAt: string;
  order?: { _id: string; user?: { name: string; email: string }; product?: { title: string }; status: string; };
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filtered, setFiltered] = useState<Invoice[]>([]);
  const [search, setSearch]     = useState("");
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState<Invoice | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    fetch(`${API}/api/invoices`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => { const a = Array.isArray(d) ? d : []; setInvoices(a); setFiltered(a); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!search) { setFiltered(invoices); return; }
    setFiltered(invoices.filter(inv =>
      inv.invoiceNumber?.toLowerCase().includes(search.toLowerCase()) ||
      inv.order?.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      inv.order?.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      inv.order?.product?.title?.toLowerCase().includes(search.toLowerCase())
    ));
  }, [search, invoices]);

  const printInvoice = (inv: Invoice) => {
    const win = window.open("", "_blank");
    if (!win) return;
    const taxPct = inv.subtotal > 0 ? ((inv.tax / inv.subtotal) * 100).toFixed(0) : 0;
    win.document.write(`<html dir="rtl"><head><title>فاتورة ${inv.invoiceNumber}</title>
    <style>
      *{box-sizing:border-box;margin:0;padding:0}
      body{font-family:Tajawal,Arial,sans-serif;background:#fff;color:#111;direction:rtl}
      .page{max-width:680px;margin:0 auto;padding:36px}
      .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:32px;padding-bottom:20px;border-bottom:2px solid #e6e8f5}
      .logo{font-size:24px;font-weight:900;color:#6c4dff}.logo-sub{color:#9ca3af;font-size:12px;margin-top:3px}
      .inv-num{text-align:left}.inv-num-label{color:#9ca3af;font-size:11px}.inv-num-val{color:#6c4dff;font-size:18px;font-weight:800}
      .inv-date{color:#6b7280;font-size:12px;margin-top:3px}
      .sec{margin-bottom:24px}.sec-title{font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px}
      .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
      .info-box{background:#f8f9ff;border:1px solid #e6e8f5;border-radius:9px;padding:12px 14px}
      .info-box-label{color:#9ca3af;font-size:11px;margin-bottom:3px}.info-box-val{color:#111827;font-size:13px;font-weight:700}
      table{width:100%;border-collapse:collapse}
      th{background:#f8f9ff;padding:9px 12px;text-align:right;font-size:11px;color:#6b7280;font-weight:700;border-bottom:2px solid #e6e8f5}
      td{padding:10px 12px;border-bottom:1px solid #f3f4f6;font-size:13px;color:#374151}
      .totals{margin-top:18px;border:1px solid #e6e8f5;border-radius:10px;overflow:hidden}
      .t-row{display:flex;justify-content:space-between;padding:11px 14px;border-bottom:1px solid #f3f4f6;font-size:13px}
      .t-row:last-child{border-bottom:none;background:linear-gradient(135deg,rgba(108,77,255,.06),rgba(79,123,255,.04));font-size:15px;font-weight:800;color:#6c4dff}
      .footer{margin-top:36px;padding-top:18px;border-top:1px solid #e6e8f5;text-align:center;color:#9ca3af;font-size:11px}
      .badge{display:inline-block;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600;background:#d1fae5;color:#065f46}
      @media print{.page{padding:18px}}
    </style></head><body>
    <div class="page">
      <div class="header">
        <div><div class="logo">🎁 كارد زون</div><div class="logo-sub">منصة البطاقات الرقمية</div></div>
        <div class="inv-num">
          <div class="inv-num-label">رقم الفاتورة</div>
          <div class="inv-num-val">${inv.invoiceNumber}</div>
          <div class="inv-date">${new Date(inv.createdAt).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}</div>
        </div>
      </div>
      <div class="sec">
        <div class="sec-title">بيانات العميل والطلب</div>
        <div class="info-grid">
          <div class="info-box"><div class="info-box-label">اسم العميل</div><div class="info-box-val">${inv.order?.user?.name || "—"}</div></div>
          <div class="info-box"><div class="info-box-label">البريد الإلكتروني</div><div class="info-box-val" style="direction:ltr;text-align:right">${inv.order?.user?.email || "—"}</div></div>
          <div class="info-box"><div class="info-box-label">طريقة الدفع</div><div class="info-box-val">${inv.paymentMethod === "wallet" ? "المحفظة الإلكترونية" : inv.paymentMethod}</div></div>
          <div class="info-box"><div class="info-box-label">حالة الطلب</div><div class="info-box-val"><span class="badge">مكتمل</span></div></div>
        </div>
      </div>
      <div class="sec">
        <div class="sec-title">تفاصيل المنتج</div>
        <table><thead><tr><th>المنتج</th><th>الكمية</th><th>السعر</th></tr></thead>
        <tbody><tr><td>${inv.order?.product?.title || "بطاقة رقمية"}</td><td>1</td><td>${inv.subtotal?.toFixed(2)} ر.س</td></tr></tbody></table>
      </div>
      <div class="totals">
        <div class="t-row"><span>المجموع الفرعي</span><span>${inv.subtotal?.toFixed(2)} ر.س</span></div>
        <div class="t-row"><span>ضريبة القيمة المضافة (${taxPct}%)</span><span>${inv.tax?.toFixed(2)} ر.س</span></div>
        <div class="t-row"><span>الإجمالي</span><span>${inv.total?.toFixed(2)} ر.س</span></div>
      </div>
      <div class="footer"><p>شكراً لتعاملكم مع كارد زون</p><p style="margin-top:5px">support@cardzone.com | cardzone.com</p></div>
    </div>
    <script>window.onload=()=>{window.print()}<\/script></body></html>`);
    win.document.close();
  };

  const totalRevenue = invoices.reduce((s, i) => s + (i.total || 0), 0);
  const totalTax     = invoices.reduce((s, i) => s + (i.tax  || 0), 0);

  return (
    <>
      <style>{`
        .inv-summary { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 18px; }
        @media (max-width: 600px) { .inv-summary { grid-template-columns: 1fr; gap: 8px; } }
        .inv-sum-card { background: #fff; border: 1px solid #e6e8f5; border-radius: 13px; padding: 14px 16px; display: flex; align-items: center; gap: 11px; box-shadow: 0 2px 8px rgba(108,77,255,0.05); }

        .inv-wrap { background: #fff; border: 1px solid #e6e8f5; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(108,77,255,0.05); }
        .inv-toolbar { padding: 14px 16px; border-bottom: 1px solid #e6e8f5; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .inv-search-wrap { position: relative; flex: 1; min-width: 180px; }
        .inv-search { width: 100%; background: #f8f9ff; border: 1.5px solid #e6e8f5; border-radius: 10px; padding: 9px 36px 9px 12px; font-size: 13px; font-family: Tajawal, sans-serif; color: #111827; outline: none; box-sizing: border-box; }
        .inv-search:focus { border-color: #6c4dff; }
        .inv-search-icon { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: #9ca3af; pointer-events: none; }

        /* Desktop table */
        .inv-table-scroll { overflow-x: auto; }
        .inv-table { width: 100%; border-collapse: collapse; min-width: 700px; }
        .inv-table th { background: #f8f9ff; color: #6b7280; font-size: 12px; font-weight: 700; padding: 10px 14px; text-align: right; border-bottom: 1px solid #e6e8f5; white-space: nowrap; }
        .inv-table td { padding: 12px 14px; border-bottom: 1px solid #f3f4f6; color: #374151; font-size: 13px; vertical-align: middle; }
        .inv-table tr:last-child td { border-bottom: none; }
        .inv-table tr:hover td { background: #fafbff; }

        /* Mobile cards */
        .inv-cards { display: none; }
        .inv-card { padding: 14px 16px; border-bottom: 1px solid #f3f4f6; }
        .inv-card:last-child { border-bottom: none; }
        .inv-card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
        .inv-card-amounts { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; align-items: center; }

        @media (max-width: 640px) {
          .inv-table-scroll { display: none; }
          .inv-cards { display: block; }
        }

        .badge { display: inline-flex; align-items: center; gap: 3px; padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; white-space: nowrap; }
        .icon-btn { background: none; border: 1px solid #e6e8f5; border-radius: 8px; padding: 6px 8px; cursor: pointer; color: #6b7280; transition: all 0.18s; display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-family: Tajawal, sans-serif; }
        .icon-btn:hover { background: #f3f0ff; border-color: #6c4dff; color: #6c4dff; }
        .print-btn { background: linear-gradient(135deg,#6c4dff,#4f7bff); color: #fff; border: none; border-radius: 8px; padding: 6px 11px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-family: Tajawal, sans-serif; font-weight: 600; transition: opacity 0.18s; }
        .print-btn:hover { opacity: 0.88; }

        /* Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 16px; }
        .modal { background: #fff; border-radius: 18px; padding: 24px; width: 100%; max-width: 500px; box-shadow: 0 20px 60px rgba(0,0,0,0.15); max-height: 90vh; overflow-y: auto; }
        .modal-sec-title { color: #9ca3af; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; margin-bottom: 8px; margin-top: 16px; }
        .modal-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; }
        .modal-row:last-child { border-bottom: none; }
        .modal-total { background: linear-gradient(135deg,rgba(108,77,255,.06),rgba(79,123,255,.04)); border: 1px solid rgba(108,77,255,.15); border-radius: 11px; padding: 13px 15px; display: flex; justify-content: space-between; align-items: center; margin-top: 12px; }
      `}</style>

      <div style={{ marginBottom: 16 }}>
        <h2 style={{ color: "#111827", fontSize: 18, fontWeight: 800, margin: "0 0 3px" }}>إدارة الفواتير</h2>
        <p style={{ color: "#9ca3af", fontSize: 13, margin: 0 }}>{invoices.length} فاتورة</p>
      </div>

      {/* Summary */}
      <div className="inv-summary">
        {[
          { icon: FileText,   color: "#6c4dff", bg: "rgba(108,77,255,0.08)", label: "إجمالي الفواتير", value: invoices.length, unit: "" },
          { icon: DollarSign, color: "#10b981", bg: "rgba(16,185,129,0.08)", label: "إجمالي الإيرادات", value: totalRevenue.toFixed(2), unit: "ر.س" },
          { icon: TrendingUp, color: "#f59e0b", bg: "rgba(245,158,11,0.08)", label: "إجمالي الضرائب",  value: totalTax.toFixed(2), unit: "ر.س" },
        ].map(({ icon: Icon, color, bg, label, value, unit }) => (
          <div key={label} className="inv-sum-card">
            <div style={{ width: 42, height: 42, background: bg, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon size={19} color={color} />
            </div>
            <div>
              <div style={{ color: "#9ca3af", fontSize: 11 }}>{label}</div>
              <div style={{ color: "#111827", fontSize: 18, fontWeight: 800 }}>{value} <span style={{ fontSize: 12, color: "#9ca3af" }}>{unit}</span></div>
            </div>
          </div>
        ))}
      </div>

      <div className="inv-wrap">
        <div className="inv-toolbar">
          <div className="inv-search-wrap">
            <Search size={15} className="inv-search-icon" />
            <input className="inv-search" placeholder="ابحث برقم الفاتورة أو اسم العميل..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <span style={{ color: "#9ca3af", fontSize: 12, flexShrink: 0 }}>{filtered.length} نتيجة</span>
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>جاري التحميل...</div>
        ) : (
          <>
            {/* Desktop */}
            <div className="inv-table-scroll">
              <table className="inv-table">
                <thead>
                  <tr>
                    <th>رقم الفاتورة</th><th>العميل</th><th>المنتج</th>
                    <th>المجموع الفرعي</th><th>الضريبة</th><th>الإجمالي</th>
                    <th>الدفع</th><th>التاريخ</th><th>إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(inv => (
                    <tr key={inv._id}>
                      <td><span style={{ color: "#6c4dff", fontWeight: 700 }}>{inv.invoiceNumber}</span></td>
                      <td>
                        <div style={{ fontWeight: 600, color: "#111827" }}>{inv.order?.user?.name || "—"}</div>
                        <div style={{ color: "#9ca3af", fontSize: 11 }}>{inv.order?.user?.email}</div>
                      </td>
                      <td style={{ maxWidth: 150 }}>
                        <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{inv.order?.product?.title || "—"}</div>
                      </td>
                      <td>{inv.subtotal?.toFixed(2)} ر.س</td>
                      <td style={{ color: "#f59e0b" }}>{inv.tax?.toFixed(2)} ر.س</td>
                      <td style={{ fontWeight: 800, color: "#10b981" }}>{inv.total?.toFixed(2)} ر.س</td>
                      <td>
                        <span className="badge" style={{ background: "rgba(108,77,255,0.08)", color: "#6c4dff" }}>
                          {inv.paymentMethod === "wallet" ? "المحفظة" : inv.paymentMethod}
                        </span>
                      </td>
                      <td style={{ color: "#6b7280", fontSize: 12 }}>{new Date(inv.createdAt).toLocaleDateString("ar-SA")}</td>
                      <td>
                        <div style={{ display: "flex", gap: 5 }}>
                          <button className="icon-btn" onClick={() => setSelected(inv)}><Eye size={13} /></button>
                          <button className="print-btn" onClick={() => printInvoice(inv)}><Printer size={12} /> طباعة</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && <tr><td colSpan={9} style={{ textAlign: "center", padding: 32, color: "#9ca3af" }}>لا توجد فواتير</td></tr>}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="inv-cards">
              {filtered.map(inv => (
                <div key={inv._id} className="inv-card">
                  <div className="inv-card-top">
                    <div style={{ minWidth: 0 }}>
                      <div style={{ color: "#6c4dff", fontWeight: 700, fontSize: 13 }}>{inv.invoiceNumber}</div>
                      <div style={{ fontWeight: 600, color: "#111827", fontSize: 14, marginTop: 2 }}>{inv.order?.user?.name || "—"}</div>
                      <div style={{ color: "#9ca3af", fontSize: 11, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{inv.order?.product?.title || "—"}</div>
                    </div>
                    <div style={{ textAlign: "left", flexShrink: 0 }}>
                      <div style={{ fontWeight: 800, color: "#10b981", fontSize: 16 }}>{inv.total?.toFixed(2)} ر.س</div>
                      <div style={{ color: "#9ca3af", fontSize: 11 }}>{new Date(inv.createdAt).toLocaleDateString("ar-SA")}</div>
                    </div>
                  </div>
                  <div className="inv-card-amounts">
                    <span style={{ color: "#6b7280", fontSize: 12 }}>فرعي: {inv.subtotal?.toFixed(2)}</span>
                    <span style={{ color: "#f59e0b", fontSize: 12 }}>ضريبة: {inv.tax?.toFixed(2)}</span>
                    <button className="icon-btn" onClick={() => setSelected(inv)}><Eye size={13} /></button>
                    <button className="print-btn" onClick={() => printInvoice(inv)}><Printer size={12} /> طباعة</button>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && <div style={{ padding: 32, textAlign: "center", color: "#9ca3af" }}>لا توجد فواتير</div>}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <h3 style={{ color: "#111827", fontSize: 15, fontWeight: 800, margin: "0 0 2px" }}>فاتورة</h3>
                <span style={{ color: "#6c4dff", fontSize: 13, fontWeight: 700 }}>{selected.invoiceNumber}</span>
              </div>
              <div style={{ display: "flex", gap: 7 }}>
                <button className="print-btn" onClick={() => printInvoice(selected)}><Printer size={13} /> طباعة</button>
                <button className="icon-btn" onClick={() => setSelected(null)} style={{ color: "#ef4444", borderColor: "#fca5a5" }}>✕</button>
              </div>
            </div>

            <div className="modal-sec-title">بيانات العميل</div>
            <div className="modal-row"><span style={{ color: "#6b7280", fontWeight: 600 }}>الاسم</span><span style={{ fontWeight: 600 }}>{selected.order?.user?.name || "—"}</span></div>
            <div className="modal-row"><span style={{ color: "#6b7280", fontWeight: 600 }}>البريد</span><span style={{ fontWeight: 600, direction: "ltr", wordBreak: "break-all" }}>{selected.order?.user?.email || "—"}</span></div>

            <div className="modal-sec-title">تفاصيل الطلب</div>
            <div className="modal-row"><span style={{ color: "#6b7280", fontWeight: 600 }}>المنتج</span><span style={{ fontWeight: 600 }}>{selected.order?.product?.title || "—"}</span></div>
            <div className="modal-row"><span style={{ color: "#6b7280", fontWeight: 600 }}>طريقة الدفع</span><span style={{ fontWeight: 600 }}>{selected.paymentMethod === "wallet" ? "المحفظة الإلكترونية" : selected.paymentMethod}</span></div>
            <div className="modal-row"><span style={{ color: "#6b7280", fontWeight: 600 }}>التاريخ</span><span style={{ fontWeight: 600 }}>{new Date(selected.createdAt).toLocaleString("ar-SA")}</span></div>

            <div className="modal-sec-title">ملخص المبالغ</div>
            <div className="modal-row"><span style={{ color: "#6b7280", fontWeight: 600 }}>المجموع الفرعي</span><span style={{ fontWeight: 600 }}>{selected.subtotal?.toFixed(2)} ر.س</span></div>
            <div className="modal-row"><span style={{ color: "#6b7280", fontWeight: 600 }}>الضريبة</span><span style={{ fontWeight: 600, color: "#f59e0b" }}>{selected.tax?.toFixed(2)} ر.س</span></div>

            <div className="modal-total">
              <span style={{ color: "#374151", fontWeight: 700, fontSize: 14 }}>الإجمالي</span>
              <span style={{ color: "#6c4dff", fontWeight: 800, fontSize: 20 }}>{selected.total?.toFixed(2)} ر.س</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
