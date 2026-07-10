import { Suspense } from "react";
import CardsClient from "./components/CardsClient";
import { Product, Category } from "./types";

async function getData(): Promise<{ products: Product[]; categories: Category[] }> {
  const api = process.env.NEXT_PUBLIC_API_URL;
  try {
    const [prodsRes, catsRes] = await Promise.all([
      fetch(`${api}/api/products`, { next: { revalidate: 60 } }),
      fetch(`${api}/api/categories`, { next: { revalidate: 60 } }),
    ]);
    const [products, categories] = await Promise.all([prodsRes.json(), catsRes.json()]);
    return {
      products: Array.isArray(products) ? products : [],
      categories: Array.isArray(categories) ? categories : [],
    };
  } catch {
    return { products: [], categories: [] };
  }
}

export default async function CardsPage() {
  const { products, categories } = await getData();
  return (
    <Suspense>
      <CardsClient initialProducts={products} initialCategories={categories} />
    </Suspense>
  );
}
