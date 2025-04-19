"use client";

import { useLoginMutation } from "@/redux/features/auth/AuthenticationAPI";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MyAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [login] = useLoginMutation();

  // Step 2: Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Step 3: Submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", formData);

    try {
      const response = await login(formData).unwrap();

      if (response?.success) {
        console.log(response);
        localStorage.setItem("accessToken", response?.data?.token);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  console.log(formData);

  return (
    <div className='md:flex justify-center items-center h-[calc(100vh-100px)]'>
      <div className='h-full px-4 py-12 flex justify-center items-center my-auto'>
        <div className='w-full md:w-[600px]'>
          <h1 className='text-[40px] font-medium text-[#545454] text-center mb-8'>
            My Account
          </h1>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <label htmlFor='email' className='block text-lg text-[#333333]'>
                E-Mail
              </label>
              <input
                id='email'
                type='email'
                placeholder='E-mail address'
                value={formData.email}
                onChange={handleInputChange}
                className='w-full h-14 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-[#545454]'
              />
            </div>

            <div className='space-y-2'>
              <label
                htmlFor='password'
                className='block text-lg text-[#333333]'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  id='password'
                  type={showPassword ? "text" : "password"}
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleInputChange}
                  className='w-full h-[56px] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-[#545454]'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                  aria-label='Show password'
                >
                  <Eye className='h-5 w-5 cursor-pointer' />
                </button>
              </div>
              <div className='flex justify-end'>
                <Link
                  href='/forgot-password'
                  className='text-[#8A8A8A] text-lg hover:underline'
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              type='submit'
              className='w-full h-14 md:h-[72px] bg-[#FDB515] hover:bg-[#fdb415e6] text-base md:text-lg text-[#4A3300] font-medium py-3 rounded transition-colors cursor-pointer'
            >
              Sign In
            </button>
          </form>

          <div className='mt-6 text-center'>
            <span className='text-[#545454] text-lg'>
              Don&apos;t have account?{" "}
            </span>
            <Link
              href='/create-account'
              className='text-[#333333] text-lg underline'
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { Eye } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";

// export default function MyAccount() {
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // ("Form submitted");
//   };

//   return (
//     <div className='md:flex justify-center items-center h-[calc(100vh-100px)]'>
//       <div className='h-full px-4 py-12 flex justify-center items-center my-auto'>
//         <div className='w-full md:w-[600px]'>
//           <h1 className='text-[40px] font-medium text-[#545454] text-center mb-8'>
//             My Account
//           </h1>

//           <form onSubmit={handleSubmit} className='space-y-6'>
//             <div className='space-y-2'>
//               <label htmlFor='email' className='block text-lg text-[#333333]'>
//                 E-Mail
//               </label>
//               <input
//                 id='email'
//                 type='email'
//                 placeholder='E-mail address'
//                 className='w-full h-14 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-[#545454]'
//               />
//             </div>

//             <div className='space-y-2'>
//               <label
//                 htmlFor='password'
//                 className='block text-lg text-[#333333]'
//               >
//                 Password
//               </label>
//               <div className='relative'>
//                 <input
//                   id='password'
//                   type={showPassword ? "text" : "password"}
//                   placeholder='Password'
//                   className='w-full h-[56px] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-[#545454]'
//                 />
//                 <button
//                   type='button'
//                   onClick={() => setShowPassword(!showPassword)}
//                   className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
//                   aria-label='Show password'
//                 >
//                   <Eye className='h-5 w-5 cursor-pointer' />
//                 </button>
//               </div>
//               <div className='flex justify-end'>
//                 <Link
//                   href='/forgot-password'
//                   className='text-[#8A8A8A] text-lg hover:underline'
//                 >
//                   Forgot Password?
//                 </Link>
//               </div>
//             </div>

//             <button
//               type='submit'
//               className='w-full h-14 md:h-[72px] bg-[#FDB515] hover:bg-[#fdb415e6] text-base md:text-lg text-[#4A3300] font-medium py-3 rounded transition-colors cursor-pointer'
//             >
//               Sign In
//             </button>
//           </form>

//           <div className='mt-6 text-center'>
//             <span className='text-[#545454] text-lg'>
//               Don&apos;t have account?{" "}
//             </span>
//             <Link
//               href='/create-account'
//               className='text-[#333333] text-lg underline'
//             >
//               Create account
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
