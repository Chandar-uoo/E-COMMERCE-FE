import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight, UserPlus, Zap, Shield, User } from "lucide-react";
import { useLoginMutation } from "../../services/auth/authApi";
import { tokenService } from "../../utils/tokenService";
import { toast } from "react-toastify";
import Loader from "../../components/Common/Loader";
import { useDispatch } from "react-redux";
import { userApi } from "../../services/user/userApi";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const nav = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const loginuser = async (formdata) => {
    if (!formdata.email || !formdata.password) return;
    setIsSubmitting(true);
    try {
      const res = await login(formdata).unwrap();
      tokenService.set(res.accessToken);
      dispatch(userApi.util.resetApiState());
      const role = res.result?.role || res.role;
      if (role === "admin") {
        nav("/admin/home");
      } else {
        nav("/");
      }
    } catch (err) {
      toast.warn(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const navtosignup = () => nav("/signup");
  
  const quickLogin = async (role) => {
    try {
      if (role === "admin") {
        const res = await login({
          email: "admin666@gmail.com",
          password: "Admin123",
        }).unwrap();
        tokenService.set(res.accessToken);
        dispatch(userApi.util.resetApiState());
        nav("/admin/home");
      } else {
        const res = await login({
          email: "chandru666@gmail.com",
          password: "Chandru124",
        }).unwrap();
        tokenService.set(res.accessToken);
        dispatch(userApi.util.resetApiState());
        nav("/");
      }
    } catch (err) {
      toast.warn(err.message);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    loginuser(formdata);
  };

  if (isLoginLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
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
                  className="w-full pl-12 pr-4 py-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full pl-12 pr-12 py-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>

            <button
              type="button"
              onClick={navtosignup}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Create Account
            </button>
          </form>

          {/* Quick Login Section - More Prominent */}
          <div className="mt-8 pt-6 border-t-2 border-dashed border-amber-300">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border-2 border-amber-200">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="animate-pulse">
                  <Zap className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-base font-bold text-amber-900">Quick Demo Access</span>
              </div>
              <p className="text-sm text-center text-amber-800 font-medium mb-4">
                👋 Recruiters & Visitors - Try instant demo login!
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => quickLogin("user")}
                  className="flex flex-col items-center gap-2 p-4 bg-white hover:bg-blue-50 border-2 border-blue-300 rounded-xl transition-all hover:shadow-lg hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-bold text-blue-900">User Demo</span>
                  <span className="text-xs text-blue-600 font-medium">Customer View</span>
                </button>
                
                <button
                  onClick={() => quickLogin("admin")}
                  className="flex flex-col items-center gap-2 p-4 bg-white hover:bg-purple-50 border-2 border-purple-300 rounded-xl transition-all hover:shadow-lg hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-bold text-purple-900">Admin Demo</span>
                  <span className="text-xs text-purple-600 font-medium">Full Dashboard</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;