"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
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

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pathname = usePathname();

  return (
    <header className='border-b border-gray-200'>
      <div className='relative container mx-auto px-4 flex items-center justify-between h-20'>
        <div className='flex items-center'>
          <Link href='/' className='mr-24 hidden md:block'>
            <Image
              src='/header/logo.svg'
              alt='Campus Store Logo'
              width={60}
              height={60}
              className='h-[64px] w-[57px]'
            />
          </Link>

          {/* Mobile Navigation with shadcn Sheet */}
          <Sheet>
            <SheetTrigger asChild className='md:hidden absolute right-2'>
              <button className='p-2'>
                <Menu className='h-6 w-6' />
              </button>
            </SheetTrigger>
            <SheetContent side='left' className='w-[280px]'>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className='pl-4 flex flex-col space-y-4 mt-6'>
                <Link
                  href='/'
                  className={`${
                    pathname === "/" ? "text-green-400" : "text-[#333333]"
                  } hover:text-gray-600 font-medium`}
                >
                  Home
                </Link>
                <Link
                  href='/shop'
                  className={`${
                    pathname === "/shop" ? "text-green-400" : "text-[#333333]"
                  } hover:text-gray-600 font-medium`}
                >
                  Shop
                </Link>
                <Link
                  href='/rent'
                  className={`${
                    pathname === "/rent" ? "text-green-400" : "text-[#333333]"
                  } hover:text-gray-600 font-medium`}
                >
                  Rent
                </Link>
                <Link
                  href='/bundles'
                  className={`${
                    pathname === "/bundles"
                      ? "text-green-400"
                      : "text-[#333333]"
                  } hover:text-gray-600 font-medium`}
                >
                  Bundles
                </Link>
                <Link
                  href='/about-us'
                  className={`${
                    pathname === "/about-us"
                      ? "text-green-400"
                      : "text-[#333333]"
                  } hover:text-gray-600 font-medium`}
                >
                  About us
                </Link>
                <Link
                  href='/contact'
                  className={`${
                    pathname === "/contact"
                      ? "text-green-400"
                      : "text-[#333333]"
                  } hover:text-gray-600 font-medium`}
                >
                  Contact
                </Link>
              </nav>

              <div className='flex items-center justify-between px-2 mt-6'>
                <button aria-label='Search' className='cursor-pointer'>
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
                      d='M30.031 28.6168L34.3137 32.8995L32.8995 34.3137L28.6168 30.031C27.0769 31.263 25.124 32 23 32C18.032 32 14 27.968 14 23C14 18.032 18.032 14 23 14C27.968 14 32 18.032 32 23C32 25.124 31.263 27.0769 30.031 28.6168ZM28.0247 27.8748C29.2475 26.6146 30 24.8956 30 23C30 19.1325 26.8675 16 23 16C19.1325 16 16 19.1325 16 23C16 26.8675 19.1325 30 23 30C24.8956 30 26.6146 29.2475 27.8748 28.0247L28.0247 27.8748Z'
                      fill='#101010'
                    />
                  </svg>
                </button>
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
                <div className='relative'>
                  <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger className='focus:outline-none'>
                      <div className='flex items-center'>
                        <Avatar className='h-10 w-10 border-2 border-yellow-400'>
                          <AvatarImage src='/header/user.png' alt='Profile' />
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
                      <DropdownMenuItem asChild>
                        <Link
                          href='/student-dashboard'
                          className='cursor-pointer'
                        >
                          Student Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex space-x-8'>
            <Link
              href='/'
              className={`text-lg ${
                pathname === "/"
                  ? "text-green-400 hover:text-green-500 font-semibold underline"
                  : "text-[#333333] hover:text-[#232323]"
              } `}
            >
              Home
            </Link>
            <Link
              href='/shop'
              className={`text-lg ${
                pathname === "/shop"
                  ? "text-green-400 hover:text-green-500 font-semibold underline"
                  : "text-[#333333] hover:text-[#232323]"
              } `}
            >
              Shop
            </Link>

            <Link
              href='/bundles'
              className={`text-lg ${
                pathname === "/bundles"
                  ? "text-green-400 hover:text-green-500 font-semibold underline"
                  : "text-[#333333] hover:text-[#232323]"
              } `}
            >
              Bundles
            </Link>
            <Link
              href='/about-us'
              className={`text-lg ${
                pathname === "/about-us"
                  ? "text-green-400 hover:text-green-500 font-semibold underline"
                  : "text-[#333333] hover:text-[#232323]"
              } `}
            >
              About us
            </Link>
            <Link
              href='/contact'
              className={`text-lg ${
                pathname === "/contact"
                  ? "text-green-400 hover:text-green-500 font-semibold underline"
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
          {isVisible && (
            <div className='hidden md:flex items-center justify-end gap-4 h-full'>
              <button aria-label='Search' className='cursor-pointer'>
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
                    d='M30.031 28.6168L34.3137 32.8995L32.8995 34.3137L28.6168 30.031C27.0769 31.263 25.124 32 23 32C18.032 32 14 27.968 14 23C14 18.032 18.032 14 23 14C27.968 14 32 18.032 32 23C32 25.124 31.263 27.0769 30.031 28.6168ZM28.0247 27.8748C29.2475 26.6146 30 24.8956 30 23C30 19.1325 26.8675 16 23 16C19.1325 16 16 19.1325 16 23C16 26.8675 19.1325 30 23 30C24.8956 30 26.6146 29.2475 27.8748 28.0247L28.0247 27.8748Z'
                    fill='#101010'
                  />
                </svg>
              </button>
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
              <div className='relative'>
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                  <DropdownMenuTrigger className='focus:outline-none'>
                    <div className='flex items-center'>
                      <Avatar className='h-10 w-10 border-2 border-yellow-400'>
                        <AvatarImage src='/header/user.png' alt='Profile' />
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
                    <DropdownMenuItem asChild>
                      <Link
                        href='/student-dashboard'
                        className='cursor-pointer'
                      >
                        Student Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
