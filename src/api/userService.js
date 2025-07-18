import axiosInstance from "./axiosInstance";


export const loginService = async (email, password) => {
    try {
        const res = await axiosInstance.post("/auth/login", {
            email,
            password
        });
        return res.data;

    } catch (err) {
        console.log(err);
    }

}

export const signupService = async (formData) => {
    try {
        const res = await axiosInstance.post('/auth/signup', formData);
        return res.data.result;

    } catch (err) {
        console.log(err);

    }
};

export const logoutService =  async()=>{
    const res = await axiosInstance.get("/auth/logout");
    return res.data.message;
}