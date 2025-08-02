import axiosInstance from "../../api/axiosInstance"


export const fetchUsers =  async(user)=>{
        const res = await axiosInstance.get(`/admin/user?fetchUser=${user}`);
        return res.data.result;
}