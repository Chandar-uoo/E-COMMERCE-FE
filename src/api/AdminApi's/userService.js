import axiosInstance from "../../api/axiosInstance"


export const fetchUsers =  async(query)=>{
        const res = await axiosInstance.get(`/admin/user?${query}`);
        return res.data.result;
}