"use client";

import type React from "react";

import {
  useState,
  useRef,
  type ChangeEvent,
  type DragEvent,
  useMemo,
} from "react";
import Image from "next/image";
import countryList from "react-select-country-list";
import { usePostTradeMutation } from "@/redux/features/trade/tradeAPI";
import { toast } from "sonner";

// Define types
interface FormData {
  productName: string;
  description: string;
  category: string;
  condition: string;
  price: string;
  phoneNumber: string;
  countryCode: string;
  location: string;
  apartment: string;
  fullName: string;
  street: string;
  country: string;
  zipCode: string;
  city: string;
}

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

// Helper function to get country flag emoji from country code
function getCountryFlag(code: string) {
  const codePoints = code
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

// Helper function to get country calling code (simplified version)
function getCountryCallingCode(code: string) {
  const callingCodes: { [key: string]: string } = {
    US: "1",
    GB: "44",
    FR: "33",
    DE: "49",
    IT: "39",
    ES: "34",
    CA: "1",
    AU: "61",
    JP: "81",
    CN: "86",
    IN: "91",
    BR: "55",
    RU: "7",
    MX: "52",
    ZA: "27",
    AR: "54",
    EG: "20",
    CL: "56",
  };
  return callingCodes[code] || "1"; // Default to 1 if not found
}

export default function SellPage() {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    productName: "Study desk chair",
    description:
      "Upgrade your study space with this durable and stylish wooden study table. Made from premium quality wood, this table is designed for students who need a comfortable and organized workspace.",
    category: "Chair",
    condition: "Like new",
    price: "120.00",
    phoneNumber: "000 0000 000",
    countryCode: "+1",
    location: "",
    apartment: "",
    fullName: "John Doe",
    street: "1234 Broadway St.",
    country: "United States",
    zipCode: "10001",
    city: "New York",
  });

  // Images state
  const [mainImage, setMainImage] = useState<UploadedImage | null>(null);
  const [additionalImages, setAdditionalImages] = useState<UploadedImage[]>([]);
  const [showConditionDropdown, setShowConditionDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  // Update the initial selected country
  const [selectedCountry, setSelectedCountry] = useState({
    name: "United States",
    emoji: "🇺🇸",
    code: "US",
    phone: "1",
  });

  console.log(mainImage?.file.name, "mainImage");

  const [postTrade] = usePostTradeMutation();

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const additionalFileInputRef = useRef<HTMLInputElement>(null);

  // Condition options
  const conditionOptions = [
    "New",
    "Like New",
    "Excellent",
    "Good",
    "Fair",
    "Needs Repair",
  ];

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle condition selection
  const handleConditionSelect = (condition: string) => {
    setFormData((prev) => ({
      ...prev,
      condition,
    }));
    setShowConditionDropdown(false);
  };

  // Handle country selection
  const handleCountrySelect = (country: typeof selectedCountry) => {
    setSelectedCountry(country);
    setFormData((prev) => ({
      ...prev,
      countryCode: `+${country.phone}`,
    }));
    setShowCountryDropdown(false);
  };

  // Handle main image upload
  const handleMainImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setMainImage({
          id: Date.now().toString(),
          file,
          preview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle additional image upload
  const handleAdditionalImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files);
    console.log(files);
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit");
        return;
      }

      if (additionalImages.length >= 3) {
        alert("You can only upload up to 3 additional images");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setAdditionalImages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            file,
            preview: reader.result as string,
          },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag over
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle drop for main image
  const handleMainImageDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setMainImage({
          id: Date.now().toString(),
          file,
          preview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drop for additional image
  const handleAdditionalImageDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit");
        return;
      }

      if (additionalImages.length >= 3) {
        alert("You can only upload up to 3 additional images");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setAdditionalImages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            file,
            preview: reader.result as string,
          },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const removeImage = (id: string) => {
    setAdditionalImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Replace image
  const replaceImage = (id: string) => {
    if (additionalFileInputRef.current) {
      additionalFileInputRef.current.click();
      // Store the ID to replace
      additionalFileInputRef.current.dataset.replaceId = id;
    }
  };

  // Handle form submission
  // Update the handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.productName ||
      !formData.description ||
      !formData.category ||
      !formData.condition ||
      !formData.price ||
      !formData.phoneNumber ||
      !formData.city
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (!mainImage && additionalImages.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.productName);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("condition", formData.condition);
      formDataToSend.append("price", formData.price);

      const sellerInfo = {
        name: formData.fullName,
        contact: formData.countryCode + formData.phoneNumber.replace(/\s/g, ""),
        address: {
          country: formData.country,
          city: formData.city,
          zip: formData.zipCode,
          street: formData.street,
          apartment: formData.apartment,
        },
      };
      formDataToSend.append("seller", JSON.stringify(sellerInfo));

      if (mainImage) {
        formDataToSend.append("images", mainImage.file);
      }

      additionalImages.forEach((image) => {
        formDataToSend.append("images", image.file);
      });

      const response = await postTrade(formDataToSend).unwrap();
      toast.success(response.message || "Trade created successfully!");

      console.log("Trade created:", response);
    } catch (error) {
      console.error("Failed to create trade:", error);
      alert("Failed to list your furniture. Please try again.");
    }
  };

  const countries = useMemo(() => {
    return countryList()
      .getData()
      .map((country) => ({
        code: country.value,
        name: country.label,
        emoji: getCountryFlag(country.value),
        phone: getCountryCallingCode(country.value),
      }));
  }, []);

  console.log(formData);

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <div className='mb-6'>
        <h1 className='text-2xl font-medium mb-2'>
          Sell Your Old Furniture & Earn Money!
        </h1>
        <p className='text-gray-600'>
          Are you a student looking to sell your old furniture? List your used
          furniture on our platform and sell it directly to the website owner
          hassle-free! No need to find buyers just upload details, and
          we&apos;ll take care of the rest.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-2 gap-8'
      >
        {/* Left Column - Form Fields */}
        <div>
          {/* Product Name */}
          <div className='mb-6'>
            <label
              htmlFor='productName'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Product Name
            </label>
            <input
              type='text'
              id='productName'
              name='productName'
              value={formData.productName}
              onChange={handleInputChange}
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
            />
          </div>

          {/* Description */}
          <div className='mb-6'>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Description
            </label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
            />
          </div>

          {/* Category and Condition */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
            <div>
              <label
                htmlFor='category'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Category
              </label>

              <input
                type='text'
                id='category'
                name='category'
                value={formData.category}
                onChange={handleInputChange}
                className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
              />
            </div>

            <div className='relative'>
              <label
                htmlFor='condition'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Condition
              </label>
              <div
                className='w-full border border-gray-300 rounded px-3 py-2 flex justify-between items-center cursor-pointer'
                onClick={() => setShowConditionDropdown(!showConditionDropdown)}
              >
                <span>{formData.condition}</span>
                <svg
                  className='w-4 h-4 text-gray-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </div>

              {showConditionDropdown && (
                <div className='absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg'>
                  {conditionOptions.map((option) => (
                    <div
                      key={option}
                      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                        formData.condition === option ? "bg-gray-200" : ""
                      }`}
                      onClick={() => handleConditionSelect(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Pricing */}
          <div className='mb-6'>
            <label
              htmlFor='price'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Pricing
            </label>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 transform -translate-y-1/2'>
                $
              </span>
              <input
                type='text'
                id='price'
                name='price'
                value={formData.price}
                onChange={handleInputChange}
                className='w-full border border-gray-300 rounded pl-7 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
              />
            </div>
          </div>

          {/* fullname here */}
          <div className='mb-6'>
            <label
              htmlFor='apartment'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Full Name
            </label>
            <input
              type='text'
              id='fullName'
              name='fullName'
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder='Enter your full name'
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
            />
          </div>

          {/* Phone Number */}
          <div className='mb-6'>
            <div className='w-full'>
              <label
                htmlFor='phoneNumber'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Phone Number
              </label>
              <div className='flex'>
                <div className='relative'>
                  <button
                    type='button'
                    className='flex items-center border border-gray-300 rounded-l px-2 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  >
                    <span className='mr-1'>{selectedCountry.emoji}</span>
                    <svg
                      className='w-4 h-4 text-gray-500'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </button>

                  {showCountryDropdown && (
                    <div className='absolute z-10 left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg'>
                      {countries.map((country) => (
                        <div
                          key={country.code}
                          className='px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center'
                          onClick={() =>
                            handleCountrySelect({
                              name: country.name,
                              emoji: country.emoji,
                              code: country.code,
                              phone: country.phone,
                            })
                          }
                        >
                          <span className='mr-2'>{country.emoji}</span>
                          <span>{country.name}</span>
                          <span className='ml-auto text-gray-500'>
                            +{country.phone}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className='flex-1 flex'>
                  <span className='border-t border-b border-gray-300 px-2 py-2 bg-gray-100 text-gray-700'>
                    {formData.countryCode}
                  </span>
                  <input
                    type='text'
                    id='phoneNumber'
                    name='phoneNumber'
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className='flex-1 border-t border-r border-b border-gray-300 rounded-r px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* country */}
          <div className='mb-6'>
            <label htmlFor='country' className='block text-sm text-[#333333]'>
              Country Region
            </label>
            <div className='relative'>
              <select
                id='country'
                name='country'
                value={formData.country}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }))
                }
                className='w-full border border-gray-300 rounded px-3 py-2 appearance-none focus:outline-none focus:ring-1 focus:ring-gray-400'
              >
                <option value='' disabled defaultChecked>
                  Country region
                </option>
                <option value='United States'>United States</option>
                <option value='Canada'>Canada</option>
                <option value='United Kingdom'>United Kingdom</option>
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

          {/* City */}
          <div className='mb-6'>
            <label
              htmlFor='city'
              className='block text-sm font-medium text-gray-700 mb-1'
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

          {/* Street */}
          <div className='mb-6'>
            <label
              htmlFor='street'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Street
            </label>
            <input
              type='text'
              id='street'
              name='street'
              value={formData.street}
              onChange={handleInputChange}
              placeholder='street'
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
            />
          </div>

          {/* Apartment/Suite */}
          <div className='grid grid-cols-2 gap-4 mb-6'>
            <div>
              <label
                htmlFor='apartment'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Apartment/Suite
              </label>
              <input
                type='text'
                id='apartment'
                name='apartment'
                value={formData.apartment}
                onChange={handleInputChange}
                className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
              />
            </div>

            {/* ZIP Code */}
            <div>
              <label
                htmlFor='zipCode'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                ZIP Code
              </label>
              <input
                type='text'
                id='zipCode'
                name='zipCode'
                value={formData.zipCode}
                onChange={handleInputChange}
                className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
              />
            </div>
          </div>
        </div>

        {/* Right Column - Image Upload */}
        <div>
          <h2 className='text-lg font-medium mb-2'>Products Photos</h2>
          <p className='text-gray-600 mb-4'>
            Upload multiple images to give buyers a clear view of your
            furniture.
          </p>

          {/* Main Image Upload */}
          <div
            className={`border-2 border-dashed border-gray-300 rounded-md p-6 mb-4 flex flex-col items-center justify-center text-center ${
              !mainImage ? "h-40" : ""
            }`}
            onDragOver={handleDragOver}
            onDrop={handleMainImageDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleMainImageUpload}
              accept='.jpg,.jpeg,.png'
              className='hidden'
            />

            {mainImage ? (
              <div className='relative w-full h-40'>
                <Image
                  src={mainImage.preview || "/placeholder.svg"}
                  alt='Uploaded furniture'
                  fill
                  className='object-contain'
                />
              </div>
            ) : (
              <>
                <svg
                  className='w-12 h-12 text-gray-400 mb-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                  />
                </svg>
                <p className='text-gray-500 mb-2'>
                  Drag & drop your image here or click to browse (.jpg, .png) 10
                  MB
                </p>
                <button
                  type='button'
                  className='px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none'
                >
                  Browse Image
                </button>
              </>
            )}
          </div>

          {/* Additional Images */}
          <div className='grid grid-cols-3 gap-4'>
            {[...Array(3)].map((_, index) => {
              const image = additionalImages[index];
              return (
                <div
                  key={index}
                  className={`border border-gray-300 rounded-md overflow-hidden relative ${
                    !image ? "bg-gray-100" : ""
                  }`}
                  style={{ height: "100px" }}
                >
                  {image ? (
                    <>
                      <div className='relative w-full h-full'>
                        <Image
                          src={image.preview || "/placeholder.svg"}
                          alt={`Additional furniture image ${index + 1}`}
                          fill
                          className='object-cover'
                        />
                      </div>
                      <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center'>
                        <button
                          type='button'
                          className='text-white bg-gray-800 bg-opacity-70 px-2 py-1 rounded text-xs mb-1'
                          onClick={() => replaceImage(image.id)}
                        >
                          Replace
                        </button>
                        <button
                          type='button'
                          className='text-white bg-gray-800 bg-opacity-70 px-2 py-1 rounded text-xs'
                          onClick={() => removeImage(image.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </>
                  ) : (
                    <div
                      className='w-full h-full flex flex-col items-center justify-center cursor-pointer'
                      onClick={() => additionalFileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDrop={handleAdditionalImageDrop}
                    >
                      <svg
                        className='w-8 h-8 text-gray-400 mb-1'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                        />
                      </svg>
                      <p className='text-gray-500 text-xs text-center px-2'>
                        Click to upload or drag & drop
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <input
            type='file'
            ref={additionalFileInputRef}
            onChange={handleAdditionalImageUpload}
            accept='.jpg,.jpeg,.png'
            className='hidden'
          />

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 px-6 rounded transition-colors mt-8'
          >
            Save & Processed
          </button>
        </div>
      </form>
    </div>
  );
}
