"use client";

import { useState } from "react";
import OrderDetailsModal from "@/components/modal/order-details-modal";

export default function MyAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  const orders = [
    {
      id: 1,
      date: "Feb 21, 2025",
      status: "Pending",
      total: "$420.00",
      productName: "Williey chair",
      color: "Orange",
      shippingAddress: "1388 Market st, suite 400 san fransisco, CA 526",
      imageUrl: "/placeholder.svg?height=200&width=150",
    },
    {
      id: 1,
      date: "Mar 11, 2025",
      status: "Approve",
      total: "$420.00",
      productName: "Williey chair",
      color: "Orange",
      shippingAddress: "1388 Market st, suite 400 san fransisco, CA 526",
      imageUrl: "/placeholder.svg?height=200&width=150",
    },
    {
      id: 1,
      date: "Apr 21, 2025",
      status: "Cancel",
      total: "$420.00",
      productName: "Williey chair",
      color: "Orange",
      shippingAddress: "1388 Market st, suite 400 san fransisco, CA 526",
      imageUrl: "/placeholder.svg?height=200&width=150",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "text-amber-500";
      case "Approve":
        return "text-green-500";
      case "Cancel":
        return "text-red-500";
      default:
        return "";
    }
  };

  const handleViewOrder = (index: number) => {
    setSelectedOrder(index);
    setIsModalOpen(true);
  };

  return (
    <div className='max-w-6xl mx-auto px-4 py-8 md:py-12'>
      <div className='flex flex-col md:flex-row gap-6'>
        {/* Content Area */}
        <div className='flex-1'>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse'>
              <thead>
                <tr>
                  <th className='bg-gray-100 py-4 px-6 text-left font-medium text-gray-800 border border-gray-200'>
                    Order
                  </th>
                  <th className='bg-gray-100 py-4 px-6 text-left font-medium text-gray-800 border border-gray-200'>
                    Date
                  </th>
                  <th className='bg-gray-100 py-4 px-6 text-left font-medium text-gray-800 border border-gray-200'>
                    Status
                  </th>
                  <th className='bg-gray-100 py-4 px-6 text-left font-medium text-gray-800 border border-gray-200'>
                    Total
                  </th>
                  <th className='bg-gray-100 py-4 px-6 text-left font-medium text-gray-800 border border-gray-200'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td className='py-4 px-6 border border-gray-200'>
                      {order.id}
                    </td>
                    <td className='py-4 px-6 border border-gray-200'>
                      {order.date}
                    </td>
                    <td
                      className={`py-4 px-6 border border-gray-200 ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </td>
                    <td className='py-4 px-6 border border-gray-200'>
                      {order.total}
                    </td>
                    <td className='py-4 px-6 border border-gray-200'>
                      <button
                        onClick={() => handleViewOrder(index)}
                        className='text-blue-600 hover:underline cursor-pointer'
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {/* {selectedOrder !== null && (
        <OrderDetailsModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            // setSelectedOrder(null);
          }}
          orderDetails={{
            id: orders[selectedOrder].id,
            productName: "Williey chair",
            color: "Orange",
            date: "12 Mar, 2024",
            total: "$120.00",
            shippingAddress: "1388 Market st, suite 400 san fransisco, CA 526",
            imageUrl: "/order/1.png",
          }}
        />
      )} */}
    </div>
  );
}
