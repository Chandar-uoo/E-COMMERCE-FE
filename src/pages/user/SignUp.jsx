import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignUpThunk } from "../../store/thunk/UserThunk";
import ErrorMessage from "../../components/Common/ErrorMessage";
import Loader from "../../components/Common/Loader";


const SignUp = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const {user,error,loading} =  useSelector((state)=>state.user)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    DOB: '',
    image: '',
    gender: '',
    phoneNo: '',
    password: '',
  });

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
       await dispatch(SignUpThunk((formData)));
     if(user)  nav('/');
  };
if(loading) return <Loader/>
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-base-200 shadow rounded space-y-4 text-white">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Sign Up</legend>
        <label className="label">Name</label>
        <input
          type="text"
          name="name"
          className="input input-bordered w-full"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <label className="label">Address</label>
        <input
          type="text"
          name="address"
          className="input input-bordered w-full"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />

        <label className="label">Date of Birth</label>
        <input
          type="date"
          name="DOB"
          className="input input-bordered w-full"
          value={formData.DOB}
          onChange={handleChange}
        />

        <label className="label">Image URL</label>
        <input
          type="text"
          name="image"
          className="input input-bordered w-full"
          placeholder="Profile Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <label className="label">Gender</label>
        <select
          name="gender"
          className="select select-bordered w-full"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="others">other</option>
        </select>

        <label className="label">Phone Number</label>
        <input
          type="tel"
          name="phoneNo"
          className="input input-bordered w-full"
          placeholder="Phone Number"
          value={formData.phoneNo}
          onChange={handleChange}
        />
        <label className="label">Email</label>
        <input type="email" name="email" onChange={handleChange} className="input" placeholder="Email" value={formData.email} />
        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          className="input input-bordered w-full"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {error && <ErrorMessage message={error}/>}
        <button type="submit" className="btn btn-primary w-full mt-4">Update Profile</button>
      </fieldset>
    </form>
  );
};

export default SignUp;
