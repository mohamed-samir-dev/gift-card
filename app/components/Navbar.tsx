"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, User, LogOut, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "البطاقات", href: "/cards" },
  { label: "اشحن رصيدك", href: "/recharge" },
  { label: "من نحن", href: "/about" },
  { label: "تواصل معنا", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
            href="/cart"
            className="relative p-2 rounded-[10px] hover:bg-[#f3f0ff] transition-all duration-200"
            style={{ color: "var(--primary)" }}
            aria-label="السلة"
          >
            <ShoppingCart size={20} strokeWidth={2} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -left-1 bg-[#6c4dff] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>
          <div className="w-px h-5 mx-1" style={{ background: "var(--border)" }} />
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-[10px] hover:bg-[#f3f0ff] transition-all duration-200"
                style={{ color: "var(--text-heading)" }}
              >
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black" style={{ background: "var(--gradient)" }}>
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm font-bold max-w-[90px] truncate">{user.name}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div
                  className="absolute left-0 top-full mt-2 w-44 rounded-2xl py-2 z-50"
                  style={{ background: "#fff", boxShadow: "0 8px 32px rgba(108,77,255,0.15)", border: "1px solid var(--border)" }}
                >
                  <div className="px-4 py-2 border-b" style={{ borderColor: "var(--border)" }}>
                    <p className="text-xs font-black truncate" style={{ color: "var(--text-heading)" }}>{user.name}</p>
                    <p className="text-[11px] truncate" style={{ color: "var(--text-para)" }}>{user.email}</p>
                  </div>
                  <button
                    onClick={() => { logout(); setDropdownOpen(false); }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={15} />
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:bg-[#6c4dff] hover:text-white transition-all duration-200 text-sm font-bold px-4 py-2 rounded-[10px]"
                style={{ color: "var(--primary)", border: "1.5px solid var(--primary)" }}
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/register"
                className="btn-gradient text-white font-bold text-sm px-4 lg:px-5 py-2 rounded-[10px]"
              >
                إنشاء حساب
              </Link>
            </>
          )}
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
          {/* Mobile Cart */}
          <div className="flex gap-2">
            <Link
              href="/cart"
              className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 px-3 rounded-lg hover:bg-[#f3f0ff] transition-colors"
              style={{ color: "var(--primary)" }}
              onClick={() => setMenuOpen(false)}
            >
              <ShoppingCart size={17} strokeWidth={2} />
              السلة
              {totalItems > 0 && (
                <span className="bg-[#6c4dff] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
          </div>
          <hr className="my-2" style={{ borderColor: "var(--border)" }} />
          {user ? (
            <div className="flex items-center justify-between px-3 py-2 rounded-xl" style={{ background: "#f3f0ff" }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-black" style={{ background: "var(--gradient)" }}>
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-black" style={{ color: "var(--text-heading)" }}>{user.name}</p>
                  <p className="text-[10px]" style={{ color: "var(--text-para)" }}>{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
              >
                <LogOut size={14} />
                خروج
              </button>
            </div>
          ) : (
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
          )}
        </div>
      )}
    </header>
  );
}
