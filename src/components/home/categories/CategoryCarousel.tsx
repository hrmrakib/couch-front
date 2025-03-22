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
              <div className='w-20 h-20 mr-3'>
                <svg
                  width='80'
                  height='80'
                  viewBox='0 0 80 80'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M62.3438 33.9062V51.25H17.6562V33.9062C17.6562 31.0586 15.3477 28.75 12.5 28.75H8.59375C5.14203 28.75 2.34375 31.5483 2.34375 35V47.5C2.34375 54.4036 7.94016 60 14.8438 60H65.1562C72.0598 60 77.6562 54.4036 77.6562 47.5V35C77.6562 31.5483 74.858 28.75 71.4062 28.75H67.5C64.6523 28.75 62.3438 31.0586 62.3438 33.9062Z'
                    stroke='#545454'
                    stroke-width='4'
                    stroke-miterlimit='10'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M62.3438 46.25C62.3438 43.4886 60.1052 41.25 57.3438 41.25H22.6562C19.8948 41.25 17.6562 43.4886 17.6562 46.25M15 60V63.75M65 60V63.75M75 30V28.75C75 21.8464 69.4036 16.25 62.5 16.25H17.5C10.5964 16.25 5 21.8464 5 28.75V30'
                    stroke='#545454'
                    stroke-width='4'
                    stroke-miterlimit='10'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              </div>
              <div>
                <p className='text-xl text-[#545454] font-medium'>
                  +200 Unique
                </p>
                <p className='text-xl text-[#545454] font-medium'>Products</p>
              </div>
            </div>

            <Link
              href='/categories'
              className='inline-flex items-center font-medium text-[#545454] hover:text-[#3f3e3e] transition-colors'
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
              <CarouselContent className='items-end'>
                {categories.map((category, index) => (
                  <CarouselItem
                    key={category.id}
                    className='basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 pl-2 pr-2'
                  >
                    <Link href={`/category/${category.slug}`}>
                      <div
                        className={`${
                          index % 2 === 0 ? "h-[352px]" : "h-[320px]"
                        }  bg-[#FEFEFE] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
                      >
                        <div className='relative h-full w-full'>
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
