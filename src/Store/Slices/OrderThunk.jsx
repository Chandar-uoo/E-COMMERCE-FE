import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";


export const orderMaking = createAsyncThunk('order/making',async ({_id},{getState,rejectWithValue}) => {
    try {
        const res = await axiosInstance.post(`/order/process/${_id}`,{},
            { withCredentials: true });
            const {result, orderId} = res.data;
            const currentorders =  getState().order.order;
            const updatedorders = [...currentorders];
            if (typeof result === "object" && result !== null) {
                updatedorders.push(result);
            }
            const uniqueorders = Array.from(
                new Map(updatedorders.map(item => [item._id, item])).values()
              );
        
              return { uniqueorders,orderId};

    } catch (err) {
        rejectWithValue(err.message)
    }
    
})
export const orderpayment = createAsyncThunk('order/payment',async ({orderId,paymentMethod},{getState,rejectWithValue}) => { 
    try {
        const res = await axiosInstance.patch('/order/payment/sucess',{orderId,payMethod:paymentMethod},{withCredentials:true});
        const data = res.data.result;
        const currentorder = getState().order.order;
        const updatedorders = [...currentorder];
        if( typeof data === "object" && data != null){
             // If already existing, do nothing — backend updated quantity
             const index = updatedorders.findIndex(item => item._id === data._id);
             if (index !== -1) {
               updatedorders[index] = data;
             }
        }
        const uniqueorders = Array.from(
            new Map(updatedorders.map(item => [item._id, item])).values()
          );
          return uniqueorders;
    } catch (err) {
        console.log(err);
        rejectWithValue(err.message)
        
    }  
})