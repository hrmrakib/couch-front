"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, LayoutGrid, List, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import Link from "next/link";

// Sample product data
const products = Array(9).fill({
  id: 1,
  name: "ComfiTable",
  monthlyPrice: 20,
  buyPrice: 150,
  rating: 4,
  image: "/shop/1.png", // We'll alternate images
});

// Create three different product images
const productImages = ["/shop/1.png", "/shop/2.png", "/shop/3.png"];

// Assign different images to products
const productsWithImages = products.map((product, index) => ({
  ...product,
  id: index + 1,
  image: productImages[index % 3],
}));

type FilterCategory = "Type" | "Color" | "Price" | "Size" | "Material";

export default function ShopPageComponent() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedFilters, setExpandedFilters] = useState<FilterCategory[]>([]);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleFilter = (filter: FilterCategory) => {
    setExpandedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const isFilterExpanded = (filter: FilterCategory) =>
    expandedFilters.includes(filter);

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-medium text-center mb-6'>Chair</h1>

      <div className='flex justify-between items-center mb-6'>
        <div className='flex space-x-2'>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size='icon'
            onClick={() => setViewMode("list")}
            className='h-9 w-9'
          >
            <LayoutGrid className='h-4 w-4' />
            <span className='sr-only'>List view</span>
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size='icon'
            onClick={() => setViewMode("grid")}
            className='h-9 w-9'
          >
            <List className='h-4 w-4' />
            <span className='sr-only'>Grid view</span>
          </Button>
        </div>

        <div className='w-48'>
          <Select defaultValue='latest'>
            <SelectTrigger className='h-9 ml-auto'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='latest'>Sort by latest</SelectItem>
              <SelectItem value='price-low'>Price: Low to High</SelectItem>
              <SelectItem value='price-high'>Price: High to Low</SelectItem>
              <SelectItem value='popular'>Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-6'>
        {/* Filters sidebar */}
        <div className='w-full md:w-64 space-y-2'>
          {["Type", "Color", "Price", "Size", "Material"].map((filter) => (
            <Collapsible
              key={filter}
              open={isFilterExpanded(filter as FilterCategory)}
              onOpenChange={() => toggleFilter(filter as FilterCategory)}
              className='bg-[#F5F5F5] rounded-md'
            >
              <CollapsibleTrigger className='flex justify-between items-center w-full px-4 py-3 hover:bg-gray-50'>
                <span className='font-medium'>{filter}</span>
                {isFilterExpanded(filter as FilterCategory) ? (
                  <Minus className='h-4 w-4' />
                ) : (
                  <Plus className='h-4 w-4' />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className='px-4 pb-3'>
                <div className='space-y-2'>
                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      id={`${filter}-1`}
                      className='mr-2'
                    />
                    <label htmlFor={`${filter}-1`}>Option 1</label>
                  </div>
                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      id={`${filter}-2`}
                      className='mr-2'
                    />
                    <label htmlFor={`${filter}-2`}>Option 2</label>
                  </div>
                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      id={`${filter}-3`}
                      className='mr-2'
                    />
                    <label htmlFor={`${filter}-3`}>Option 3</label>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        {/* Product grid */}
        <div className='flex-1'>
          <div
            className={`grid ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            } gap-6`}
          >
            {productsWithImages.map((product) => (
              <div
                key={product.id}
                className={`group ${viewMode === "list" ? "flex gap-8" : ""}`}
              >
                <div className='min-w-[397px] h-[432px] relative bg-gray-100 rounded-lg overflow-hidden mb-3'>
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
                      className={`w-6 h-6 ${
                        favorites.includes(product.id)
                          ? "fill-rose-500 text-rose-500"
                          : "text-gray-600"
                      }`}
                    />
                  </button>

                  {/* <div className='relative h-full w-full'> */}
                  <Link
                    href={`/shop/${product.id}`}
                    className='relative h-full w-full'
                  >
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={397}
                      height={432}
                      className='object-contain p-4'
                    />
                  </Link>
                  {/* </div> */}
                </div>

                <div className='w-auto flex flex-col justify-center'>
                  <Link href={`/shop/${product.id}`}>
                    <h3 className='text-2xl text-[#000000] font-medium mb-3'>
                      {product.name}
                    </h3>

                    <div className='flex items-center gap-6 mb-3'>
                      <span className='font-medium'>
                        ${product.monthlyPrice}/mo
                      </span>
                      <span className='text-gray-600'>
                        ${product.buyPrice} to buy
                      </span>
                    </div>

                    <div className='flex mb-3'>
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < product.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                        </svg>
                      ))}
                    </div>

                    {viewMode === "list" && (
                      <p className='text-[#545454] text-sm mb-6'>
                        Upgrade your space with the Comfi Table, this sleek and
                        sturdy table fits seamlessly into any setting. designed
                        for modern living. Whether for studying, working,
                        dining, or relaxing, this sleek and sturdy table fits
                        seamlessly into any setting. Whether for studying,
                        working, dining, or relaxing.
                      </p>
                    )}

                    {viewMode === "list" && (
                      <Button className='w-[126px] h-[43px] bg-primary text-base text-[#4A3300] cursor-pointer rounded-none'>
                        See Details
                      </Button>
                    )}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination className='mt-8'>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                  href='#'
                  className='bg-yellow-500 text-black hover:bg-yellow-600'
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href='#' />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
