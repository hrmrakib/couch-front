"use client";

import { useState } from "react";

export default function OrdersPage() {
  const [address, setAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleShippingAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShippingAddress(e.target.value);
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      // In a real app, you would save the data to your backend here
      console.log("Saved addresses:", { address, shippingAddress });
      alert("Addresses saved successfully!");
    } catch (error) {
      console.error("Error saving addresses:", error);
      alert("Failed to save addresses. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='w-full md:w-3/4 h-screen'>
      <form onSubmit={handleSaveChanges}>
        <div className='mb-6'>
          <label htmlFor='address' className='block text-lg font-medium mb-2'>
            Address
          </label>
          <input
            id='address'
            type='text'
            value={address}
            onChange={handleAddressChange}
            placeholder='Address'
            className='w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-1 focus:ring-gray-400'
          />
        </div>

        <div className='mb-8'>
          <label
            htmlFor='shippingAddress'
            className='block text-lg font-medium mb-2'
          >
            Shipping Address
          </label>
          <input
            id='shippingAddress'
            type='text'
            value={shippingAddress}
            onChange={handleShippingAddressChange}
            placeholder='Shipping address'
            className='w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-1 focus:ring-gray-400'
          />
        </div>

        <button
          type='submit'
          disabled={isSaving}
          className='bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-8 rounded transition-colors disabled:opacity-70 disabled:cursor-not-allowed'
        >
          {isSaving ? "Saving..." : "Save Change"}
        </button>
      </form>
    </div>
  );
}
