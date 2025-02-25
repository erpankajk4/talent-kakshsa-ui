import { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

interface UseOtpVerificationProps {
  phoneNumber: string;
}

interface UseOtpVerificationReturn {
  sendOtp: () => Promise<void>;
  verifyOtp: (otp: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useOtpVerification = ({
  phoneNumber,
}: UseOtpVerificationProps): UseOtpVerificationReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [encryptedOtp, setEncryptedOtp] = useState<string | null>(null);
  const secretKey = "PankajIsTheBest";

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOtp = async () => {
    setLoading(true);
    setError(null);

    try {
      const otp = generateOtp();
      console.log(otp);
      const encrypted = CryptoJS.AES.encrypt(otp, secretKey).toString();
      setEncryptedOtp(encrypted);

      // await axios.post(
      //   "https://www.fast2sms.com/dev/bulkV2",
      //   {
      //     message: `Your OTP code is ${otp}`,
      //     language: "english",
      //     route: "q",
      //     numbers: phoneNumber,
      //     flash: 0,
      //   },
      //   {
      //     headers: {
      //       authorization: "YOUR_FAST2SMS_API_KEY", // Replace with your Fast2SMS API key
      //     },
      //   },
      // );

      console.log("OTP sent successfully.");
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (inputOtp: string) => {
    setLoading(true);
    setError(null);

    try {
      if (!encryptedOtp) {
        throw new Error("No OTP has been sent.");
      }

      const decryptedBytes = CryptoJS.AES.decrypt(encryptedOtp, secretKey);
      const decryptedOtp = decryptedBytes.toString(CryptoJS.enc.Utf8);

      if (decryptedOtp === inputOtp) {
        console.log("OTP Verified successfully!");
        return true;
      } else {
        setError("Invalid OTP. Please try again.");
        return false;
      }
    } catch (err) {
      setError("Failed to verify OTP. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    sendOtp,
    verifyOtp,
    loading,
    error,
  };
};
