"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { Input } from "./Input";
import { FaRegEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useAppDispatch } from "@/Redux";
import { setAuthState } from "@/Redux/authSlice";
import { FcGoogle } from "react-icons/fc";
import { useUserSignUp } from "@/customHook/useSignup";

type ID = number | null;

interface UserSubmittedData {
  email: string;
  password: string;
}

export function SignInContainer({
  setIsLoginModule,
  isLoginModule,
  closePopup,
}: any) {
  const router = useRouter();
  // const { checkOTP, generateOTP } = useUserSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [userSubmittedData, setUserSubmittedData] = useState<UserSubmittedData>(
    { email: "", password: "" },
  );
  const [userOtp, setUserOtp] = useState("");
  const [userId, setUserId] = useState<ID>();
  const [isOtp, setIsOtp] = useState(false);
  const dispatch = useAppDispatch();

  // async function sendLogInOtp(data: any) {
  //   setUserSubmittedData(data);
  //   const registerResponse = await generateOTP({
  //     variables: {
  //       phoneNumber: data?.number,
  //     },
  //   });
  //   // console.log(registerResponse);
  //   if (registerResponse?.data?.generateOTP?.status === 200) {
  //     setIsOtp(true);
  //   } else {
  //     setError(registerResponse?.data?.generateOTP?.message);
  //   }
  // }

  async function handleSubmitLogIn() {
    // try {
    // const otpChecker = await checkOTP({
    //   variables: {
    //     email: userSubmittedData?.email,
    //     password: userSubmittedData?.password,
    //   },
    // });
    // if (otpChecker?.data) {
    //   const userData = otpChecker?.data?.verifyOTP?.data;
    //   setIsLoginModule(false);
    //   setUserId(userData?.id);
    //   dispatch(
    //     setAuthState({
    //       authState: true,
    //       userID: userData?.id,
    //       userName: userData?.attributes?.username,
    //       email: userData?.attributes?.email,
    //       number: userData?.attributes?.phoneNumber,
    //       token: userData?.attributes?.token,
    //     }),
    //   );
    //     closePopup();
    //     router.push("/");
    //   } else if (
    //     otpChecker?.data &&
    //     otpChecker?.data?.verifyOTP?.__typename === "verifyOTPErrorEntity"
    //   ) {
    //     setError(otpChecker?.data?.verifyOTP?.message);
    //   }
    // } catch (error) {
    //   setError("Failed to verify OTP");
    // }
  }

  const handleFormSubmit = async (data: any) => {
    handleSubmitLogIn();
  };

  const mobileRegex = /^[0-9]{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  return (
    <div className="row-span-1 flex h-full flex-col overflow-y-auto p-6 text-black [flex:6] sm:relative md:col-span-2 md:justify-center">
      <button
        className="absolute right-[0.05rem] top-[0.05rem] w-max p-3 text-lg font-normal text-zinc-600 hover:underline"
        onClick={closePopup}
        type="button"
      >
        <ImCross />
      </button>
      <h3 className="text-xl font-semibold">Sign In</h3>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          label="Email Address"
          type="number"
          placeholder=" "
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: emailRegex,
              message: "Please enter your Registered Email Address",
            },
          })}
        />
        {errors.email && typeof errors.email.message === "string" && (
          <p className="text-xs text-red-600">{errors.email.message}</p>
        )}
        <Input
          label="Password"
          type="number"
          placeholder=" "
          {...register("password", {
            required: "Email is required",
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
        <button
          className="mt-8 w-full rounded-lg bg-gradient-to-b from-[#FF772B] to-[#fd6107] px-3 py-2 text-white outline-none duration-200 hover:font-bold active:scale-95"
          type="submit"
        >
          {"Sign In"}
        </button>
      </form>
      {error && <p className="my-5 text-center text-red-600">{error}</p>}
      <div className="flex-center my-5 gap-4">
        <div className="h-1 w-[30%] border-t border-zinc-800"></div>
        <p className="font-bold">or</p>
        <div className="h-1 w-[30%] border-t border-zinc-800"></div>
      </div>
      <div className="flex-center flex-col gap-3">
        <FcGoogle className="text-2xl" />
        <p className="font-semibold">Sign in with Google</p>
      </div>
      <p className="mt-5 w-full text-center font-sans text-base font-bold text-zinc-600 antialiased">
        Don’t have an account?
        <span
          onClick={() => setIsLoginModule(!isLoginModule)}
          className="ml-1 cursor-pointer text-orange-500 hover:underline"
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}
