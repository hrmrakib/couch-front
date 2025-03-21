"use client";

import HeroSection from "@/components/home/hero/HeroSection";
import CategoryCarousel from "@/components/home/categories/CategoryCarousel";

export default function Home() {
  return (
    <main className='min-h-[706px]'>
      {/* Hero Section */}
      <HeroSection />

      <CategoryCarousel />
    </main>
  );
}
