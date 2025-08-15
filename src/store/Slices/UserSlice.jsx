import { createSlice } from "@reduxjs/toolkit";
import { LoginThunkService, SignUpThunk, UpdateUserDetailsThunk, UpdateUserPasswordThunk,CheckUser} from "../thunk/UserThunk";


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
    adduser:(state,action)=>{
      state.user =  action.payload
    },
    setAccessToken:(state,action)=>{
      state.token =  action.payload
    },
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
              .addCase(CheckUser.pending,(state)=>{
                state.loading = true;
                 state.error = null;
             })
             .addCase(CheckUser.fulfilled,(state,action)=>{
                 state.loading = false;
                 state.user =  action.payload;
                 state.token = action.payload.accessToken;
             })
             .addCase(CheckUser.rejected,(state,action)=>{
                 state.loading = false;
                 state.error = action.payload;
             })
             .addCase(SignUpThunk.pending,(state)=>{
                state.loading = true;
                 state.error = null;
             })
             .addCase(SignUpThunk.fulfilled,(state,action)=>{
                 state.loading = false;
                 state.user =  action.payload.result;
                 state.token = action.payload.accessToken;
             })
             .addCase(SignUpThunk.rejected,(state,action)=>{
                 state.loading = false;
                 state.error = action.payload;
             })
             .addCase(UpdateUserDetailsThunk.pending,(state)=>{
                state.loading = true;
                 state.error = null;
             })
             .addCase(UpdateUserDetailsThunk.fulfilled,(state,action)=>{
                   state.user.name = action.payload?.name;
                   state.user.DOB = action.payload?.DOB;
                   state.user.address = action.payload?.address;
                   state.user.phoneNo = action.payload?.phoneNo;
                  state.user.image = action.payload?.image;
                  state.loading = false;
             })
             .addCase(UpdateUserDetailsThunk.rejected,(state,action)=>{
                 state.loading = false;
                 state.error = action.payload;
             })
              .addCase(UpdateUserPasswordThunk.pending,(state)=>{
                state.loading = true;
                 state.error = null;
             })
               .addCase(UpdateUserPasswordThunk.fulfilled,(state)=>{
                state.loading = false;
             })
              .addCase(UpdateUserPasswordThunk.rejected,(state,action)=>{
                 state.loading = false;
                 state.error = action.payload;
             })
  }
})

export const {adduser,setAccessToken,clearUser,updateUserDetails } = UserSlice.actions;
export default UserSlice.reducer;

