import axios from "axios";
import config from "../Utils/config";

const axiosInstance =  axios.create({
    baseURL:config.API_URL,

})
export default axiosInstance;