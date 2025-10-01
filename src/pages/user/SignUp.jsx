import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/Common/ErrorMessage";
import Loader from "../../components/Common/Loader";
import { UserPlus, CheckCircle } from "lucide-react";
import { SignUpStep01 } from "../../components/user/Signup Components/SignUpStep01";
import { SignUpStep02 } from "../../components/user/Signup Components/SignUpStep02";
import {
  BackStep,
  ContinueStep,
  FinalStep,
  ProgressStep,
} from "../../components/user/Signup Components/ProgressSteps";
import useOtpHook from "../../hooks/SignupHooks/useOtpHook";
import useSignUpHook from "../../hooks/SignupHooks/useSignupForm";

const SignUp = () => {
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [otp, setOtp] = useState("");

  const {
    setFormData,
    handleSubmit,
    isSignupLoading,
    formData,
    error,
    seterror,
  } = useSignUpHook();
  const {
    showOtpForm,
    isEmailVerified,
    isLoadingSendOtp,
    handleSendOtp,
    handleVerifyOtp,
    resetOtpState,
  } = useOtpHook({ otp, formData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Reset email verification if email changes
    if (name === "email") {
      setOtp("");
      resetOtpState();
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        seterror("");
      }, 3000); // auto-clear after 3s
      return () => clearTimeout(timer);
    }
  }, [error]);

  const isStep1Valid =
    formData.name && formData.email && formData.password && isEmailVerified;
  const isStep2Valid =
    formData.phoneNo && formData.address && formData.DOB && formData.gender;

  if (isSignupLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader />
          <p className="text-gray-600">Creating your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gray-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gray-200 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Signup Card */}
      <div className="relative w-full max-w-2xl">
        <div className="bg-white backdrop-blur-xl border border-gray-200 shadow-xl rounded-3xl p-8 hover:shadow-3xl transition-all duration-500">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">Join us today and get started</p>
          </div>

          {/* Progress Steps */}
          <ProgressStep currentStep={currentStep} />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1 */}

            {currentStep === 1 && (
              <SignUpStep01
                formData={formData}
                otp={otp}
                handleChange={handleChange}
                isEmailVerified={isEmailVerified}
                showOtpForm={showOtpForm}
                isLoadingSendOtp={isLoadingSendOtp}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                setOtp={setOtp}
                handleVerifyOtp={handleVerifyOtp}
                handleSendOtp={handleSendOtp}
              />
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <SignUpStep02 formData={formData} handleChange={handleChange} />
            )}

            {/* Error */}
            {error?.length > 0 && (
              <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-4">
                <ErrorMessage message={error} />
              </div>
            )}

            {/* Nav Buttons */}
            <div className="flex space-x-4">
              {currentStep > 1 && (
                <BackStep
                  setCurrentStep={setCurrentStep}
                  currentStep={currentStep}
                />
              )}

              {currentStep < 2 ? (
                <ContinueStep
                  setCurrentStep={setCurrentStep}
                  currentStep={currentStep}
                  isStep1Valid={isStep1Valid}
                  isStep2Valid={isStep2Valid}
                />
              ) : (
                <FinalStep isSignupLoading={isSignupLoading} />
              )}
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm mb-4">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => nav("/")}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Sign in here
              </button>
            </p>
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our Terms of Service and
              Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
