"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Heart } from "lucide-react";

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "البطاقات", href: "/cards" },
  { label: "العروض", href: "/offers" },
  { label: "من نحن", href: "/about" },
  { label: "تواصل معنا", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(255,255,255,0.90)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-14 sm:h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span
            style={{
              background: "var(--gradient)",
              borderRadius: 8,
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
            }}
          >
            🎁
          </span>
          <span
            className="text-lg sm:text-xl font-black"
            style={{
              background: "var(--gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            كارد زون
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-5 lg:gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-[#6c4dff] transition-colors duration-200 text-sm lg:text-base font-semibold"
                style={{ color: "var(--text-para)" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          {/* Cart & Wishlist Icons */}
          <Link
            href="/wishlist"
            className="relative p-2 rounded-[10px] hover:bg-[#f3f0ff] transition-all duration-200"
            style={{ color: "var(--primary)" }}
            aria-label="المفضلة"
          >
            <Heart size={20} strokeWidth={2} />
          </Link>
          <Link
            href="/cart"
            className="relative p-2 rounded-[10px] hover:bg-[#f3f0ff] transition-all duration-200"
            style={{ color: "var(--primary)" }}
            aria-label="السلة"
          >
            <ShoppingCart size={20} strokeWidth={2} />
          </Link>
          <div className="w-px h-5 mx-1" style={{ background: "var(--border)" }} />
          <Link
            href="/login"
            className="hover:bg-[#6c4dff] hover:text-white transition-all duration-200 text-sm font-bold px-4 py-2 rounded-[10px]"
            style={{
              color: "var(--primary)",
              border: "1.5px solid var(--primary)",
            }}
          >
            تسجيل الدخول
          </Link>
          <Link
            href="/register"
            className="btn-gradient text-white font-bold text-sm px-4 lg:px-5 py-2 rounded-[10px]"
          >
            إنشاء حساب
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="القائمة"
          style={{ color: "var(--primary)" }}
        >
          {menuOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden flex flex-col px-4 pb-5 pt-3 gap-1"
          style={{ background: "#fff", borderTop: "1px solid var(--border)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold py-2.5 px-3 rounded-lg hover:bg-[#f3f0ff] hover:text-[#6c4dff] transition-colors"
              style={{ color: "var(--text-heading)" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {/* Mobile Cart & Wishlist */}
          <div className="flex gap-2">
            <Link
              href="/wishlist"
              className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 px-3 rounded-lg hover:bg-[#f3f0ff] transition-colors"
              style={{ color: "var(--primary)" }}
              onClick={() => setMenuOpen(false)}
            >
              <Heart size={17} strokeWidth={2} />
              المفضلة
            </Link>
            <Link
              href="/cart"
              className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 px-3 rounded-lg hover:bg-[#f3f0ff] transition-colors"
              style={{ color: "var(--primary)" }}
              onClick={() => setMenuOpen(false)}
            >
              <ShoppingCart size={17} strokeWidth={2} />
              السلة
            </Link>
          </div>
          <hr className="my-2" style={{ borderColor: "var(--border)" }} />
          <div className="flex gap-2">
            <Link
              href="/login"
              className="flex-1 text-center text-sm font-bold py-2.5 rounded-[10px] transition-all"
              style={{ color: "var(--primary)", border: "1.5px solid var(--primary)" }}
              onClick={() => setMenuOpen(false)}
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/register"
              className="btn-gradient flex-1 text-center text-white text-sm font-bold py-2.5 rounded-[10px]"
              onClick={() => setMenuOpen(false)}
            >
              إنشاء حساب
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
