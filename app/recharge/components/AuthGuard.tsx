import { useRouter } from "next/navigation";

export default function AuthGuard() {
  const router = useRouter();

  return (
    <main className="ag-page">
      <span className="ag-blob ag-blob-1" />
      <span className="ag-blob ag-blob-2" />
      <span className="ag-blob ag-blob-3" />

      <div className="ag-content">
        {/* icon */}
        <div className="ag-icon-wrap">
          <div className="ag-icon-ring" />
          <span className="ag-icon">🔐</span>
        </div>

        {/* text */}
        <h1 className="ag-title">الوصول مقيّد</h1>
        <p className="ag-desc">
          هذه الصفحة مخصصة للأعضاء المسجلين فقط.
          <br />
          سجّل دخولك لعرض محفظتك ورصيدك وشحن حسابك.
        </p>

        {/* feature pills */}
        <div className="ag-pills">
          <span className="ag-pill">💰 عرض الرصيد</span>
          <span className="ag-pill">⚡ شحن فوري</span>
          <span className="ag-pill">🔒 آمن 100%</span>
        </div>

        {/* divider */}
        <div className="ag-divider" />

        {/* actions */}
        <div className="ag-actions">
          <button className="ag-btn-back" onClick={() => router.back()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            رجوع
          </button>
          <button className="ag-btn-login" onClick={() => router.push("/login?returnUrl=/recharge")}>
            تسجيل الدخول
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </button>
        </div>

        <p className="ag-register-hint">
          ليس لديك حساب؟{" "}
          <button className="ag-register-link"
            onClick={() => router.push("/login?tab=register&returnUrl=/recharge")}>
            أنشئ حساباً مجاناً
          </button>
        </p>
      </div>
    </main>
  );
}
