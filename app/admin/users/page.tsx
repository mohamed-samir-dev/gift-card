"use client";

import { useEffect, useState } from "react";
import { Search, UserCheck, UserX, Trash2, Users, ShieldCheck, ShieldOff } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

interface User {
  _id: string; name: string; email: string; phone?: string;
  role: string; isBlocked: boolean; isVerified: boolean;
  authProvider: string; createdAt: string; lastLogin?: string;
}

export default function UsersPage() {
  const [users, setUsers]       = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState<"all"|"active"|"blocked"|"admin">("all");
  const [loading, setLoading]   = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    fetch(`${API}/api/users`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { const a = Array.isArray(d) ? d : []; setUsers(a); setFiltered(a); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let r = users;
    if (filter === "active")  r = r.filter(u => !u.isBlocked && u.role !== "admin");
    if (filter === "blocked") r = r.filter(u => u.isBlocked);
    if (filter === "admin")   r = r.filter(u => u.role === "admin");
    if (search) r = r.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(r);
  }, [search, filter, users]);

  const toggleBlock = async (id: string, isBlocked: boolean) => {
    setActionId(id);
    const token = localStorage.getItem("adminToken");
    await fetch(`${API}/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ isBlocked: !isBlocked }),
    });
    setUsers(prev => prev.map(u => u._id === id ? { ...u, isBlocked: !isBlocked } : u));
    setActionId(null);
  };

  const deleteUser = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return;
    setActionId(id);
    const token = localStorage.getItem("adminToken");
    await fetch(`${API}/api/users/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    setUsers(prev => prev.filter(u => u._id !== id));
    setActionId(null);
  };

  const filterTabs = [
    { key: "all",     label: "الكل",    value: users.length,                                          color: "#6c4dff" },
    { key: "active",  label: "نشط",     value: users.filter(u => !u.isBlocked && u.role !== "admin").length, color: "#10b981" },
    { key: "blocked", label: "محظور",   value: users.filter(u => u.isBlocked).length,                 color: "#ef4444" },
    { key: "admin",   label: "مشرف",    value: users.filter(u => u.role === "admin").length,           color: "#f59e0b" },
  ];

  return (
    <>
      <style>{`
        .usr-filters { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
        .usr-filter-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 14px; border-radius: 10px;
          border: 2px solid #e6e8f5; background: #fff;
          cursor: pointer; font-size: 13px; font-weight: 600;
          font-family: Tajawal, sans-serif; color: #6b7280;
          transition: all 0.18s; white-space: nowrap;
        }
        .usr-filter-btn.active { border-color: var(--fc); color: var(--fc); background: color-mix(in srgb, var(--fc) 8%, white); }
        .usr-filter-btn:hover  { border-color: var(--fc); color: var(--fc); }

        .usr-wrap { background: #fff; border: 1px solid #e6e8f5; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(108,77,255,0.05); }
        .usr-toolbar { padding: 14px 16px; border-bottom: 1px solid #e6e8f5; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .usr-search-wrap { position: relative; flex: 1; min-width: 180px; }
        .usr-search {
          width: 100%; background: #f8f9ff;
          border: 1.5px solid #e6e8f5; border-radius: 10px;
          padding: 9px 36px 9px 12px; font-size: 13px;
          font-family: Tajawal, sans-serif; color: #111827;
          outline: none; box-sizing: border-box;
        }
        .usr-search:focus { border-color: #6c4dff; }
        .usr-search-icon { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: #9ca3af; pointer-events: none; }

        /* Desktop table */
        .usr-table-scroll { overflow-x: auto; }
        .usr-table { width: 100%; border-collapse: collapse; min-width: 640px; }
        .usr-table th { background: #f8f9ff; color: #6b7280; font-size: 12px; font-weight: 700; padding: 10px 14px; text-align: right; border-bottom: 1px solid #e6e8f5; white-space: nowrap; }
        .usr-table td { padding: 12px 14px; border-bottom: 1px solid #f3f4f6; color: #374151; font-size: 13px; vertical-align: middle; }
        .usr-table tr:last-child td { border-bottom: none; }
        .usr-table tr:hover td { background: #fafbff; }

        /* Mobile cards */
        .usr-cards { display: none; }
        .usr-card { padding: 14px 16px; border-bottom: 1px solid #f3f4f6; }
        .usr-card:last-child { border-bottom: none; }
        .usr-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; gap: 8px; }
        .usr-card-info { display: flex; align-items: center; gap: 10px; min-width: 0; }
        .usr-card-actions { display: flex; gap: 6px; flex-shrink: 0; }
        .usr-card-meta { display: flex; gap: 6px; flex-wrap: wrap; }

        @media (max-width: 640px) {
          .usr-table-scroll { display: none; }
          .usr-cards { display: block; }
        }

        .badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; white-space: nowrap; }
        .act-btn { display: inline-flex; align-items: center; gap: 4px; padding: 6px 10px; border-radius: 8px; border: none; cursor: pointer; font-size: 12px; font-family: Tajawal, sans-serif; font-weight: 600; transition: all 0.18s; }
        .act-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .act-icon { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 8px; border: 1px solid #e6e8f5; cursor: pointer; background: none; color: #6b7280; transition: all 0.18s; }
        .act-icon:hover { background: #fef2f2; border-color: #fca5a5; color: #ef4444; }
        .act-icon:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>

      <div style={{ marginBottom: 16 }}>
        <h2 style={{ color: "#111827", fontSize: 18, fontWeight: 800, margin: "0 0 3px" }}>إدارة المستخدمين</h2>
        <p style={{ color: "#9ca3af", fontSize: 13, margin: 0 }}>{users.length} مستخدم مسجل</p>
      </div>

      {/* Filter tabs */}
      <div className="usr-filters">
        {filterTabs.map(t => (
          <button key={t.key} className={`usr-filter-btn ${filter === t.key ? "active" : ""}`}
            style={{ "--fc": t.color } as React.CSSProperties}
            onClick={() => setFilter(t.key as typeof filter)}>
            <span>{t.label}</span>
            <span style={{ color: t.color, fontWeight: 800 }}>{t.value}</span>
          </button>
        ))}
      </div>

      <div className="usr-wrap">
        <div className="usr-toolbar">
          <div className="usr-search-wrap">
            <Search size={15} className="usr-search-icon" />
            <input className="usr-search" placeholder="ابحث بالاسم أو البريد..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <span style={{ color: "#9ca3af", fontSize: 12, flexShrink: 0 }}>{filtered.length} نتيجة</span>
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>جاري التحميل...</div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="usr-table-scroll">
              <table className="usr-table">
                <thead>
                  <tr>
                    <th>المستخدم</th>
                    <th>البريد الإلكتروني</th>
                    <th>الهاتف</th>
                    <th>الدور</th>
                    <th>آخر دخول</th>
                    <th>الحالة</th>
                    <th>إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(u => (
                    <tr key={u._id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                          <div style={{ width: 32, height: 32, background: u.role === "admin" ? "linear-gradient(135deg,#f59e0b,#f97316)" : "linear-gradient(135deg,#6c4dff,#4f7bff)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 12, flexShrink: 0 }}>
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, color: "#111827", fontSize: 13 }}>{u.name}</div>
                            <div style={{ color: "#9ca3af", fontSize: 11 }}>{new Date(u.createdAt).toLocaleDateString("ar-SA")}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ direction: "ltr", textAlign: "right", color: "#6b7280", fontSize: 12 }}>{u.email}</td>
                      <td style={{ color: "#6b7280" }}>{u.phone || "—"}</td>
                      <td>
                        <span className="badge" style={{ background: u.role === "admin" ? "rgba(245,158,11,0.1)" : "rgba(108,77,255,0.08)", color: u.role === "admin" ? "#f59e0b" : "#6c4dff" }}>
                          {u.role === "admin" ? <ShieldCheck size={11} /> : <Users size={11} />}
                          {u.role === "admin" ? "مشرف" : "عميل"}
                        </span>
                      </td>
                      <td style={{ color: "#9ca3af", fontSize: 12 }}>{u.lastLogin ? new Date(u.lastLogin).toLocaleDateString("ar-SA") : "لم يدخل"}</td>
                      <td>
                        <span className="badge" style={{ background: u.isBlocked ? "rgba(239,68,68,0.08)" : "rgba(16,185,129,0.08)", color: u.isBlocked ? "#ef4444" : "#10b981" }}>
                          {u.isBlocked ? <UserX size={11} /> : <UserCheck size={11} />}
                          {u.isBlocked ? "محظور" : "نشط"}
                        </span>
                      </td>
                      <td>
                        {u.role !== "admin" && (
                          <div style={{ display: "flex", gap: 6 }}>
                            <button className="act-btn" disabled={actionId === u._id}
                              onClick={() => toggleBlock(u._id, u.isBlocked)}
                              style={{ background: u.isBlocked ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", color: u.isBlocked ? "#10b981" : "#ef4444" }}>
                              {u.isBlocked ? <><ShieldOff size={12} /> رفع الحظر</> : <><ShieldCheck size={12} /> حظر</>}
                            </button>
                            <button className="act-icon" disabled={actionId === u._id} onClick={() => deleteUser(u._id)}>
                              <Trash2 size={13} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={7} style={{ textAlign: "center", padding: 32, color: "#9ca3af" }}>لا توجد نتائج</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="usr-cards">
              {filtered.map(u => (
                <div key={u._id} className="usr-card">
                  <div className="usr-card-top">
                    <div className="usr-card-info">
                      <div style={{ width: 36, height: 36, background: u.role === "admin" ? "linear-gradient(135deg,#f59e0b,#f97316)" : "linear-gradient(135deg,#6c4dff,#4f7bff)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>
                        {u.name.charAt(0)}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 700, color: "#111827", fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.name}</div>
                        <div style={{ color: "#9ca3af", fontSize: 11, direction: "ltr", textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</div>
                      </div>
                    </div>
                    {u.role !== "admin" && (
                      <div className="usr-card-actions">
                        <button className="act-btn" disabled={actionId === u._id}
                          onClick={() => toggleBlock(u._id, u.isBlocked)}
                          style={{ background: u.isBlocked ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", color: u.isBlocked ? "#10b981" : "#ef4444", padding: "6px 8px" }}>
                          {u.isBlocked ? <ShieldOff size={13} /> : <ShieldCheck size={13} />}
                        </button>
                        <button className="act-icon" disabled={actionId === u._id} onClick={() => deleteUser(u._id)}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="usr-card-meta">
                    <span className="badge" style={{ background: u.role === "admin" ? "rgba(245,158,11,0.1)" : "rgba(108,77,255,0.08)", color: u.role === "admin" ? "#f59e0b" : "#6c4dff" }}>
                      {u.role === "admin" ? "مشرف" : "عميل"}
                    </span>
                    <span className="badge" style={{ background: u.isBlocked ? "rgba(239,68,68,0.08)" : "rgba(16,185,129,0.08)", color: u.isBlocked ? "#ef4444" : "#10b981" }}>
                      {u.isBlocked ? "محظور" : "نشط"}
                    </span>
                    <span style={{ color: "#9ca3af", fontSize: 11 }}>{new Date(u.createdAt).toLocaleDateString("ar-SA")}</span>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && <div style={{ padding: 32, textAlign: "center", color: "#9ca3af" }}>لا توجد نتائج</div>}
            </div>
          </>
        )}
      </div>
    </>
  );
}
