import HeroSection from "./components/HeroSection";
import BrandsSection from "./components/BrandsSection";
import HowItWorksSection from "./components/HowItWorksSection";
import FeaturedProductsSection from "./components/FeaturedProductsSection";
import CategoryProductsSection from "./components/CategoryProductsSection";
import PaymentSection from "./components/PaymentSection";

const API = process.env.NEXT_PUBLIC_API_URL;

async function getFeaturedProducts() {
  try {
    const res = await fetch(`${API}/api/products?featured=true`, { next: { revalidate: 60 } });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch { return []; }
}

async function getCategorySections() {
  try {
    const catsRes = await fetch(`${API}/api/categories`, { next: { revalidate: 60 } });
    const cats = await catsRes.json();
    if (!Array.isArray(cats)) return [];

    const sections = await Promise.all(
      cats.map(async (cat: { slug: string; name: string }) => {
        const res = await fetch(`${API}/api/products?category=${cat.slug}`, { next: { revalidate: 60 } });
        const products = await res.json();
        return {
          slug: cat.slug,
          name: cat.name,
          products: Array.isArray(products) ? products.slice(0, 6) : [],
        };
      })
    );
    return sections.filter((s) => s.products.length > 0);
  } catch { return []; }
}

export default async function Home() {
  const [featured, sections] = await Promise.all([getFeaturedProducts(), getCategorySections()]);

  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <BrandsSection />
      <FeaturedProductsSection products={featured} />
      <CategoryProductsSection sections={sections} />
      <HowItWorksSection />
      <PaymentSection />
    </main>
  );
}
