import Link from "next/link";
import Image from "next/image";

export default function FurnitureBanner() {
  return (
    <section className='py-8 md:py-20'>
      <div className='container mx-auto px-4'>
        <div className='h-[530px] relative bg-[#F6FEC6] rounded-3xl overflow-hidden'>
          <div className='flex flex-col md:flex-row items-center h-full'>
            <div className='w-full md:w-1/2 p-8 md:p-12 lg:p-16'>
              <h1 className='text-3xl md:text-4xl lg:text-[64px] font-semibold text-[#333333] leading-tight mb-8'>
                Transform Your Space with Comfort & Style
              </h1>

              <Link
                href='/shop'
                className='inline-flex items-center px-8 py-3 bg-primary hover:bg-primary/80 transition-colors rounded-md text-[#4A3300] font-medium'
              >
                Shop Now
              </Link>
            </div>

            <div className='absolute -bottom-10 -right-16 w-full md:w-[667px]'>
              <div className='relative h-64 md:h-80 lg:h-[536px] w-full'>
                <Image
                  src='/home/furnitures/furniture-banner.png'
                  alt='Comfortable sofa with colorful pillows'
                  width={667}
                  height={500}
                  className='object-cover'
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
