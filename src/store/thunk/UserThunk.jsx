import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginService } from "../../api/userService";

export const LoginThunkService = createAsyncThunk('user/login', async ({email,password}, { getState, rejectWithValue }) => {
    try {
        const res = await loginService(email,password);
        return res;
    }
    catch(err){
        console.log(err);
        return rejectWithValue(err?.response?.data?.message)
    }
})