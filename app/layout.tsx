import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "كارد زون - كل البطاقات الرقمية في مكان واحد",
  description: "اشتري بطاقاتك الرقمية بأفضل الأسعار وتوصيل فوري وأمان 100%",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
