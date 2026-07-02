"use client";

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { useCart } from "./CartContext";

const API = process.env.NEXT_PUBLIC_API_URL;

interface AuthUser { _id: string; name: string; email: string; role: string; }
interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (token: string, user: AuthUser) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { loadUserCart, resetCartState } = useCart();
  const initializedRef = useRef(false);

  // Load from localStorage on mount and restore cart from DB
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      loadUserCart(savedToken);
    }
    setIsLoading(false);
  }, [loadUserCart]);

  const login = async (newToken: string, newUser: AuthUser) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    await loadUserCart(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    resetCartState();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
