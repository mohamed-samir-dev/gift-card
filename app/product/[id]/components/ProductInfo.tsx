"use client";

import { motion } from "framer-motion";
import { Tag, Minus, Plus, Zap, CheckCircle, Heart, Sparkles, ShoppingCart } from "lucide-react";
import { Product } from "../types";
import { useCart } from "../../../context/CartContext";
import toast from "react-hot-toast";

interface Props {
  product: Product;
  qty: number;
  buying: boolean;
  total: string;
  onQtyChange: (qty: number) => void;
  onBuy: () => void;
}

export default function ProductInfo({ product, qty, buying, total, onQtyChange, onBuy }: Props) {
  const inStock = product.unlimitedStock || product.stock > 0;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      title: product.title,
      image: product.image || "",
      price: product.price,
      currency: product.currency,
    }, qty);
    toast.success("تمت الإضافة للسلة 🛒");
  };

  return (
    <motion.div
      className="pd-info"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="pd-cat-row">
        {product.category?.name && (
          <span className="pd-cat">
            <Tag size={10} />
            {product.category.name}
          </span>
        )}
        <span className="pd-new-badge">
          <Sparkles size={10} />
          جديد
        </span>
      </div>

      <h1 className="pd-title">{product.title}</h1>
      {product.brief && <p className="pd-brief">{product.brief}</p>}

      


      <hr className="pd-divider" />

      <div className="pd-price-qty-row">
        <div className="pd-price-section">
          <div className="pd-price-label">السعر</div>
          <div className="pd-price-row">
            <span className="pd-price">{product.price}</span>
            <img src="/money-icon.webp" alt="ريال" className="cp-currency-icon" style={{ width: 30, height: 30, marginBottom: 3 }} />
            {qty > 1 && <span className="pd-per-unit">× {qty}</span>}
          </div>
        </div>

        <div className="pd-qty-section">
          <div className="pd-qty-label">الكمية</div>
          <div className="pd-qty-ctrl">
            <button
              className="pd-qty-btn"
              onClick={() => onQtyChange(Math.max(1, qty - 1))}
              disabled={qty <= 1}
            >
              <Minus size={15} />
            </button>
            <span className="pd-qty-val">{qty}</span>
            <button
              className="pd-qty-btn"
              onClick={() => onQtyChange(Math.min(product.unlimitedStock ? Infinity : product.stock, qty + 1))}
              disabled={!product.unlimitedStock && qty >= product.stock}
            >
              <Plus size={15} />
            </button>
          </div>
        </div>
      </div>

     

      <hr className="pd-divider" />

      <div className="pd-total">
        <div className="pd-total-left">
          <span className="pd-total-label">الإجمالي</span>
          <span className="pd-total-note">شامل جميع الرسوم</span>
        </div>
        <span className="pd-total-val" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {total}
          <img src="/money-icon.webp" alt="ريال" className="cp-currency-icon" style={{ width: 30, height: 30 }} />
        </span>
      </div>

      <button className="pd-buy-btn" onClick={onBuy} disabled={buying || !inStock}>
        {buying ? (
          <div className="pd-spinner" />
        ) : (
          <>
            <Zap size={19} />
            {inStock ? "اشتري الآن" : "نفذ المخزون"}
            {inStock && <CheckCircle size={17} />}
          </>
        )}
      </button>

      <button className="pd-wishlist-btn" onClick={handleAddToCart} disabled={!inStock}>
        <ShoppingCart size={16} />
        أضف للسلة
      </button>
    </motion.div>
  );
}
