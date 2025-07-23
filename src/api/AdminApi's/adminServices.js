import axiosInstance from "../../api/axiosInstance"


export const fetchProducts =  async()=>{
        const res = await axiosInstance.get("/admin/products");
        return res.data.result;
}

export const addProduct =  async(product)=>{
     const res = await  axiosInstance.post("/admin/add-product",{product});
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