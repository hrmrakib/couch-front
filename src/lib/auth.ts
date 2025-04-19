"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const router = useRouter();

  return () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    router.push("/login");
  };
};
