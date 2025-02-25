"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { ImCross } from "react-icons/im";
import { useAppDispatch } from "@/Redux";
import { Input } from "./Input";
import { useUserSignUp } from "@/customHook/useSignup";
import { FcGoogle } from "react-icons/fc";

interface UserSubmittedData {
  name: string;
  email: string;
  number: string;
  password: string;
}

export function SignUpContainer({
  setIsLoginModule,
  isLoginModule,
  closePopup,
}: any) {
  const {
    userSubmittedData,
    setUserSubmittedData,
    userOtp,
    setUserOtp,
    isOtp,
    setIsOtp,
    loading,
    error,
    sendSignUpOtp,
    handleSubmitSignUp,
  } = useUserSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmittedData>();

  const handleFormSubmit = async (data: UserSubmittedData) => {
    if (isOtp) {
      await handleSubmitSignUp();
    } else {
      await sendSignUpOtp(data);
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[0-9]{10}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  return (
    <div className="row-span-1 flex h-full flex-col overflow-y-auto p-6 text-black [flex:6] sm:relative md:col-span-2">
      <button
        className="absolute right-[0.05rem] top-[0.05rem] w-max p-3 text-lg font-normal text-zinc-600 hover:underline"
        onClick={closePopup}
        type="button"
      >
        <ImCross />
      </button>
      <h1 className="text-2xl font-bold text-zinc-800">Sign Up</h1>
      <p className="text-md mt-1 flex w-full font-sans font-semibold leading-normal text-inherit text-zinc-600 antialiased">
        Already have an account?
        <span
          onClick={() => setIsLoginModule(!isLoginModule)}
          className="ml-1 block cursor-pointer font-sans font-bold leading-normal text-orange-600 antialiased hover:underline"
        >
          Log In Now!
        </span>
      </p>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {isOtp ? (
          <>
            <p className="mt-5">
              <span>Enter OTP sent to </span>
              <span className="text-xl font-bold text-orange-500">
                {userSubmittedData.number}
              </span>
            </p>
            <div className="otp mb-5">
              <OtpInput
                value={userOtp}
                onChange={setUserOtp}
                numInputs={6}
                renderSeparator={<span className="mx-2">-</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="h-12 w-12 rounded-md border-2 border-gray-300 text-center text-xl focus:border-orange-500 focus:outline-none"
                    style={{
                      WebkitAppearance: "none",
                      MozAppearance: "textfield",
                    }}
                  />
                )}
                shouldAutoFocus
                inputType="tel"
              />
            </div>
          </>
        ) : (
          <>
            <Input
              label="Name"
              placeholder=" "
              type="text"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className="text-xs text-red-600">{errors.name.message}</p>
            )}
            <Input
              label="Mobile Number"
              type="number"
              placeholder=" "
              {...register("number", {
                required: "Mobile number is required",
                pattern: {
                  value: mobileRegex,
                  message: "Please enter a valid 10-digit mobile number",
                },
              })}
            />
            {errors.number && (
              <p className="text-xs text-red-600">{errors.number.message}</p>
            )}
            <Input
              label="Email ID"
              type="email"
              placeholder=" "
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: emailRegex,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email.message}</p>
            )}
            <Input
              label="Password"
              type="password"
              placeholder=" "
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: passwordRegex,
                  message:
                    "Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, one digit, and one special character.",
                },
              })}
            />
            {errors.password && typeof errors.password.message === "string" && (
              <p className="text-xs text-red-600">{errors.password.message}</p>
            )}
          </>
        )}
        <button
          className="mt-5 w-full rounded-lg bg-gradient-to-b from-[#FF772B] to-[#fd6107] px-3 py-2 text-white outline-none duration-200 hover:font-bold active:scale-95"
          type="submit"
          disabled={loading}
        >
          {isOtp ? "Sign Up" : "Send OTP"}
        </button>
        {isOtp && (
          <button
            className="mt-5 text-sm text-orange-600 hover:underline active:scale-95"
            type="button"
            onClick={() => sendSignUpOtp(userSubmittedData)}
          >
            Resend OTP
          </button>
        )}
      </form>
      {error && <p className="my-5 text-center text-red-600">{error}</p>}
      <p className="mt-2 text-center font-sans text-sm leading-normal text-inherit antialiased">
        Your personal information is secured with us
      </p>
      <div className="flex-center my-5 gap-4">
        <div className="h-1 w-[30%] border-t border-zinc-800"></div>
        <p className="font-bold">or</p>
        <div className="h-1 w-[30%] border-t border-zinc-800"></div>
      </div>
      <div className="flex-center flex-col gap-3">
        <FcGoogle className="text-2xl" />
        <p className="font-semibold">Sign in with Google</p>
      </div>
    </div>
  );
}
