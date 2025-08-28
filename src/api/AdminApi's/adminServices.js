import axiosInstance from "../../api/axiosInstance"


export const fetchProducts =  async(query)=>{
        const res = await axiosInstance.get(`/admin/products?${query}`);
        return res.data.result;
}
export const filterProducts =  async(query)=>{
        const res = await axiosInstance.get(`/admin/filter?${query}`);
        return res.data.result;
}


export const addProduct =  async( updateFields)=>{
     const res = await  axiosInstance.post("/admin/add-product",{ updateFields});
     return res.data.result;
}

export const updateProduct  = async (id,updateFields) => {
    const res = await  axiosInstance.patch("/admin/update-product",{id,updateFields});
     return res.data.result;
}
export const deleteProduct = async(id)=>{
    const res = await  axiosInstance.delete(`/admin/delete-product/${id}`);
     return res.data.result;
}