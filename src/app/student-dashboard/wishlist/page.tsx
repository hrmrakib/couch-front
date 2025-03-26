import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const wishlistItems = [
  {
    id: 1,
    name: "Williey chair",
    price: "$120.00",
    color: "Orange",
    imageUrl: "/order/1.png",
  },
  {
    id: 2,
    name: "Williey chair",
    price: "$120.00",
    color: "Orange",
    imageUrl: "/order/1.png",
  },
];

const Wishlist = () => {
  return (
    <div>
      <div className='space-y-6'>
        {wishlistItems.map((item, index) => (
          <div
            key={index}
            className='flex flex-col sm:flex-row items-start gap-4 sm:items-center'
          >
            <div className='bg-[#F5F5F5] p-4 w-full sm:w-auto'>
              <Image
                src={item.imageUrl || "/placeholder.svg"}
                alt={item.name}
                width={100}
                height={120}
                className='object-contain mx-auto'
              />
            </div>

            <div className='flex-1'>
              <h3 className='text-xl md:text-2xl font-bold text-[#333333]'>
                {item.name}
              </h3>
              <p className='text-base md:text-lg font-medium mt-1'>
                {item.price}
              </p>
              <p className='text-[#333333] text-lg font-medium mt-1'>
                Color : {item.color}
              </p>
            </div>

            <div className='flex items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0'>
              <button className='bg-[#FDB515] hover:bg-amber-500 text-black font-medium py-3 px-6 w-full sm:w-auto cursor-pointer'>
                Add To Cart
              </button>
              <button className='text-gray-500 hover:text-gray-700 p-2 cursor-pointer'>
                <Trash2 className='h-6 w-6' />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
