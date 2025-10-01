import React from "react";
import { User, Mail, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { OtpForm } from "./OtpForm";

export const SignUpStep01 = ({
  formData,
  handleChange,
  isEmailVerified,
  showOtpForm,   
  handleVerifyOtp,
  handleSendOtp,         
  isLoadingSendOtp,    
  showPassword,
  setShowPassword,
  otp,
  setOtp,              
          
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Basic Information
      </h3>

      {/* Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 block">
          Full Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="name"
            minLength={3}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2 relative">
        <label className="text-sm font-medium text-gray-700 block">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            min={10}
            className={`w-full pl-12 pr-4 py-3 bg-white border rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:outline-none transition-all duration-300 ${
              isEmailVerified
                ? "border-green-300 focus:border-green-500 focus:ring-green-500/20"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
            }`}
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {isEmailVerified && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          )}
        </div>

        {/* Email Verification Status */}
        {isEmailVerified && (
          <p className="text-sm text-green-600 flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Email verified successfully
          </p>
        )}

        {/* Verify Button */}
        {!isEmailVerified && !showOtpForm && formData.email && (
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            onClick={handleSendOtp}
          >
            {isLoadingSendOtp ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              " Verify Email"
            )}
          </button>
        )}

        {/* OTP Form */}
        {showOtpForm && !isEmailVerified && (
          <OtpForm
            formData={formData}
            otp={otp}
            setOtp={setOtp}
            handleSendOtp={handleSendOtp}
            handleVerifyOtp={handleVerifyOtp}
          />
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 block">
          Create Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="w-full pl-12 pr-12 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
