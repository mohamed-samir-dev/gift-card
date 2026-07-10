"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

interface Product {
  _id: string;
  title: string;
  brief: string;
  image: string;
  price: number;
  currency: string;
  stock: number;
  category: { name: string; slug: string };
}

interface CategorySection {
  slug: string;
  name: string;
  products: Product[];
}

const CATEGORY_ICONS: Record<string, string> = {
  noon: "🛍️",
  pubg: "🎮",
  amazon: "📦",
  steam: "🎲",
  itunes: "🎵",
  playstation: "🕹️",
  "google-play": "▶️",
};

export default function CategoryProductsSection({ sections }: { sections: CategorySection[] }) {
  const { addToCart } = useCart();
  const router = useRouter();

  function handleBuy(e: React.MouseEvent, product: Product) {
    e.preventDefault();
    addToCart({
      productId: product._id,
      title: product.title,
      image: product.image || "/placeholder.webp",
      price: product.price,
      currency: product.currency,
    });
    router.push("/cart");
  }

  if (!sections.length) return null;

  return (
    <section className="cs-wrap">
      <style>{`
        .cs-wrap {
          background: #f8f9ff;
          padding: clamp(2rem, 6vw, 4rem) clamp(1rem, 5vw, 3rem);
          display: flex;
          flex-direction: column;
          gap: clamp(2.5rem, 6vw, 4rem);
        }

        /* ── category block ── */
        .cs-block { position: relative; }

        .cs-block-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          gap: 1rem;
        }
        .cs-block-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: clamp(1.1rem, 3vw, 1.5rem);
          font-weight: 900;
          color: var(--text-heading);
          margin: 0;
        }
        .cs-block-icon {
          font-size: 1.4rem;
          line-height: 1;
        }
        .cs-block-line {
          flex: 1;
          height: 2px;
          background: linear-gradient(90deg, rgba(108,77,255,0.2) 0%, transparent 100%);
          border-radius: 999px;
        }
        .cs-view-more {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary);
          text-decoration: none;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: gap 0.2s;
        }
        .cs-view-more:hover { gap: 8px; }

        /* ── grid ── */
        .cs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        @media (min-width: 640px) {
          .cs-grid { grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        }
        @media (min-width: 1024px) {
          .cs-grid { grid-template-columns: repeat(6, 1fr); gap: 1.1rem; }
        }

        /* ── card ── */
        .cs-card {
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          color: inherit;
          text-decoration: none;
          box-shadow: 0 2px 10px rgba(108,77,255,0.06);
          transition: transform 0.28s cubic-bezier(.22,.68,0,1.2), box-shadow 0.28s, border-color 0.28s;
        }
        .cs-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(108,77,255,0.14);
          border-color: rgba(108,77,255,0.3);
        }
        .cs-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
          background: #f0eeff;
          flex-shrink: 0;
        }
        .cs-img-wrap img { transition: transform 0.5s ease; object-fit: cover; }
        .cs-card:hover .cs-img-wrap img { transform: scale(1.06); }

        .cs-body {
          padding: 0.6rem 0.7rem 0.75rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 4px;
        }
        .cs-title {
          font-size: clamp(0.7rem, 1.8vw, 0.82rem);
          font-weight: 800;
          color: var(--text-heading);
          margin: 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .cs-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
          margin-top: auto;
          padding-top: 8px;
          border-top: 1px solid var(--border);
        }
        .cs-price {
          font-size: clamp(0.85rem, 2.5vw, 1rem);
          font-weight: 900;
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .cs-btn {
          display: inline-flex;
          align-items: center;
          background: var(--gradient);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 6px 10px;
          font-size: clamp(0.65rem, 1.5vw, 0.75rem);
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          font-family: inherit;
          box-shadow: 0 3px 10px rgba(108,77,255,0.25);
          transition: opacity 0.2s, transform 0.2s;
          flex-shrink: 0;
        }
        .cs-btn:hover { opacity: 0.88; transform: translateY(-1px); }
      `}</style>

      {sections.map((section) => (
        <div key={section.slug} className="cs-block">
          <div className="cs-block-header">
            <h2 className="cs-block-title">
              <span className="cs-block-icon">{CATEGORY_ICONS[section.slug] ?? "🎁"}</span>
              {section.name}
            </h2>
            <div className="cs-block-line" />
            <Link href={`/cards?category=${section.slug}`} className="cs-view-more">
              عرض الكل
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 8H13M6 8L9 5M6 8L9 11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="cs-grid">
            {section.products.map((product) => (
              <Link key={product._id} href={`/product/${product._id}`} className="cs-card">
                <div className="cs-img-wrap">
                  <Image src={product.image || "/placeholder.webp"} alt={product.title} fill />
                </div>
                <div className="cs-body">
                  <h3 className="cs-title">{product.title}</h3>
                  <div className="cs-footer">
                    <div className="cs-price">
                      {product.price}
                      <img src="/money-icon.webp" alt="ريال" style={{ width: 20, height: 20 }} />
                    </div>
                    <button className="cs-btn" onClick={(e) => handleBuy(e, product)}>اشتري</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
