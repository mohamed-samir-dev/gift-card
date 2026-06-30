import HeroSection from "./components/HeroSection";
import BrandsSection from "./components/BrandsSection";
import HowItWorksSection from "./components/HowItWorksSection";
import FeaturedProductsSection from "./components/FeaturedProductsSection";
import PaymentSection from "./components/PaymentSection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <BrandsSection />
      <FeaturedProductsSection />
      <HowItWorksSection />
      <PaymentSection />
    </main>
  );
}
