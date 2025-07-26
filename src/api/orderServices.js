import axiosInstance from "./axiosInstance"
    export const readOrder =  async()=>{
        const res =  await axiosInstance.get('/order/read');
        return  res.data.result;
    }
 export const orderMakeService =  async(itemsFromClient,totalPrice)=>{
    const res = await axiosInstance.post(`/order/process`,{itemsFromClient,totalPrice})
    return res.data;
}

export  const orderpaymentService = async (orderId,paymentMethod) => {
    const res = await axiosInstance.patch('/order/payment',{orderId,payMethod:paymentMethod});
    return  res.data.result;
}