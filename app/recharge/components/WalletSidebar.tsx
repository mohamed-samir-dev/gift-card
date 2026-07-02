import { Wallet } from "../types";

interface AuthUser { name: string; email: string; }

interface Props {
  user: AuthUser;
  wallet: Wallet | null;
}

const FEATURES = [
  { icon: "⚡", text: "يتم إضافة الرصيد فوراً" },
  { icon: "🔒", text: "عمليات شحن آمنة 100%" },
  { icon: "💳", text: "طرق دفع متعددة وموثوقة" },
  { icon: "🎁", text: "لا توجد رسوم إضافية" },
];

export default function WalletSidebar({ user, wallet }: Props) {
  return (
    <div className="ws-wrap">

      {/* Wallet card */}
      <div className="ws-card">
        {/* decorative blobs */}
        <span className="ws-blob ws-blob-1" />
        <span className="ws-blob ws-blob-2" />

        <div className="ws-inner">
          <p className="ws-title">رصيد محفظتك</p>

          <div className="ws-icon-ring">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="3" />
              <path d="M16 12h.01" />
              <path d="M2 10h20" />
            </svg>
          </div>

          <div className="ws-balance">
            {wallet ? wallet.balance.toLocaleString("ar-SA") : "٠"}
          </div>
          <div className="ws-currency">
            <img src="/money-icon.webp" alt="ريال" width={20} height={20}
              style={{ objectFit: "contain" }} />
            ريال سعودي
          </div>

        </div>
      </div>

      {/* Features list */}
      <div className="ws-features">
        {FEATURES.map((f, i) => (
          <div key={i} className="ws-feature-row">
            <span className="ws-feature-icon">{f.icon}</span>
            <span className="ws-feature-text">{f.text}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
