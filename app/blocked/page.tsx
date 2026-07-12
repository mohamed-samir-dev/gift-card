"use client";

import Link from "next/link";

export default function BlockedPage() {
  return (
    <>
      <style>{`
        .blocked-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
          font-family: Tajawal, sans-serif;
          direction: rtl;
          padding: 24px;
        }
        .blocked-card {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 48px 40px;
          text-align: center;
          max-width: 420px;
          width: 100%;
        }
        .blocked-icon {
          font-size: 64px;
          margin-bottom: 20px;
          display: block;
          animation: shake 0.5s ease 0.3s both;
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%,60% { transform: translateX(-6px); }
          40%,80% { transform: translateX(6px); }
        }
        .blocked-title {
          color: #ef4444;
          font-size: 24px;
          font-weight: 800;
          margin: 0 0 12px;
        }
        .blocked-msg {
          color: rgba(255,255,255,0.6);
          font-size: 15px;
          line-height: 1.7;
          margin: 0 0 32px;
        }
        .blocked-contact {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(239,68,68,0.15);
          border: 1px solid rgba(239,68,68,0.3);
          color: #fca5a5;
          padding: 12px 28px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
        }
        .blocked-contact:hover {
          background: rgba(239,68,68,0.25);
        }
      `}</style>
      <div className="blocked-page">
        <div className="blocked-card">
          <span className="blocked-icon">🚫</span>
          <h1 className="blocked-title">تم حظر حسابك</h1>
          <p className="blocked-msg">
            تم تعليق حسابك من قِبل الإدارة.<br />
            إذا كنت تعتقد أن هذا خطأ، يرجى التواصل مع الدعم.
          </p>
          <Link href="/contact" className="blocked-contact">
            📩 تواصل مع الدعم
          </Link>
        </div>
      </div>
    </>
  );
}
