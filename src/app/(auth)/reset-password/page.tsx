"use client";

import type React from "react";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

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

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call to reset password
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // ("Password reset successful");

      // Show success message
      setResetSuccess(true);

      // In a real application, you would redirect to login after a delay
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      console.error("Error resetting password:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <main className='min-h-screen flex flex-col items-center justify-center px-4 py-12'>
      <div className='w-full max-w-md'>
        <h1 className='text-[40px] font-medium text-[#545454] text-center mb-8'>
          Reset Password
        </h1>

        {resetSuccess ? (
          <div className='text-center'>
            <div className='mb-4 p-3 bg-green-100 text-green-700 rounded-md'>
              Password reset successful!
            </div>
            <p className='mb-6'>
              Your password has been reset successfully. You will be redirected
              to the login page shortly.
            </p>
            <Link href='/login' className='text-blue-600 hover:underline'>
              Go to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <label
                htmlFor='password'
                className='block text-lg text-[#333333]'
              >
                New Password
              </label>
              <div className='relative'>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter new password'
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full h-14 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-lg placeholder:text-[#8A8A8A]`}
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

            <div className='space-y-2'>
              <label
                htmlFor='confirmPassword'
                className='block text-lg text-[#333333]'
              >
                Confirm Password
              </label>
              <div className='relative'>
                <input
                  id='confirmPassword'
                  name='confirmPassword'
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder='Confirm new password'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full h-14 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-lg placeholder:text-[#8A8A8A]`}
                />
                <button
                  type='button'
                  onClick={toggleConfirmPasswordVisibility}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-yellow-400 hover:bg-yellow-500 text-lg text-black font-medium py-3 rounded transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed'
            >
              {isSubmitting ? "Resetting Password..." : "Reset Password"}
            </button>

            <div className='text-center'>
              <Link
                href='/my-account'
                className='text-lg text-[#333333] underline'
              >
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
