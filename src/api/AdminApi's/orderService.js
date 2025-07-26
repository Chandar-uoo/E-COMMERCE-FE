import axiosInstance from "../../api/axiosInstance"


export const fetchOrders =  async(Status)=>{
        const res = await axiosInstance.get(`/admin/orders?orderStatus=${Status}`);
        return res.data.result;
}

export const updateOrderStatus = async (orderId) => {
    const res = await axiosInstance.patch(`/admin/update-Order-Status/${orderId}`);
    return res.data.result;
}