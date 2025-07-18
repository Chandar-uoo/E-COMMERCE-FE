import axios from "axios";
import config from "../utils/config";
import { setAccessToken } from '../store/Slices/UserSlice';
import { AppStore } from '../store/AppStore.jsx'
const axiosInstance =  axios.create({
  
    baseURL:config.API_URL,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json",
    }

});
axiosInstance.interceptors.request.use(
    (config) => {
        const token = AppStore.getState().user?.token;
        if(token){
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error)=>Promise.reject(error)
)
axiosInstance.interceptors.response.use(
    (response) => response,
    async(error)=>{
        const originalRequest =  error.config;
        if(
            error.response?.status === 401 && !originalRequest._retry
        ){
            originalRequest._retry = true;
        try{
            const refreshResponse = await  axios.get(`${config.API_URL}/auth/refresh-token`,{withCredentials:true})
            const newAccessToken = refreshResponse.data.accessToken;
            AppStore.dispatch(setAccessToken(newAccessToken));
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
        }
        catch(refresherror){
            return Promise.reject(refresherror);
        }
    }
        return Promise.reject(error) 
    }
)


export default axiosInstance;
