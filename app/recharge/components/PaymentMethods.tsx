import Image from "next/image";
import { METHODS } from "../types";

interface Props {
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function PaymentMethods({ selected, onSelect }: Props) {
  return (
    <div className="rc-card">
      <div className="rc-section-title">
        <span className="rc-step-badge">٢</span>
        طريقة الدفع
      </div>
      <div className="rc-methods">
        {METHODS.map(m => (
          <button
            key={m.id}
            className={`rc-method-btn${selected === m.id ? " active" : ""}`}
            onClick={() => onSelect(m.id)}
          >
            <div className="rc-method-img-wrap">
              <Image src={m.img} alt={m.label} fill style={{ objectFit: "contain" }} />
            </div>
            <span className="rc-method-label">{m.label}</span>
            {selected === m.id && <span className="rc-method-check">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
