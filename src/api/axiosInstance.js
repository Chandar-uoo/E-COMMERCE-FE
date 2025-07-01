import axios from "axios";
import config from "../utils/config";

const axiosInstance =  axios.create({
    baseURL:config.API_URL,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json",
    }

})
export default axiosInstance;