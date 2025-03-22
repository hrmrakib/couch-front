"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

// Product data
const products = [
  {
    id: 1,
    name: "ComfiTable",
    image: "/home/features/1.png",
    monthlyPrice: 20,
    buyPrice: 150,
    rating: 4,
    category: ["best-selling", "trending-now"],
  },
  {
    id: 2,
    name: "ComfiTable",
    image: "/home/features/2.png",
    monthlyPrice: 20,
    buyPrice: 150,
    rating: 4,
    category: ["best-selling", "most-rented"],
  },
  {
    id: 3,
    name: "ComfiTable",
    image: "/home/features/3.png",
    monthlyPrice: 20,
    buyPrice: 150,
    rating: 4,
    category: ["most-rented", "trending-now"],
  },
  {
    id: 4,
    name: "ComfiTable",
    image: "/home/features/4.png",
    monthlyPrice: 20,
    buyPrice: 150,
    rating: 4,
    category: ["best-selling", "trending-now"],
  },
];

export default function ComfortZone() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className='my-20 bg-[#FFFFFF]'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
          <h2 className='text-3xl md:text-[40px] text-[#000000] font-semibold'>
            The Comfort Zone
          </h2>

          <div className='flex space-x-3 mt-4 md:mt-0'>
            <Link
              href='/furniture'
              className='text-[#545454] text-lg font-semibold hover:text-[#434343] transition-colors'
            >
              See all
            </Link>
          </div>
        </div>

        <p className='text-[#545454] text-lg mb-8'>
          Trending Now: Best-Selling & Most-Rented Items!
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {products?.map((product) => (
            <div key={product.id} className='group'>
              <div className='relative bg-gray-100 rounded-lg overflow-hidden mb-3'>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className='absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors'
                  aria-label={
                    favorites.includes(product.id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </button>

                <Link href={`/product/${product.id}`}>
                  <div className='relative h-64 w-full'>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className='object-contain p-4'
                    />
                  </div>
                </Link>
              </div>

              <Link href={`/product/${product.id}`}>
                <h3 className='text-xl md:text-[32px] text-[#000000] font-medium mb-1'>
                  {product.name}
                </h3>
              </Link>

              <div className='flex justify-between mb-2'>
                <span className='text-[#000000] text-lg font-medium'>
                  ${product.monthlyPrice}/mo
                </span>
                <span className='text-[##333333] text-lg'>
                  ${product.buyPrice} to buy
                </span>
              </div>

              <div className='flex'>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < product.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
