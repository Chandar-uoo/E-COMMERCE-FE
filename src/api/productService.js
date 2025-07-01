import axiosInstance from "./axiosInstance";

export const getAllProducts = async () => {
    try {
        const res = await axiosInstance.get("/products/", { withCredentials: true });
        return res.data.result;
    } catch (err) {
        console.log(err.message);
    }
}

export const searchService = async (text) => {
    try {
        const res = await axiosInstance.get(`/products/search-product?q=${text}`);
        return res.data.result;
    } catch (err) {
        console.log(err);
    }
}