"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Mail, Lock, User, Phone, Sparkles, LogIn, UserPlus } from "lucide-react";
import { authStyles } from "./styles";

const API = process.env.NEXT_PUBLIC_API_URL;

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export default function LoginPageWrapper() {
  return (
    <Suspense fallback={null}>
      <AuthPage />
    </Suspense>
  );
}

function AuthPage() {
  const router = useRouter();
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<"login" | "register">("login");
  const returnUrl = searchParams?.get("returnUrl") || "/";

  useEffect(() => {
    if (searchParams?.get("tab") === "register") setTab("register");
  }, [searchParams]);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [regForm, setRegForm] = useState({ name: "", email: "", phone: "", password: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) return toast.error("أدخل البيانات كاملة");
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "خطأ في تسجيل الدخول");
      login(data.token, data.user);
      toast.success(`أهلاً ${data.user.name} 👋`);
      router.push(returnUrl);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.name || !regForm.email || !regForm.password) return toast.error("أدخل البيانات المطلوبة");
    if (regForm.password.length < 6) return toast.error("كلمة المرور 6 أحرف على الأقل");
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "خطأ في إنشاء الحساب");
      login(data.token, data.user);
      toast.success("تم إنشاء حسابك بنجاح 🎉");
      router.push(returnUrl);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    toast.error("Google OAuth غير متاح حالياً");
    setGoogleLoading(false);
  };

  return (
    <>
      <style>{authStyles}</style>
      <div className="auth-page">
        <div className="auth-bg">
          <div className="auth-blob auth-blob-1" />
          <div className="auth-blob auth-blob-2" />
          <div className="auth-blob auth-blob-3" />
        </div>

        <div className="auth-container">
          <motion.div
            className="auth-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            {/* Header */}
            <div className="auth-header">
              <div className="auth-logo">
                <div className="auth-logo-icon">🎁</div>
                <div>
                  <div className="auth-logo-name">كارد زون</div>
                  <div className="auth-logo-sub">
                    <Sparkles size={10} />
                    بطاقات رقمية فورية
                  </div>
                </div>
              </div>
              <p className="auth-headline">
                {tab === "login" ? "أهلاً بعودتك 👋" : "انضم إلينا اليوم 🎉"}
              </p>
              <p className="auth-subline">
                {tab === "login" ? "سجل دخولك للوصول إلى حسابك" : "أنشئ حسابك مجاناً في ثوانٍ"}
              </p>
            </div>

            {/* Tabs */}
            <div className="auth-tabs">
              <button
                className={`auth-tab ${tab === "login" ? "active" : ""}`}
                onClick={() => { setTab("login"); setShowPass(false); }}
              >
                <LogIn size={14} />
                تسجيل الدخول
              </button>
              <button
                className={`auth-tab ${tab === "register" ? "active" : ""}`}
                onClick={() => { setTab("register"); setShowPass(false); }}
              >
                <UserPlus size={14} />
                إنشاء حساب
              </button>
              <div className={`auth-tab-indicator ${tab === "register" ? "right" : ""}`} />
            </div>

            {/* Google */}
            <button className="auth-google-btn" onClick={handleGoogle} disabled={googleLoading}>
              {googleLoading ? (
                <span className="auth-spinner" />
              ) : (
                <>
                  <GoogleIcon />
                  {tab === "login" ? "الدخول بـ Google" : "التسجيل بـ Google"}
                </>
              )}
            </button>

            <div className="auth-divider">
              <span className="auth-divider-line" />
              <span className="auth-divider-text">أو بالإيميل</span>
              <span className="auth-divider-line" />
            </div>

            {/* Forms */}
            <AnimatePresence mode="wait">
              {tab === "login" ? (
                <motion.form
                  key="login"
                  onSubmit={handleLogin}
                  className="auth-form"
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 18 }}
                  transition={{ duration: 0.22 }}
                >
                  <AuthField icon={<Mail size={15} />} label="البريد الإلكتروني" name="email" type="email" placeholder="example@email.com" value={loginForm.email} onChange={(v) => setLoginForm(p => ({ ...p, email: v }))} />
                  <AuthField icon={<Lock size={15} />} label="كلمة المرور" name="password" type={showPass ? "text" : "password"} placeholder="••••••••" value={loginForm.password} onChange={(v) => setLoginForm(p => ({ ...p, password: v }))} eyeToggle={{ show: showPass, onToggle: () => setShowPass(!showPass) }} />
                  <button type="submit" className="auth-submit-btn" disabled={loading}>
                    {loading ? <span className="auth-spinner white" /> : "تسجيل الدخول"}
                  </button>
                </motion.form>
              ) : (
                <motion.form
                  key="register"
                  onSubmit={handleRegister}
                  className="auth-form"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.22 }}
                >
                  <AuthField icon={<User size={15} />} label="الاسم الكامل" name="name" type="text" placeholder="محمد أحمد" value={regForm.name} onChange={(v) => setRegForm(p => ({ ...p, name: v }))} />
                  <AuthField icon={<Mail size={15} />} label="البريد الإلكتروني" name="email" type="email" placeholder="example@email.com" value={regForm.email} onChange={(v) => setRegForm(p => ({ ...p, email: v }))} />
                  <AuthField icon={<Phone size={15} />} label="رقم الهاتف (اختياري)" name="phone" type="tel" placeholder="05xxxxxxxx" value={regForm.phone} onChange={(v) => setRegForm(p => ({ ...p, phone: v }))} />
                  <AuthField icon={<Lock size={15} />} label="كلمة المرور" name="password" type={showPass ? "text" : "password"} placeholder="••••••••" value={regForm.password} onChange={(v) => setRegForm(p => ({ ...p, password: v }))} eyeToggle={{ show: showPass, onToggle: () => setShowPass(!showPass) }} />
                  <button type="submit" className="auth-submit-btn" disabled={loading}>
                    {loading ? <span className="auth-spinner white" /> : "إنشاء الحساب"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            <p className="auth-switch">
              {tab === "login" ? (
                <>ليس لديك حساب؟ <button className="auth-switch-btn" onClick={() => setTab("register")}>إنشاء حساب</button></>
              ) : (
                <>لديك حساب؟ <button className="auth-switch-btn" onClick={() => setTab("login")}>تسجيل الدخول</button></>
              )}
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

function AuthField({
  icon, label, name, type, placeholder, value, onChange, eyeToggle
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  eyeToggle?: { show: boolean; onToggle: () => void };
}) {
  return (
    <div className="auth-field">
      <label className="auth-label">{label}</label>
      <div className="auth-input-wrap">
        <span className="auth-input-icon">{icon}</span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="auth-input"
          autoComplete={name === "password" ? "current-password" : name}
        />
        {eyeToggle && (
          <button type="button" className="auth-eye-btn" onClick={eyeToggle.onToggle}>
            {eyeToggle.show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
    </div>
  );
}
