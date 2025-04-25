"use client";

import { useState } from "react";
import OrderDetailsModal from "@/components/modal/order-details-modal";
import { useGetOrdersQuery } from "@/redux/features/order/orderAPI";
import Loading from "@/components/loading/Loading";

export default function MyAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { data: orders, isLoading, refetch } = useGetOrdersQuery({});


  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

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

  const handleViewOrder = (id: string) => {
    setSelectedOrderId(id);
    setIsModalOpen(true);
  };

  const selectedOrder = orders?.data?.find(
    (order: { _id: string }) => order._id === selectedOrderId
  );

  const selectedDetails = selectedOrder?.details?.[0];


  return (
    <div className='max-w-6xl mx-auto px-4 py-8 md:py-12'>
      <div className='flex flex-col md:flex-row gap-6'>
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
                {orders?.data?.map((order) => (
                  <tr key={order._id}>
                    <td className='py-4 px-6 border border-gray-200'>
                      {order._id}
                    </td>
                    <td className='py-4 px-6 border border-gray-200'>
                      {order.createdAt.split("T")[0]}
                    </td>
                    <td
                      className={`py-4 px-6 border border-gray-200 ${getStatusColor(
                        order.state
                      )}`}
                    >
                      {order.state}
                    </td>
                    <td className='py-4 px-6 border border-gray-200'>
                      ${order.amount}
                    </td>
                    <td className='py-4 px-6 border border-gray-200'>
                      <button
                        onClick={() => handleViewOrder(order._id)}
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
      {selectedOrder && (
        <OrderDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          refetch={refetch}
          orderDetails={{
            id: selectedOrder._id,
            productName: selectedOrder?.name || "N/A",
            productId: selectedOrder?._id || "N/A",
            date: selectedOrder.createdAt?.split("T")[0] || "N/A",
            total: selectedOrder.amount || 0,
            customer: selectedOrder.customer || "Unknown",
            status: selectedOrder.state,
            imageUrl:
              selectedDetails?.product?.images?.[0] || "/placeholder.png",
            quantity: selectedDetails?.quantity || 1,
          }}
        />
      )}
    </div>
  );
}
