import axiosInstance from "./axiosInstance";


export const loginService = async (email, password) => {
        const res = await axiosInstance.post("/auth/login", {
            email,
            password
        });
        return res.data;
}

export const signupService = async (formData) => {
        const res = await axiosInstance.post('/auth/signup', formData);
        return res.data;
};

export const logoutService =  async()=>{
    const res = await axiosInstance.get("/auth/logout");
    return res.data.message;
}

export const editProfileService =  async (formData) => {
    const res =  await axiosInstance.post("/user/updateUser",{
        name:formData.name,
        DOB:formData.DOB,
        image:formData.image,
        address:formData.address,
        phoneNo:formData.phoneNo
    });
    return res.data.result;
}
export const updatePasswordService =  async({oldPassword,newPassword})=>{
     await axiosInstance.patch("/user/updatePassword",{oldPassword,newPassword});
}