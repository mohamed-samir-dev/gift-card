import { AMOUNTS } from "../types";

const MIN = 10;
const MAX = 5000;

interface Props {
  selected: number | null;
  custom: string;
  onSelect: (amt: number) => void;
  onCustomChange: (val: string) => void;
}

export default function AmountSelector({ selected, custom, onSelect, onCustomChange }: Props) {
  return (
    <div className="rc-card">
      <div className="rc-section-title">
        <span className="rc-step-badge">١</span>
        اختر المبلغ
      </div>

      <div className="rc-amounts">
        {AMOUNTS.map(amt => (
          <button
            key={amt}
            className={`rc-amount-btn${selected === amt ? " active" : ""}`}
            onClick={() => onSelect(amt)}
          >
            <span className="rc-amount-val">{amt}</span>
            <span className="rc-amount-cur" style={{ display: "inline-flex", alignItems: "center" }}><img src="/money-icon.webp" alt="ريال" style={{ width: 25, height: 25, objectFit: "contain" }} /></span>
          </button>
        ))}
      </div>

      <div className="rc-divider" />

      <label className="rc-custom-label">أو أدخل مبلغاً آخر (من {MIN} إلى {MAX} ريال)</label>
      <input
        type="number"
        min={MIN}
        max={MAX}
        placeholder={`من ${MIN} إلى ${MAX} ريال`}
        className="rc-custom-input"
        value={custom}
        onChange={e => onCustomChange(e.target.value)}
      />
      {custom && parseFloat(custom) < MIN && (
        <p style={{ color: "#e53e3e", fontSize: "0.85rem", marginTop: "0.3rem" }}>
          الحد الأدنى للشحن هو {MIN} ريال
        </p>
      )}
      {custom && parseFloat(custom) > MAX && (
        <p style={{ color: "#e53e3e", fontSize: "0.85rem", marginTop: "0.3rem" }}>
          الحد الأقصى للشحن هو {MAX} ريال
        </p>
      )}
    </div>
  );
}
