"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "@/redux/features/product/ProductAPI";
import Loading from "@/components/loading/Loading";
import { toast } from "sonner";
// Define the cart item type
interface CartItem {
  id: string;
  name: string;
  material: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartDataItem {
  id: string;
  product: {
    _id: string;
    name: string;
    images: string[];
    materials: string[];
    color: string;
    price: number;
    quantity: number;
  };
  quantity: number;
}

export default function CartPage() {
  const router = useRouter();
  // Initial cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Williey chair",
      material: "Wooden",
      color: "Orange",
      price: 120.0,
      quantity: 2,
      image: "/cart/1.png",
    },
    {
      id: "2",
      name: "Williey chair",
      material: "Wooden",
      color: "Orange",
      price: 120.0,
      quantity: 2,
      image: "/cart/1.png",
    },
  ]);

  const ImageURL = process.env.NEXT_PUBLIC_IMAGE_URL;

  const [addToCartMutation] = useAddToCartMutation();
  const { data: cartData, isLoading, isError, refetch } = useGetCartQuery({});
  const [removeCartItem] = useRemoveFromCartMutation();
  const [subtotal, setSubtotal] = useState(0);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading cart data</div>;
  }

  const increaseQuantity = async (id: string, quantity: number) => {
    const data = {
      quantity: quantity + 1,
      // rentalLength: 2,
    };

    try {
      const res = await addToCartMutation({ productId: id, data }).unwrap();
      refetch();
      console.log(res);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Decrease item quantity
  const decreaseQuantity = async (id: string, quantity: number) => {
    const data = {
      quantity: quantity - 1,
      // rentalLength: 2,
    };

    try {
      const res = await addToCartMutation({ productId: id, data }).unwrap();
      refetch();
      console.log(res);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Remove item from cart
  const removeItem = async (productId: string) => {
    const res = await removeCartItem({ productId }).unwrap();
    if (res.success) {
      refetch();
      toast.success("Item removed from cart successfully");
    }
  };

  // Format price to always show 2 decimal places
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout");
    router.push("/checkout");
  };

  console.log(cartData?.data);

  return (
    <div className='bg-[#FFF] h-screen'>
      <div className='container mx-auto px-4 pt-16 max-w-6xl'>
        <h1 className='text-3xl font-medium text-center mb-8'>My Cart</h1>

        {cartData?.data.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-600 mb-6'>Your cart is empty</p>
            <Link
              href='/shop'
              className='bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 px-6 rounded transition-colors'
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart table - desktop */}
            <div className='hidden md:block'>
              <div className='border-b pb-4 mb-4'>
                <div className='grid grid-cols-12 gap-4'>
                  <div className='col-span-6'>
                    <h2 className='text-2xl font-bold text-[#000000]'>
                      Product
                    </h2>
                  </div>
                  <div className='col-span-3 text-center'>
                    <h2 className='text-2xl font-bold text-[#000000]'>
                      Quantity
                    </h2>
                  </div>
                  <div className='col-span-2 text-center'>
                    <h2 className='text-2xl font-bold text-[#000000]'>Total</h2>
                  </div>
                  <div className='col-span-1 text-right'>
                    <h2 className='text-2xl font-bold text-[#000000]'>
                      Remove
                    </h2>
                  </div>
                </div>
              </div>

              {cartData?.data.map((item: CartDataItem) => (
                <div key={item.id} className='py-6 border-b'>
                  <div className='grid grid-cols-12 gap-4 items-center'>
                    <div className='col-span-6'>
                      <div className='flex items-center'>
                        <div className='bg-gray-100 rounded-md w-24 h-24 flex items-center justify-center mr-4'>
                          <div className='relative w-20 h-20'>
                            <Image
                              src={`${ImageURL}${item.product?.images[0]}`}
                              alt={item.product?.name}
                              fill
                              className='object-contain'
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className='font-medium text-[#333333] text-lg'>
                            {item?.product?.name}
                          </h3>
                          <p className='font-medium text-[#333333] text-lg'>
                            Material : {item?.product?.materials.join(", ")}
                          </p>
                          <p className='font-medium text-[#333333] text-lg'>
                            Color : {item?.product?.color}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-3 flex justify-center'>
                      <div className='flex items-center border border-[#8A8A8A] rounded-md'>
                        <button
                          onClick={() =>
                            increaseQuantity(item.product?._id, item?.quantity)
                          }
                          className='px-3 py-1 text-xl'
                          aria-label='Increase quantity'
                        >
                          +
                        </button>
                        <span className='px-4 py-1 text-center min-w-[40px]'>
                          {item?.quantity}
                        </span>
                        <button
                          onClick={() =>
                            decreaseQuantity(item.product?._id, item?.quantity)
                          }
                          className='px-3 py-1 text-xl'
                          aria-label='Decrease quantity'
                        >
                          −
                        </button>
                      </div>
                    </div>
                    <div className='col-span-2 text-center'>
                      <span className='font-medium text-[#333333] text-lg'>
                        {formatPrice(
                          item?.product?.price * item?.product?.quantity
                        )}
                      </span>
                    </div>
                    <div className='col-span-1 text-right'>
                      <button
                        onClick={() => removeItem(item?.product?._id)}
                        className='text-[#333333] hover:text-[#202020] cursor-pointer'
                        aria-label='Remove item'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart items - mobile */}
            <div className='md:hidden space-y-6'>
              {cartItems.map((item) => (
                <div key={item.id} className='border-b pb-6'>
                  <div className='flex items-start mb-4'>
                    <div className='bg-gray-100 rounded-md w-20 h-20 flex items-center justify-center mr-3'>
                      <div className='relative w-16 h-16'>
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className='object-contain'
                        />
                      </div>
                    </div>
                    <div className='flex-1'>
                      <div className='flex justify-between'>
                        <h3 className='font-medium'>{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className='text-gray-500'
                          aria-label='Remove item'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                            />
                          </svg>
                        </button>
                      </div>
                      <p className='text-gray-600 text-sm'>
                        Material : {item.material}
                      </p>
                      <p className='text-gray-600 text-sm'>
                        Color : {item.color}
                      </p>

                      <div className='flex justify-between items-center mt-3'>
                        <div className='flex items-center border rounded-md'>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className='px-2 py-0.5 text-lg'
                            aria-label='Increase quantity'
                          >
                            +
                          </button>
                          <span className='px-3 py-0.5 text-center min-w-[30px]'>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className='px-2 py-0.5 text-lg'
                            aria-label='Decrease quantity'
                          >
                            −
                          </button>
                        </div>
                        <span className='font-medium'>
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart summary */}
            <div className='mt-8'>
              <div className='flex justify-end mb-2'>
                <div className='w-full md:w-1/2'>
                  <div className='flex justify-end items-center gap-8 mb-3'>
                    <span className='font-bold text-2xl text-[#333333]'>
                      Subtotal :
                    </span>
                    <span className='font-bold text-2xl text-[#333333]'>
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className='text-[#333333] text-lg mb-8 text-right'>
                    Taxes and shipping calculated at checkout
                  </p>
                  <div className='flex justify-end'>
                    <button
                      className='max-w-[400px] bg-primary text-[#010101] font-medium py-3 px-6 rounded transition-colors'
                      onClick={() => handleCheckout()}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
