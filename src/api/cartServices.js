import axiosInstance from "./axiosInstance";

export const addToCartService = async ({ productId, quantity }) => {
    const res = await axiosInstance.post("/cart/add",{ productId, quantity });
    return res.data.result;
}

export const updateCartService = async (productId,quantity) => {
    const res = await axiosInstance.patch("/cart/update", { productId, quantity });
    return res.data.result;
}

export const deleteCartService =  async (productId) => {
    const res = await axiosInstance.delete("/cart/delete", { data: { productId } });

      return res.data.result;
}
export const readCartService = async ()=>{
    const res = await axiosInstance.get("/cart/read");
    return res.data.result;
}
export const clearCart = async()=>{
    const res =  await axiosInstance.delete("/cart/clear");
    return res.data.result
}