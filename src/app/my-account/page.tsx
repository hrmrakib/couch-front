"use client";

import type React from "react";

import { useRef, useState } from "react";
import Image from "next/image";
import { Edit, Pencil } from "lucide-react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/profile/profileAPI";
import { Button } from "@/components/ui/button";

interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface ProfileData {
  name: string;
  email: string;
  avatar: string;
  phone: string;
}

export default function MyAccountPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [updateProfile] = useUpdateProfileMutation();

  const [address, setAddress] = useState<Address>({
    name: "Johan Smaith",
    street: "1388 Market st, suite 400",
    city: "san fransisco",
    state: "CA",
    zip: "526",
  });

  const { data: profile } = useGetProfileQuery() as {
    data?: { data: ProfileData };
  };
  const ImageURl = process.env.NEXT_PUBLIC_IMAGE_URL;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleAddressChange = (field: keyof Address, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const formatAddress = (address: Address) => {
    return `${address.street} ${address.city}, ${address.state} ${address.zip}`;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setSelectedImageFile(file);
    }
  };

  const handleSaveProfile = async () => {
    const formData = new FormData();

    if (selectedImageFile) {
      formData.append("images", selectedImageFile);
    }

    if (editedName && editedName !== profile?.data?.name) {
      formData.append("name", editedName);
    }

    try {
      await updateProfile(formData).unwrap();
      setIsEditingName(false);
      setSelectedImageFile(null);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditingName(true);
    setEditedName(profile?.data?.name || "");
  };

  return (
    <div className='bg-[#FFFFFF]'>
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='w-full md:w-3/4'>
            <h2 className='text-2xl font-medium mb-6'>Account Details</h2>

            <div className='flex items-center gap-12 mb-8'>
              <div className='flex items-center gap-4'>
                <div className='relative'>
                  <div className='w-20 h-20 rounded-full overflow-hidden bg-gray-200'>
                    {/* <Image
                      src={
                        profileImage ||
                        (ImageURl && profile?.data?.avatar
                          ? `${ImageURl}${profile.data.avatar}`
                          : "/users/2.png")
                      }
                      alt='Profile'
                      width={280}
                      height={280}
                      className='object-cover'
                    /> */}
                  </div>
                  <button
                    className='absolute bottom-0 right-0 bg-blue-500 text-white cursor-pointer rounded-full p-1'
                    aria-label='Edit profile picture'
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Pencil size={16} />
                    <input
                      type='file'
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept='image/*'
                      className='hidden'
                    />
                  </button>
                </div>
                <div>
                  {isEditingName ? (
                    <input
                      type='text'
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className='text-xl font-medium border border-gray-300 rounded p-1'
                    />
                  ) : (
                    <h3 className='text-xl font-medium'>
                      {profile?.data?.name || "Name not available"}
                    </h3>
                  )}
                  <p className='text-gray-600'>
                    {profile?.data?.email || "Email not available"}
                  </p>
                </div>
              </div>

              <div>
                {isEditingName ? (
                  <Button onClick={handleSaveProfile}>Save</Button>
                ) : (
                  <Button onClick={handleEditClick}>
                    <Edit size={16} /> Edit
                  </Button>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div className='mb-8 hidden'>
              <h3 className='text-lg font-medium mb-2'>Phone Number</h3>
              <div className='relative'>
                <input
                  type='tel'
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder='Phone number'
                  className='w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-1 focus:ring-gray-400'
                />
              </div>
            </div>

            {/* Address */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
              <div>
                <div className='flex items-center justify-between mb-2'>
                  <h3 className='text-lg font-medium'>Address</h3>
                  <button
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                    className='text-blue-500 rounded-full p-1 cursor-pointer'
                    aria-label='Edit address'
                  >
                    <Pencil size={20} />
                  </button>
                </div>

                {isEditingAddress ? (
                  <div className='space-y-3'>
                    <input
                      type='text'
                      value={address.name}
                      onChange={(e) =>
                        handleAddressChange("name", e.target.value)
                      }
                      className='w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                      placeholder='Full name'
                    />
                    <input
                      type='text'
                      value={address.street}
                      onChange={(e) =>
                        handleAddressChange("street", e.target.value)
                      }
                      className='w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                      placeholder='Street address'
                    />
                    <div className='grid grid-cols-3 gap-2'>
                      <input
                        type='text'
                        value={address.city}
                        onChange={(e) =>
                          handleAddressChange("city", e.target.value)
                        }
                        className='col-span-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                        placeholder='City'
                      />
                      <input
                        type='text'
                        value={address.state}
                        onChange={(e) =>
                          handleAddressChange("state", e.target.value)
                        }
                        className='col-span-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                        placeholder='State'
                      />
                      <input
                        type='text'
                        value={address.zip}
                        onChange={(e) =>
                          handleAddressChange("zip", e.target.value)
                        }
                        className='col-span-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-400'
                        placeholder='ZIP'
                      />
                    </div>
                    <div className='flex justify-end'>
                      <button
                        onClick={() => setIsEditingAddress(false)}
                        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className='text-gray-800'>{address.name}</p>
                    <p className='text-gray-800'>{formatAddress(address)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
