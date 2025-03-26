"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails?: {
    id: number;
    productName: string;
    color: string;
    date: string;
    total: string;
    shippingAddress: string;
    imageUrl: string;
  };
}

export default function OrderDetailsModal({
  isOpen,
  onClose,
  orderDetails,
}: OrderDetailsModalProps) {
  if (!orderDetails) return null;

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
              src={orderDetails.imageUrl || "/placeholder.svg"}
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
                <span className='font-medium'>Color : </span>
                {orderDetails.color}
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
                {orderDetails.shippingAddress}
              </p>
            </div>
          </div>
        </div>

        <div className='px-6 pb-6'>
          <Button
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
