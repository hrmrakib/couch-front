"use client";

import HeroSection from "@/components/home/hero/HeroSection";
import CategoryCarousel from "@/components/home/categories/CategoryCarousel";
import FeaturedItems from "@/components/home/feature-items/FeatureItems";
import FurnitureBundles from "@/components/home/funniture-bundles.tsx/FurnitureBundles";
import ComfortZone from "@/components/home/comfort-zone/ComfortZone";
import FurnitureSection from "@/components/home/comfort-zone/FurnitureSection";
import FurnitureBanner from "@/components/home/furnitures/FurnitureBanner";
export default function Home() {
  return (
    <main className='min-h-[706px]'>
      {/* Hero Section */}
      <HeroSection />

      <CategoryCarousel />

      <FeaturedItems />

      <FurnitureBundles />

      <ComfortZone />

      <FurnitureSection />

      <FurnitureBanner />
    </main>
  );
}
