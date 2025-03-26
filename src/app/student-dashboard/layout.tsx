import StudentSidebar from "@/components/sidebar/StudentSidebar";
import React from "react";

const MyAccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen'>
      <div className='container mx-auto py-12 px-4'>
        <h1 className='text-3xl font-medium text-center mb-8'>My Account</h1>

        <div className='flex flex-col md:flex-row gap-8'>
          <div className='w-full md:w-1/4'>
            <StudentSidebar />
          </div>
          <div className='w-full md:w-3/4'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountLayout;
