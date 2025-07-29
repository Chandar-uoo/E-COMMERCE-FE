import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  error: null,
  token:null,
};
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    adduser: (state, action) => {
      state.user = action.payload;
    },
    setAccessToken:(state,action)=>{
      state.token = action.payload;
    },
    clearUser:(state)=>{    
      state.user = null;
      state.token = null;
      state.error = null;
    }
  },
})

export const { adduser,setAccessToken,clearUser } = UserSlice.actions;
export default UserSlice.reducer;

