"use client";

import React from "react";
import Image from "next/image";

const features = [
  {
    title: "Free Delivery",
    description: "Fast & Free Delivery on all orders! No hidden charges.",
  },
  {
    title: "Free Setup",
    description: "We assemble your furniture for free, so you don't have to.",
  },
  {
    title: "Free Delivery",
    description:
      "Flexible options: Own it forever or rent it for as long as you need.",
  },
  {
    title: "Easy Student Resale",
    description: "Students can list and sell used furniture with a few clicks.",
  },
];

export default function AboutPage() {
  return (
    <div className='bg-[#F7F7F7] pb-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
        <h1 className='text-3xl md:text-[40px] font-medium text-center text-[#545454] mb-12 md:mb-16'>
          About Us
        </h1>

        <div className='flex flex-col md:flex-row gap-8 mb-12 md:mb-6'>
          <div className='flex flex-col md:flex-row gap-8 lg:gap-[135px] mb-6'>
            {/* Left Column */}
            <div className='flex-1'>
              <h2 className='text-2xl md:text-[32px] font-medium text-[#333333]'>
                Your One-Stop Destination for Buying & Renting Furniture!
              </h2>
            </div>

            {/* Right Column */}
            <div className='flex-1'>
              <p className='text-[#545454] text-lg'>
                Finding the right furniture should be easy, affordable, and
                stress-free. Whether you&apos;re looking to buy, rent, or even
                sell your own furniture, we provide a seamless experience
                designed especially for students and renters.
              </p>
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div className='mb-12 md:mb-16'>
          <Image
            src='/about/about.jpg'
            alt='Students looking at furniture options on a laptop'
            width={1200}
            height={600}
            className='rounded-lg object-cover h-[300px] lg:h-[781px] w-full'
          />
        </div>

        {/* Features Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
          {/* Feature 1 */}
          <div className='bg-[#FFFFFF] p-6 rounded-lg'>
            <div className='flex items-start mb-4'>
              <span className='flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 text-yellow-500 font-semibold mr-3 flex-shrink-0 text-sm'>
                1
              </span>
              <h3 className='font-medium text-base'>
                Flexible Buy & Rent Options
              </h3>
            </div>
            <p className='text-gray-600 text-sm ml-9'>
              Choose between buying or renting furniture based on your needs.
              Whether you need it for the short term or long term, we offer
              flexible solutions to match your lifestyle.
            </p>
          </div>

          {/* Feature 2 */}
          <div className='bg-[#FFFFFF] p-6 rounded-lg'>
            <div className='flex items-start mb-4'>
              <span className='flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 text-yellow-500 font-semibold mr-3 flex-shrink-0 text-sm'>
                2
              </span>
              <h3 className='font-medium text-base'>Exclusive Bundle Deals</h3>
            </div>
            <p className='text-gray-600 text-sm ml-9'>
              Furnish your entire room with our curated combo packages for
              living rooms, bedrooms, and dining spaces—making it easier and
              more affordable to set up your home.
            </p>
          </div>

          {/* Feature 3 */}
          <div className='bg-[#FFFFFF] p-6 rounded-lg'>
            <div className='flex items-start mb-4'>
              <span className='flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 text-yellow-500 font-semibold mr-3 flex-shrink-0 text-sm'>
                3
              </span>
              <h3 className='font-medium text-base'>
                Fast Delivery & Free Setup
              </h3>
            </div>
            <p className='text-gray-600 text-sm ml-9'>
              Furnish your entire room with our curated combo packages for
              living rooms, bedrooms, and dining spaces—making it faster and
              more enjoyable to set up your home.
            </p>
          </div>

          {/* Feature 4 */}
          <div className='bg-white p-6 rounded-lg'>
            <div className='flex items-start mb-4'>
              <span className='flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 text-yellow-500 font-semibold mr-3 flex-shrink-0 text-sm'>
                2
              </span>
              <h3 className='font-medium text-base'>Student Marketplace</h3>
            </div>
            <p className='text-gray-600 text-sm ml-9'>
              Students can sell their own furniture directly through our
              platform, allowing them to earn money while making furniture
              accessible to others.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16'>
        <div className='text-center mb-12'>
          <h1 className='text-3xl md:text-[40px] font-bold mb-4'>
            How It Works
          </h1>
          <p className='text-[#545454] text-lg max-w-[450px] mx-auto'>
            Simple. Fast. Hassle-Free. Rent or Buy Your Perfect Furniture in
            Just a Few Steps.
          </p>
        </div>

        <div className='flex flex-col md:flex-row gap-8 lg:gap-16'>
          {/* Left side - Image */}
          <div className='md:w-1/2'>
            <div className='relative h-[400px] md:h-full w-full lg:mt-10'>
              <Image
                src='/about/desk.jpg'
                alt='Cozy living space with furniture'
                fill
                className='object-cover rounded'
              />
              <Image
                src='/about/sofa.jpg'
                alt='Cozy living space with furniture'
                width={300}
                height={300}
                className='absolute -top-10 -left-10 w-[284px] h-[331px] object-cover rounded'
              />
            </div>
          </div>

          {/* Right side - Features */}
          <div className='md:w-1/2'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              {/* Feature 2 */}
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className='bg-[#FFFFFF] p-6 rounded-lg shadow flex flex-col items-center text-center'
                >
                  <div className='w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center mb-4'>
                    <svg
                      width='80'
                      height='81'
                      viewBox='0 0 80 81'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g clip-path='url(#clip0_1277_3643)'>
                        <path
                          d='M40 80.5C62.0914 80.5 80 62.5914 80 40.5C80 18.4086 62.0914 0.5 40 0.5C17.9086 0.5 0 18.4086 0 40.5C0 62.5914 17.9086 80.5 40 80.5Z'
                          fill='url(#paint0_linear_1277_3643)'
                        />
                        <path
                          d='M67.2501 36.082C67.0001 34.1654 65.9168 32.582 64.3334 31.4987C63.5001 30.9154 62.5001 30.582 61.5834 30.332C60.8334 23.9154 55.3334 18.832 48.6668 18.832H31.3334C24.6668 18.832 19.1668 23.9987 18.4168 30.4987C17.0001 30.7487 15.6668 31.4987 14.5834 32.4987C13.2501 33.832 12.5001 35.7487 12.5834 37.6654V49.2487C12.5834 52.7487 15.0001 55.6654 18.3334 56.332V60.832C18.3334 61.6654 19.0001 62.2487 19.7501 62.2487C20.5834 62.2487 21.1668 61.582 21.1668 60.832V56.4987H58.7501V60.832C58.7501 61.6654 59.4168 62.2487 60.1668 62.2487C60.9168 62.2487 61.5834 61.582 61.5834 60.832V56.332C64.9168 55.6654 67.3334 52.7487 67.3334 49.1654V37.4987C67.4168 37.1654 67.4168 36.6654 67.2501 36.082ZM31.3334 21.7487H48.6668C53.8334 21.7487 58.0001 25.582 58.6668 30.4987C55.1668 31.332 52.9168 34.4987 53.0001 37.9154V41.9987H27.0001V37.9154C27.1668 34.4154 24.7501 31.2487 21.3334 30.4987C22.0001 25.582 26.2501 21.7487 31.3334 21.7487ZM64.5834 49.1654C64.5834 51.582 62.6668 53.4987 60.2501 53.4987H19.7501C17.3334 53.4987 15.4168 51.582 15.4168 49.1654V37.582C15.4168 36.4154 15.8334 35.2487 16.6668 34.4987C17.4168 33.6654 18.4168 33.2487 19.4168 33.1654C19.5834 33.1654 19.6668 33.2487 19.7501 33.2487C19.8334 33.2487 20.0001 33.2487 20.1668 33.1654H20.4168C22.5834 33.582 24.1668 35.582 24.0001 37.7487V43.332C24.0001 44.1654 24.6668 44.7487 25.4168 44.7487H54.3334C55.1668 44.7487 55.7501 44.082 55.7501 43.332V37.7487C55.6668 35.582 57.1668 33.6654 59.3334 33.1654H59.5834C59.7501 33.2487 59.9168 33.2487 60.0834 33.2487C60.3334 33.2487 60.4168 33.1654 60.5834 33.1654C61.2501 33.2487 61.9168 33.4987 62.5001 33.9154C63.4168 34.582 64.0001 35.582 64.2501 36.7487C64.2501 36.832 64.2501 36.9987 64.3334 36.9987C64.4168 37.1654 64.4168 37.332 64.4168 37.582V49.1654H64.5834Z'
                          fill='white'
                        />
                      </g>
                      <defs>
                        <linearGradient
                          id='paint0_linear_1277_3643'
                          x1='40'
                          y1='80.5'
                          x2='40'
                          y2='0.5'
                          gradientUnits='userSpaceOnUse'
                        >
                          <stop stop-color='#FC4A1A' />
                          <stop offset='1' stop-color='#FDB13A' />
                        </linearGradient>
                        <clipPath id='clip0_1277_3643'>
                          <rect
                            width='80'
                            height='80'
                            fill='white'
                            transform='translate(0 0.5)'
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <h3 className='font-semibold text-lg mb-2'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600 text-sm'>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
