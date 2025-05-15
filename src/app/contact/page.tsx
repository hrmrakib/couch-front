"use client";

import type React from "react";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   setSubmitError("");

  //   try {
  //     // Simulate API call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     // ("Form submitted:", formData);
  //     setSubmitSuccess(true);
  //     setFormData({
  //       name: "",
  //       email: "",
  //       subject: "",
  //       message: "",
  //     });

  //     // Reset success message after 5 seconds
  //     setTimeout(() => {
  //       setSubmitSuccess(false);
  //     }, 5000);
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     setSubmitError(
  //       "There was an error submitting your message. Please try again."
  //     );
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    // Simple client-side validation
    if (!name || !email || !subject || !message) {
      setSubmitError("Please fill out all fields.");
      return;
    }

    // Construct mailto URL
    const mailtoLink = `mailto:hrmrakibs@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Hi, my name is ${name}.\n\n${message}\n\nYou can contact me at ${email}.`
    )}`;

    try {
      // Redirect to mail client
      window.location.href = mailtoLink;

      // Set success state
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success message after a timeout
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error preparing mailto link:", error);
      setSubmitError("There was an error. Please try again.");
    }
  };

  return (
    <div>
      <div className='relative h-auto lg:h-[700px]'>
        {/* Background image with overlay */}
        <div
          className='absolute inset-0 bg-cover bg-center z-0'
          style={{
            backgroundImage: "url('/contact/c.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* <div className='absolute inset-0 bg-black/40'></div> */}
        </div>

        <div className='relative z-10 container mx-auto px-4 py-16'>
          {/* Main heading */}
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-10'>
            Get In Touch With Us. Send Us A Message.
          </h1>

          {/* Contact card */}
          <div className='bg-[#FFFFFF] rounded-lg shadow-lg overflow-hidden'>
            <div className='flex flex-col md:flex-row'>
              {/* Left column - Contact info */}
              <div className='w-full md:w-2/5 p-8 md:p-10'>
                <h2 className='text-3xl lg:text-[48px] font-medium text-[#000000] mb-8'>
                  Contact Us
                </h2>

                <div className='space-y-8'>
                  {/* Phone */}
                  <div>
                    <h3 className='text-xl lg:text-[28px] text-[#333333] font-medium mb-2'>
                      Cell to us:
                    </h3>
                    <p className='text-[#545454] text-lg mb-1'>
                      We&apos;re available 24/7, 7 days a week.
                    </p>
                    <Link
                      href='tel:+081115226'
                      className='text-[#545454] text-lg mb-1'
                    >
                      (415) 699-7216
                    </Link>
                  </div>

                  {/* Email */}
                  <div>
                    <h3 className='text-xl lg:text-[28px] text-[#333333] font-medium mb-2'>
                      Write to Us:
                    </h3>
                    <p className='text-[#545454] text-lg mb-1'>
                      Fill out our form and we will contact you within 24 hours.
                    </p>
                    <p className='text-[#545454] text-lg mb-1'>
                      Email:{" "}
                      <Link
                        href='mailto:Support1234@Jaroti'
                        className='text-[#545454] text-lg mb-1'
                      >
                        info@campuscouch.com
                      </Link>
                    </p>
                  </div>

                  {/* Headquarters */}
                  <div>
                    <h3 className='text-xl lg:text-[28px] text-[#333333] font-medium mb-2'>
                      Headquarter:
                    </h3>
                    <p className='text-[#545454] text-lg mb-1'>
                      Monday – Friday: 9:00-20:00
                    </p>
                    <p className='text-[#545454] text-lg mb-1'>
                      Saturday: 11:00 – 15:00
                    </p>
                    <p className='text-[#545454] text-lg mb-1'>
                      150 Panoramic Way, Berkeley, CA 94704
                    </p>
                  </div>
                </div>
              </div>

              {/* Right column - Contact form */}
              <div className='w-full md:w-3/5 p-8 md:p-10 bg-[#FFFFFF]'>
                <h2 className='text-2xl md:text-[40px] font-medium text-[#000000] mb-8 text-center'>
                  We would love to hear from you.
                </h2>

                {submitSuccess && (
                  <div className='mb-6 p-4 bg-green-100 text-green-700 rounded-md'>
                    Your message has been sent successfully! We&apos;ll get back
                    to you soon.
                  </div>
                )}

                {submitError && (
                  <div className='mb-6 p-4 bg-red-100 text-red-700 rounded-md'>
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='flex gap-4'>
                    <input
                      type='text'
                      name='name'
                      placeholder='Name'
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className='md:w-1/2 w-full px-4 py-3 border border-[#545454] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200'
                    />

                    <input
                      type='email'
                      name='email'
                      placeholder='E-mail'
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className='md:w-1/2 w-full px-4 py-3 border border-[#545454] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200'
                    />
                  </div>

                  <div>
                    <input
                      type='text'
                      name='subject'
                      placeholder='Subject'
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 border border-[#545454] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200'
                    />
                  </div>

                  <div>
                    <textarea
                      name='message'
                      placeholder='Message'
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className='w-full px-4 py-3 border border-[#545454] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200'
                    ></textarea>
                  </div>

                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full bg-[#FDB515] hover:bg-yellow-500 text-lg text-[#4A3300] cursor-pointer font-medium py-4 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed'
                  >
                    {isSubmitting ? "Sending..." : "Send"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='hidden md:block bg-[#FFFFFF] relative z-10 container mx-auto h-[250px]'></div>
    </div>
  );
}
