"use client";

import { useEffect, useState } from "react";
import { Search, CheckCircle, Clock, XCircle, Printer, Eye } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

interface Order {
  _id: string;
  user?: { name: string; email: string };
  product?: { title: string };
  price: number; status: string; createdAt: string;
  invoice?: { invoiceNumber: string };
}

const SM: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  completed: { label: "مكتمل", color: "#10b981", bg: "rgba(16,185,129,0.1)",  icon: <CheckCircle size={12} /> },
  pending:   { label: "معلق",  color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: <Clock size={12} /> },
  cancelled: { label: "ملغي", color: "#ef4444", bg: "rgba(239,68,68,0.1)",  icon: <XCircle size={12} /> },
};

export default function OrdersPage() {
  const [orders, setOrders]       = useState<Order[]>([]);
  const [filtered, setFiltered]   = useState<Order[]>([]);
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatus] = useState("all");
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState<Order | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    fetch(`${API}/api/orders`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => { const a = Array.isArray(d) ? d : []; setOrders(a); setFiltered(a); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let r = orders;
    if (statusFilter !== "all") r = r.filter(o => o.status === statusFilter);
    if (search) r = r.filter(o =>
      o.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      o.product?.title?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(r);
  }, [search, statusFilter, orders]);

  const printOrder = (o: Order) => {
    const win = window.open("", "_blank");
    if (!win) return;
    const s = SM[o.status] || SM.completed;
    win.document.write(`<html dir="rtl"><head><title>طلب</title>
    <style>body{font-family:Tajawal,Arial,sans-serif;padding:32px;direction:rtl;color:#111}
    h1{color:#6c4dff;font-size:20px;margin-bottom:4px}.sub{color:#888;font-size:12px;margin-bottom:24px}
    table{width:100%;border-collapse:collapse}th{background:#f8f9ff;padding:9px 12px;text-align:right;font-size:12px;color:#555;border:1px solid #e6e8f5}
    td{padding:9px 12px;border:1px solid #e6e8f5;font-size:13px}.total{font-size:16px;font-weight:800;color:#6c4dff}
    .badge{display:inline-block;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600;background:#d1fae5;color:#065f46}
    @media print{body{padding:16px}}</style></head><body>
    <h1>🎁 كارد زون — تفاصيل الطلب</h1>
    <div class="sub">رقم الطلب: ${o._id}</div>
    <table>
      <tr><th>المستخدم</th><td>${o.user?.name || "—"}</td></tr>
      <tr><th>البريد</th><td>${o.user?.email || "—"}</td></tr>
      <tr><th>المنتج</th><td>${o.product?.title || "—"}</td></tr>
      <tr><th>المبلغ</th><td class="total">${o.price?.toFixed(2)} ر.س</td></tr>
      <tr><th>الحالة</th><td><span class="badge">${s.label}</span></td></tr>
      <tr><th>التاريخ</th><td>${new Date(o.createdAt).toLocaleString("ar-SA")}</td></tr>
      ${o.invoice ? `<tr><th>رقم الفاتورة</th><td>${o.invoice.invoiceNumber}</td></tr>` : ""}
    </table>
    <script>window.onload=()=>{window.print()}<\/script></body></html>`);
    win.document.close();
  };

  const totalRevenue = orders.filter(o => o.status === "completed").reduce((s, o) => s + o.price, 0);

  const filterTabs = [
    { key: "all",       label: "الكل",    value: orders.length,                                         color: "#6c4dff" },
    { key: "completed", label: "مكتمل",   value: orders.filter(o => o.status === "completed").length,   color: "#10b981" },
    { key: "pending",   label: "معلق",    value: orders.filter(o => o.status === "pending").length,     color: "#f59e0b" },
    { key: "cancelled", label: "ملغي",    value: orders.filter(o => o.status === "cancelled").length,   color: "#ef4444" },
  ];

  return (
    <>
      <style>{`
        .ord-filters { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
        .ord-filter-btn {
          padding: 7px 14px; border-radius: 10px; border: 2px solid #e6e8f5;
          background: #fff; cursor: pointer; font-size: 13px; font-weight: 600;
          font-family: Tajawal, sans-serif; color: #6b7280; transition: all 0.18s; white-space: nowrap;
        }
        .ord-filter-btn.active { border-color: var(--fc); color: var(--fc); background: color-mix(in srgb, var(--fc) 8%, white); }
        .ord-filter-btn:hover  { border-color: var(--fc); color: var(--fc); }

        .ord-wrap { background: #fff; border: 1px solid #e6e8f5; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(108,77,255,0.05); }
        .ord-toolbar { padding: 14px 16px; border-bottom: 1px solid #e6e8f5; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .ord-search-wrap { position: relative; flex: 1; min-width: 180px; }
        .ord-search { width: 100%; background: #f8f9ff; border: 1.5px solid #e6e8f5; border-radius: 10px; padding: 9px 36px 9px 12px; font-size: 13px; font-family: Tajawal, sans-serif; color: #111827; outline: none; box-sizing: border-box; }
        .ord-search:focus { border-color: #6c4dff; }
        .ord-search-icon { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: #9ca3af; pointer-events: none; }

        /* Desktop table */
        .ord-table-scroll { overflow-x: auto; }
        .ord-table { width: 100%; border-collapse: collapse; min-width: 580px; }
        .ord-table th { background: #f8f9ff; color: #6b7280; font-size: 12px; font-weight: 700; padding: 10px 14px; text-align: right; border-bottom: 1px solid #e6e8f5; white-space: nowrap; }
        .ord-table td { padding: 12px 14px; border-bottom: 1px solid #f3f4f6; color: #374151; font-size: 13px; vertical-align: middle; }
        .ord-table tr:last-child td { border-bottom: none; }
        .ord-table tr:hover td { background: #fafbff; }

        /* Mobile cards */
        .ord-cards { display: none; }
        .ord-card { padding: 14px 16px; border-bottom: 1px solid #f3f4f6; }
        .ord-card:last-child { border-bottom: none; }
        .ord-card-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .ord-card-meta { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; align-items: center; }

        @media (max-width: 640px) {
          .ord-table-scroll { display: none; }
          .ord-cards { display: block; }
        }

        .badge { display: inline-flex; align-items: center; gap: 3px; padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; white-space: nowrap; }
        .icon-btn { background: none; border: 1px solid #e6e8f5; border-radius: 8px; padding: 6px 8px; cursor: pointer; color: #6b7280; transition: all 0.18s; display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-family: Tajawal, sans-serif; }
        .icon-btn:hover { background: #f3f0ff; border-color: #6c4dff; color: #6c4dff; }

        /* Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 16px; }
        .modal { background: #fff; border-radius: 18px; padding: 24px; width: 100%; max-width: 460px; box-shadow: 0 20px 60px rgba(0,0,0,0.15); max-height: 90vh; overflow-y: auto; }
        .modal-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; padding: 9px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; }
        .modal-row:last-child { border-bottom: none; }
      `}</style>

      <div style={{ marginBottom: 16 }}>
        <h2 style={{ color: "#111827", fontSize: 18, fontWeight: 800, margin: "0 0 3px" }}>إدارة الطلبات</h2>
        <p style={{ color: "#9ca3af", fontSize: 13, margin: 0 }}>
          {orders.length} طلب — إيرادات مكتملة: <strong style={{ color: "#10b981" }}>{totalRevenue.toFixed(2)} ر.س</strong>
        </p>
      </div>

      <div className="ord-filters">
        {filterTabs.map(t => (
          <button key={t.key} className={`ord-filter-btn ${statusFilter === t.key ? "active" : ""}`}
            style={{ "--fc": t.color } as React.CSSProperties}
            onClick={() => setStatus(t.key)}>
            {t.label} <span style={{ color: t.color, fontWeight: 800 }}>{t.value}</span>
          </button>
        ))}
      </div>

      <div className="ord-wrap">
        <div className="ord-toolbar">
          <div className="ord-search-wrap">
            <Search size={15} className="ord-search-icon" />
            <input className="ord-search" placeholder="ابحث بالاسم أو المنتج..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <span style={{ color: "#9ca3af", fontSize: 12, flexShrink: 0 }}>{filtered.length} نتيجة</span>
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>جاري التحميل...</div>
        ) : (
          <>
            {/* Desktop */}
            <div className="ord-table-scroll">
              <table className="ord-table">
                <thead>
                  <tr><th>#</th><th>المستخدم</th><th>المنتج</th><th>المبلغ</th><th>الحالة</th><th>التاريخ</th><th>إجراءات</th></tr>
                </thead>
                <tbody>
                  {filtered.map((o, i) => {
                    const s = SM[o.status] || { label: o.status, color: "#9ca3af", bg: "#f3f4f6", icon: null };
                    return (
                      <tr key={o._id}>
                        <td style={{ color: "#9ca3af", fontSize: 12 }}>{i + 1}</td>
                        <td>
                          <div style={{ fontWeight: 600, color: "#111827" }}>{o.user?.name || "—"}</div>
                          <div style={{ color: "#9ca3af", fontSize: 11 }}>{o.user?.email}</div>
                        </td>
                        <td style={{ maxWidth: 160 }}>
                          <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.product?.title || "—"}</div>
                        </td>
                        <td style={{ fontWeight: 700 }}>{o.price?.toFixed(2)} ر.س</td>
                        <td><span className="badge" style={{ background: s.bg, color: s.color }}>{s.icon} {s.label}</span></td>
                        <td style={{ color: "#6b7280", fontSize: 12 }}>{new Date(o.createdAt).toLocaleDateString("ar-SA")}</td>
                        <td>
                          <div style={{ display: "flex", gap: 5 }}>
                            <button className="icon-btn" onClick={() => setSelected(o)}><Eye size={13} /></button>
                            <button className="icon-btn" onClick={() => printOrder(o)}><Printer size={13} /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filtered.length === 0 && <tr><td colSpan={7} style={{ textAlign: "center", padding: 32, color: "#9ca3af" }}>لا توجد نتائج</td></tr>}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="ord-cards">
              {filtered.map(o => {
                const s = SM[o.status] || { label: o.status, color: "#9ca3af", bg: "#f3f4f6", icon: null };
                return (
                  <div key={o._id} className="ord-card">
                    <div className="ord-card-row">
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 700, color: "#111827", fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.user?.name || "—"}</div>
                        <div style={{ color: "#9ca3af", fontSize: 11, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.product?.title || "—"}</div>
                      </div>
                      <div style={{ textAlign: "left", flexShrink: 0 }}>
                        <div style={{ fontWeight: 800, color: "#111827", fontSize: 15 }}>{o.price?.toFixed(2)} ر.س</div>
                      </div>
                    </div>
                    <div className="ord-card-meta">
                      <span className="badge" style={{ background: s.bg, color: s.color }}>{s.icon} {s.label}</span>
                      <span style={{ color: "#9ca3af", fontSize: 11 }}>{new Date(o.createdAt).toLocaleDateString("ar-SA")}</span>
                      <button className="icon-btn" onClick={() => setSelected(o)}><Eye size={13} /></button>
                      <button className="icon-btn" onClick={() => printOrder(o)}><Printer size={13} /></button>
                    </div>
                  </div>
                );
              })}
              {filtered.length === 0 && <div style={{ padding: 32, textAlign: "center", color: "#9ca3af" }}>لا توجد نتائج</div>}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <h3 style={{ color: "#111827", fontSize: 15, fontWeight: 800, margin: 0 }}>تفاصيل الطلب</h3>
              <div style={{ display: "flex", gap: 7 }}>
                <button className="icon-btn" onClick={() => printOrder(selected)}><Printer size={14} /> طباعة</button>
                <button className="icon-btn" onClick={() => setSelected(null)} style={{ color: "#ef4444", borderColor: "#fca5a5" }}>✕</button>
              </div>
            </div>
            {[
              ["رقم الطلب", selected._id.slice(-10) + "..."],
              ["المستخدم", selected.user?.name || "—"],
              ["البريد", selected.user?.email || "—"],
              ["المنتج", selected.product?.title || "—"],
              ["المبلغ", `${selected.price?.toFixed(2)} ر.س`],
              ["الحالة", SM[selected.status]?.label || selected.status],
              ["التاريخ", new Date(selected.createdAt).toLocaleString("ar-SA")],
              ...(selected.invoice ? [["رقم الفاتورة", selected.invoice.invoiceNumber]] : []),
            ].map(([k, v]) => (
              <div key={k} className="modal-row">
                <span style={{ color: "#6b7280", fontWeight: 600, flexShrink: 0 }}>{k}</span>
                <span style={{ color: "#111827", fontWeight: 500, textAlign: "left", wordBreak: "break-all" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
