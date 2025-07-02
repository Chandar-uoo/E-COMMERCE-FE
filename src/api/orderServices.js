import axiosInstance from "./axiosInstance"

 export const orderMakeService =  async(_id)=>{
    const res = await  axiosInstance.post(`/order/process/${_id}`)
    return res.data;
}

export  const orderpaymentService = async (orderId,paymentMethod) => {
    const res = await axiosInstance.patch('/order/payment/sucess',{orderId,payMethod:paymentMethod});
    return  res.data.result;
}