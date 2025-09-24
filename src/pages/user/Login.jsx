import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginThunkService } from "../../store/thunk/UserThunk";
import ErrorMessage from "../../components/Common/ErrorMessage";
import { Loader, Eye, EyeOff, Mail, Lock, ArrowRight, UserPlus } from "lucide-react";
import { clearError } from "../../store/Slices/UserSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const nav = useNavigate();
  const { error, loading } = useSelector((state) => state.user);

  const emailRef = useRef();
  const passwordRef = useRef();

  const loginuser = async (formdata) => {
    if (!formdata.email || !formdata.password) return;
    setIsSubmitting(true);
    try {
      const response = await dispatch(LoginThunkService(formdata)).unwrap();
      if (response.result.role === "admin") {
        nav("/admin/home");
      } else {
        nav("/");
      }
    } catch (err) {
      console.log("Login failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const navtosignup = () => nav("/signup");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log("Form Data:", formdata);
    loginuser(formdata);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  if (loading && !isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  minLength={10}
                  ref={emailRef}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 border text-black border-gray-300 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  ref={passwordRef}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 border text-black border-gray-300 rounded-xl"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-300 rounded-xl p-4">
                <ErrorMessage message={error} />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>

            <button
              type="button"
              onClick={navtosignup}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
