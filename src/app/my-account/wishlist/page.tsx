"use client";

import { useAddToCartMutation } from "@/redux/features/product/ProductAPI";
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/redux/features/wishlist/wistlistAPI";
import { getCurrentUser } from "@/service/authService";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const Wishlist = () => {
  const [addToCart] = useAddToCartMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const router = useRouter();

  const ImageURl = process.env.NEXT_PUBLIC_IMAGE_URL;

  const {
    data: wishlistItems,
    isLoading,
    refetch,
  } = useGetWishlistQuery({
    page: 1,
    limit: 10,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <h2 className='text-2xl font-bold'>Your Wishlist is Empty</h2>
        <p className='text-gray-500 mt-4'>
          Start adding items to your wishlist to keep track of your favorites!
        </p>
      </div>
    );
  }

  const handleAddToCart = async (productId) => {
    getCurrentUser().then((res) => {
      if (!res) {
        toast.error("Please login to add items to your cart.");
        router.push("/login");
      }
    });

    const res = await addToCart({
      productId: productId || "",
      data: {
        quantity: 1,
        // rentalLength: rentalLength,
      },
    }).unwrap();

    if (res?.success) {
      toast.success(res.message);
      refetch();
    } else {
      toast.error("Failed to add to cart. Please try again.");
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    const res = await removeFromWishlist({ productId }).unwrap();
    if (res?.success) {
      toast.success(res.message);
      refetch();
    } else {
      toast.error("Failed to remove from wishlist. Please try again.");
    }
  };

  console.log(wishlistItems?.data);

  return (
    <div>
      <div className='space-y-6'>
        {wishlistItems?.data.map(
          (item: {
            _id: string;
            name: string;
            price: string;
            images: [string];
            color: string;
          }) => (
            <div
              key={item._id}
              className='flex flex-col sm:flex-row items-start gap-4 sm:items-center'
            >
              <div className='bg-[#F5F5F5] p-4 w-full sm:w-auto'>
                <Image
                  src={
                    ImageURl && item?.images
                      ? `${ImageURl}${item?.images[0]}`
                      : "/default-avatar.png"
                  }
                  alt='Profile'
                  width={120}
                  height={120}
                  className='object-cover'
                />
              </div>

              <div className='flex-1'>
                <h3 className='text-xl md:text-2xl font-bold text-[#333333]'>
                  {item.name}
                </h3>
                <p className='text-base md:text-lg font-medium mt-1'>
                  Price: {item.price}
                </p>
                <p className='text-[#333333] text-lg font-medium mt-1'>
                  Color : {item.color}
                </p>
              </div>

              <div className='flex items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0'>
                <button
                  onClick={() => handleAddToCart(item._id)}
                  className='bg-[#FDB515] hover:bg-amber-500 text-black font-medium py-3 px-6 w-full sm:w-auto cursor-pointer'
                >
                  Add To Cart
                </button>
                <button
                  onClick={() => handleRemoveFromWishlist(item?._id)}
                  className='text-gray-500 hover:text-gray-700 p-2 cursor-pointer'
                >
                  <Trash2 className='h-6 w-6' />
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Wishlist;
