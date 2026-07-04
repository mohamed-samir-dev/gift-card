"use client";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
    <button className="pd-back" onClick={() => router.back()}>
      <ArrowRight size={15} />
      رجوع
    </button>
  );
}
