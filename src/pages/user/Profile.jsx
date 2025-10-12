import React, { useState } from "react";
import Loader from "../../components/Common/Loader";
import { User, Lock } from "lucide-react";
import {
  useCheckUserQuery,
  usePasswordUpdateMutation,
} from "../../services/user/userApi";
import { PersonalInfo } from "../../components/user/ProfileComponents/PersonalInfo";
import { ProfileHeader } from "../../components/user/ProfileComponents/ProfileHeader";
import usePasswordFormHooks from "../../hooks/ProfileHooks/usePasswordFormHooks";
import useProfileFormHooks from "../../hooks/ProfileHooks/useProfileFormHooks";
import { PasswordForm } from "../../components/user/ProfileComponents/PasswordForm";
import { ProfileForm } from "../../components/user/ProfileComponents/ProfileForm";
export const Profile = () => {
  const { data: user, isLoading: isCheckuserLoading } = useCheckUserQuery();
  usePasswordUpdateMutation();
  const [editProfile, setEditProfile] = useState(false);
  const [editPasswords, setEditPasswords] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const { formData, submitProfileUpdate, setFormData, isEditUserLoading } =
    useProfileFormHooks(user||{});
  const {
    submitPasswordUpdate,
    isEditPasswordLoading,
    passwords,
    setPasswords,
  } = usePasswordFormHooks();

  const [errors, setErrors] = useState({});
  const handleProfileUpdate = async () => {
    const { success, error } = await submitProfileUpdate();
    if (success) {
      setEditProfile(false);
    } else {
      setErrors({ general: error });
    }
  };
  const handlePasswordUpdate = async () => {
    const { success, error } = await submitPasswordUpdate();
    if (success) {
      setEditPasswords(false);
    }
    if (error && typeof error === "object" && !error.message) {
      // Validation error object like { oldPassword: "...", newPassword: "..." }
      setErrors(error);
    } else {
      // String or API error
      setErrors({ general: error || "Something went wrong" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name] || errors.general) {
      setErrors((prev) => ({ ...prev, [name]: "", general: "" }));
    }
  };
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (isEditPasswordLoading || isEditUserLoading || isCheckuserLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <ProfileHeader
          user={user}
          setEditProfile={setEditProfile}
          editPasswords={editPasswords}
          editProfile={editProfile}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Personal Information
            </h2>
            {!editProfile ? (
              <PersonalInfo user={user} />
            ) : (
              <ProfileForm
                handleProfileUpdate={handleProfileUpdate}
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
              />
            )}
          </div>

          {/* Password Change */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-blue-600" />
              Security Settings
            </h2>

            {!editPasswords ? (
              <div className="text-center py-8">
                <Lock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">
                  Keep your account secure with a strong password
                </p>
                <button
                  onClick={() => setEditPasswords(true)}
                  disabled={editProfile}
                  className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </button>
              </div>
            ) : (
              <PasswordForm
                handlePasswordChange={handlePasswordChange}
                handlePasswordUpdate={handlePasswordUpdate}
                passwords={passwords}
                showNewPassword={showNewPassword}
                showOldPassword={showOldPassword}
                setShowNewPassword={setShowNewPassword}
                setShowOldPassword={setShowOldPassword}
                errors={errors}
                setEditPasswords={setEditPasswords}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
