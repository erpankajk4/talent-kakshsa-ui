"use client";
import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { SignInContainer } from "./SignInContainer";
import { SignUpContainer } from "./SignUpContainer";
import { headerLogo } from "@/assets";
import { FaCircleCheck } from "react-icons/fa6";
import { login_bg } from "@/assets";
// import "src\app\globals.css";

export function LoginSignUpModule({
  setIsLoginModule,
  isLoginModule,
  closePopup,
}: any) {
  const handleOverlayClick = (e: any) => {
    // Check if the click occurred on the overlay (the background)
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  return (
    <section
      className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-zinc-950 bg-opacity-70 max-sm:mt-20 max-sm:h-screen"
      onClick={handleOverlayClick}
    >
      {/* Module  */}
      <div className="grid-row-3 relative z-10 grid w-full justify-center overflow-y-hidden rounded-3xl border-8 border-white bg-blue-50 shadow-lg max-sm:h-full max-sm:min-h-screen max-sm:flex-col max-sm:items-center max-sm:rounded-none md:max-w-[960px] md:grid-cols-3">
        {/* Left Side */}
        <div className="row-span-1 flex h-full flex-col justify-center bg-blue-900 p-5 max-sm:hidden md:col-span-1 md:rounded-s-3xl">
          <div className="flex flex-col sm:mb-10">
            <Image
              src={headerLogo}
              alt="logo"
              width={100}
              className="h-16 w-full object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold text-white">
            Join Talent Kaksha for free
          </h2>
          <div className="h-2 w-32 rounded-3xl bg-orange-500"></div>
          <p className="mt-5 text-white">
            Unleash your creativity with a vast array of classes in design,
            management, and marketing and many more.
          </p>
        </div>
        {/* Right Side */}
        {isLoginModule ? (
          // Sign In Container
          <SignInContainer
            setIsLoginModule={setIsLoginModule}
            isLoginModule={isLoginModule}
            closePopup={closePopup}
          />
        ) : (
          // Sign Up Container
          <SignUpContainer
            setIsLoginModule={setIsLoginModule}
            isLoginModule={isLoginModule}
            closePopup={closePopup}
          />
        )}
      </div>
    </section>
  );
}
