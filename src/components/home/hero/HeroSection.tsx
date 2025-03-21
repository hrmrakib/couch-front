"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  const handleShopNow = () => {
    router.push("/shop");
  };

  const handleSellFurniture = () => {
    router.push("/sell");
  };

  return (
    <main className='min-h-[706px]'>
      {/* Hero Section */}
      <section className='relative w-full overflow-hidden bg-[#2A4190] text-white'>
        <div className='container mx-auto px-4 py-12 md:py-16 lg:py-20 relative z-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
            <div className=''>
              <h1 className='max-w-[600px] text-4xl md:text-5xl lg:text-[56px] font-bold text-[#FFFFFF] leading-tight mb-6'>
                Affordable & Sustainable Furniture for Students
              </h1>
              <p className='text-lg mb-8 text-[#E6E6E6] opacity-90 leading-relaxed'>
                Couch makes it easy for students to buy and rent affordable,
                high-quality second-hand furniture. Our mission is to create a
                sustainable, budget-friendly solution for furnishing student
                spaces effortlessly.
              </p>

              <div className='flex flex-wrap gap-4 mb-12'>
                <button
                  onClick={handleShopNow}
                  className='px-8  h-12 bg-[#FDB515] text-xl text-[#4A3300] font-semibold rounded hover:bg-[#e9aa10] transition-colors cursor-pointer'
                >
                  Shop Now
                </button>
                <button
                  onClick={handleSellFurniture}
                  className='px-8 py-3 border-2 border-white text-[#FFFFFF] font-semibold rounded hover:bg-white hover:text-[#2A4190] transition-colors'
                >
                  Sell Your Furniture
                </button>
              </div>

              <div className='grid grid-cols-3 gap-4'>
                <div>
                  <h3 className='text-3xl md:text-4xl font-bold text-[#FFFFFF]'>25k+</h3>
                  <p className='text-sm md:text-base opacity-80 text-[#FFFFFF]'>
                    Unique Styles
                  </p>
                </div>
                <div>
                  <h3 className='text-3xl md:text-4xl font-bold text-[#FFFFFF]'>50k</h3>
                  <p className='text-sm md:text-base opacity-80 text-[#FFFFFF]'>
                    Happy Customer
                  </p>
                </div>
                <div>
                  <h3 className='text-3xl md:text-4xl font-bold text-[#FFFFFF]'>100</h3>
                  <p className='text-sm md:text-base opacity-80 text-[#FFFFFF]'>
                    Certified Outlets
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`border-2 border-red-500 relative w-[400px] md:w-[730px] h-[300px] md:h-[593px]`}
            >
              <Image
                src='/home/hero-banner.png'
                alt='Sustainable furniture showcase'
                width={900}
                height={700}
                className='border-2 border-blue-500 object-cover w-full md:h-[120%]'
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
