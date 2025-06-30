import axios from "axios";
import config from "../utils/config";

const axiosInstance =  axios.create({
    baseURL:config.API_URL,

})
export default axiosInstance;