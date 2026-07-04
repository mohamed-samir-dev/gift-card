"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Mail, Lock, Eye, EyeOff } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "خطأ في تسجيل الدخول");
      if (data.user.role !== "admin") throw new Error("ليس لديك صلاحية الوصول للوحة التحكم");
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));
      router.push("/admin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .al-page {
          min-height: 100vh;
          background: #f8f9ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Tajawal, sans-serif;
          direction: rtl;
          position: relative;
          overflow: hidden;
        }
        .al-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          pointer-events: none;
        }
        .al-blob-1 { width: 500px; height: 500px; background: #c4b5fd; top: -150px; right: -150px; }
        .al-blob-2 { width: 400px; height: 400px; background: #bfdbfe; bottom: -100px; left: -100px; }
        .al-card {
          position: relative;
          z-index: 1;
          background: #fff;
          border: 1px solid #e6e8f5;
          border-radius: 24px;
          padding: 44px 40px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 20px 60px rgba(108,77,255,0.12);
        }
        .al-icon-wrap {
          width: 64px; height: 64px;
          background: linear-gradient(135deg, #6c4dff, #4f7bff);
          border-radius: 18px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 18px;
          box-shadow: 0 8px 24px rgba(108,77,255,0.3);
        }
        .al-title { color: #111827; font-size: 22px; font-weight: 800; text-align: center; margin: 0 0 6px; }
        .al-sub { color: #6b7280; font-size: 14px; text-align: center; margin: 0 0 28px; }
        .al-error {
          background: #fef2f2; border: 1px solid #fecaca;
          border-radius: 10px; padding: 10px 14px;
          color: #dc2626; font-size: 13px; text-align: center; margin-bottom: 20px;
        }
        .al-label { color: #374151; font-size: 13px; font-weight: 600; display: block; margin-bottom: 6px; }
        .al-field { position: relative; margin-bottom: 16px; }
        .al-icon { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #9ca3af; }
        .al-input {
          width: 100%; background: #f8f9ff;
          border: 1.5px solid #e6e8f5; border-radius: 10px;
          padding: 11px 40px 11px 14px;
          color: #111827; font-size: 14px; font-family: Tajawal, sans-serif;
          outline: none; box-sizing: border-box; transition: border-color 0.2s;
        }
        .al-input:focus { border-color: #6c4dff; box-shadow: 0 0 0 3px rgba(108,77,255,0.1); }
        .al-eye { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #9ca3af; padding: 0; }
        .al-btn {
          width: 100%; background: linear-gradient(135deg, #6c4dff, #4f7bff);
          border: none; border-radius: 10px; padding: 13px;
          color: #fff; font-size: 15px; font-weight: 700;
          cursor: pointer; font-family: Tajawal, sans-serif;
          box-shadow: 0 8px 24px rgba(108,77,255,0.3);
          transition: opacity 0.2s, transform 0.2s; margin-top: 8px;
        }
        .al-btn:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); }
        .al-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .al-back { text-align: center; margin-top: 18px; }
        .al-back a { color: #6c4dff; font-size: 13px; text-decoration: none; font-weight: 600; }
        .al-back a:hover { text-decoration: underline; }
      `}</style>
      <div className="al-page">
        <div className="al-blob al-blob-1" />
        <div className="al-blob al-blob-2" />
        <div className="al-card">
          <div className="al-icon-wrap"><Shield size={28} color="white" /></div>
          <h1 className="al-title">لوحة التحكم</h1>
          <p className="al-sub">تسجيل دخول المشرف</p>

          {error && <div className="al-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="al-field">
              <label className="al-label">البريد الإلكتروني</label>
              <div style={{ position: "relative" }}>
                <Mail size={16} className="al-icon" />
                <input className="al-input" type="email" placeholder="admin@cardzone.com" value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required style={{ direction: "ltr", textAlign: "right" }} />
              </div>
            </div>
            <div className="al-field">
              <label className="al-label">كلمة المرور</label>
              <div style={{ position: "relative" }}>
                <Lock size={16} className="al-icon" />
                <input className="al-input" type={showPass ? "text" : "password"} placeholder="••••••••"
                  value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required />
                <button type="button" className="al-eye" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" className="al-btn" disabled={loading}>
              {loading ? "جاري التحقق..." : "دخول للوحة التحكم"}
            </button>
          </form>
          <div className="al-back"><a href="/">← العودة للموقع</a></div>
        </div>
      </div>
    </>
  );
}
