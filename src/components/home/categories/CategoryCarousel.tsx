"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Category data
const categories = [
  {
    id: 1,
    name: "Sofa",
    image: "/categories/1.png",
    slug: "sofa",
  },
  {
    id: 2,
    name: "Table",
    image: "/categories/2.png",
    slug: "table",
  },
  {
    id: 3,
    name: "Dining Chair",
    image: "/categories/3.png",
    slug: "dining-chair",
  },
  {
    id: 4,
    name: "Bed",
    image: "/categories/1.png",
    slug: "bed",
  },
  {
    id: 5,
    name: "Cabinet",
    image: "/categories/2.png",
    slug: "cabinet",
  },
];

export default function CategoryCarousel() {
  return (
    <section className='relative overflow-hidden bg-[#FFF8ED]'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 py-12'>
          {/* Left side content */}
          <div className='md:col-span-1'>
            <h2 className='text-[#000000] text-3xl md:text-[40px] font-medium mb-6'>
              Shop
              <br />
              by categories
            </h2>

            <div className='flex items-center mb-6'>
              <div className='w-12 h-12 mr-3'>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  className='text-gray-600'
                >
                  <path d='M20 10V7a2 2 0 00-2-2H6a2 2 0 00-2 2v3m16 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V10m16 0h-2.5a1 1 0 00-1 1v1a1 1 0 01-1 1h-7a1 1 0 01-1-1v-1a1 1 0 00-1-1H4' />
                </svg>
              </div>
              <div>
                <p className='text-lg font-medium'>+200 Unique</p>
                <p className='text-lg font-medium'>Products</p>
              </div>
            </div>

            <Link
              href='/categories'
              className='inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors'
            >
              ALL CATIGORIES
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='ml-2'
              >
                <path
                  d='M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z'
                  fill='currentColor'
                />
              </svg>
            </Link>
          </div>

          {/* Carousel */}
          <div className='md:col-span-3 relative overflow-hidden'>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className='w-full'
            >
              <CarouselContent>
                {categories.map((category) => (
                  <CarouselItem
                    key={category.id}
                    className='basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 pl-2 pr-2'
                  >
                    <Link href={`/category/${category.slug}`}>
                      <div className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                        <div className='relative h-64 w-full'>
                          <Image
                            src={category.image || "/placeholder.svg"}
                            alt={category.name}
                            fill
                            className='object-contain p-4'
                          />
                        </div>
                        <div className='p-4 text-center'>
                          <h3 className='text-xl font-semibold'>
                            {category.name}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className='absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white hover:bg-gray-200 border-none cursor-pointer z-10' />
              <CarouselNext className='absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white hover:bg-gray-200 border-none cursor-pointer z-10' />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
