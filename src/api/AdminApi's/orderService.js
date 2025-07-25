import axiosInstance from "../../api/axiosInstance"


export const fetchOrders =  async()=>{
        const res = await axiosInstance.get("/admin/orders");
        return res.data.result;
}