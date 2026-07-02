"use client";

import { useRef, useState } from "react";
import HeroSection from "./HeroSection";
import FiltersBar from "./FiltersBar";
import CardsGrid from "./CardsGrid";
import { Product, Category, PRICE_RANGES, BRANDS } from "../types";

interface CardsClientProps {
  initialProducts: Product[];
  initialCategories: Category[];
}

export default function CardsClient({ initialProducts, initialCategories }: CardsClientProps) {
  const [selectedCat, setSelectedCat] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleBrandClick = (brandName: string | null) => {
    setSelectedBrand(brandName);
    setSelectedCat("all");
    setCurrentPage(1);
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const priceRange = PRICE_RANGES[selectedPrice];
  const filtered = initialProducts.filter((p) => {
    const catOk = selectedCat === "all" || p.category?._id === selectedCat;
    const priceOk = p.price >= priceRange.min && p.price <= priceRange.max;
    const brandOk = !selectedBrand || (() => {
      const brand = BRANDS.find((b) => b.name === selectedBrand);
      if (!brand) return true;
      const haystack = `${p.title} ${p.category?.name ?? ""}`.toLowerCase();
      return brand.keywords.some((kw) => haystack.includes(kw.toLowerCase()));
    })();
    return catOk && priceOk && brandOk;
  });

  const handleClear = () => {
    setSelectedCat("all");
    setSelectedPrice(0);
    setSelectedBrand(null);
    setCurrentPage(1);
  };

  return (
    <main>
      <HeroSection selectedBrand={selectedBrand} onBrandClick={handleBrandClick} />
      <div ref={gridRef}>
        <FiltersBar
          categories={initialCategories}
          selectedCat={selectedCat}
          selectedPrice={selectedPrice}
          selectedBrand={selectedBrand}
          count={filtered.length}
          loading={false}
          onCatChange={(id) => { setSelectedCat(id); setSelectedBrand(null); setCurrentPage(1); }}
          onPriceChange={(i) => { setSelectedPrice(i); setCurrentPage(1); }}
          onClear={handleClear}
        />
        <CardsGrid products={filtered} loading={false} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </main>
  );
}
