"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, LayoutGrid, List, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
import { useGetAllProductsQuery } from "@/redux/features/product/ProductAPI";

type FilterCategory = "Category" | "Color" | "Price" | "Size" | "Material";

export default function ShopPageComponent() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedFilters, setExpandedFilters] = useState<FilterCategory[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    colors: [] as string[],
    sizes: [] as string[],
    materials: [] as string[],
  });

  const ImageURL = process.env.NEXT_PUBLIC_IMAGE_URL;

  const {
    data: products,
    isLoading,
    isError,
  } = useGetAllProductsQuery({
    categories: selectedFilters.categories,
    colors: selectedFilters.colors.join(","),
    sizes: selectedFilters.sizes,
    materials: selectedFilters.materials,
    page: 1,
    limit: 100,
    sortBy: "createdAt",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const toggleFavorite = (productId: number) => {};

  const toggleFilter = (filter: FilterCategory) => {
    setExpandedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const isFilterExpanded = (filter: FilterCategory) =>
    expandedFilters.includes(filter);

  console.log(products?.data);

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-medium text-center mb-6'>Shop</h1>

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
          <div className='space-y-2.5 p-4 w-64'>
            <h3 className='font-medium'>Purchase Options</h3>
            <div className='flex items-center space-x-2'>
              <Checkbox id='buyable' />
              <Label htmlFor='buyable' className='text-sm'>
                Buyable
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox id='rentable' />
              <Label htmlFor='rentable'>Rentable</Label>
            </div>
          </div>

          {["Categories", "Colors", "Sizes", "Materials"].map((filter) => {
            const options =
              products?.meta?.filters?.[
                filter.toLowerCase() as keyof typeof products.meta.filters
              ] || [];

            return (
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
                    {options.map((option: string, index: number) => {
                      const filterKey =
                        filter.toLowerCase() as keyof typeof selectedFilters;
                      const currentValues = selectedFilters[filterKey] || [];

                      return (
                        <div key={index} className='flex items-center'>
                          <input
                            type='checkbox'
                            id={`${filter}-${option}`}
                            className='mr-2'
                            checked={currentValues.includes(option)}
                            onChange={(e) => {
                              const updated = e.target.checked
                                ? [...currentValues, option]
                                : currentValues.filter((val) => val !== option);

                              setSelectedFilters((prev) => ({
                                ...prev,
                                [filterKey]: updated,
                              }));
                            }}
                          />
                          <label htmlFor={`${filter}-${option}`}>
                            {option}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
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
            {products?.data.map((product) => (
              <div
                key={product?._id}
                className={`group ${viewMode === "list" ? "flex gap-8" : ""}`}
              >
                <div className='min-w-[397px] h-[432px] flex items-center justify-center relative bg-gray-100 rounded-lg overflow-hidden mb-3'>
                  <button
                    onClick={() => toggleFavorite(Number(product?._id))}
                    className='absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors'
                    // aria-label={
                    // favorites.includes(product.id)
                    // ? "Remove from favorites"
                    // : "Add to favorites"
                    // }
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        true ? "fill-rose-500 text-rose-500" : "text-gray-600"
                      }`}
                    />
                  </button>

                  <Link
                    href={`/shop/${product?._id}`}
                    className='relative h-full w-full'
                  >
                    <Image
                      src={`${ImageURL}${product?.images[0]}`}
                      alt={product.name}
                      width={897}
                      height={632}
                      className='object-contain p-4'
                    />
                  </Link>
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
