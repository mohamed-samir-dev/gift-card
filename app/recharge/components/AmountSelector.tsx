import { AMOUNTS } from "../types";

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

      <label className="rc-custom-label">أو أدخل مبلغاً آخر</label>
      <input
        type="number"
        min="1"
        placeholder="مثال: 150"
        className="rc-custom-input"
        value={custom}
        onChange={e => onCustomChange(e.target.value)}
      />
    </div>
  );
}
