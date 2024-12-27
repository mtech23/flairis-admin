import { convertToFormData } from "../utils/convertToFormData";
import api from "./axiosInstance";

export const getGallery = async () => {
  try {
    const response = await api.get("/admin/gallery");
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};
export const addGallery = async (data) => {
  const formData = convertToFormData(data);
  try {
    const response = await api.post("admin/add-gallery", formData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};
export const updateGallery = async (data, id) => {
  const formData = convertToFormData(data);
  try {
    const response = await api.post(`admin/update-gallery/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};
