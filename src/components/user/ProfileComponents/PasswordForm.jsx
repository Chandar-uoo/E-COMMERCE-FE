import React from "react";
import {
  Save,
  Eye,
  EyeOff,
  XCircle,
} from "lucide-react";
export const PasswordForm = ({showOldPassword,setEditPasswords,passwords,handlePasswordChange,errors,setShowOldPassword,showNewPassword,setShowNewPassword,handlePasswordUpdate}) => {
  return (
    <>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handlePasswordChange}
              className={`w-full p-3 pr-10 border rounded-lg focus:ring-2 text-black focus:ring-blue-500 focus:border-blue-500 ${
                errors.oldPassword ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter current password"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showOldPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.oldPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              className={`w-full p-3 pr-10 border  text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.newPassword ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handlePasswordChange}
            className={`w-full p-3 border rounded-lg focus:ring-2  text-black focus:ring-blue-500 focus:border-blue-500 ${
              errors.confirmPassword ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Confirm new password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {errors.general}
          </div>
        )}

        <button
          onClick={handlePasswordUpdate}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          <Save className="w-4 h-4 mr-2" />
          Change Password
        </button>
           <button
          type="button"
          onClick={() => setEditPasswords(false)}
          className="flex-1 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          <XCircle className="w-4 h-4 mr-2" />
          Cancel
        </button>
      </div>
    </>
  );
};
