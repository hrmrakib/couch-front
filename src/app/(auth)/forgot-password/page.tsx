"use client";

import type React from "react";

import { useState, type FormEvent } from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  //   const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call to send OTP
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // ("OTP sent to:", email);

      // Show success message or redirect to OTP verification page
      setOtpSent(true);

      // In a real application, you might redirect to an OTP verification page
      // router.push(`/verify-otp?email=${encodeURIComponent(email)}`)
    } catch (error) {
      console.error("Error sending OTP:", error);
      setEmailError("Failed to send OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className='min-h-screen flex flex-col items-center justify-center px-4 py-12'>
      <div className='w-full max-w-md'>
        <h1 className='text-3xl font-medium text-gray-700 text-center mb-8'>
          Forgot Password
        </h1>

        {otpSent ? (
          <div className='text-center'>
            <div className='mb-4 p-3 bg-green-100 text-green-700 rounded-md'>
              OTP has been sent to your email address.
            </div>
            <p className='mb-6'>
              Please check your email and enter the OTP to reset your password.
            </p>
            <Link href='/verify-otp' className='text-blue-600 hover:underline'>
              Enter OTP
            </Link>
            <div className='mt-4'>
              <Link href='/login' className='text-gray-600 hover:underline'>
                Back to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <label htmlFor='email' className='block text-lg text-[#333333]'>
                E-Mail Address
              </label>
              <input
                id='email'
                type='email'
                placeholder='E-mail address'
                value={email}
                onChange={handleEmailChange}
                className={`w-full h-14 border ${
                  emailError ? "border-red-500" : "border-gray-300"
                } rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400`}
              />
              {emailError && (
                <p className='text-red-500 text-sm mt-1'>{emailError}</p>
              )}
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-[#FDB515] hover:bg-[#fdb415f8] text-[#4A3300] font-medium py-3 rounded transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed'
            >
              {isSubmitting ? "Sending..." : "Send OTP"}
            </button>

            <div className='text-center'>
              <Link href='/login' className='text-[#545454] underline text-lg'>
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
