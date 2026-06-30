export interface Product {
  _id: string;
  title: string;
  brief: string;
  description: string;
  details?: Record<string, string>;
  image: string;
  price: number;
  currency: string;
  stock: number;
  unlimitedStock: boolean;
  category: { name: string; slug: string };
}
