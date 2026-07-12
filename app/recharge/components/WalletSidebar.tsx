"use client";

import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, Wallet2, TrendingDown, TrendingUp, Zap, AlertTriangle, History } from "lucide-react";
import { Wallet } from "../types";

const API = process.env.NEXT_PUBLIC_API_URL;

interface AuthUser { name: string; email: string; }

interface Transaction {
  _id: string;
  type: "deposit" | "purchase" | "refund" | "adjustment";
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  status: "pending" | "completed" | "failed";
  note?: string;
  createdAt: string;
  payment?: {
    gateway: string;
    transactionId?: string;
    invoiceId?: string;
    status: string;
    currency: string;
  };
  order?: {
    orderNumber: string;
  };
}

interface Props {
  user: AuthUser;
  wallet: Wallet | null;
  token: string | null;
}

const TYPE_LABEL: Record<string, { label: string; icon: string }> = {
  deposit:    { label: "شحن",      icon: "⬆️" },
  purchase:   { label: "شراء",     icon: "🛒" },
  refund:     { label: "استرداد",  icon: "↩️" },
  adjustment: { label: "تعديل",   icon: "⚙️" },
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  completed: { label: "ناجحة",  color: "#16a34a", bg: "#f0fdf4" },
  failed:    { label: "فاشلة",  color: "#dc2626", bg: "#fff0f0" },
  pending:   { label: "معلقة",  color: "#d97706", bg: "#fffbeb" },
};

const GATEWAY_LABEL: Record<string, string> = {
  moyasar:  "مويسر",
  paypal:   "باي بال",
  stripe:   "سترايب",
  manual:   "يدوي",
  wallet:   "محفظة",
};

export default function WalletSidebar({ user, wallet, token }: Props) {
  const [hidden, setHidden] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [fetching, setFetching] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [from, setFrom] = useState("");
  const [to, setTo]     = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  // جلب المعاملات لما يفتح الـ modal
  useEffect(() => {
    if (!showModal || !token) return;
    setFetching(true);
    fetch(`${API}/api/wallets/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.ok ? r.json() : [])
      .then(data => setTransactions(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setFetching(false));
  }, [showModal, token]);

  const filtered = transactions.filter(t => {
    const date = t.createdAt.split("T")[0];
    if (from && date < from) return false;
    if (to   && date > to)   return false;
    return true;
  });

  function handlePrint() {
    const content = printRef.current;
    if (!content) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html dir="rtl"><head><meta charset="utf-8"/>
      <title>سجل المعاملات</title>
      <style>
        body{font-family:Tajawal,Arial,sans-serif;padding:2rem;direction:rtl}
        h2{margin-bottom:4px}p{color:#666;margin:0 0 1.5rem}
        table{width:100%;border-collapse:collapse}
        th,td{border:1px solid #ddd;padding:8px 12px;text-align:right}
        th{background:#f3f0ff;font-weight:800}
        @media print{button{display:none}}
      </style></head><body>
      ${content.innerHTML}
      <br/><button onclick="window.print()">🖨️ طباعة</button>
      </body></html>
    `);
    win.document.close();
  }

  return (
    <div className="ws-wrap">

      {/* Wallet card */}
      <div className="ws-card">
        <span className="ws-blob ws-blob-1" />
        <span className="ws-blob ws-blob-2" />
        <div className="ws-inner">
          <div className="ws-title-row">
            <p className="ws-title">رصيدك</p>
            <button className="ws-eye-btn" onClick={() => setHidden(h => !h)} aria-label="إخفاء الرصيد">
              {hidden ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          <div className="ws-balance-row">
            <div className="ws-balance">
              {hidden ? "••••" : (wallet ? wallet.balance.toLocaleString("ar-SA") : "٠")}
            </div>
            <img src="/money-icon.webp" alt="ريال" width={24} height={24}
              style={{ objectFit: "contain" }} />
          </div>
        </div>
      </div>

      {/* Info cards */}
      <div className="ws-info-strip">

        <div className="ws-info-item">
          <div className="ws-info-icon-wrap" style={{background:"#eff6ff"}}>
            <Wallet2 size={16} color="#2563eb" />
          </div>
          <div className="ws-info-body">
            <span className="ws-info-label">رصيد المحفظة</span>
            <span className="ws-info-val" style={{color:"#2563eb"}}>
              {hidden ? "••••" : (wallet ? wallet.balance.toLocaleString("ar-SA") : "٠")} ريال
            </span>
            <span className="ws-info-sub">
              آخر تحديث · {wallet
                ? new Date(wallet.updatedAt ?? wallet.createdAt ?? Date.now()).toLocaleTimeString("ar-SA", {hour:"2-digit",minute:"2-digit"})
                : "—"}
            </span>
          </div>
        </div>

        <div className="ws-info-divider" />

        <div className="ws-info-item">
          <div className="ws-info-icon-wrap" style={{background:"#f0fdf4"}}>
            <TrendingDown size={16} color="#16a34a" />
          </div>
          <div className="ws-info-body">
            <span className="ws-info-label">الحد الأدنى</span>
            <span className="ws-info-val" style={{color:"#16a34a"}}>10 ريال</span>
            <span className="ws-info-sub">أقل مبلغ للشحن</span>
          </div>
        </div>

        <div className="ws-info-divider" />

        <div className="ws-info-item">
          <div className="ws-info-icon-wrap" style={{background:"#fdf4ff"}}>
            <TrendingUp size={16} color="#9333ea" />
          </div>
          <div className="ws-info-body">
            <span className="ws-info-label">الحد الأقصى</span>
            <span className="ws-info-val" style={{color:"#9333ea"}}>5,000 ريال</span>
            <span className="ws-info-sub">أقصى مبلغ للعملية</span>
          </div>
        </div>

      </div>

      {/* وقت الإضافة — inline message */}
      <div className="ws-instant-msg">
        <div className="ws-instant-dot" />
        <Zap size={13} className="ws-instant-zap" />
        <span>وقت الإضافة</span>
        <strong>فوري</strong>
        <span className="ws-instant-sep">·</span>
        <span className="ws-instant-desc">بعد نجاح عملية الدفع</span>
      </div>

      {/* تنبيه */}
      <div className="ws-notice">
        <AlertTriangle size={15} style={{flexShrink:0, marginTop:1}} />
        <p className="ws-notice-text">
          لا يمكن استرجاع الرصيد إلى البطاقة بعد إضافته إلى المحفظة.
        </p>
      </div>

      {/* زرار سجل المعاملات */}
      <button className="ws-history-btn" onClick={() => setShowModal(true)}>
        <History size={15} />
        سجل المعاملات
      </button>

      {/* Modal */}
      {showModal && (
        <div className="ws-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="ws-modal" onClick={e => e.stopPropagation()}>
            <div className="ws-modal-head">
              <span>📋 سجل المعاملات</span>
              <button className="ws-modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            {/* فلتر التاريخ */}
            <div className="ws-date-row">
              <label>
                من
                <input type="date" value={from} max={to || today}
                  onChange={e => setFrom(e.target.value)} />
              </label>
              <label>
                إلى
                <input type="date" value={to} min={from} max={today}
                  onChange={e => setTo(e.target.value)} />
              </label>
              <button className="ws-print-btn" onClick={handlePrint} disabled={filtered.length === 0}>
                🖨️ طباعة
              </button>
            </div>

            {/* محتوى الطباعة */}
            <div ref={printRef}>
              <h2 style={{margin:"0 0 4px",fontSize:"1rem"}}>سجل معاملات: {user.name}</h2>
              <p style={{fontSize:"0.78rem",color:"#888",margin:"0 0 12px"}}>
                {from || "البداية"} — {to || "اليوم"}
              </p>

              {fetching ? (
                <p className="ws-no-data">جاري التحميل...</p>
              ) : filtered.length === 0 ? (
                <p className="ws-no-data">لا توجد معاملات في هذه الفترة</p>
              ) : (
                <div className="ws-table-wrap">
                <table className="ws-table">
                  <thead>
                    <tr>
                      <th>التاريخ</th>
                      <th>النوع</th>
                      <th>المبلغ</th>
                      <th>قبل</th>
                      <th>بعد</th>
                      <th>طريقة الدفع</th>
                      <th>رقم العملية</th>
                      <th>الحالة</th>
                      <th>بيان</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(t => {
                      const typeInfo = TYPE_LABEL[t.type] ?? { label: t.type, icon: "•" };
                      const statusInfo = STATUS_CONFIG[t.status] ?? STATUS_CONFIG.pending;
                      const gateway = t.payment?.gateway
                        ? (GATEWAY_LABEL[t.payment.gateway] ?? t.payment.gateway)
                        : t.order ? "محفظة" : "—";
                      const txRef = t.payment?.transactionId || t.payment?.invoiceId
                        || t.order?.orderNumber || "—";
                      return (
                        <tr key={t._id}>
                          <td style={{whiteSpace:"nowrap"}}>
                            {new Date(t.createdAt).toLocaleDateString("ar-SA")}
                            <br/>
                            <span style={{fontSize:"0.7rem",color:"#999"}}>
                              {new Date(t.createdAt).toLocaleTimeString("ar-SA", {hour:"2-digit",minute:"2-digit"})}
                            </span>
                          </td>
                          <td>
                            <span style={{display:"flex",alignItems:"center",gap:4}}>
                              <span>{typeInfo.icon}</span>
                              <span>{typeInfo.label}</span>
                            </span>
                          </td>
                          <td style={{color: t.amount > 0 ? "#16a34a" : "#dc2626", fontWeight:800, whiteSpace:"nowrap"}}>
                            {t.amount > 0 ? "+" : ""}{t.amount.toLocaleString("ar-SA")}
                          </td>
                          <td style={{color:"#666",whiteSpace:"nowrap"}}>{t.balanceBefore?.toLocaleString("ar-SA") ?? "—"}</td>
                          <td style={{fontWeight:700,whiteSpace:"nowrap"}}>{t.balanceAfter?.toLocaleString("ar-SA") ?? "—"}</td>
                          <td>{gateway}</td>
                          <td style={{fontSize:"0.72rem",color:"#555",maxWidth:120,wordBreak:"break-all"}}>
                            {txRef}
                          </td>
                          <td>
                            <span style={{
                              display:"inline-block",
                              padding:"2px 10px",
                              borderRadius:999,
                              fontSize:"0.72rem",
                              fontWeight:800,
                              color: statusInfo.color,
                              background: statusInfo.bg,
                              border: `1px solid ${statusInfo.color}33`,
                              whiteSpace:"nowrap"
                            }}>
                              {statusInfo.label}
                            </span>
                          </td>
                          <td style={{color:"#777",fontSize:"0.8rem"}}>{t.note || "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
