import React from "react";
import { Save } from "lucide-react";
export const ProfileForm = ({
  handleProfileUpdate,
  formData,
  handleInputChange,
  errors,
}) => {
  return (
    <>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
         handleProfileUpdate()
        }}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            minLength={3}
            value={formData.name || ""}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg focus:ring-2  text-black focus:ring-blue-500 focus:border-blue-500 ${
              errors.name ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium  text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            name="DOB"
            value={formData.DOB || ""}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg  text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.DOB ? "border-red-300" : "border-gray-300"
            }`}
          />
          {errors.DOB && (
            <p className="text-red-500 text-sm mt-1">{errors.DOB}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNo"
            value={formData.phoneNo || ""}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg focus:ring-2  text-black focus:ring-blue-500 focus:border-blue-500 ${
              errors.phoneNo ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter your phone number"
          />
          {errors.phoneNo && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNo}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address || ""}
            onChange={handleInputChange}
            rows={3}
            className={`w-full p-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.address ? "border-red-300" : "border-gray-300"
            }`}
            required
            placeholder="Enter your address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Image URL
          </label>
          <input
            type="url"
            name="image"
            value={formData.image || ""}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.image ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter image URL"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </div>

        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {errors.general}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </form>
    </>
  );
};
