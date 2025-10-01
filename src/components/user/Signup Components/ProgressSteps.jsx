import React from "react";
import { Loader, UserPlus, ArrowLeft, CheckCircle } from "lucide-react";
export const BackStep = ({ setCurrentStep, currentStep }) => {
  return (
    <>
      <button
        type="button"
        onClick={() => setCurrentStep(currentStep - 1)}
        className="flex-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>
    </>
  );
};

export const FinalStep = ({ isSignupLoading }) => {
  return (
    <>
      <button
        type="submit"
        disabled={isSignupLoading}
        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-blue-500/25"
      >
        {isSignupLoading ? (
          <>
            <Loader />
            <span>Creating Account...</span>
          </>
        ) : (
          <>
            <UserPlus className="w-5 h-5" />
            <span>Create Account</span>
          </>
        )}
      </button>
    </>
  );
};

export const ContinueStep = ({
  setCurrentStep,
  isStep1Valid,
  isStep2Valid,
  currentStep,
}) => {
  return (
    <>
      <button
        type="button"
        onClick={() => setCurrentStep(currentStep + 1)}
        disabled={currentStep === 1 ? !isStep1Valid : !isStep2Valid}
        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
      >
        <span>Continue</span>
      </button>
    </>
  );
};

export const ProgressStep = ({ currentStep }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3 w-full">
          {[1, 2].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  currentStep >= step
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {currentStep > step ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step
                )}
              </div>
              {step < 2 && (
                <div
                  className={`flex-1 h-1 mx-4 transition-all duration-300 ${
                    currentStep > step ? "bg-blue-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
