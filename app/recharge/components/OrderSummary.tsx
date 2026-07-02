import { METHODS } from "../types";

interface Props {
  finalAmount: number | null;
  method: string | null;
  loading: boolean;
  error: string;
  success: boolean;
  onSubmit: () => void;
}

export default function OrderSummary({ finalAmount, method, loading, error, success, onSubmit }: Props) {
  const methodLabel = method ? METHODS.find(m => m.id === method)?.label : null;

  return (
    <>
      <div className="rc-summary">
        <div className="rc-summary-title">ملخص العملية</div>
        <div className="rc-summary-row">
          <span>المبلغ المختار</span>
          <span className="rc-summary-val">{finalAmount ? <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>{finalAmount} <img src="/money-icon.webp" alt="ريال" style={{ width: 25, height: 25, objectFit: "contain" }} /></span> : "—"}</span>
        </div>
        <div className="rc-summary-row">
          <span>طريقة الدفع</span>
          <span className="rc-summary-val">{methodLabel ?? "—"}</span>
        </div>
        <div className="rc-summary-row total">
          <span>الإجمالي</span>
          <span className="rc-summary-val highlight">{finalAmount ? <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>{finalAmount} <img src="/money-icon.webp" alt="ريال" style={{ width: 25, height: 25, objectFit: "contain" }} /></span> : "—"}</span>
        </div>
      </div>

      <button
        className="rc-submit"
        onClick={onSubmit}
        disabled={loading || !finalAmount || !method}
      >
        {loading ? "⏳ جاري الشحن..." : "⚡ اشحن الآن"}
      </button>

      {error   && <div className="rc-error">⚠️ {error}</div>}
      {success && <div className="rc-success">✅ تم شحن رصيدك بنجاح!</div>}
    </>
  );
}
