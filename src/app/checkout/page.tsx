"use client";

import type React from "react";

import { useMemo, useState } from "react";
import Image from "next/image";
import countryList from "react-select-country-list";

// Define types
interface CartItem {
  id: string;
  name: string;
  material: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

interface CheckoutFormData {
  email: string;
  emailOffers: boolean;
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  postalCode: string;
  city: string;
  saveInfo: boolean;
  paymentMethod: "creditCard" | "applePay" | "venmo";
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  nameOnCard: string;
  useShippingAsBilling: boolean;
}

export default function CheckoutPage() {
  // Sample cart items
  const [cartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Williey chair",
      material: "Wooden",
      color: "Orange",
      price: 120.0,
      quantity: 2,
      image: "/cart/1.png",
    },
    {
      id: "2",
      name: "Williey chair",
      material: "Wooden",
      color: "Orange",
      price: 120.0,
      quantity: 2,
      image: "/cart/1.png",
    },
  ]);

  // Form state
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    emailOffers: false,
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    postalCode: "",
    city: "",
    saveInfo: false,
    paymentMethod: "creditCard",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
    nameOnCard: "",
    useShippingAsBilling: false,
  });
  //   const [selectedCountry, setSelectedCountry] = useState("");
  const countries = useMemo(() => countryList().getData(), []);

  //   const changeHandler = (value: string) => {
  //     setSelectedCountry(value);
  //   };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = subtotal; // In a real app, you'd add shipping, taxes, etc.

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle payment method selection
  const handlePaymentMethodChange = (
    method: "creditCard" | "applePay" | "venmo"
  ) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: method,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would process the payment here
    console.log("Processing payment with data:", formData);
    alert("Payment processed successfully!");
  };

  // Format price to always show 2 decimal places
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  console.log({ countries });
 
  return (
    <div className='min-h-screen bg-white'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-2xl font-bold text-[#333333] text-center mb-4'>
          Checkout
        </h1>

        <div className='border-t'></div>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col lg:flex-row mt-6'
        >
          {/* Left Column - Customer Information */}
          <div className='w-full lg:w-1/2 lg:pr-8'>
            <h2 className='text-2xl text-[#333333] font-medium mb-4'>
              Checkout
            </h2>

            {/* Email/Phone */}
            <div className='mb-6'>
              <label
                htmlFor='email'
                className='block text-lg text-[#333333] mb-1'
              >
                Email/Phone
              </label>
              <input
                type='text'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                placeholder='E-mail/phone'
                className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
              />

              <div className='mt-2'>
                <label className='inline-flex items-center'>
                  <input
                    type='checkbox'
                    name='emailOffers'
                    checked={formData.emailOffers}
                    onChange={handleInputChange}
                    className='rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4'
                  />
                  <span className='ml-2 block text-lg text-[#333333]'>
                    E-mail me with news & offers
                  </span>
                </label>
              </div>
            </div>

            {/* Delivery */}
            <div className='mb-6'>
              <h3 className='text-2xl text-[#333333] font-medium mb-4'>
                Delivery
              </h3>

              {/* Country/Region */}
              <div className='mb-4'>
                <label
                  htmlFor='country'
                  className='block text-lg text-[#333333] mb-1'
                >
                  Country Region
                </label>
                <div className='relative'>
                  <select
                    id='country'
                    name='country'
                    value={formData.country}
                    onChange={handleInputChange}
                    className='w-full border border-gray-300 rounded px-3 py-2 appearance-none focus:outline-none focus:ring-1 focus:ring-gray-400'
                  >
                    <option value='' disabled>
                      Country region
                    </option>
                    <option value='us'>United States</option>
                    <option value='ca'>Canada</option>
                    <option value='uk'>United Kingdom</option>
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                    <svg
                      className='fill-current h-4 w-4'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div className='flex flex-col sm:flex-row gap-4 mb-4'>
                <div className='flex-1'>
                  <label
                    htmlFor='firstName'
                    className='block text-lg text-[#333333] mb-1'
                  >
                    First Name
                  </label>
                  <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder='First name'
                    className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                  />
                </div>
                <div className='flex-1'>
                  <label
                    htmlFor='lastName'
                    className='block text-lg text-[#333333] mb-1'
                  >
                    Last Name
                  </label>
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder='Last name'
                    className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                  />
                </div>
              </div>

              {/* Address */}
              <div className='mb-4'>
                <label
                  htmlFor='address'
                  className='block text-lg text-[#333333] mb-1'
                >
                  Address
                </label>
                <input
                  type='text'
                  id='address'
                  name='address'
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder='Address'
                  className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                />
              </div>

              {/* Apartment */}
              <div className='mb-4'>
                <label
                  htmlFor='apartment'
                  className='block text-lg text-[#333333] mb-1'
                >
                  Apartment
                </label>
                <input
                  type='text'
                  id='apartment'
                  name='apartment'
                  value={formData.apartment}
                  onChange={handleInputChange}
                  placeholder='Apartment, suite, etc. (optional)'
                  className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                />
              </div>

              {/* Postal Code & City */}
              <div className='flex flex-col sm:flex-row gap-4 mb-4'>
                <div className='flex-1'>
                  <label
                    htmlFor='postalCode'
                    className='block text-lg text-[#333333] mb-1'
                  >
                    Postal Code
                  </label>
                  <input
                    type='text'
                    id='postalCode'
                    name='postalCode'
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder='Postal code'
                    className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                  />
                </div>
                <div className='flex-1'>
                  <label
                    htmlFor='city'
                    className='block text-lg text-[#333333] mb-1'
                  >
                    City
                  </label>
                  <input
                    type='text'
                    id='city'
                    name='city'
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder='City'
                    className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                  />
                </div>
              </div>

              {/* Save Info */}
              <div className='mb-4'>
                <label className='inline-flex items-center'>
                  <input
                    type='checkbox'
                    name='saveInfo'
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                    className='rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4'
                  />
                  <span className='ml-2 text-lg text-[#333333]'>
                    Save this information for the next time
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary & Payment */}
          <div className='w-full lg:w-1/2 lg:pl-8 bg-gray-50 lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none mt-8 lg:mt-0'>
            <div className='lg:bg-gray-50 lg:p-6 lg:rounded-lg'>
              {/* Order Summary */}
              <div className='mb-6'>
                {cartItems.map((item, index) => (
                  <div key={index} className='flex items-start py-4'>
                    <div className='relative bg-gray-200 rounded-md w-16 h-16 flex items-center justify-center mr-4 overflow-hidden'>
                      <div className='absolute top-0 left-0 bg-gray-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs'>
                        {item.quantity}
                      </div>
                      <div className='relative w-12 h-12'>
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className='object-contain'
                        />
                      </div>
                    </div>
                    <div className='flex-1'>
                      <div className='flex justify-between'>
                        <div>
                          <h4 className='font-medium text-lg text-[#333333]'>
                            {item.name}
                          </h4>
                          <p className='font-medium text-lg text-[#333333]'>
                            {item.material}/{item.color}
                          </p>
                        </div>
                        <span className='font-medium text-lg text-[#333333]'>
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className='border-t border-gray-200 pt-4'>
                  <div className='flex justify-between mb-2'>
                    <span className='text-lg text-[#333333]'>
                      Subtotal : {totalItems} items
                    </span>
                    <span className='text-lg text-[#333333]'>
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className='flex justify-between mb-2'>
                    <span className='text-lg text-[#333333]'>Shipping</span>
                    <span className='text-lg text-[#333333]'>
                      Enter shipping address
                    </span>
                  </div>

                  <div className='flex justify-between items-center'>
                    <span className='text-lg'>Total</span>
                    <div className='text-right'>
                      <span className='text-lg text-[#333333]'>USD</span>
                      <span className='font-medium text-lg ml-1'>
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h3 className='text-2xl font-bold text-[#333333] mb-4'>
                  Payment
                </h3>

                {/* Credit Card */}
                <div className='mb-4'>
                  <label className='flex items-center justify-between mb-4'>
                    <div className='flex items-center'>
                      {/* <input
                        type='radio'
                        name='paymentMethod'
                        checked={formData.paymentMethod === "creditCard"}
                        onChange={() => handlePaymentMethodChange("creditCard")}
                        className='h-6 w-6 text-[#FFC21A] bg-[#FFC21A] focus:ring-[#FFC21A] border-gray-300'
                      /> */}
                      <input
                        type='radio'
                        name='paymentMethod'
                        checked={formData.paymentMethod === "creditCard"}
                        onChange={() => handlePaymentMethodChange("creditCard")}
                        className='peer hidden'
                      />

                      <label className='h-6 w-6 flex items-center justify-center border-2 border-gray-300 rounded-full cursor-pointer peer-checked:border-[#FFC21A] peer-checked:bg-[#FFC21A]'>
                        <div className='h-3 w-3 bg-white rounded-full peer-checked:bg-white'></div>
                      </label>

                      <span className='ml-2 text-xl text-[#333333] font-medium'>
                        Credit Card
                      </span>
                    </div>
                    <svg
                      width='72'
                      height='48'
                      viewBox='0 0 72 48'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <mask
                        id='mask0_588_6076'
                        style={{ maskType: "luminance" }}
                        maskUnits='userSpaceOnUse'
                        x='8'
                        y='14'
                        width='56'
                        height='19'
                      >
                        <path
                          d='M37.2238 20.6136C37.1925 23.0856 39.4269 24.4652 41.1101 25.2853C42.8395 26.1269 43.4204 26.6666 43.4138 27.419C43.4006 28.5709 42.0342 29.0792 40.7553 29.099C38.5242 29.1336 37.2271 28.4966 36.1957 28.0148L35.3921 31.7756C36.4268 32.2525 38.3427 32.6684 40.3295 32.6865C44.993 32.6865 48.0443 30.3845 48.0608 26.8151C48.0789 22.2852 41.7949 22.0344 41.8378 20.0096C41.8527 19.3957 42.4385 18.7406 43.7224 18.5739C44.3577 18.4898 46.1119 18.4254 48.1004 19.3413L48.8809 15.7025C47.8116 15.3131 46.437 14.9402 44.7257 14.9402C40.3361 14.9402 37.2486 17.2736 37.2238 20.6136ZM56.3811 15.2537C55.5296 15.2537 54.8118 15.7504 54.4916 16.5128L47.8297 32.4192H52.4899L53.4173 29.8564H59.1122L59.6502 32.4192H63.7576L60.1733 15.2537H56.3811ZM57.033 19.8908L58.3779 26.3365H54.6946L57.033 19.8908ZM31.5735 15.2537L27.9001 32.4192H32.3408L36.0126 15.2537H31.5735ZM25.004 15.2537L20.3818 26.9372L18.5121 17.0029C18.2926 15.894 17.4263 15.2537 16.4642 15.2537H8.90787L8.80225 15.7521C10.3534 16.0887 12.1159 16.6316 13.1836 17.2125C13.837 17.5673 14.0235 17.8775 14.238 18.7208L17.7794 32.4192H22.4726L29.6675 15.2537H25.004Z'
                          fill='white'
                        />
                      </mask>
                      <g mask='url(#mask0_588_6076)'>
                        <path
                          d='M3.04785 17.0596L57.1951 -2.88159L69.5134 30.5676L15.3667 50.5088'
                          fill='url(#paint0_linear_588_6076)'
                        />
                      </g>
                      <defs>
                        <linearGradient
                          id='paint0_linear_588_6076'
                          x1='13.7808'
                          y1='32.1471'
                          x2='60.0963'
                          y2='15.0898'
                          gradientUnits='userSpaceOnUse'
                        >
                          <stop stop-color='#222357' />
                          <stop offset='1' stop-color='#254AA5' />
                        </linearGradient>
                      </defs>
                    </svg>
                  </label>

                  {formData.paymentMethod === "creditCard" && (
                    <div className='space-y-4 pl-6'>
                      <div>
                        <label
                          htmlFor='cardNumber'
                          className='block text-sm font-medium text-gray-700 mb-1'
                        >
                          Card Number
                        </label>
                        <input
                          type='text'
                          id='cardNumber'
                          name='cardNumber'
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder='Card number'
                          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                        />
                      </div>

                      <div className='flex gap-4'>
                        <div className='flex-1'>
                          <label
                            htmlFor='expirationDate'
                            className='block text-sm font-medium text-gray-700 mb-1'
                          >
                            Expiration Date
                          </label>
                          <input
                            type='text'
                            id='expirationDate'
                            name='expirationDate'
                            value={formData.expirationDate}
                            onChange={handleInputChange}
                            placeholder='MM/YY'
                            className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                          />
                        </div>
                        <div className='flex-1'>
                          <label
                            htmlFor='cvc'
                            className='block text-sm font-medium text-gray-700 mb-1'
                          >
                            CVC
                          </label>
                          <input
                            type='text'
                            id='cvc'
                            name='cvc'
                            value={formData.cvc}
                            onChange={handleInputChange}
                            placeholder='CVC'
                            className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor='nameOnCard'
                          className='block text-sm font-medium text-gray-700 mb-1'
                        >
                          Name Of Card
                        </label>
                        <input
                          type='text'
                          id='nameOnCard'
                          name='nameOnCard'
                          value={formData.nameOnCard}
                          onChange={handleInputChange}
                          placeholder='Name of card'
                          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                        />
                      </div>

                      <div>
                        <label className='inline-flex items-center'>
                          <input
                            type='checkbox'
                            name='useShippingAsBilling'
                            checked={formData.useShippingAsBilling}
                            onChange={handleInputChange}
                            className='rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4'
                          />
                          <span className='ml-2 text-sm text-gray-700'>
                            Use shipping address as billing address
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Apple Pay */}
                <div className='mb-4'>
                  <label className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      {/* <input
                        type='radio'
                        name='paymentMethod'
                        checked={formData.paymentMethod === "applePay"}
                        onChange={() => handlePaymentMethodChange("applePay")}
                        className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
                      /> */}

                      <input
                        type='radio'
                        name='paymentMethod'
                        checked={formData.paymentMethod === "applePay"}
                        onChange={() => handlePaymentMethodChange("applePay")}
                        className='peer hidden'
                      />

                      <label className='h-6 w-6 flex items-center justify-center border-2 border-gray-300 rounded-full cursor-pointer peer-checked:border-[#FFC21A] peer-checked:bg-[#FFC21A]'>
                        <div className='h-3 w-3 bg-white rounded-full peer-checked:bg-white'></div>
                      </label>

                      <span className='ml-2 text-xl text-[#333333] font-medium'>
                        Apple Pay
                      </span>
                    </div>
                    {/* <Image
                      src='/payments/apple-pay.svg'
                      className='w-10 h-10'
                      alt='Apple Pay'
                      width={50}
                      height={30}
                    /> */}
                    <svg
                      width='72'
                      height='49'
                      viewBox='0 0 72 49'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M18.8431 16.2558C18.199 17.0179 17.1685 17.6191 16.138 17.5332C16.0092 16.5027 16.5137 15.4077 17.1041 14.7315C17.7482 13.9478 18.8753 13.3896 19.7878 13.3467C19.8951 14.4201 19.4765 15.4721 18.8431 16.2558ZM19.777 17.7372C18.2849 17.6513 17.0075 18.5852 16.299 18.5852C15.5798 18.5852 14.4956 17.7801 13.3148 17.8016C11.7797 17.823 10.352 18.6926 9.56836 20.0773C7.95816 22.8469 9.14971 26.9475 10.7062 29.2018C11.4684 30.3182 12.3808 31.542 13.5831 31.499C14.721 31.4561 15.1719 30.7583 16.5459 30.7583C17.9307 30.7583 18.3279 31.499 19.5301 31.4776C20.7754 31.4561 21.559 30.3612 22.3212 29.2448C23.1907 27.9781 23.5449 26.7436 23.5664 26.6792C23.5449 26.6577 21.1618 25.7452 21.1404 22.9972C21.1189 20.6999 23.0189 19.605 23.1048 19.5406C22.0313 17.9519 20.3567 17.7801 19.777 17.7372ZM28.397 14.6241V31.3595H30.9948V25.6379H34.5909C37.8757 25.6379 40.1837 23.3836 40.1837 20.1203C40.1837 16.8569 37.9187 14.6241 34.6768 14.6241H28.397ZM30.9948 16.814H33.9898C36.2441 16.814 37.5322 18.0163 37.5322 20.131C37.5322 22.2457 36.2441 23.4588 33.979 23.4588H30.9948V16.814ZM44.9284 31.4883C46.5601 31.4883 48.0737 30.6617 48.7607 29.3521H48.8144V31.3595H51.2189V23.0294C51.2189 20.6141 49.2867 19.0575 46.3132 19.0575C43.5544 19.0575 41.5148 20.6355 41.4396 22.8039H43.7798C43.973 21.7734 44.9284 21.0971 46.2381 21.0971C47.8268 21.0971 48.7178 21.8378 48.7178 23.2011V24.1243L45.4759 24.3175C42.4594 24.5 40.8278 25.7345 40.8278 27.8815C40.8278 30.0499 42.5131 31.4883 44.9284 31.4883ZM45.6262 29.5024C44.2414 29.5024 43.3612 28.8368 43.3612 27.817C43.3612 26.765 44.2092 26.1532 45.8301 26.0566L48.7178 25.8741V26.8187C48.7178 28.386 47.3867 29.5024 45.6262 29.5024ZM54.4286 35.911C56.962 35.911 58.1536 34.9449 59.1948 32.0143L63.7571 19.2186H61.1163L58.0569 29.1052H58.0033L54.9439 19.2186H52.228L56.6292 31.4024L56.3931 32.1431C55.9959 33.3991 55.3518 33.8821 54.2032 33.8821C53.9992 33.8821 53.6021 33.8607 53.441 33.8392V35.8466C53.5913 35.8895 54.2354 35.911 54.4286 35.911Z'
                        fill='#101010'
                      />
                    </svg>
                  </label>
                </div>

                {/* Venmo */}
                <div className='mb-6'>
                  <label className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      {/* <input
                        type='radio'
                        name='paymentMethod'
                        checked={formData.paymentMethod === "venmo"}
                        onChange={() => handlePaymentMethodChange("venmo")}
                        className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
                      /> */}

                      <input
                        type='radio'
                        name='paymentMethod'
                        checked={formData.paymentMethod === "venmo"}
                        onChange={() => handlePaymentMethodChange("venmo")}
                        className='peer hidden'
                      />

                      <label className='h-6 w-6 flex items-center justify-center border-2 border-gray-300 rounded-full cursor-pointer peer-checked:border-[#FFC21A] peer-checked:bg-[#FFC21A]'>
                        <div className='h-3 w-3 bg-white rounded-full peer-checked:bg-white'></div>
                      </label>

                      <span className='ml-2 text-xl text-[#333333] font-medium'>
                        Venmo
                      </span>
                    </div>
                    <Image
                      src='/payments/venmo.svg'
                      className=''
                      alt='Venmo'
                      width={74}
                      height={47}
                    />
                  </label>
                </div>

                {/* Pay Now Button */}
                <button
                  type='submit'
                  className='w-full bg-yellow-500 hover:bg-yellow-600 text-lg text-[#4A3300] cursor-pointer font-medium py-3 px-6 rounded transition-colors'
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
