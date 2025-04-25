"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/features/product/ProductAPI";
import {
  useAddToWishlistMutation,
  useExistWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/redux/features/wishlist/wistlistAPI";
import { toast } from "sonner";

type FilterCategory = "-price" | "createdAt" | "-rating";

export default function FeaturedItems() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("createdAt");
  const ImageURL = process.env.NEXT_PUBLIC_IMAGE_URL;
  const [addToWishlist] = useAddToWishlistMutation();
  const [deleteToWishlist] = useRemoveFromWishlistMutation();

  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetAllProductsQuery({
    sortBy: activeFilter,
  });

  if (isLoading) {
    return <div className='text-center'>Loading...</div>;
  }
  if (isError) {
    <div>Error</div>;
  }

  const toggleFavorite = async (productId: string, isFavorite: boolean) => {
    try {
      if (isFavorite) {
        await deleteToWishlist({ productId }).unwrap();
      } else {
        await addToWishlist({ productId }).unwrap();
      }
    } catch {
      toast.error("Failed to update wishlist. Please try to login.");
    }
  };

  interface Product {
    _id: string;
    name: string;
    images: string[];
    price: number;
    isRentable?: boolean;
    isBuyable?: boolean;
    rating: number;
  }

  const ProductCard = ({ product }: { product: Product }) => {
    const { data, refetch } = useExistWishlistQuery({
      productId: product?._id,
    });

    return (
      <div key={product?._id} className={`group`}>
        <div className='h-[300px] flex items-center justify-center relative bg-gray-100 rounded-lg overflow-hidden mb-3'>
          <button
            onClick={() => (
              toggleFavorite(product?._id, data?.data?.wishlist), refetch()
            )}
            className='absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors'
          >
            <Heart
              className={`w-6 h-6 ${
                data?.data?.wishlist
                  ? "fill-rose-500 text-rose-500"
                  : "text-gray-600"
              }`}
            />
          </button>

          <Link
            href={`/shop/${product?._id}`}
            className='relative h-full w-full flex items-center justify-center rounded-lg overflow-hidden'
          >
            <Image
              src={`${ImageURL}${product?.images[0]}`}
              alt={product.name}
              width={897}
              height={632}
              className='object-cover p-4'
            />
          </Link>
        </div>

        <div className='w-auto flex flex-col justify-center'>
          <Link href={`/shop/${product._id}`}>
            <h3 className='text-2xl text-[#000000] font-medium mb-3'>
              {product.name}
            </h3>

            <div className='flex items-center gap-6 mb-3'>
              {product?.isRentable && (
                <span className='font-medium'>${product.price}/mo</span>
              )}
              {product?.isBuyable && (
                <span className='text-gray-600'>${product.price} to Buy</span>
              )}
            </div>

            <div className='flex mb-3'>
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
          </Link>
        </div>
      </div>
    );
  };

  return (
    <section className='my-20 bg-[#FFFFFF]'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-2'>
          <h2 className='text-3xl md:text-[40px] text-[#000000] font-semibold'>
            Featured Items
          </h2>

          <div className='flex space-x-3 mt-4 md:mt-0'>
            <button
              onClick={() => setActiveFilter("createdAt")}
              className={`px-4 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                activeFilter === "createdAt"
                  ? "bg-primary text-[#4A3300]"
                  : "border border-gray-300 text-[#545454] hover:bg-gray-50"
              }`}
            >
              Best Selling
            </button>

            <button
              onClick={() => setActiveFilter("-price")}
              className={`px-4 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                activeFilter === "-price"
                  ? "bg-primary text-[#4A3300]"
                  : "border border-gray-300 text-[#545454] hover:bg-gray-50"
              }`}
            >
              Most Rented
            </button>

            <button
              onClick={() => setActiveFilter("-rating")}
              className={`px-4 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                activeFilter === "-rating"
                  ? "bg-primary text-[#4A3300]"
                  : "border border-gray-300 text-[#545454] hover:bg-gray-50"
              }`}
            >
              Trending Now
            </button>
          </div>
        </div>

        <p className='text-[#545454] text-lg mb-8'>
          Trending Now: Best-Selling & Most-Rented Items!
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {productsData?.data?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className='flex justify-center mt-[72px]'>
          <Link
            href='/shop'
            className='inline-flex items-center text-[#4A3300] text-lg font-semibold hover:text-[#4a3300c8] transition-colors'
          >
            View All Furniture
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='ml-2'
            >
              <path
                d='M4.16667 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
