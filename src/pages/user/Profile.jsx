 import React, { useEffect, useState } from "react";
import Loader from "../../components/Common/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckUser,
  OtpemailThunk,
  UpdateUserDetailsThunk,
  UpdateUserPasswordThunk,
} from "../../store/thunk/UserThunk";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Lock,
  Edit2,
  Save,
  X,
  Camera,
  Eye,
  EyeOff,
  MailQuestion,
} from "lucide-react";
import userImage from "../../assets/default-img.jpg";
import { clearError } from "../../store/Slices/UserSlice";
import { DateUtils, validateForm, validatePassword } from "../../utils/helpers";

export const Profile = () => {
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [editProfile, setEditProfile] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    DOB: user?.DOB?.slice(0, 10) || "",
    address: user?.address || "",
    phoneNo: user?.phoneNo || "",
    image: user?.image || "",
    gender: user?.gender || "",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };



  const submitProfileUpdate = async () => {
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await dispatch(UpdateUserDetailsThunk(formData)).unwrap();
      setEditProfile(false);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      // Error is handled by Redux, will be available in error state
      setErrors({ general: "Failed to update profile. Please try again." });
    }
  };

  const submitPasswordUpdate = async () => {
    const passwordErrors = validatePassword(passwords);
    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors);
      return;
    }

    try {
      await dispatch(UpdateUserPasswordThunk(passwords)).unwrap();
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setEditPassword(false);
      setSuccessMessage("Password changed successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      // Error is handled by Redux, will be available in error state
      setErrors({ general: "Failed to change password. Please try again." });
    }
  };



  useEffect(() => {
    dispatch(CheckUser());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setErrors({});
        dispatch(clearError());
      }, 3000); // auto-clear after 3s
      return () => clearTimeout(timer);
    }
  }, [error, errors]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
     
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center">
              <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold mr-3">
                ✓
              </div>
              {successMessage}
            </div>
          )}

          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
            <div className="px-8 pb-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-6">
                <div className="relative">
                  <img
                    src={user?.image?.trim() ? user.image : userImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <button className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                  <h1 className="text-3xl font-bold text-gray-900 capitalize">
                    {user?.name}
                  </h1>
                  <div className="flex items-center justify-center sm:justify-start mt-2 text-sm gap-1.5 text-gray-500">
                    <Calendar />
                    Age {DateUtils.format(user?.DOB)}
                    <MailQuestion />{" "}
                    <p
                      className={`${
                        user?.isVerified ? "text-green-400" : "text-red-600"
                      }`}
                    >
                      {user?.isVerified ? "Verified" : "Verfication Pending"}
                    </p>
                    
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                <button
                  onClick={() => setEditProfile(!editProfile)}
                  disabled={editPassword}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
                >
                  {editProfile ? (
                    <X className="w-4 h-4 mr-2" />
                  ) : (
                    <Edit2 className="w-4 h-4 mr-2" />
                  )}
                  {editProfile ? "Cancel" : "Edit Profile"}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Personal Information
              </h2>

              {!editProfile ? (
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-900 capitalize">
                        {user?.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium text-gray-900">
                        {DateUtils.getAge(user?.DOB)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium text-gray-900">
                        {user?.phoneNo}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium text-gray-900">
                        {user?.address}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitProfileUpdate();
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phoneNo}
                      </p>
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address}
                      </p>
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
                      required
                    />
                    {errors.image && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.image}
                      </p>
                    )}
                  </div>

                  {(error || errors.general) && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                      {error || errors.general}
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
              )}
            </div>

            {/* Password Change */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-blue-600" />
                Security Settings
              </h2>

              {!editPassword ? (
                <div className="text-center py-8">
                  <Lock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">
                    Keep your account secure with a strong password
                  </p>
                  <button
                    onClick={() => setEditPassword(true)}
                    disabled={editProfile}
                    className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </button>
                </div>
              ) : (
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
                          errors.oldPassword
                            ? "border-red-300"
                            : "border-gray-300"
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.oldPassword}
                      </p>
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
                          errors.newPassword
                            ? "border-red-300"
                            : "border-gray-300"
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.newPassword}
                      </p>
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
                        errors.confirmPassword
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Confirm new password"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {(error || errors.general) && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                      {error || errors.general}
                    </div>
                  )}

                  <button
                    onClick={submitPasswordUpdate}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Change Password
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      
    </div>
  );
};
