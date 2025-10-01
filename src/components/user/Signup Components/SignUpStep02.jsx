import React from "react";
import {
  Phone,
  MapPin,
  Calendar,
  Users,
} from "lucide-react";
export const SignUpStep02 = ({ formData, handleChange }) => {
  return (
    <>
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Personal Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                name="phoneNo"
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
                placeholder="Your phone number"
                value={formData.phoneNo}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Date of Birth
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                name="DOB"
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
                value={formData.DOB}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">
            Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              maxLength={500}
              name="address"
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
              placeholder="Your address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">
            Gender
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <select
              name="gender"
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 appearance-none"
              value={formData.gender}
              required
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Other</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
