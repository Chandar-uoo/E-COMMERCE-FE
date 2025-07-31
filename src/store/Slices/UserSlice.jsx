import { createSlice } from "@reduxjs/toolkit";
import { LoginThunkService } from "../thunk/UserThunk";

const initialState = {
  loading:false,
  user: null,
  error: null,
  token:null,
};
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser:(state)=>{    
      state.user = null;
      state.token = null;
      state.error = null;
    },
    updateUserDetails:(state,action)=>{
      state.user.name = action.payload?.name;
      state.user.DOB = action.payload?.DOB;
      state.user.address = action.payload?.address;
      state.user.phoneNo = action.payload?.phoneNo;
      state.user.image = action.payload?.image;
    }
  },
  extraReducers:(builder)=>{
    builder
     .addCase(LoginThunkService.pending,(state)=>{
                state.loading = true;
                 state.error = null;
             })
             .addCase(LoginThunkService.fulfilled,(state,action)=>{
                 state.loading = false;
                 state.user =  action.payload.result;
                 state.token = action.payload.accessToken;
             })
             .addCase(LoginThunkService.rejected,(state,action)=>{
                 state.loading = false;
                 state.error = action.payload;
             })
  }
})

export const { adduser,setAccessToken,clearUser,updateUserDetails } = UserSlice.actions;
export default UserSlice.reducer;

