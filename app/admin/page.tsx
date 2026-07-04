"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, ShoppingCart, FileText, DollarSign, ArrowLeft, CheckCircle, Clock, XCircle } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

interface Order { _id: string; user?: { name: string; email: string }; product?: { title: string }; price: number; status: string; createdAt: string; }
interface Invoice { _id: string; total: number; }
interface User { _id: string; name: string; isBlocked: boolean; createdAt: string; }

const statusIcon  = (s: string) => s === "completed" ? <CheckCircle size={13} color="#10b981" /> : s === "pending" ? <Clock size={13} color="#f59e0b" /> : <XCircle size={13} color="#ef4444" />;
const statusLabel = (s: string) => s === "completed" ? "مكتمل" : s === "pending" ? "معلق" : "ملغي";
const statusColor = (s: string) => s === "completed" ? "#10b981" : s === "pending" ? "#f59e0b" : "#ef4444";
const statusBg    = (s: string) => s === "completed" ? "rgba(16,185,129,0.1)" : s === "pending" ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)";

export default function AdminDashboard() {
  const [orders, setOrders]   = useState<Order[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [users, setUsers]     = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;
    const h = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch(`${API}/api/users`,    { headers: h }).then(r => r.json()),
      fetch(`${API}/api/orders`,   { headers: h }).then(r => r.json()),
      fetch(`${API}/api/invoices`, { headers: h }).then(r => r.json()),
    ]).then(([u, o, inv]) => {
      setUsers(Array.isArray(u) ? u : []);
      setOrders(Array.isArray(o) ? o : []);
      setInvoices(Array.isArray(inv) ? inv : []);
    }).finally(() => setLoading(false));
  }, []);

  const revenue     = invoices.reduce((s, i) => s + (i.total || 0), 0);
  const completed   = orders.filter(o => o.status === "completed").length;
  const pending     = orders.filter(o => o.status === "pending").length;
  const activeUsers = users.filter(u => !u.isBlocked).length;

  const stats = [
    { label: "المستخدمون",  value: users.length,           sub: `${activeUsers} نشط`,    icon: Users,       color: "#6c4dff", bg: "rgba(108,77,255,0.08)",  href: "/admin/users" },
    { label: "الطلبات",     value: orders.length,          sub: `${completed} مكتمل`,    icon: ShoppingCart, color: "#0ea5e9", bg: "rgba(14,165,233,0.08)",  href: "/admin/orders" },
    { label: "الفواتير",    value: invoices.length,        sub: "إجمالي الفواتير",        icon: FileText,    color: "#f59e0b", bg: "rgba(245,158,11,0.08)",  href: "/admin/invoices" },
    { label: "الإيرادات",   value: `${revenue.toFixed(0)}`, sub: "ريال سعودي",            icon: DollarSign,  color: "#10b981", bg: "rgba(16,185,129,0.08)",  href: "/admin/invoices" },
  ];

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "50vh" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 40, height: 40, border: "3px solid #e6e8f5", borderTopColor: "#6c4dff", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <p style={{ color: "#9ca3af", fontSize: 14 }}>جاري التحميل...</p>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        .dash-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px; margin-bottom: 20px;
        }
        @media (max-width: 900px)  { .dash-stats { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 480px)  { .dash-stats { grid-template-columns: 1fr 1fr; gap: 10px; } }

        .dash-stat-card {
          background: #fff; border: 1px solid #e6e8f5; border-radius: 14px;
          padding: 16px; display: flex; align-items: center; gap: 12px;
          box-shadow: 0 2px 8px rgba(108,77,255,0.05); text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s; min-width: 0;
        }
        .dash-stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(108,77,255,0.12); }
        .dash-stat-icon { border-radius: 11px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .dash-stat-label { color: #6b7280; font-size: 11px; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .dash-stat-value { color: #111827; font-size: 20px; font-weight: 800; line-height: 1; }
        .dash-stat-sub   { color: #9ca3af; font-size: 11px; margin-top: 2px; }

        .dash-mini-row {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 10px; margin-bottom: 20px;
        }
        @media (max-width: 600px) { .dash-mini-row { grid-template-columns: 1fr; gap: 8px; } }

        .dash-mini-card {
          border-radius: 12px; padding: 12px 14px;
          display: flex; align-items: center; justify-content: space-between;
        }

        .dash-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
        }
        @media (max-width: 860px) { .dash-grid { grid-template-columns: 1fr; } }

        .dash-card { background: #fff; border: 1px solid #e6e8f5; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 8px rgba(108,77,255,0.05); }
        .dash-card-head { padding: 14px 18px; border-bottom: 1px solid #e6e8f5; display: flex; align-items: center; justify-content: space-between; }
        .dash-card-title { color: #111827; font-size: 14px; font-weight: 700; }
        .dash-card-link  { color: #6c4dff; font-size: 12px; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 3px; }
        .dash-card-link:hover { text-decoration: underline; }
        .dash-row { padding: 11px 18px; border-bottom: 1px solid #f3f4f6; display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .dash-row:last-child { border-bottom: none; }
        .dash-badge { display: inline-flex; align-items: center; gap: 3px; padding: 2px 8px; border-radius: 20px; font-size: 11px; font-weight: 600; white-space: nowrap; }
        .dash-row-name { color: #111827; font-size: 13px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 120px; }
        .dash-row-sub  { color: #9ca3af; font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 120px; }
      `}</style>

      <div style={{ marginBottom: 20 }}>
        <h2 style={{ color: "#111827", fontSize: 18, fontWeight: 800, margin: "0 0 3px" }}>مرحباً بك 👋</h2>
        <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>نظرة عامة على نشاط المتجر</p>
      </div>

      {/* Stats */}
      <div className="dash-stats">
        {stats.map(({ label, value, sub, icon: Icon, color, bg, href }) => (
          <Link key={label} href={href} className="dash-stat-card">
            <div className="dash-stat-icon" style={{ width: 44, height: 44, background: bg }}>
              <Icon size={20} color={color} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="dash-stat-label">{label}</div>
              <div className="dash-stat-value">{value}</div>
              <div className="dash-stat-sub">{sub}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mini stats */}
      <div className="dash-mini-row">
        {[
          { label: "طلبات مكتملة",       value: completed,                              color: "#10b981", bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.2)" },
          { label: "طلبات معلقة",         value: pending,                                color: "#f59e0b", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.2)" },
          { label: "مستخدمون محظورون",    value: users.filter(u => u.isBlocked).length,  color: "#ef4444", bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.2)" },
        ].map(({ label, value, color, bg, border }) => (
          <div key={label} className="dash-mini-card" style={{ background: bg, border: `1px solid ${border}` }}>
            <span style={{ color: "#374151", fontSize: 13, fontWeight: 600 }}>{label}</span>
            <span style={{ color, fontSize: 22, fontWeight: 800 }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Tables */}
      <div className="dash-grid">
        <div className="dash-card">
          <div className="dash-card-head">
            <span className="dash-card-title">آخر الطلبات</span>
            <Link href="/admin/orders" className="dash-card-link">عرض الكل <ArrowLeft size={12} /></Link>
          </div>
          {orders.slice(0, 6).map(o => (
            <div key={o._id} className="dash-row">
              <div style={{ minWidth: 0 }}>
                <div className="dash-row-name">{o.user?.name || "—"}</div>
                <div className="dash-row-sub">{o.product?.title || "—"}</div>
              </div>
              <div style={{ textAlign: "left", flexShrink: 0 }}>
                <div style={{ color: "#111827", fontSize: 13, fontWeight: 700 }}>{o.price?.toFixed(2)} ر.س</div>
                <span className="dash-badge" style={{ background: statusBg(o.status), color: statusColor(o.status) }}>
                  {statusIcon(o.status)} {statusLabel(o.status)}
                </span>
              </div>
            </div>
          ))}
          {orders.length === 0 && <div style={{ padding: 24, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>لا توجد طلبات</div>}
        </div>

        <div className="dash-card">
          <div className="dash-card-head">
            <span className="dash-card-title">آخر المستخدمين</span>
            <Link href="/admin/users" className="dash-card-link">عرض الكل <ArrowLeft size={12} /></Link>
          </div>
          {users.slice(0, 6).map(u => (
            <div key={u._id} className="dash-row">
              <div style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
                <div style={{ width: 30, height: 30, background: "linear-gradient(135deg,#6c4dff,#4f7bff)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 12, flexShrink: 0 }}>
                  {u.name.charAt(0)}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div className="dash-row-name">{u.name}</div>
                  <div className="dash-row-sub">{new Date(u.createdAt).toLocaleDateString("ar-SA")}</div>
                </div>
              </div>
              <span className="dash-badge" style={{ background: u.isBlocked ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)", color: u.isBlocked ? "#ef4444" : "#10b981", flexShrink: 0 }}>
                {u.isBlocked ? "محظور" : "نشط"}
              </span>
            </div>
          ))}
          {users.length === 0 && <div style={{ padding: 24, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>لا يوجد مستخدمون</div>}
        </div>
      </div>
    </>
  );
}
