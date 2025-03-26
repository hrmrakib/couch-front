"use client";

import Image from "next/image";

const products = [
  {
    id: 1001,
    name: "Williey chair",
    image: "/order/1.png",
    date: "12 Jun, 2025",
    price: "$120.00",
    status: "Approve",
    action: "View",
    description:
      "Premium quality Williey chair with comfortable cushioning and elegant design. Perfect for living rooms, offices, and modern spaces.",
  },
  {
    id: 1002,
    name: "Williey chair",
    image: "/order/1.png",
    date: "12 Jun, 2025",
    price: "$120.00",
    status: "Pending",
    action: "Edit",
    description:
      "Premium quality Williey chair with comfortable cushioning and elegant design. Perfect for living rooms, offices, and modern spaces.",
  },
  {
    id: 1003,
    name: "Williey chair",
    image: "/order/1.png",
    date: "12 Jun, 2025",
    price: "$120.00",
    status: "Cancel",
    action: "View",
    description:
      "Premium quality Williey chair with comfortable cushioning and elegant design. Perfect for living rooms, offices, and modern spaces.",
  },
];

// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   date: string;
//   price: string;
//   status: string;
//   action: string;
//   description?: string;
// }

// interface ProductTableProps {
//   products: Product[];
//   onView: (product: Product) => void;
//   onEdit: (product: Product) => void;
// }

// export default function ProductTable({products, onView, onEdit}: ProductTableProps) {

export default function ProductTable() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approve":
        return "text-green-500";
      case "Pending":
        return "text-amber-500";
      case "Cancel":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='text-left'>
            <th className='pb-6 font-medium text-gray-800'>Product</th>
            <th className='pb-6 font-medium text-gray-800'>Date</th>
            <th className='pb-6 font-medium text-gray-800'>Price</th>
            <th className='pb-6 font-medium text-gray-800'>Status</th>
            <th className='pb-6 font-medium text-gray-800'>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className='border-t border-gray-100'>
              <td className='py-6'>
                <div className='flex items-center'>
                  <div className='bg-gray-100 p-2 rounded-md mr-4 w-[116px] h-[132px] flex items-center justify-center'>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={132}
                      height={116}
                      className='object-contain w-[116px] h-[132px]'
                    />
                  </div>
                  <span className='font-medium text-gray-800'>
                    {product.name}
                  </span>
                </div>
              </td>
              <td className='py-6 text-gray-800'>{product.date}</td>
              <td className='py-6 text-gray-800'>{product.price}</td>
              <td className='py-6'>
                <span className={getStatusColor(product.status)}>
                  {product.status}
                </span>
              </td>
              <td className='py-6'>
                <button
                  className='text-blue-600 font-medium'
                  // onClick={() =>
                  //   product.action === "View"
                  //     ? onView(product)
                  //     : onEdit(product)
                  // }
                >
                  {product.action}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// "use client";

// import Image from "next/image";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Check, Clock, X } from "lucide-react";

// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   date: string;
//   price: string;
//   status: string;
//   action: string;
//   description?: string;
// }

// interface ProductDetailsProps {
//   product: Product | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function ProductDetails({
//   product,
//   isOpen,
//   onClose,
// }: ProductDetailsProps) {
//   if (!product) return null;

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "Approve":
//         return <Check className='h-5 w-5 text-green-500' />;
//       case "Pending":
//         return <Clock className='h-5 w-5 text-amber-500' />;
//       case "Cancel":
//         return <X className='h-5 w-5 text-red-500' />;
//       default:
//         return null;
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Approve":
//         return "text-green-500";
//       case "Pending":
//         return "text-amber-500";
//       case "Cancel":
//         return "text-red-500";
//       default:
//         return "text-gray-500";
//     }
//   };

//   const getStatusBg = (status: string) => {
//     switch (status) {
//       case "Approve":
//         return "bg-green-50";
//       case "Pending":
//         return "bg-amber-50";
//       case "Cancel":
//         return "bg-red-50";
//       default:
//         return "bg-gray-50";
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className='sm:max-w-[550px] p-0 overflow-hidden'>
//         <DialogHeader className='px-6 pt-6'>
//           <DialogTitle className='text-xl'>Product Details</DialogTitle>
//         </DialogHeader>

//         <div className='p-6'>
//           <div className='flex flex-col md:flex-row gap-6'>
//             <div className='bg-gray-100 p-4 rounded-md flex items-center justify-center w-full md:w-[200px] h-[200px]'>
//               <Image
//                 src={product.image || "/placeholder.svg"}
//                 alt={product.name}
//                 width={150}
//                 height={150}
//                 className='object-contain'
//               />
//             </div>

//             <div className='flex-1'>
//               <h3 className='text-xl font-medium mb-4'>{product.name}</h3>

//               <div className='space-y-4'>
//                 <div className='flex justify-between border-b pb-2'>
//                   <span className='text-gray-500'>Product ID</span>
//                   <span className='font-medium'>#{product.id}</span>
//                 </div>

//                 <div className='flex justify-between border-b pb-2'>
//                   <span className='text-gray-500'>Date</span>
//                   <span className='font-medium'>{product.date}</span>
//                 </div>

//                 <div className='flex justify-between border-b pb-2'>
//                   <span className='text-gray-500'>Price</span>
//                   <span className='font-medium'>{product.price}</span>
//                 </div>

//                 <div className='flex justify-between'>
//                   <span className='text-gray-500'>Status</span>
//                   <div
//                     className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusBg(
//                       product.status
//                     )}`}
//                   >
//                     {getStatusIcon(product.status)}
//                     <span
//                       className={`font-medium ${getStatusColor(
//                         product.status
//                       )}`}
//                     >
//                       {product.status}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className='mt-6'>
//                 <h4 className='font-medium mb-2'>Product Description</h4>
//                 <p className='text-gray-600'>
//                   Premium quality Williey chair with comfortable cushioning and
//                   elegant design. Perfect for living rooms, offices, and modern
//                   spaces.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <DialogFooter className='bg-gray-50 px-6 py-4'>
//           {product.status === "Pending" ? (
//             <div className='flex gap-3 w-full'>
//               <Button className='flex-1' variant='outline' onClick={onClose}>
//                 Cancel
//               </Button>
//               <Button className='flex-1 bg-green-600 hover:bg-green-700'>
//                 Approve
//               </Button>
//             </div>
//           ) : product.status === "Approve" ? (
//             <div className='flex gap-3 w-full'>
//               <Button className='flex-1' variant='outline' onClick={onClose}>
//                 Close
//               </Button>
//               <Button className='flex-1'>Reorder</Button>
//             </div>
//           ) : (
//             <div className='flex gap-3 w-full'>
//               <Button className='flex-1' variant='outline' onClick={onClose}>
//                 Close
//               </Button>
//               <Button className='flex-1'>Contact Support</Button>
//             </div>
//           )}
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
