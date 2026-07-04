"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, ShoppingCart, FileText, LogOut, Shield, Menu, X, ChevronLeft } from "lucide-react";

const navItems = [
  { href: "/admin", label: "الرئيسية", icon: LayoutDashboard },
  { href: "/admin/users", label: "المستخدمون", icon: Users },
  { href: "/admin/orders", label: "الطلبات", icon: ShoppingCart },
  { href: "/admin/invoices", label: "الفواتير", icon: FileText },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") return;
    const token = localStorage.getItem("adminToken");
    const user = localStorage.getItem("adminUser");
    if (!token || !user) { router.push("/admin/login"); return; }
    const parsed = JSON.parse(user);
    if (parsed.role !== "admin") { router.push("/admin/login"); return; }
    setAdminUser(parsed);
  }, [pathname, router]);

  // close sidebar on route change
  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") return <>{children}</>;
  if (!adminUser) return null;

  const pageTitle = navItems.find(n => n.href === pathname)?.label || "لوحة التحكم";

  return (
    <>
      <style>{`
        @media print { .no-print { display: none !important; } }

        *, *::before, *::after { box-sizing: border-box; }

        .adm-layout {
          display: flex; min-height: 100vh;
          background: #f8f9ff;
          font-family: Tajawal, sans-serif;
          direction: rtl;
        }

        /* ── Sidebar ── */
        .adm-sidebar {
          width: 250px; background: #fff;
          border-left: 1px solid #e6e8f5;
          display: flex; flex-direction: column;
          position: fixed; top: 0; right: 0;
          height: 100vh; z-index: 50;
          box-shadow: -4px 0 20px rgba(108,77,255,0.06);
          transition: transform 0.3s cubic-bezier(.4,0,.2,1);
        }
        .adm-sidebar-logo {
          padding: 20px 18px;
          border-bottom: 1px solid #e6e8f5;
          display: flex; align-items: center; gap: 10px;
          flex-shrink: 0;
        }
        .adm-logo-icon {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, #6c4dff, #4f7bff);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(108,77,255,0.3);
          flex-shrink: 0;
        }
        .adm-logo-name { color: #111827; font-weight: 800; font-size: 15px; line-height: 1.2; }
        .adm-logo-sub  { color: #9ca3af; font-size: 11px; }

        .adm-nav { flex: 1; padding: 14px 10px; overflow-y: auto; }
        .adm-nav-label {
          color: #9ca3af; font-size: 10px; font-weight: 700;
          padding: 0 10px; margin: 6px 0 6px;
          letter-spacing: 0.06em; text-transform: uppercase;
        }
        .adm-nav-link {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 10px; margin-bottom: 2px;
          text-decoration: none; font-size: 14px; font-weight: 500;
          transition: all 0.18s; color: #6b7280;
          border-right: 3px solid transparent;
          white-space: nowrap;
        }
        .adm-nav-link:hover { background: #f3f0ff; color: #6c4dff; }
        .adm-nav-link.active {
          background: linear-gradient(135deg, rgba(108,77,255,0.1), rgba(79,123,255,0.07));
          color: #6c4dff; font-weight: 700;
          border-right-color: #6c4dff;
        }

        .adm-sidebar-footer {
          padding: 14px 10px;
          border-top: 1px solid #e6e8f5;
          flex-shrink: 0;
        }
        .adm-user-info { padding: 8px 12px; margin-bottom: 6px; }
        .adm-user-name  { color: #111827; font-size: 13px; font-weight: 700; }
        .adm-user-email { color: #9ca3af; font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .adm-logout-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 12px; border-radius: 10px;
          color: #dc2626; background: #fef2f2; border: none;
          cursor: pointer; font-size: 13px;
          font-family: Tajawal, sans-serif; font-weight: 600;
          width: 100%; transition: background 0.18s;
        }
        .adm-logout-btn:hover { background: #fee2e2; }

        /* ── Main area ── */
        .adm-main {
          flex: 1; margin-right: 250px;
          display: flex; flex-direction: column;
          min-height: 100vh; min-width: 0;
        }
        .adm-topbar {
          background: #fff; border-bottom: 1px solid #e6e8f5;
          padding: 0 28px; height: 60px;
          display: flex; align-items: center; justify-content: space-between;
          position: sticky; top: 0; z-index: 40;
          box-shadow: 0 2px 8px rgba(108,77,255,0.05);
          flex-shrink: 0;
        }
        .adm-topbar-left { display: flex; align-items: center; gap: 12px; }
        .adm-menu-btn {
          display: none;
          background: none; border: 1px solid #e6e8f5;
          border-radius: 8px; padding: 6px;
          cursor: pointer; color: #6b7280;
          align-items: center; justify-content: center;
          transition: all 0.18s; flex-shrink: 0;
        }
        .adm-menu-btn:hover { background: #f3f0ff; border-color: #6c4dff; color: #6c4dff; }
        .adm-topbar-title { color: #111827; font-size: 16px; font-weight: 800; }
        .adm-topbar-breadcrumb {
          color: #9ca3af; font-size: 12px;
          display: flex; align-items: center; gap: 3px;
        }
        .adm-avatar {
          width: 34px; height: 34px;
          background: linear-gradient(135deg,#6c4dff,#4f7bff);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: white; font-weight: 800; font-size: 14px;
          flex-shrink: 0;
        }
        .adm-content { flex: 1; padding: 24px 28px; min-width: 0; }

        /* ── Overlay ── */
        .adm-overlay {
          display: none; position: fixed; inset: 0;
          background: rgba(0,0,0,0.35); z-index: 45;
          backdrop-filter: blur(2px);
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .adm-sidebar { transform: translateX(110%); }
          .adm-sidebar.open { transform: translateX(0); box-shadow: -8px 0 32px rgba(0,0,0,0.15); }
          .adm-main { margin-right: 0; }
          .adm-overlay.open { display: block; }
          .adm-menu-btn { display: flex; }
          .adm-topbar { padding: 0 14px; }
          .adm-content { padding: 16px 14px; }
        }

        @media (max-width: 480px) {
          .adm-topbar-breadcrumb { display: none; }
        }
      `}</style>

      <div className="adm-layout">
        {/* Overlay */}
        <div className={`adm-overlay no-print ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

        {/* Sidebar */}
        <aside className={`adm-sidebar no-print ${sidebarOpen ? "open" : ""}`}>
          <div className="adm-sidebar-logo">
            <div className="adm-logo-icon"><Shield size={18} color="white" /></div>
            <div>
              <div className="adm-logo-name">كارد زون</div>
              <div className="adm-logo-sub">لوحة التحكم</div>
            </div>
          </div>

          <nav className="adm-nav">
            <div className="adm-nav-label">القائمة</div>
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}
                className={`adm-nav-link ${pathname === href ? "active" : ""}`}>
                <Icon size={17} />
                {label}
              </Link>
            ))}
            <div className="adm-nav-label" style={{ marginTop: 12 }}>أخرى</div>
            <a href="/" className="adm-nav-link" target="_blank" rel="noreferrer">
              <ChevronLeft size={17} />
              عرض الموقع
            </a>
          </nav>

          <div className="adm-sidebar-footer">
            <div className="adm-user-info">
              <div className="adm-user-name">{adminUser.name}</div>
              <div className="adm-user-email">{adminUser.email}</div>
            </div>
            <button className="adm-logout-btn" onClick={logout}>
              <LogOut size={15} />
              تسجيل الخروج
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="adm-main">
          <header className="adm-topbar no-print">
            <div className="adm-topbar-left">
              <button className="adm-menu-btn" onClick={() => setSidebarOpen(v => !v)} aria-label="القائمة">
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div>
                <div className="adm-topbar-title">{pageTitle}</div>
                <div className="adm-topbar-breadcrumb">
                  <span>الرئيسية</span>
                  {pathname !== "/admin" && <><ChevronLeft size={11} /><span>{pageTitle}</span></>}
                </div>
              </div>
            </div>
            <div className="adm-avatar">{adminUser.name.charAt(0)}</div>
          </header>

          <main className="adm-content">{children}</main>
        </div>
      </div>
    </>
  );
}
