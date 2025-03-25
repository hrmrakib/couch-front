"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Room category data
const roomCategories = [
  {
    id: 1,
    name: "Living Room",
    image: "/bundles/1.jpg",
    slug: "living-room",
  },
  {
    id: 2,
    name: "Bedroom",
    image: "/bundles/2.jpg",
    slug: "bedroom",
  },
  {
    id: 3,
    name: "Dining Room",
    image: "/bundles/3.jpg",
    slug: "dining-room",
  },
  {
    id: 4,
    name: "Home office",
    image: "/bundles/4.jpg",
    slug: "dining-room",
  },
  {
    id: 5,
    name: "Outdoor",
    image: "/bundles/5.jpg",
    slug: "dining-room",
  },
  {
    id: 6,
    name: "Kitchen Room",
    image: "/bundles/6.jpg",
    slug: "dining-room",
  },
];

export default function FurnitureBundles() {
  const [isHovering, setIsHovering] = useState<number | null>(null);

  return (
    <section className='py-8 md:py-16'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-center mb-8'>
          <h2 className='text-2xl md:text-3xl lg:text-[32px] font-medium text-center text-[#000000] max-w-md'>
            Bundles Offers
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
          {roomCategories.map((category) => (
            <Link
              key={category.id}
              href={`/bundles/${category.slug}`}
              className={`relative overflow-hidden rounded-lg`}
              onMouseEnter={() => setIsHovering(category.id)}
              onMouseLeave={() => setIsHovering(null)}
            >
              <div className={`relative w-full h-52 md:h-64 lg:h-80`}>
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    isHovering === category.id ? "scale-110" : "scale-100"
                  } `}
                  sizes={"(max-width: 768px) 100vw, 50vw"}
                  priority
                />

                {/* Dark overlay for text readability */}
                {/* <div className='absolute inset-0 bg-gray-500 bg-opacity-100'></div> */}
                {/* Smooth opacity transition on hover */}

                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-500 ${
                    isHovering === category.id ? "opacity-50" : "opacity-30"
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
