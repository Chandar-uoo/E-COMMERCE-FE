import { toast } from "react-toastify";
import {
  useOtpEmailSendMutation,
  useOtpEmailVerifyMutation,
} from "../../services/user/userApi";
import { useState } from "react";

function useOtpHook({ otp,formData }) {
  const [sendOtp, { isLoading: isLoadingSendOtp }] = useOtpEmailSendMutation();
  const [verifyOtp] = useOtpEmailVerifyMutation();

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);

  const handleVerifyOtp = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    try {
      const res = await verifyOtp({ otp, email: formData.email }).unwrap();
      if (res) {
        setShowOtpForm(false);
        setIsEmailVerified(true);
      }
    } catch (error) {
      toast.warn(
        error?.data?.message || error.message || "OTP verification failed"
      );
      console.error("OTP verification failed:", error);
    }
  };

  const handleSendOtp = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    try {
      const res = await sendOtp({ email: formData.email }).unwrap();
      if (res) {
        setShowOtpForm(true);
        setIsEmailVerified(false);
      }
    } catch (error) {
      toast.warn(error?.data?.message || error.message || "Failed to send OTP");
      console.error("Failed to send OTP:", error);
    }
  };
  const resetOtpState = () => {
  setIsEmailVerified(false);
  setShowOtpForm(false);
};

  return {
    showOtpForm,
    isEmailVerified,
    isLoadingSendOtp,
    setIsEmailVerified,
    setShowOtpForm,
    handleSendOtp,
    handleVerifyOtp,
    resetOtpState
  };
}

export default useOtpHook;
