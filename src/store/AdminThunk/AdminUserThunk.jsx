import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers } from "../../api/AdminApi's/userService";


 export const AdminUserThunk = createAsyncThunk(
   "user/addToCart",
   async (_, { getState, rejectWithValue }) =>  {
        try{
            const response =  await fetchUsers();
            const customers = getState().adminUserState.customers;
            const updatedCustomers = [...customers];
            updatedCustomers.push(...response);
            // Optional: clean up any accidental duplicates based on `id`
            const uniqueCustomers = Array.from(
              new Map(updatedCustomers.map(item => [item._id, item])).values()
            );
            // Update the state with unique customers
            return uniqueCustomers;
        }
        catch(err){
            console.log(err);
            return rejectWithValue(err.response.data);
        }
   }
 );
