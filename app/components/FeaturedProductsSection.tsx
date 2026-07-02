"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  title: string;
  brief: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  stock: number;
  category: { name: string; slug: string };
}

export default function FeaturedProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data.slice(0, 6) : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="fp-section">
      <style>{`
        .fp-section {
          background: linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%);
          padding: clamp(2.5rem, 7vw, 5rem) clamp(1rem, 5vw, 3rem);
          position: relative;
          overflow: hidden;
        }

        /* ── decorative blobs ── */
        .fp-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        .fp-blob-1 {
          width: 500px; height: 500px;
          top: -150px; right: -150px;
          background: radial-gradient(circle, rgba(108,77,255,0.08) 0%, transparent 65%);
        }
        .fp-blob-2 {
          width: 400px; height: 400px;
          bottom: -100px; left: -100px;
          background: radial-gradient(circle, rgba(79,123,255,0.08) 0%, transparent 65%);
        }
        .fp-blob-3 {
          width: 200px; height: 200px;
          top: 40%; left: 50%;
          transform: translateX(-50%);
          background: radial-gradient(circle, rgba(108,77,255,0.04) 0%, transparent 70%);
        }

        /* ── header ── */
        .fp-header {
          text-align: center;
          margin-bottom: clamp(2rem, 5vw, 3.5rem);
          position: relative;
          z-index: 1;
        }
        .fp-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(108,77,255,0.1);
          border: 1px solid rgba(108,77,255,0.25);
          color: var(--primary);
          font-weight: 700;
          font-size: 0.78rem;
          padding: 5px 16px;
          border-radius: 999px;
          margin-bottom: 1rem;
          letter-spacing: 0.5px;
        }
        .fp-heading {
          font-weight: 900;
          font-size: clamp(1.5rem, 5vw, 2.7rem);
          color: var(--text-heading);
          margin: 0 0 0.75rem;
          line-height: 1.25;
        }
        .fp-heading span {
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .fp-subtext {
          color: var(--text-para);
          font-size: clamp(0.85rem, 2vw, 1rem);
          font-weight: 500;
          margin: 0;
        }

        /* ── grid ── */
        .fp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 768px) {
          .fp-grid { grid-template-columns: repeat(3, 1fr); gap: 1.1rem; }
        }
        @media (min-width: 1024px) {
          .fp-grid { gap: 1.3rem; }
        }

        /* ── card ── */
        .fp-card {
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(108,77,255,0.07);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          color: inherit;
          transition: transform 0.28s cubic-bezier(.22,.68,0,1.2), box-shadow 0.28s, border-color 0.28s;
        }
        .fp-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(108,77,255,0.15);
          border-color: rgba(108,77,255,0.35);
        }

        /* ── image ── */
        .fp-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          flex-shrink: 0;
          background: #f0eeff;
        }
        .fp-img-wrap img {
          transition: transform 0.5s ease;
          object-fit: cover;
        }
        .fp-card:hover .fp-img-wrap img {
          transform: scale(1.06);
        }

        /* ── body ── */
        .fp-body {
          padding: 0.75rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 5px;
        }
        @media (min-width: 768px) {
          .fp-body { padding: 1rem 1.1rem 1.1rem; gap: 6px; }
        }
        .fp-cat {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--primary);
          background: rgba(108,77,255,0.09);
          border-radius: 999px;
          padding: 2px 10px;
          width: fit-content;
        }
        .fp-title {
          font-size: clamp(0.75rem, 2.2vw, 1rem);
          font-weight: 800;
          color: var(--text-heading);
          margin: 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .fp-brief {
          font-size: clamp(0.67rem, 1.6vw, 0.77rem);
          color: var(--text-para);
          line-height: 1.6;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }
        .fp-footer {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-top: auto;
          padding-top: 10px;
          border-top: 1px solid var(--border);
        }
        @media (max-width: 350px) {
          .fp-footer { flex-direction: column; align-items: stretch; gap: 6px; }
          .fp-btn { justify-content: center; }
        }
        .fp-price {
          font-size: clamp(1rem, 3vw, 1.2rem);
          font-weight: 900;
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          white-space: nowrap;
          line-height: 1;
        }
        .fp-price-sub {
          font-size: 0.6rem;
          color: var(--text-light);
          font-weight: 600;
          margin-top: 2px;
        }
        .fp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          background: var(--gradient);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 8px 14px;
          font-size: clamp(0.7rem, 1.8vw, 0.82rem);
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          font-family: inherit;
          box-shadow: 0 4px 14px rgba(108,77,255,0.28);
          flex-shrink: 0;
        }
        .fp-btn:hover {
          opacity: 0.88;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(108,77,255,0.38);
        }

        /* ── skeleton ── */
        .fp-skeleton {
          border-radius: 22px;
          overflow: hidden;
          background: #f5f5f5;
          height: clamp(260px, 40vw, 360px);
          position: relative;
        }
        .fp-skeleton::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: fp-shimmer 1.4s infinite;
        }
        @keyframes fp-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* ── view all btn ── */
        .fp-view-all {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--gradient);
          color: #fff;
          font-weight: 700;
          font-size: clamp(0.85rem, 2vw, 0.95rem);
          padding: 13px 36px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-family: inherit;
          box-shadow: var(--shadow-btn);
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
        }
        .fp-view-all:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(108,77,255,0.35);
        }
        .fp-view-all-wrap {
          text-align: center;
          margin-top: clamp(1.75rem, 4vw, 3rem);
          position: relative;
          z-index: 1;
        }
      `}</style>

      <div className="fp-blob fp-blob-1" />
      <div className="fp-blob fp-blob-2" />
      <div className="fp-blob fp-blob-3" />

      {/* Header */}
      <div className="fp-header">
        <div className="fp-tag">✦ الأكثر طلباً</div>
        <h2 className="fp-heading">
          البطاقات <span>المميزة</span>
        </h2>
        <p className="fp-subtext">اختار بطاقتك من أشهر الماركات واستلمها فوراً</p>
      </div>

      {/* Grid */}
      <div className="fp-grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="fp-skeleton" />
            ))
          : products.map((product, index) => (
              <Link key={product._id} href={`/product/${product._id}`} className="fp-card" style={{ textDecoration: "none" }}>
                {/* Image */}
                <div className="fp-img-wrap">
                  <Image src={product.image || "/placeholder.webp"} alt={product.title} fill />
                </div>

                {/* Body */}
                <div className="fp-body">
                  {product.category?.name && <span className="fp-cat">{product.category.name}</span>}
                  <h3 className="fp-title">{product.title}</h3>
                  {product.brief && <p className="fp-brief">{product.brief}</p>}
                  <div className="fp-footer">
                    <div>
                      <div className="fp-price">{product.price} {product.currency}</div>
                    </div>
                    <span className="fp-btn">اشتري</span>
                  </div>
                </div>
              </Link>
            ))}
      </div>

      {/* View all */}
      {!loading && products.length > 0 && (
        <div className="fp-view-all-wrap">
          <a href="#" className="fp-view-all">
            عرض كل البطاقات
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 8H13M6 8L9 5M6 8L9 11" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      )}
    </section>
  );
}
