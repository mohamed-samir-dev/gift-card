"use client";

import { useState, useRef, useEffect } from "react";
import { Wallet } from "../types";

const API = process.env.NEXT_PUBLIC_API_URL;

interface AuthUser { name: string; email: string; }

interface Transaction {
  _id: string;
  type: "deposit" | "purchase" | "refund" | "adjustment";
  amount: number;
  note?: string;
  createdAt: string;
}

interface Props {
  user: AuthUser;
  wallet: Wallet | null;
  token: string | null;
}

const TYPE_LABEL: Record<string, string> = {
  deposit:    "شحن",
  purchase:   "شراء",
  refund:     "استرداد",
  adjustment: "تعديل",
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
      .then(r => r.json())
      .then(setTransactions)
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
            <p className="ws-title">رصيد محفظتك</p>
            <button className="ws-eye-btn" onClick={() => setHidden(h => !h)} aria-label="إخفاء الرصيد">
              {hidden ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          <div className="ws-icon-ring">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="3" />
              <path d="M16 12h.01" />
              <path d="M2 10h20" />
            </svg>
          </div>

          <div className="ws-balance-row">
            <div className="ws-balance">
              {hidden ? "••••" : (wallet ? wallet.balance.toLocaleString("ar-SA") : "٠")}
            </div>
            <div className="ws-currency">
              <img src="/money-icon.webp" alt="ريال" width={30} height={30}
                style={{ objectFit: "contain" }} />
            </div>
          </div>
        </div>
      </div>

      {/* زرار سجل المعاملات */}
      <button className="ws-history-btn" onClick={() => setShowModal(true)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8v4l3 3"/>
          <path d="M3.05 11a9 9 0 1 1 .5 4"/>
          <path d="M3 3v5h5"/>
        </svg>
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
                <table className="ws-table">
                  <thead>
                    <tr>
                      <th>التاريخ</th>
                      <th>النوع</th>
                      <th>المبلغ</th>
                      <th>البيان</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(t => (
                      <tr key={t._id}>
                        <td>{new Date(t.createdAt).toLocaleDateString("ar-SA")}</td>
                        <td>{TYPE_LABEL[t.type] ?? t.type}</td>
                        <td style={{color: t.amount > 0 ? "#16a34a" : "#dc2626", fontWeight:800}}>
                          {t.amount > 0 ? "+" : ""}{t.amount.toLocaleString("ar-SA")}
                        </td>
                        <td>{t.note || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
