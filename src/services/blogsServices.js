import { convertToFormData } from "../utils/convertToFormData";
import api from "./axiosInstance";

export const getBlogs = async () => {
  try {
    const response = await api.get("/admin/blogs");
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};
export const addBlog = async (data) => {
  const formData = convertToFormData(data);
  try {
    const response = await api.post("admin/add-blog", formData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};
