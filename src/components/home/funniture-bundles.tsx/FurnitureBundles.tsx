"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

// Room category data
const roomCategories = [
  {
    id: 1,
    name: "Living Room",
    image: "/home/furnitures/1.jpg",
    slug: "living-room",
  },
  {
    id: 2,
    name: "Bedroom",
    image: "/home/furnitures/2.jpg",
    slug: "bedroom",
  },
  {
    id: 3,
    name: "Dining Room",
    image: "/home/furnitures/3.jpg",
    slug: "dining-room",
    fullWidth: true,
  },  
];

export default function FurnitureBundles() {
  const [isHovering, setIsHovering] = useState<number | null>(null);

  return (
    <section className='py-8 md:py-12'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row md:items-center justify-between mb-8'>
          <h2 className='text-2xl md:text-3xl lg:text-[32px] font-bold text-[#000000] max-w-md'>
            Discover the Perfect Furniture Bundle for Your Space
          </h2>

          <Link
            href='/bundles'
            className='mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-[#FFCA28] hover:bg-[#FFB300] transition-colors rounded-md text-black font-medium'
          >
            <Plus className='w-5 h-5 mr-2' />
            Bundles
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
          {roomCategories.map((category) => (
            <Link
              key={category.id}
              href={`/bundles/${category.slug}`}
              className={`relative overflow-hidden rounded-lg ${
                category.fullWidth ? "md:col-span-2" : ""
              }`}
              onMouseEnter={() => setIsHovering(category.id)}
              onMouseLeave={() => setIsHovering(null)}
            >
              <div
                className={`relative w-full h-52 md:h-64  ${
                  category.fullWidth ? "lg:h-[600px]" : "lg:h-80"
                }`}
              >
                {category.fullWidth && (
                  <div className='md:pt-[30%] lg:pt-[25%]' />
                )}
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    isHovering === category.id ? "scale-110" : "scale-100"
                  } `}
                  sizes={
                    category.fullWidth
                      ? "100vw"
                      : "(max-width: 768px) 100vw, 50vw"
                  }
                  priority
                />

                {/* Dark overlay for text readability */}
                {/* <div className='absolute inset-0 bg-gray-500 bg-opacity-100'></div> */}
                {/* Smooth opacity transition on hover */}
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-500 ${
                    isHovering === category.id
                      ? "opacity-50"
                      : "opacity-30"
                  }`}
                ></div>

                {/* Text overlay */}
                <div className='absolute inset-0 flex items-center justify-center'>
                  <h3 className='text-white text-3xl md:text-4xl font-bold'>
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
