"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useBundleListQuery } from "@/redux/features/bundle/bundleApi";

export default function FurnitureBundles() {
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const ImageURL = process.env.NEXT_PUBLIC_IMAGE_URL;

  const { data: bundles } = useBundleListQuery({});

  console.log(bundles?.data[0]);

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
          <Link
            key={bundles?.data[0]._id}
            href={`/bundles/${bundles?.data[0]._id}`}
            className={`relative overflow-hidden rounded-lg ${
              false ? "md:col-span-2" : ""
            }`}
            onMouseEnter={() => setIsHovering(bundles?.data[0]._id)}
            onMouseLeave={() => setIsHovering(null)}
          >
            <div
              className={`relative w-full h-52 md:h-64  ${
                false ? "lg:h-[600px]" : "lg:h-80"
              }`}
            >
              {false && <div className='md:pt-[30%] lg:pt-[25%]' />}

              {ImageURL && bundles?.data[0]?.images?.[0] && (
                <Image
                  src={`${ImageURL}${bundles.data[0].images[0]}`}
                  alt={bundles.data[0].name || "Furniture bundle"}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    isHovering === bundles?.data[0]._id
                      ? "scale-110"
                      : "scale-100"
                  }`}
                  sizes='100vw'
                  priority
                />
              )}

              <div
                className={`absolute inset-0 bg-black transition-opacity duration-500 ${
                  isHovering === bundles?.data[0]._id
                    ? "opacity-50"
                    : "opacity-30"
                }`}
              ></div>

              {/* Text overlay */}
              <div className='absolute inset-0 flex items-center justify-center'>
                <h3 className='text-white text-3xl md:text-4xl font-bold'>
                  {bundles?.data[0]._id.name}
                </h3>
              </div>
            </div>
          </Link>

          <Link
            key={bundles?.data[1]._id}
            href={`/bundles/${bundles?.data[1]._id}`}
            className={`relative overflow-hidden rounded-lg ${
              false ? "md:col-span-2" : ""
            }`}
            onMouseEnter={() => setIsHovering(bundles?.data[1]._id)}
            onMouseLeave={() => setIsHovering(null)}
          >
            <div
              className={`relative w-full h-52 md:h-64  ${
                false ? "lg:h-[600px]" : "lg:h-80"
              }`}
            >
              {false && <div className='md:pt-[30%] lg:pt-[25%]' />}

              {ImageURL && bundles?.data[1]?.images?.[1] && (
                <Image
                  src={`${ImageURL}${bundles.data[1].images[0]}`}
                  alt={bundles.data[1].name || "Furniture bundle"}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    isHovering === bundles?.data[1]._id
                      ? "scale-110"
                      : "scale-100"
                  }`}
                  sizes='100vw'
                  priority
                />
              )}

              <div
                className={`absolute inset-0 bg-black transition-opacity duration-500 ${
                  isHovering === bundles?.data[1]._id
                    ? "opacity-50"
                    : "opacity-30"
                }`}
              ></div>

              {/* Text overlay */}
              <div className='absolute inset-0 flex items-center justify-center'>
                <h3 className='text-white text-3xl md:text-4xl font-bold'>
                  {bundles?.data[1]._id.name}
                </h3>
              </div>
            </div>
          </Link>

          <Link
            key={bundles?.data[2]._id}
            href={`/bundles/${bundles?.data[2]._id}`}
            className={`relative overflow-hidden rounded-lg ${
              true ? "md:col-span-2" : ""
            }`}
            onMouseEnter={() => setIsHovering(bundles?.data[2]._id)}
            onMouseLeave={() => setIsHovering(null)}
          >
            <div
              className={`relative w-full h-52 md:h-64  ${
                true ? "lg:h-[600px]" : "lg:h-80"
              }`}
            >
              {true && <div className='md:pt-[30%] lg:pt-[25%]' />}

              {ImageURL && bundles?.data[2]?.images?.[0] && (
                <Image
                  src={`${ImageURL}${bundles.data[2].images[0]}`}
                  alt={bundles.data[2].name || "Furniture bundle"}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    isHovering === bundles?.data[2]._id
                      ? "scale-110"
                      : "scale-100"
                  }`}
                  sizes='100vw'
                  priority
                />
              )}

              <div
                className={`absolute inset-0 bg-black transition-opacity duration-500 ${
                  isHovering === bundles?.data[2]._id
                    ? "opacity-50"
                    : "opacity-30"
                }`}
              ></div>

              {/* Text overlay */}
              <div className='absolute inset-0 flex items-center justify-center'>
                <h3 className='text-white text-3xl md:text-4xl font-bold'>
                  {bundles?.data[2]._id.name}
                </h3>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
