import axiosInstance from "./axiosInstance";

export const getAllProducts = async () => {
        const res = await axiosInstance.get("/products/");
        return res.data.result;
    } 

export const getProduct =  async (id) => {
    const res =  await axiosInstance.get(`/products/${id}`) ;
    return res.data.result;  
}
export const searchService = async (query) => {
    try {
        const res = await axiosInstance.get(`/products/search-product?${query}`);
        return res.data.result;
    } catch (err) {
        console.log(err);
    }
}