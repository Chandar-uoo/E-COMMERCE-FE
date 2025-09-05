import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  editProfileService,
  loginService,
  otpEmailSend,
  otpEmailVerify,
  signupService,
  updatePasswordService,
  userCheckService,
} from "../../api/userService";

export const LoginThunkService = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await loginService(email, password);
      return res;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
export const SignUpThunk = createAsyncThunk(
  "user/signUp",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await signupService(formData);
      return res;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
export const CheckUser = createAsyncThunk(
  "user/check",
  async (_, { rejectWithValue }) => {
    try {
      const res = await userCheckService();
      return res;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
export const UpdateUserDetailsThunk = createAsyncThunk(
  "user/update",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await editProfileService(formData);
      return res;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
export const UpdateUserPasswordThunk = createAsyncThunk(
  "user/updatePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      await updatePasswordService({ oldPassword, newPassword });
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
export const OtpemailThunk = createAsyncThunk(
  "user/otpEmail",
  async ({email}, { rejectWithValue }) => {
    try {
    return  await otpEmailSend(email);
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
export const OtpemailVerifyThunk = createAsyncThunk(
  "user/otpEmailVerify",
  async ({otp,email}, { rejectWithValue }) => {
    try {   
     return await otpEmailVerify({otp,email});
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
