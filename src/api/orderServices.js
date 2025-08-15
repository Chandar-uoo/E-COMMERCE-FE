import axiosInstance from "./axiosInstance"
    export const readOrder =  async()=>{
        const res =  await axiosInstance.get('/order/read');
        return  res.data.result;
    }
 export const orderMakeService =  async(itemsFromClient)=>{
    const res = await axiosInstance.post(`/order/process`,{itemsFromClient})
    return res.data.result;
}

export  const orderpaymentService = async (orderId,paymentMethod) => {
    const res = await axiosInstance.patch('/order/payment',{orderId,payMethod:paymentMethod});
    return  res.data.result;
}