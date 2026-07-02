export interface Brand {
  name: string;
  logo: string;
  color: string;
  textColor: string;
  keywords: string[];
}

export const BRANDS: Brand[] = [
  { name: "Noon",        logo: "/noon-2.webp",       color: "#FEEE00", textColor: "#1a1a1a", keywords: ["noon", "نون"] },
  { name: "Amazon",      logo: "/logo-amazon.webp",   color: "#FF9900", textColor: "#fff",    keywords: ["amazon", "امازون", "أمازون"] },
  { name: "Google Play", logo: "/gp.png",             color: "#01875f", textColor: "#fff",    keywords: ["google", "play", "جوجل"] },
  { name: "PUBG",        logo: "/dddd.webp",          color: "#F5A623", textColor: "#1a1a1a", keywords: ["pubg", "ببجي"] },
  { name: "iTunes",      logo: "/apple-itunes.webp",  color: "#FC3C44", textColor: "#fff",    keywords: ["itunes", "apple", "ايتونز", "ابل"] },
  { name: "Steam",       logo: "/steam.png",          color: "#1b2838", textColor: "#fff",    keywords: ["steam", "ستيم"] },
  { name: "PlayStation", logo: "/pngegg.png",         color: "#003087", textColor: "#fff",    keywords: ["playstation", "ps", "بلايستيشن"] },
];

export interface Product {
  _id: string;
  title: string;
  brief: string;
  image: string;
  price: number;
  currency: string;
  stock: number;
  category: { _id: string; name: string; slug: string };
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export const PRICE_RANGES = [
  { label: "الكل", min: 0, max: Infinity },
  { label: "أقل من 50", min: 0, max: 50 },
  { label: "50 - 100", min: 50, max: 100 },
  { label: "100 - 200", min: 100, max: 200 },
  { label: "أكثر من 200", min: 200, max: Infinity },
];
