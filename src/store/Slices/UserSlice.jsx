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
    }
  },
})

export const { adduser,setAccessToken } = UserSlice.actions;
export default UserSlice.reducer;

