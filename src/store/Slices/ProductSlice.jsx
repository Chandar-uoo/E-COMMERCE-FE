import { createSlice } from "@reduxjs/toolkit"

const  initialState = {
    value:[],
}
 const productSlice = createSlice({
    name:"productSlice",
    initialState,
    reducers:{
        Add:(state,action)=>{
            state.value = action.payload;
        },
        Delete:(state)=>{
            state.value = [];
        }
    },
 })
 export const {Add,Delete} = productSlice.actions;
  export default productSlice.reducer;

