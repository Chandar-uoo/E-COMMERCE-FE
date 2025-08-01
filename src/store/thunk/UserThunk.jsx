import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  editProfileService,
  loginService,
  signupService,
  updatePasswordService,
} from "../../api/userService";

export const LoginThunkService = createAsyncThunk(
  "user/login",
  async ({ email, password }, { getState, rejectWithValue }) => {
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
  async (formData, { getState, rejectWithValue }) => {
    try {
      const res = await signupService(formData);
      return res;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
export const UpdateUserDetailsThunk = createAsyncThunk(
  "user/update",
  async (formData, { getState, rejectWithValue }) => {
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
  async ({ oldPassword, newPassword }, { getState, rejectWithValue }) => {
    try {
      await updatePasswordService({ oldPassword, newPassword });
    } catch (err) {
  
      
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
