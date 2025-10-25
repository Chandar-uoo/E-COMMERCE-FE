import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../services/auth/authApi";
import { tokenService } from "../../utils/tokenService";
import { toast } from "react-toastify";

function useSignUpHook() {
  const nav = useNavigate();
  const [signup, { isLoading: isSignupLoading }] = useSignupMutation();
  const [error, seterror] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    DOB: "",
    gender: "",
    phoneNo: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();

    try {
      const res = await signup(formData).unwrap();
      tokenService.set(res.token);
      toast.success("Sign up  successfull")
      nav("/");
    } catch (error) {
      seterror(error.message);
    }
  };
  return {
    handleSubmit,
    isSignupLoading,
    formData,
    error,
    setFormData,
    seterror
  };
}
export default useSignUpHook;
