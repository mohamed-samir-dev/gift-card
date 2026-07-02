export interface Wallet {
  balance: number;
  totalRecharge: number;
  totalSpent: number;
}

export interface PaymentMethod {
  id: string;
  label: string;
  img: string;
}

export const AMOUNTS: number[] = [100, 200, 250, 300, 500, 700, 800, 1000];

export const METHODS: PaymentMethod[] = [
  { id: "visa",     label: "فيزا / ماستركارد", img: "/visa.webp" },
  { id: "mada",     label: "مدى",              img: "/mada.webp" },
  { id: "applepay", label: "Apple Pay",         img: "/pay.webp" },
];
