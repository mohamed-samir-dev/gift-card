import HeroSection from "./components/HeroSection";
import BrandsSection from "./components/BrandsSection";
import HowItWorksSection from "./components/HowItWorksSection";
import FeaturedProductsSection from "./components/FeaturedProductsSection";
import PaymentSection from "./components/PaymentSection";

async function getFeaturedProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return Array.isArray(data) ? data.slice(0, 6) : [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <BrandsSection />
      <FeaturedProductsSection products={products} />
      <HowItWorksSection />
      <PaymentSection />
    </main>
  );
}
