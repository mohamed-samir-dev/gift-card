"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Category, PRICE_RANGES } from "../types";

interface FiltersBarProps {
  categories: Category[];
  selectedCat: string;
  selectedPrice: number;
  selectedBrand: string | null;
  count: number;
  loading: boolean;
  onCatChange: (id: string) => void;
  onPriceChange: (i: number) => void;
  onClear: () => void;
}

export default function FiltersBar({
  categories,
  selectedCat,
  selectedPrice,
  selectedBrand,
  count,
  loading,
  onCatChange,
  onPriceChange,
  onClear,
}: FiltersBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const hasActive = selectedCat !== "all" || selectedPrice !== 0 || !!selectedBrand;

  return (
    <>
      <style>{`
        .cp-filters-bar {
          background: #fff; border-bottom: 1px solid var(--border);
          padding: 0.75rem clamp(1rem, 5vw, 3rem); position: sticky; top: 56px; z-index: 40;
        }
        .cp-filters-inner {
          max-width: 1100px; margin: 0 auto;
          display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;
        }
        .cp-filter-label {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.82rem; font-weight: 700; color: var(--text-para); white-space: nowrap;
        }
        .cp-filter-chips { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; flex: 1; }
        .cp-chip {
          padding: 5px 12px; border-radius: 999px; font-size: 0.75rem; font-weight: 700;
          border: 1.5px solid var(--border); background: #fff; color: var(--text-para);
          cursor: pointer; transition: all 0.18s; white-space: nowrap;
        }
        .cp-chip:hover { border-color: var(--primary); color: var(--primary); }
        .cp-chip.active {
          background: var(--primary); color: #fff; border-color: var(--primary);
          box-shadow: 0 4px 14px rgba(108,77,255,0.28);
        }
        .cp-divider { width: 1px; height: 22px; background: var(--border); flex-shrink: 0; }
        .cp-count { font-size: 0.78rem; font-weight: 700; color: var(--text-light); white-space: nowrap; margin-right: auto; }
        .cp-mobile-filter-btn {
          display: none; align-items: center; gap: 6px;
          padding: 6px 14px; border-radius: 999px; border: 1.5px solid var(--border);
          background: #fff; color: var(--text-para); font-size: 0.78rem; font-weight: 700;
          cursor: pointer; font-family: inherit;
        }
        @media (max-width: 767px) {
          .cp-mobile-filter-btn { display: flex; }
          .cp-filter-chips { display: none; }
          .cp-filter-chips.open {
            display: flex; width: 100%;
            overflow-x: auto; flex-wrap: nowrap;
            scrollbar-width: none; -ms-overflow-style: none;
            padding-bottom: 4px;
          }
          .cp-filter-chips.open::-webkit-scrollbar { display: none; }
          .cp-divider { display: none; }
          .cp-filter-label { display: none; }
          .cp-count { margin-right: 0; margin-left: auto; }
        }
      `}</style>

      <div className="cp-filters-bar">
        <div className="cp-filters-inner">
          <span className="cp-filter-label">
            <SlidersHorizontal size={15} strokeWidth={2.2} />
            الفئة:
          </span>

          <button className="cp-mobile-filter-btn" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal size={14} />
            فلترة
            {hasActive && (
              <span style={{
                background: "var(--primary)", color: "#fff", borderRadius: "50%",
                width: 16, height: 16, display: "inline-flex", alignItems: "center",
                justifyContent: "center", fontSize: "0.65rem", fontWeight: 800,
              }}>
                {(selectedCat !== "all" ? 1 : 0) + (selectedPrice !== 0 ? 1 : 0) + (selectedBrand ? 1 : 0)}
              </span>
            )}
          </button>

          <div className={`cp-filter-chips${showFilters ? " open" : ""}`}>
            {selectedBrand && (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "5px 12px", borderRadius: 999, fontSize: "0.78rem", fontWeight: 700,
                background: "rgba(108,77,255,0.1)", color: "var(--primary)",
                border: "1.5px solid var(--primary)",
              }}>
                🏷 {selectedBrand}
              </span>
            )}
            <button className={`cp-chip${selectedCat === "all" ? " active" : ""}`} onClick={() => onCatChange("all")}>
              الكل
            </button>
            {categories.map((c) => (
              <button
                key={c._id}
                className={`cp-chip${selectedCat === c._id ? " active" : ""}`}
                onClick={() => onCatChange(c._id)}
              >
                {c.name}
              </button>
            ))}

            <div className="cp-divider" />

            <span className="cp-filter-label" style={{ marginRight: 0 }}>السعر:</span>
            {PRICE_RANGES.map((r, i) => (
              <button
                key={i}
                className={`cp-chip${selectedPrice === i ? " active" : ""}`}
                onClick={() => onPriceChange(i)}
              >
                {r.label}
              </button>
            ))}

            {hasActive && (
              <button
                className="cp-chip"
                style={{ color: "#ef4444", borderColor: "#fca5a5" }}
                onClick={onClear}
              >
                <X size={12} style={{ display: "inline", marginLeft: 3 }} />
                مسح الفلاتر
              </button>
            )}
          </div>

          <span className="cp-count">{loading ? "..." : `${count} بطاقة`}</span>
        </div>
      </div>
    </>
  );
}
