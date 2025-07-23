import axiosInstance from "../../api/axiosInstance"


export const fetchUsers =  async()=>{
        const res = await axiosInstance.get("/admin/user");
        return res.data.result;
}