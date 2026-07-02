"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "../types";

const PAGE_SIZE = 12;

interface CardsGridProps {
  products: Product[];
  loading: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function CardsGrid({ products, loading, currentPage, onPageChange }: CardsGridProps) {
  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const paginated = products.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <>
      <style>{`
        .cp-main {
          max-width: 1100px; margin: 0 auto;
          padding: clamp(1rem, 3vw, 3rem) clamp(0.75rem, 4vw, 3rem);
        }
        .cp-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.65rem;
        }
        @media (min-width: 480px)  { .cp-grid { gap: 0.85rem; } }
        @media (min-width: 640px)  { .cp-grid { grid-template-columns: repeat(3, 1fr); gap: 1rem; } }
        @media (min-width: 1024px) { .cp-grid { grid-template-columns: repeat(4, 1fr); gap: 1.2rem; } }

        /* ── card ── */
        .cp-card {
          background: #fff; border: 1.5px solid var(--border); border-radius: 20px;
          overflow: hidden; display: flex; flex-direction: column;
          box-shadow: 0 2px 12px rgba(108,77,255,0.07); text-decoration: none; color: inherit;
          transition: transform 0.28s cubic-bezier(.22,.68,0,1.2), box-shadow 0.28s, border-color 0.28s;
        }
        .cp-card:hover {
          transform: translateY(-6px); box-shadow: 0 20px 50px rgba(108,77,255,0.15);
          border-color: rgba(108,77,255,0.35);
        }

        /* ── image ── */
        .cp-img-wrap {
          position: relative; width: 100%; aspect-ratio: 16/9;
          overflow: hidden; background: #f0eeff; flex-shrink: 0;
        }
        .cp-img-wrap img { transition: transform 0.5s ease; object-fit: cover; }
        .cp-card:hover .cp-img-wrap img { transform: scale(1.06); }

        /* ── body ── */
        .cp-body { padding: 0.7rem; display: flex; flex-direction: column; flex: 1; gap: 5px; }
        @media (min-width: 640px) { .cp-body { padding: 0.9rem 1rem 1rem; gap: 6px; } }
        @media (min-width: 768px) { .cp-body { padding: 1rem 1.1rem 1.1rem; } }

        /* category pill */
        .cp-cat {
          font-size: 0.62rem; font-weight: 700; color: var(--primary);
          background: rgba(108,77,255,0.09); border-radius: 999px;
          padding: 2px 10px; width: fit-content; letter-spacing: 0.3px;
        }

        /* title — bigger, bolder, gradient underline on hover */
        .cp-title-wrap { display: flex; flex-direction: column; gap: 2px; }
        .cp-title {
          font-size: clamp(0.82rem, 2.4vw, 1.05rem); font-weight: 900;
          color: var(--text-heading); margin: 0; line-height: 1.35;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
          transition: color 0.2s;
        }
        .cp-card:hover .cp-title { color: var(--primary); }
        .cp-title-line {
          width: 28px; height: 2.5px; border-radius: 999px;
          background: var(--gradient); opacity: 0;
          transition: opacity 0.25s, width 0.3s;
        }
        .cp-card:hover .cp-title-line { opacity: 1; width: 44px; }

        /* brief */
        .cp-brief {
          font-size: clamp(0.67rem, 1.6vw, 0.75rem); color: var(--text-para);
          line-height: 1.65; margin: 0; flex: 1;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }

        /* footer */
        .cp-footer {
          display: flex; align-items: center; justify-content: space-between;
          gap: 8px; margin-top: auto; padding-top: 10px; border-top: 1px solid var(--border);
        }
        @media (max-width: 350px) {
          .cp-footer { flex-direction: column; align-items: stretch; gap: 6px; }
          .cp-btn { justify-content: center; }
        }
        .cp-price-wrap { display: flex; flex-direction: column; gap: 1px; }
        .cp-price {
          font-size: clamp(1.05rem, 3vw, 1.25rem); font-weight: 900;
          background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          white-space: nowrap; line-height: 1;
          display: flex; align-items: center; gap: 4px;
        }
        .cp-currency-icon { width: 32px; height: 32px; object-fit: contain; flex-shrink: 0; }
        .cp-price-label { font-size: 0.58rem; color: var(--text-light); font-weight: 600; }
        .cp-btn {
          display: inline-flex; align-items: center; gap: 4px;
          background: var(--gradient); color: #fff; border: none; border-radius: 8px;
          padding: 7px 10px; font-size: clamp(0.62rem, 1.8vw, 0.8rem); font-weight: 700;
          cursor: pointer; white-space: nowrap; font-family: inherit;
          box-shadow: 0 4px 14px rgba(108,77,255,0.28); flex-shrink: 0;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .cp-btn:hover { opacity: 0.88; transform: translateY(-2px); box-shadow: 0 8px 22px rgba(108,77,255,0.38); }

        /* ── skeleton ── */
        .cp-skeleton {
          border-radius: 16px; overflow: hidden; background: #f5f5f5;
          height: clamp(180px, 40vw, 300px); position: relative;
        }
        .cp-skeleton::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%);
          background-size: 200% 100%; animation: cp-shimmer 1.4s infinite;
        }
        @keyframes cp-shimmer {
          0% { background-position: -200% 0; } 100% { background-position: 200% 0; }
        }

        /* ── empty ── */
        .cp-empty {
          text-align: center; padding: 4rem 1rem; color: var(--text-para); grid-column: 1 / -1;
        }
        .cp-empty-icon { font-size: 3rem; margin-bottom: 1rem; }
        .cp-empty h3 { font-size: 1.1rem; font-weight: 700; color: var(--text-heading); margin: 0 0 0.5rem; }
        .cp-empty p { font-size: 0.875rem; margin: 0; }

        /* ── pagination ── */
        .cp-pagination {
          display: flex; align-items: center; justify-content: center;
          gap: 0.4rem; padding: 1.5rem 0 0.5rem; flex-wrap: wrap;
        }
        .cp-page-btn {
          width: 36px; height: 36px; border-radius: 8px;
          border: 1.5px solid var(--border); background: #fff;
          color: var(--text-para); font-size: 0.82rem; font-weight: 700;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: all 0.18s; font-family: inherit;
        }
        .cp-page-btn:hover:not(:disabled) { border-color: var(--primary); color: var(--primary); }
        .cp-page-btn.active { background: var(--primary); color: #fff; border-color: var(--primary); box-shadow: 0 4px 14px rgba(108,77,255,0.28); }
        .cp-page-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .cp-page-arrow { width: 38px; height: 38px; }
      `}</style>

      <div className="cp-main">
        <div className="cp-grid">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <div key={i} className="cp-skeleton" />)
          ) : products.length === 0 ? (
            <div className="cp-empty">
              <div className="cp-empty-icon">🔍</div>
              <h3>لا توجد بطاقات</h3>
              <p>جرب تغيير الفلاتر للحصول على نتائج أخرى</p>
            </div>
          ) : (
            paginated.map((product) => (
              <Link key={product._id} href={`/product/${product._id}`} className="cp-card">
                <div className="cp-img-wrap">
                  <Image src={product.image || "/placeholder.webp"} alt={product.title} fill />
                </div>

                <div className="cp-body">
                  {product.category?.name && <span className="cp-cat">{product.category.name}</span>}

                  <div className="cp-title-wrap">
                    <h3 className="cp-title">{product.title}</h3>
                    <div className="cp-title-line" />
                  </div>

                  {product.brief && <p className="cp-brief">{product.brief}</p>}

                  <div className="cp-footer">
                    <div className="cp-price-wrap">
                      <span className="cp-price">
                        {product.price}
                        <img src="/money-icon.webp" alt="ريال" className="cp-currency-icon" />
                      </span>
                    </div>
                    <span className="cp-btn">
                      <ShoppingBag size={13} strokeWidth={2.5} />
                      اشتري
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {!loading && totalPages > 1 && (
          <div className="cp-pagination">
            <button
              className="cp-page-btn cp-page-arrow"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`cp-page-btn${currentPage === page ? " active" : ""}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="cp-page-btn cp-page-arrow"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
