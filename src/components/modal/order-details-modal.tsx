"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useChangeOrderStatusMutation } from "@/redux/features/order/orderAPI";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  orderDetails?: {
    id: number;
    productId: string;
    productName: string;
    date: string;
    total: string;
    status: string;
    imageUrl: string;
    quantity: number;
    customer: {
      name: string;
      contact: string;
      address: {
        street: string;
        city: string;
        state: string;
        zip: string;
        apartment?: string;
        country: string;
      };
    };
  };
}

export default function OrderDetailsModal({
  isOpen,
  onClose,
  refetch,
  orderDetails,
}: OrderDetailsModalProps) {
  if (!orderDetails) return null;

  const ImageURL = process.env.NEXT_PUBLIC_IMAGE_URL;

  const [changeOrderStatus] = useChangeOrderStatusMutation({});

  const cancelOrder = async (orderId: string | number) => {
    const res = await changeOrderStatus({ orderId, state: "cancel" });
    refetch();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-[500px] p-0 overflow-hidden'>
        <div className='relative'>
          <button
            onClick={onClose}
            className='absolute right-3 top-3 h-6 w-6 rounded-md bg-red-500 flex items-center justify-center text-white cursor-pointer'
            aria-label='Close'
          >
            <X className='h-5 w-5 text-white z-40' />
          </button>
        </div>

        <div className='p-6 flex flex-col sm:flex-row gap-6'>
          <div className='flex-shrink-0 bg-gray-50 p-4 rounded-md flex items-center justify-center'>
            <Image
              src={`${ImageURL}${orderDetails.imageUrl}`}
              alt={orderDetails.productName}
              width={150}
              height={200}
              className='object-contain'
            />
          </div>

          <div className='flex-1'>
            <h2 className='text-2xl font-medium text-gray-800 mb-4'>
              {orderDetails.productName}
            </h2>

            <div className='space-y-2'>
              <p className='text-gray-700'>
                <span className='font-medium'>My Name: </span>
                {orderDetails.customer.name}
              </p>

              <p className='text-gray-700'>
                <span className='font-medium'>My Email: </span>
                {orderDetails.customer.contact}
              </p>

              <p className='text-gray-700'>
                <span className='font-medium'>Date : </span>
                {orderDetails.date}
              </p>

              <p className='text-gray-700'>
                <span className='font-medium'>Total : </span>
                {orderDetails.total}
              </p>

              <p className='text-gray-700'>
                <span className='font-medium'>Shipping Address : </span>
                {orderDetails.customer.address.street},{" "}
                {orderDetails.customer.address.city},{" "}
                {orderDetails.customer.address.apartment},{" "}
                {orderDetails.customer.address.country},{" "}
                {orderDetails.customer.address.zip}
              </p>
            </div>
          </div>
        </div>

        <div className='px-6 pb-6'>
          <Button
            onClick={() => cancelOrder(orderDetails.id)}
            variant='destructive'
            className='w-full bg-[#FDB515] hover:bg-amber-500 text-black text-lg font-medium py-6 cursor-pointer'
          >
            Cancel Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
