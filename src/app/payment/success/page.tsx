import { Suspense } from "react";
import Loading from "@/components/loading/Loading";
import PaymentSuccessClient from "./PaymentSuccessClient";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentSuccessClient />
    </Suspense>
  );
}

// "use client";

// import { Suspense } from "react";
// import Loading from "@/components/loading/Loading";
// import { useGetOrderByIdQuery } from "@/redux/features/order/orderAPI";
// import { Check } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function PaymentSuccess() {
//   const query = useSearchParams();
//   const router = useRouter();
//   const orderId = query.get("orderId");

//   const {
//     data: order,
//     isLoading,
//     isError,
//   } = useGetOrderByIdQuery({
//     orderId: query.get("orderId"),
//   });

//   if (isLoading) {
//     return (
//       <div>
//         <Loading />
//       </div>
//     );
//   }
//   if (isError) {
//     return (
//       <div className='flex items-center justify-center min-h-screen'>
//         <p className='text-red-500'>Error fetching order details.</p>
//       </div>
//     );
//   }

//   if (!orderId) {
//     router.push("/cart");
//     return null;
//   }

//   return (
//     <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4'>
//       <div className='w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden'>
//         <div className='bg-green-500 p-6 flex justify-center'>
//           <div className='rounded-full bg-white p-2'>
//             <Check className='h-10 w-10 text-green-500' />
//           </div>
//         </div>

//         <div className='p-6 space-y-6'>
//           <div className='text-center space-y-2'>
//             <h1 className='text-2xl font-bold text-gray-800'>
//               Payment Successful!
//             </h1>
//             <p className='text-gray-600'>
//               Your order has been processed successfully.
//             </p>
//           </div>

//           <div className='border-t border-b border-gray-200 py-4 space-y-3'>
//             <div className='flex justify-between'>
//               <span className='text-gray-600'>Order Number</span>
//               <span className='font-medium text-gray-800'>
//                 #{order?.data._id}
//               </span>
//             </div>
//             <div className='flex justify-between'>
//               <span className='text-gray-600'>Date</span>
//               <span className='font-medium text-gray-800'>
//                 {order?.data?.updatedAt?.split("T")[0]}
//               </span>
//             </div>
//             <div className='flex justify-between'>
//               <span className='text-gray-600'>Total Amount</span>
//               <span className='font-medium text-gray-800'>
//                 ${order?.data?.amount}
//               </span>
//             </div>
//             <div className='flex justify-between'>
//               <span className='text-gray-600'>Name</span>
//               <span className='font-medium text-gray-800'>
//                 {order?.data?.customer?.name}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className='mt-8 text-center'>
//         <h2 className='text-xl font-semibold text-gray-800 mb-4'>
//           What happens next?
//         </h2>
//         <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl'>
//           <div className='bg-white p-4 rounded-lg shadow'>
//             <div className='rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mx-auto mb-3'>
//               <span className='text-green-600 font-bold'>1</span>
//             </div>
//             <h3 className='font-medium text-gray-800 mb-2'>Order Processing</h3>
//             <p className='text-gray-600 text-sm'>
//               Your order is now being processed by our team.
//             </p>
//           </div>

//           <div className='bg-white p-4 rounded-lg shadow'>
//             <div className='rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mx-auto mb-3'>
//               <span className='text-green-600 font-bold'>2</span>
//             </div>
//             <h3 className='font-medium text-gray-800 mb-2'>Shipping</h3>
//             <p className='text-gray-600 text-sm'>
//               Your items will be shipped within 1-2 business days.
//             </p>
//           </div>

//           <div className='bg-white p-4 rounded-lg shadow'>
//             <div className='rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mx-auto mb-3'>
//               <span className='text-green-600 font-bold'>3</span>
//             </div>
//             <h3 className='font-medium text-gray-800 mb-2'>Delivery</h3>
//             <p className='text-gray-600 text-sm'>
//               Estimated delivery time is 3-5 business days.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
