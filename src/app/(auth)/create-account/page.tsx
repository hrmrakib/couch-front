"use client";

import type React from "react";

import { ChangeEvent, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Camera, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CreateAccount() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageClick = () => {
    // Trigger file input click when avatar is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!agreeTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submitted:", formData);

      // Redirect to login page after successful account creation
      router.push("/login");
    } catch (error) {
      console.error("Error creating account:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <main className='h-[calc(100vh-100px)] flex flex-col items-center justify-center px-4 py-12'>
      <div className='w-full max-w-md'>
        <h1 className='text-[40px] font-medium text-[#545454] text-center mb-8'>
          Create Account
        </h1>

        <div className='flex justify-center mb-6'>
          {/* Hidden file input */}
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleImageChange}
            accept='image/*'
            className='hidden'
            aria-label='Upload profile picture'
          />

          {/* Clickable avatar area */}
          <div
            onClick={handleImageClick}
            className='w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center relative cursor-pointer overflow-hidden group'
          >
            {profileImage ? (
              <Image
                src={profileImage || "/placeholder.svg"}
                alt='Profile Preview'
                fill
                className='object-cover'
              />
            ) : (
              <svg
                className='w-12 h-12 text-gray-500 group-hover:opacity-80 transition-opacity'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
              </svg>
            )}

            {/* Camera icon overlay on hover */}
            <div className='absolute inset-0 bg-gray-500 bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
              <Camera className='w-8 h-8 text-white' />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-2'>
            <label
              htmlFor='name'
              className='block text-[#333333] text-base md:text-lg'
            >
              Name
            </label>
            <input
              id='name'
              name='name'
              type='text'
              placeholder='Name'
              value={formData.name}
              onChange={handleChange}
              className={`w-full h-14 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400`}
            />
            {errors.name && <p className='text-red-500 mt-1'>{errors.name}</p>}
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='email'
              className='block text-[#333333] text-base md:text-lg'
            >
              E-Mail/Edu e-mail
            </label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='E-mail address'
              value={formData.email}
              onChange={handleChange}
              className={`w-full h-14 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400`}
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
            )}
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='password'
              className='block text-[#333333] text-base md:text-lg'
            >
              Password
            </label>
            <div className='relative'>
              <input
                id='password'
                name='password'
                type={showPassword ? "text" : "password"}
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                className={`w-full h-14 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400`}
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className='h-5 w-5' />
                ) : (
                  <Eye className='h-5 w-5' />
                )}
              </button>
            </div>
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
            )}
          </div>

          <div className='flex items-start'>
            <input
              id='terms'
              type='checkbox'
              checked={agreeTerms}
              onChange={() => setAgreeTerms((prev) => !prev)}
              className='mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
            />
            <label
              htmlFor='terms'
              className='ml-2 block text-[#333333] text-base md:text-lg'
            >
              I have read and agree with the terms & condition
            </label>
          </div>

          <p className='text-[#333333] text-base md:text-lg'>
            Share your .edu email if you&apos;re a student.
          </p>

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 rounded transition-colors disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed'
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className='mt-6 text-center'>
          <span className='text-[#333333] text-base md:text-lg'>
            Already have account?{" "}
          </span>
          <Link
            href='/my-account'
            className='text-[#333333] text-base md:text-lg font-medium hover:underline'
          >
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
}
