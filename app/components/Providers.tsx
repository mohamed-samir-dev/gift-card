"use client";

import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <AuthProvider>
        {children}
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      </AuthProvider>
    </CartProvider>
  );
}
