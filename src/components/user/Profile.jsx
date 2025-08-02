import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserDetailsThunk, UpdateUserPasswordThunk } from "../../store/thunk/UserThunk";
import Loader from "../Common/Loader";
import ErrorMessage from "../Common/ErrorMessage";

export const Profile = () => {
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [editProfile, setEditProfile] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name,
    DOB: user?.DOB?.slice(0, 10),
    address: user?.address,
    phoneNo: user?.phoneNo,
    image: user?.image,
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const submitProfileUpdate = async () => {
    try {
      await dispatch(UpdateUserDetailsThunk(formData)).unwrap();
      setEditProfile(false); // only if success
    } catch (err) {
      // error already in Redux state, so do nothing here
    }
  };

  const submitPasswordUpdate = async () => {
    try {
      await dispatch(UpdateUserPasswordThunk(passwords)).unwrap();
      setPasswords({ oldPassword: "", newPassword: "" });
      setEditPassword(false);
    } catch (err) {
      // error already in Redux state
    }
  };


  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-teal-500 mb-6">My Profile</h2>

      {/* Display Image and Info */}
      <div className="text-center mb-8">
        <img
          src={user.image}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mx-auto mb-2 border"
        />
        <p className="text-lg font-semibold">{user.name}</p>
        <p className="text-white">{user.email}</p>
      </div>

      {/* Edit Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setEditProfile((prev) => !prev)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {editProfile ? "Cancel" : "Edit Profile"}
        </button>
        <button
          onClick={() => setEditPassword((prev) => !prev)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          {editPassword ? "Cancel" : "Change Password"}
        </button>
      </div>

      {/* Edit Profile Form */}
      {editProfile && (
        <div className="space-y-4 mb-6 border-t pt-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            name="DOB"
            value={formData.DOB}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Profile Image URL"
            className="w-full p-2 border rounded"
          />
          {error && <ErrorMessage message={error} />}
          <button
            onClick={submitProfileUpdate}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      )}

      {/* Edit Password Form */}
      {editPassword && (
        <div className="space-y-4 border-t pt-6">
          <input
            type="password"
            name="oldPassword"
            value={passwords.oldPassword}
            onChange={handlePasswordChange}
            placeholder="Old Password"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            placeholder="New Password"
            className="w-full p-2 border rounded"
          />
          {error && <ErrorMessage message={error} />}
          <button
            onClick={submitPasswordUpdate}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Change Password
          </button>
        </div>
      )}
    </div>
  );
};
