import axiosInstance from "./axiosInstance"

export const postReviewService =  async ({id,comment,rating}) => {
    const res =  await axiosInstance.post(`/review/${id}`,{comment,rating});
    return res.data.result;
}