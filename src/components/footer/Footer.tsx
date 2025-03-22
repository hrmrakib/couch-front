import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className='bg-black text-white py-12'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* CONTACT Column */}
          <div>
            <h3 className='text-xl font-bold mb-6'>CONTACT</h3>
            <ul className='space-y-4'>
              <li>Tel: (2359698-485)</li>
              <li>Mon - Fri 8am - 8pm</li>
              <li>Sat - Sun 8am - 7pm</li>
            </ul>
          </div>

          {/* Our Service Column */}
          <div>
            <h3 className='text-xl font-bold mb-6'>Our Service</h3>
            <ul className='space-y-4'>
              <li>
                <Link href='/products/desk-table' className='hover:underline'>
                  Desk Table
                </Link>
              </li>
              <li>
                <Link href='/products/chair-table' className='hover:underline'>
                  Chair & Table
                </Link>
              </li>
              <li>
                <Link href='/products/room-decor' className='hover:underline'>
                  Room Decor
                </Link>
              </li>
              <li>
                <Link href='/products/sofa' className='hover:underline'>
                  Sofa
                </Link>
              </li>
            </ul>
          </div>

          {/* ABOUT Column */}
          <div>
            <h3 className='text-xl font-bold mb-6'>ABOUT</h3>
            <ul className='space-y-4'>
              <li>
                <Link href='/about/our-story' className='hover:underline'>
                  Our Story
                </Link>
              </li>
              <li>
                <Link href='/about/careers' className='hover:underline'>
                  Careers
                </Link>
              </li>
              <li>
                <Link href='/about/influencers' className='hover:underline'>
                  Influencers
                </Link>
              </li>
              <li>
                <Link href='/about/join-our-team' className='hover:underline'>
                  Join Our Team
                </Link>
              </li>
            </ul>
          </div>

          {/* CLIENT SERVICE Column */}
          <div>
            <h3 className='text-xl font-bold mb-6'>CLIENT SERVICE</h3>
            <ul className='space-y-4'>
              <li>
                <Link href='/contact' className='hover:underline'>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href='/customer-service' className='hover:underline'>
                  Customer Service
                </Link>
              </li>
              <li>
                <Link href='/find-store' className='hover:underline'>
                  Find Store
                </Link>
              </li>
              <li>
                <Link href='/shipping-returns' className='hover:underline'>
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='flex justify-between items-center mt-12'>
          <div className='flex space-x-3 mt-6'>
            <Link
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-blue-600 rounded-full p-2 hover:opacity-80 transition-opacity'
              aria-label='Facebook'
            >
              <Facebook size={20} />
            </Link>
            <Link
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-pink-600 rounded-full p-2 hover:opacity-80 transition-opacity'
              aria-label='Instagram'
            >
              <Instagram size={20} />
            </Link>
            <Link
              href='https://linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-blue-700 rounded-full p-2 hover:opacity-80 transition-opacity'
              aria-label='LinkedIn'
            >
              <Linkedin size={20} />
            </Link>
            <Link
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-blue-400 rounded-full p-2 hover:opacity-80 transition-opacity'
              aria-label='Twitter'
            >
              <Twitter size={20} />
            </Link>
          </div>

          <div className='text-center mt-12'>
            <p>Sitswap. All Rights. Reserved.</p>
          </div>

          <div className='flex space-x-3 mt-6'>
            <Image
              src='/payments/visa.svg'
              alt='Visa'
              width={40}
              height={25}
              className='object-contain'
            />
            <Image
              src='/payments/maestro.svg'
              alt='Mastercard'
              width={40}
              height={25}
              className='object-contain'
            />
            <Image
              src='/payments/paypal.svg'
              alt='PayPal'
              width={40}
              height={25}
              className='object-contain'
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
