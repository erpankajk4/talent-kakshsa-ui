import { useState } from "react";
import { useMutation } from "@apollo/client";
import { registerUserQuery, updateUserQuery } from "@/graphql/authQuery/signup";
import { useOtpVerification } from "@/customHook/useOtpVerification";
import CryptoJS from "crypto-js";
import { useDispatch } from "react-redux";
import { setAuthState } from "@/Redux/authSlice";
import { useAppDispatch } from "@/Redux";

interface UserSubmittedData {
  name: string;
  email: string;
  number: string;
  password: string;
}

interface UseUserSignUp {
  userSubmittedData: UserSubmittedData;
  setUserSubmittedData: (data: UserSubmittedData) => void;
  userOtp: string;
  setUserOtp: (otp: string) => void;
  isOtp: boolean;
  setIsOtp: (isOtp: boolean) => void;
  loading: boolean;
  error: string | null;
  sendSignUpOtp: (data: UserSubmittedData) => void;
  handleSubmitSignUp: () => void;
}

export function useUserSignUp(): UseUserSignUp {
  const [userSubmittedData, setUserSubmittedData] = useState<UserSubmittedData>(
    {
      name: "",
      email: "",
      number: "",
      password: "",
    },
  );

  const [userOtp, setUserOtp] = useState<string>("");
  const [isOtp, setIsOtp] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const secretKey = "PankajIsTheBest"; // Secret key for encryption

  const dispatch = useAppDispatch();
  // OTP Hook
  const {
    sendOtp,
    verifyOtp,
    loading,
    error: otpError,
  } = useOtpVerification({
    phoneNumber: userSubmittedData.number,
  });

  const [registerUserMutation] = useMutation(registerUserQuery);
  const [updateUserMutation] = useMutation(updateUserQuery);

  const sendSignUpOtp = async (data: UserSubmittedData) => {
    // Receive user data form SignUp Form and send otp
    try {
      setUserSubmittedData(data);
      await sendOtp();
      setIsOtp(true);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    }
  };
  // ======================================== //
  const handleSubmitSignUp = async () => {
    try {
      const otpValid = await verifyOtp(userOtp);
      if (otpValid) {
        // Encrypt the password before sending it to the server
        const encryptedPassword = CryptoJS.AES.encrypt(
          userSubmittedData.password,
          secretKey,
        ).toString();

        const { data } = await registerUserMutation({
          variables: {
            username: userSubmittedData.name,
            email: userSubmittedData.email,
            password: encryptedPassword,
          },
        });
        // Update User Data if registration is successful
        if (data?.register?.jwt) {
          const userId = data?.register?.user?.id;
          await updateUserMutation({
            variables: {
              id: userId,
              input: {
                mobileNumber: userSubmittedData.number,
                otp: userOtp,
              },
            },
          });

          // Dispatch action to store auth data in Redux state
          dispatch(
            setAuthState({
              authState: true,
              userID: userId,
              userName: userSubmittedData.name,
              email: userSubmittedData.email,
              number: userSubmittedData.number,
              token: data.register.jwt,
            }),
          );
          // ===================================================== //
        }
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return {
    userSubmittedData,
    setUserSubmittedData,
    userOtp,
    setUserOtp,
    isOtp,
    setIsOtp,
    loading,
    error: otpError || error,
    sendSignUpOtp,
    handleSubmitSignUp,
  };
}
