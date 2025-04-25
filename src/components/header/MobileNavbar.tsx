"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  // SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { getCurrentUser, logout } from "@/service/authService";
import { useGetProfileQuery } from "@/redux/features/profile/profileAPI";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [tokenOnCookie, setTokenOnCookie] = useState<string | null>(null);

  interface ProfileResponse {
    data: {
      avatar: string;
      name: string;
      email: string;
    };
  }
  const { data } = useGetProfileQuery() as { data: ProfileResponse };
  const userData = data?.data;

  const pathname = usePathname();

  useEffect(() => {
    const user = localStorage.getItem("user") ?? "";
    console.log(user);

    getCurrentUser().then((res) => {
      setTokenOnCookie(res ?? null);
    });
  }, []);

  const ImageURl = process.env.NEXT_PUBLIC_IMAGE_URL;

  const handleLogout = async () => {
    localStorage.clear();
    await logout();
    location.replace("/login");
  };

  return (
    <header className='border-b border-gray-200'>
      <div className='relative container mx-auto px-4 flex items-center justify-between h-20'>
        <div className='flex items-center'>
          <Link href='/' className='mr-24 hidden md:block'>
            <Image
              src={"/header/logo.svg"}
              alt='Campus Store Logo'
              width={60}
              height={60}
              className='h-[64px] w-[57px]'
            />
          </Link>

          {/* Mobile Navigation with shadcn Sheet */}
          <Sheet>
            <SheetTrigger asChild className='md:hidden absolute right-2'>
              <div className='flex items-center gap-2'>
                <Link href='/cart' className='cursor-pointer border-none'>
                  <button aria-label='Cart' className='p-2 cursor-pointer'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M12.0049 2C15.3186 2 18.0049 4.68629 18.0049 8V9H22.0049V11H20.8379L20.0813 20.083C20.0381 20.6013 19.6048 21 19.0847 21H4.92502C4.40493 21 3.97166 20.6013 3.92847 20.083L3.17088 11H2.00488V9H6.00488V8C6.00488 4.68629 8.69117 2 12.0049 2ZM18.8309 11H5.17788L5.84488 19H18.1639L18.8309 11ZM13.0049 13V17H11.0049V13H13.0049ZM9.00488 13V17H7.00488V13H9.00488ZM17.0049 13V17H15.0049V13H17.0049ZM12.0049 4C9.86269 4 8.1138 5.68397 8.00978 7.80036L8.00488 8V9H16.0049V8C16.0049 5.8578 14.3209 4.10892 12.2045 4.0049L12.0049 4Z'
                        fill='#101010'
                      />
                    </svg>
                  </button>
                </Link>
                <button className='p-2'>
                  <Menu className='h-6 w-6' />
                </button>
              </div>
            </SheetTrigger>
            <SheetContent side='left' className='w-[280px]'>
              <SheetHeader>
                {/* <SheetTitle>Menu</SheetTitle> */}

                <Link
                  href='/my-account'
                  className='flex items-center gap-2 mt-3'
                >
                  <Avatar className='h-10 w-10 border-2 border-yellow-400'>
                    <AvatarImage
                      src={`${ImageURl}${userData?.avatar}`}
                      alt='Profile'
                    />
                    <AvatarFallback>US</AvatarFallback>
                  </Avatar>

                  <div className='flex flex-col'>
                    <p className='text-sm font-medium'>{userData?.name}</p>
                    <p className='text-xs text-gray-500'>{userData?.email}</p>
                  </div>
                </Link>
              </SheetHeader>
              <nav className='pl-6 flex flex-col space-y-4 mt-2.5'>
                <Link
                  href='/'
                  className={`${
                    pathname === "/" ? "text-[#254EA4]" : "text-[#333333]"
                  } hover:text-gray-600 font-medium`}
                >
                  Home
                </Link>
                <Link
                  href='/shop'
                  className={`${
                    pathname === "/shop" ? "text-[#254EA4]" : "text-[#333333]"
                  } hover:text-gray-600 font-medium`}
                >
                  Shop
                </Link>

                <Link
                  href='/bundles'
                  className={`${
                    pathname === "/bundles"
                      ? "text-[#254EA4]"
                      : "text-[#333333]"
                  } hover:text-gray-600 font-medium`}
                >
                  Bundles
                </Link>
                <Link
                  href='/about-us'
                  className={`${
                    pathname === "/about-us"
                      ? "text-[#254EA4]"
                      : "text-[#333333]"
                  } hover:text-gray-600 font-medium`}
                >
                  About us
                </Link>
                <Link
                  href='/contact'
                  className={`${
                    pathname === "/contact"
                      ? "text-[#254EA4]"
                      : "text-[#333333]"
                  } hover:text-gray-600 font-medium`}
                >
                  Contact
                </Link>

                <button
                  onClick={handleLogout}
                  type='button'
                  className={`${
                    pathname === "/f" ? "text-[#254EA4]" : "text-[#333333]"
                  } hover:text-gray-600 font-medium text-left text-red-400`}
                >
                  Logout
                </button>
              </nav>

              <div className='absolute  h-24 bottom-0 left-0 right-0 flex items-center justify-center gap-4'>
                <Link
                  href='https://facebook.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='rounded-full hover:opacity-80 transition-opacity'
                  aria-label='Facebook'
                >
                  <svg
                    width='32'
                    height='32'
                    viewBox='0 0 32 32'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g clip-path='url(#clip0_1435_9143)'>
                      <path
                        d='M32 16C32 24.8367 24.8367 32 16 32C7.16331 32 0 24.8367 0 16C0 7.16331 7.16331 0 16 0C24.8367 0 32 7.16331 32 16Z'
                        fill='#4A7AFF'
                      />
                      <path
                        d='M16.7023 31.9837C25.213 31.6163 32.0002 24.6012 32.0002 16C32.0002 15.9378 31.9985 15.8758 31.9977 15.8135L20.8916 4.70703L9.0166 17.1192L15.6145 23.7171L12.5722 27.8535L16.7023 31.9837Z'
                        fill='#0053BF'
                      />
                      <path
                        d='M20.8914 4.70657V8.32957C20.8914 8.32957 16.7317 7.72582 16.7317 10.4094V13.093H20.4887L20.0193 17.1855H16.7317V27.853H12.572V17.1855L9.01611 17.1184V13.093H12.5049V10.0068C12.5049 10.0068 12.2747 5.41576 16.7988 4.57251C18.6775 4.2222 20.8913 4.70657 20.8913 4.70657H20.8914Z'
                        fill='white'
                      />
                      <path
                        d='M20.8911 8.32961V4.70655C20.8911 4.70655 18.6772 4.22217 16.7986 4.57255C16.5206 4.62392 16.2463 4.69383 15.9775 4.7818V27.853H16.7314V17.1855H20.0188L20.4885 13.093H16.7314V10.4095C16.7314 7.72599 20.8911 8.32961 20.8911 8.32961Z'
                        fill='#DCE1EB'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_1435_9143'>
                        <rect width='32' height='32' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
                <Link
                  href='https://instagram.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='rounded-full hover:opacity-80 transition-opacity'
                  aria-label='Instagram'
                >
                  <svg
                    width='32'
                    height='32'
                    viewBox='0 0 32 32'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g clip-path='url(#clip0_1435_9149)'>
                      <path
                        d='M32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16Z'
                        fill='url(#paint0_linear_1435_9149)'
                      />
                      <path
                        d='M28.0419 5.4727C25.7093 9.75481 22.4103 14.1717 18.2882 18.2938C14.1661 22.4159 9.74929 25.7085 5.47351 28.0411C5.20543 27.8081 4.94508 27.5653 4.69245 27.3127C3.16541 25.8366 1.94752 24.0713 1.10979 22.1197C0.272062 20.1681 -0.168741 18.0692 -0.186914 15.9455C-0.205087 13.8218 0.199734 11.7157 1.00394 9.74999C1.80815 7.78433 2.99566 5.99844 4.49721 4.49646C5.99877 2.99449 7.78432 1.80649 9.74976 1.00173C11.7152 0.196971 13.8212 -0.208438 15.9449 -0.190858C18.0687 -0.173278 20.1677 0.266939 22.1195 1.10412C24.0714 1.94131 25.837 3.15871 27.3135 4.68534C27.5661 4.93797 27.8089 5.20042 28.0419 5.4727Z'
                        fill='white'
                        fill-opacity='0.0627451'
                      />
                      <path
                        d='M19.7891 7.57812H12.2102C10.9818 7.57812 9.80376 8.06609 8.93517 8.93468C8.06658 9.80327 7.57861 10.9813 7.57861 12.2097V19.7887C7.57861 21.017 8.06658 22.1951 8.93517 23.0637C9.80376 23.9323 10.9818 24.4202 12.2102 24.4202H19.7891C21.0175 24.4202 22.1956 23.9323 23.0642 23.0637C23.9328 22.1951 24.4207 21.017 24.4207 19.7887V12.2097C24.4207 10.9813 23.9328 9.80327 23.0642 8.93468C22.1956 8.06609 21.0175 7.57812 19.7891 7.57812ZM22.947 19.1234C22.947 20.1374 22.5442 21.1098 21.8273 21.8268C21.1103 22.5438 20.1378 22.9465 19.1239 22.9465H12.8755C11.8615 22.9465 10.8891 22.5438 10.1721 21.8268C9.45509 21.1098 9.0523 20.1374 9.0523 19.1234V12.875C9.0523 11.861 9.45509 10.8886 10.1721 10.1716C10.8891 9.4546 11.8615 9.05181 12.8755 9.05181H19.1239C20.1378 9.05181 21.1103 9.4546 21.8273 10.1716C22.5442 10.8886 22.947 11.861 22.947 12.875V19.1234Z'
                        fill='white'
                      />
                      <path
                        d='M19.0712 12.9572L19.0312 12.9172L18.9975 12.8835C18.2015 12.0903 17.1234 11.6451 15.9996 11.6456C15.4321 11.6495 14.871 11.7651 14.3482 11.9859C13.8254 12.2067 13.3512 12.5284 12.9528 12.9325C12.5543 13.3366 12.2394 13.8153 12.026 14.3411C11.8126 14.867 11.7049 15.4297 11.7091 15.9972C11.7082 17.1489 12.1622 18.2543 12.9723 19.073C13.369 19.4746 13.8418 19.7931 14.3631 20.01C14.8843 20.2269 15.4435 20.3378 16.008 20.3362C16.8549 20.3184 17.6782 20.0546 18.3777 19.577C19.0772 19.0993 19.6225 18.4284 19.9473 17.6461C20.272 16.8639 20.3621 16.004 20.2065 15.1714C20.051 14.3388 19.6565 13.5695 19.0712 12.9572ZM15.9996 18.852C15.4334 18.8599 14.8776 18.6992 14.4029 18.3904C13.9282 18.0816 13.5561 17.6386 13.3338 17.1177C13.1116 16.5968 13.0494 16.0216 13.155 15.4652C13.2605 14.9088 13.5292 14.3964 13.9268 13.9932C14.3244 13.5899 14.833 13.314 15.3878 13.2006C15.9426 13.0872 16.5187 13.1413 17.0426 13.3562C17.5666 13.571 18.0148 13.9368 18.3303 14.4071C18.6458 14.8774 18.8143 15.4309 18.8144 15.9972C18.8171 16.3695 18.7465 16.7387 18.6065 17.0837C18.4666 17.4287 18.26 17.7427 17.9986 18.0079C17.7372 18.273 17.4261 18.484 17.0831 18.6288C16.7401 18.7737 16.3719 18.8495 15.9996 18.852ZM21.5638 11.4456C21.5649 11.5807 21.5394 11.7147 21.4887 11.8399C21.4379 11.9651 21.363 12.0791 21.2682 12.1753C21.1733 12.2715 21.0604 12.3481 20.936 12.4006C20.8115 12.4531 20.6779 12.4806 20.5428 12.4814C20.4088 12.4814 20.2762 12.4547 20.1526 12.4031C20.029 12.3514 19.9169 12.2757 19.8228 12.1804C19.6802 12.0357 19.5831 11.8523 19.5438 11.653C19.5044 11.4536 19.5244 11.2471 19.6013 11.0591C19.6782 10.871 19.8086 10.7096 19.9763 10.595C20.144 10.4803 20.3417 10.4174 20.5449 10.4141C20.7827 10.414 21.0129 10.4975 21.1954 10.6499L21.2165 10.6709C21.2504 10.6985 21.2815 10.7296 21.3091 10.7635L21.3323 10.7888C21.483 10.9745 21.5648 11.2065 21.5638 11.4456Z'
                        fill='white'
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id='paint0_linear_1435_9149'
                        x1='4.68632'
                        y1='4.68632'
                        x2='27.3137'
                        y2='27.3137'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop stop-color='#FAE100' />
                        <stop offset='0.15' stop-color='#FCB720' />
                        <stop offset='0.3' stop-color='#FF7950' />
                        <stop offset='0.5' stop-color='#FF1C74' />
                        <stop offset='1' stop-color='#6C1CD1' />
                      </linearGradient>
                      <clipPath id='clip0_1435_9149'>
                        <rect width='32' height='32' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
                <Link
                  href='https://linkedin.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='rounded-full hover:opacity-80 transition-opacity'
                  aria-label='LinkedIn'
                >
                  <svg
                    width='32'
                    height='32'
                    viewBox='0 0 32 32'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g clip-path='url(#clip0_1435_9158)'>
                      <path
                        d='M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z'
                        fill='#0B69C7'
                      />
                      <path
                        d='M12.4208 10.1832C12.4212 10.6155 12.2934 11.0383 12.0534 11.398C11.8135 11.7577 11.4722 12.0381 11.0728 12.2038C10.6734 12.3694 10.2338 12.4129 9.80975 12.3286C9.38565 12.2444 8.99608 12.0362 8.69034 11.7305C8.3846 11.4247 8.17643 11.0352 8.09218 10.6111C8.00793 10.187 8.05138 9.74742 8.21704 9.34803C8.3827 8.94864 8.66312 8.60737 9.0228 8.36741C9.38249 8.12745 9.80528 7.99958 10.2377 8C10.8165 8.00056 11.3715 8.23075 11.7808 8.64005C12.1901 9.04935 12.4203 9.60432 12.4208 10.1832Z'
                        fill='white'
                      />
                      <path
                        d='M11.3869 13.2773H9.08793C8.78911 13.2773 8.54688 13.5196 8.54688 13.8184V23.4584C8.54688 23.7572 8.78911 23.9994 9.08793 23.9994H11.3869C11.6857 23.9994 11.9279 23.7572 11.9279 23.4584V13.8184C11.9279 13.5196 11.6857 13.2773 11.3869 13.2773Z'
                        fill='white'
                      />
                      <path
                        d='M23.947 18.8369V23.5043C23.947 23.636 23.8947 23.7624 23.8015 23.8556C23.7083 23.9487 23.582 24.0011 23.4502 24.0011H20.9828C20.8511 24.0011 20.7247 23.9487 20.6315 23.8556C20.5383 23.7624 20.486 23.636 20.486 23.5043V18.9821C20.486 18.3064 20.6818 16.0348 18.7218 16.0348C17.2018 16.0348 16.8923 17.5969 16.827 18.2979V23.5148C16.8243 23.644 16.7713 23.7671 16.6794 23.8578C16.5874 23.9486 16.4636 24 16.3344 24.0011H13.947C13.8817 24.0014 13.817 23.9887 13.7566 23.9638C13.6962 23.939 13.6413 23.9024 13.5951 23.8562C13.5489 23.81 13.5123 23.7551 13.4875 23.6947C13.4626 23.6343 13.4499 23.5696 13.4502 23.5043V13.7779C13.4499 13.7125 13.4626 13.6477 13.4874 13.5872C13.5123 13.5266 13.5488 13.4716 13.595 13.4253C13.6411 13.3789 13.696 13.3421 13.7564 13.317C13.8168 13.2919 13.8816 13.279 13.947 13.279H16.3344C16.4006 13.2779 16.4664 13.29 16.5279 13.3145C16.5894 13.3391 16.6454 13.3757 16.6927 13.4221C16.7399 13.4686 16.7774 13.5239 16.803 13.585C16.8286 13.6461 16.8418 13.7117 16.8418 13.7779V14.62C17.406 13.7779 18.2439 13.1211 20.027 13.1211C23.9702 13.119 23.947 16.8095 23.947 18.8369Z'
                        fill='white'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_1435_9158'>
                        <rect width='32' height='32' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
                <Link
                  href='https://twitter.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='rounded-full hover:opacity-80 transition-opacity'
                  aria-label='Twitter'
                >
                  <svg
                    width='32'
                    height='32'
                    viewBox='0 0 36 36'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect width='36' height='36' rx='18' fill='#101010' />
                    <path
                      d='M16.4883 20.651L21.25 27H28.25L20.3917 16.5223L26.9308 9H24.2808L19.1643 14.8858L14.75 9H7.75L15.2609 19.0145L8.31915 27H10.9692L16.4883 20.651ZM22.25 25L11.75 11H13.75L24.25 25H22.25Z'
                      fill='white'
                    />
                  </svg>
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex space-x-8'>
            <Link
              href='/'
              className={`text-lg ${
                pathname === "/"
                  ? "text-[#254EA4] hover:text-[#254da4cc] font-semibold underline"
                  : "text-[#333333] hover:text-[#232323]"
              } `}
            >
              Home
            </Link>
            <Link
              href='/shop'
              className={`text-lg ${
                pathname === "/shop"
                  ? "text-[#254EA4] hover:text-[#254da4cc] font-semibold underline"
                  : "text-[#333333] hover:text-[#232323]"
              } `}
            >
              Shop
            </Link>

            <Link
              href='/bundles'
              className={`text-lg ${
                pathname === "/bundles"
                  ? "text-[#254EA4] hover:text-[#254da4cc] font-semibold underline"
                  : "text-[#333333] hover:text-[#232323]"
              } `}
            >
              Bundles
            </Link>
            <Link
              href='/about-us'
              className={`text-lg ${
                pathname === "/about-us"
                  ? "text-[#254EA4] hover:text-[#254da4cc] font-semibold underline"
                  : "text-[#333333] hover:text-[#232323]"
              } `}
            >
              About us
            </Link>
            <Link
              href='/contact'
              className={`text-lg ${
                pathname === "/contact"
                  ? "text-[#254EA4] hover:text-[#254da4cc] font-semibold underline"
                  : "text-[#333333] hover:text-[#232323]"
              } `}
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Right side of the navbar */}
        <div className='w-full md:w-auto flex items-center ml-2 justify-between'>
          <Link href='/' className='block md:hidden'>
            <Image
              src='/header/logo.svg'
              alt='Campus Store Logo'
              width={40}
              height={44}
            />
          </Link>

          <div className='hidden md:flex items-center justify-end gap-4 h-full'>
            <Link href='/cart' className='cursor-pointer'>
              <button aria-label='Cart' className='p-2 cursor-pointer'>
                <svg
                  width='48'
                  height='48'
                  viewBox='0 0 48 48'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect
                    x='0.5'
                    y='0.5'
                    width='47'
                    height='47'
                    rx='23.5'
                    fill='white'
                  />
                  <rect
                    x='0.5'
                    y='0.5'
                    width='47'
                    height='47'
                    rx='23.5'
                    stroke='#E6E6E6'
                  />
                  <path
                    d='M24.0049 14C27.3186 14 30.0049 16.6863 30.0049 20V21H34.0049V23H32.8379L32.0813 32.083C32.0381 32.6013 31.6048 33 31.0847 33H16.925C16.4049 33 15.9717 32.6013 15.9285 32.083L15.1709 23H14.0049V21H18.0049V20C18.0049 16.6863 20.6912 14 24.0049 14ZM30.8309 23H17.1779L17.8449 31H30.1639L30.8309 23ZM25.0049 25V29H23.0049V25H25.0049ZM21.0049 25V29H19.0049V25H21.0049ZM29.0049 25V29H27.0049V25H29.0049ZM24.0049 16C21.8627 16 20.1138 17.684 20.0098 19.8004L20.0049 20V21H28.0049V20C28.0049 17.8578 26.3209 16.1089 24.2045 16.0049L24.0049 16Z'
                    fill='#101010'
                  />
                </svg>
              </button>
            </Link>

            {!tokenOnCookie && (
              <Link
                href='/login'
                className='bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 px-6 rounded transition-colors cursor-pointer'
              >
                Login
              </Link>
            )}
            {tokenOnCookie && (
              <div className='relative'>
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                  <DropdownMenuTrigger className='focus:outline-none'>
                    <div className='flex items-center'>
                      <Avatar className='h-10 w-10 border-2 border-yellow-400'>
                        <AvatarImage
                          src={`${ImageURl}${userData?.avatar}`}
                          alt='Profile'
                        />
                        <AvatarFallback>US</AvatarFallback>
                      </Avatar>
                      <ChevronDown
                        className={`ml-1 h-4 w-4 text-gray-700 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className='w-48 mt-1'>
                    <DropdownMenuItem asChild>
                      <Link href='/my-account' className='cursor-pointer'>
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem asChild>
                      <Link
                        href='/student-dashboard'
                        className='cursor-pointer'
                      >
                        {userData?.name}
                      </Link>
                    </DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
