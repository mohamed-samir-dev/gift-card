"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { Wallet, METHODS } from "./types";
import RechargeHeader   from "./components/RechargeHeader";
import AmountSelector   from "./components/AmountSelector";
import PaymentMethods   from "./components/PaymentMethods";
import OrderSummary     from "./components/OrderSummary";
import WalletSidebar    from "./components/WalletSidebar";
import AuthGuard        from "./components/AuthGuard";
import "./recharge.css";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function RechargePage() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();

  const [wallet,   setWallet]   = useState<Wallet | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [custom,   setCustom]   = useState("");
  const [method,   setMethod]   = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [error,    setError]    = useState("");

  // Redirect home if user logs out while on this page
  const wasLoggedIn = useRef(false);
  useEffect(() => {
    if (!isLoading && user) wasLoggedIn.current = true;
    if (!isLoading && !user && wasLoggedIn.current) router.replace("/");
  }, [isLoading, user, router]);

  // Fetch wallet
  useEffect(() => {
    if (!token) return;
    fetch(`${API}/api/wallets`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setWallet)
      .catch(() => {});
  }, [token]);

  const finalAmount = selected ?? (custom ? parseFloat(custom) : null);

  const handleSelectAmount = (amt: number) => { setSelected(amt); setCustom(""); };
  const handleCustomChange = (val: string)  => { setCustom(val); setSelected(null); };

  const handleRecharge = async () => {
    if (!finalAmount || finalAmount <= 0) return setError("اختر أو أدخل مبلغاً صحيحاً");
    if (!method) return setError("اختر طريقة الدفع");
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/wallets/recharge`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount: finalAmount, gateway: method, transactionId: `TXN-${Date.now()}` }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "فشل الشحن");
      setWallet(prev =>
        prev ? { ...prev, balance: data.balance, totalRecharge: prev.totalRecharge + finalAmount } : prev
      );
      setSuccess(true);
      setSelected(null);
      setCustom("");
      setMethod(null);
      setTimeout(() => setSuccess(false), 4000);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return null;

  if (!user) return <AuthGuard />;

  return (
    <main className="rc-page">
      <RechargeHeader />

      <div className="rc-layout">
        {/* Right: form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <AmountSelector
            selected={selected}
            custom={custom}
            onSelect={handleSelectAmount}
            onCustomChange={handleCustomChange}
          />
          <PaymentMethods selected={method} onSelect={setMethod} />
          <OrderSummary
            finalAmount={finalAmount}
            method={method}
            loading={loading}
            error={error}
            success={success}
            onSubmit={handleRecharge}
          />
        </div>

        {/* Left: wallet sidebar */}
        <WalletSidebar user={user} wallet={wallet} token={token} />
      </div>
    </main>
  );
}
