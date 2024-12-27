import { convertToFormData } from "../utils/convertToFormData";
import api from "./axiosInstance";

export const getEntity = async (endpoint) => {
  document.querySelector(".loaderBox").classList.remove("d-none");
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    document.querySelector(".loaderBox").classList.add("d-none");
    console.error("Registration failed:", error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  } finally {
    document.querySelector(".loaderBox").classList.add("d-none");
  }
};
export const addEntity = async (endpoint, data) => {
  const formData = convertToFormData(data);
  document.querySelector(".loaderBox").classList.remove("d-none");

  try {
    const response = await api.post(endpoint, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    document.querySelector(".loaderBox").classList.add("d-none");

    return error;

    console.error("Registration failed:", error);
  } finally {
    document.querySelector(".loaderBox").classList.add("d-none");
  }
};
export const editEntity = async (endpoint) => {
  document.querySelector(".loaderBox").classList.remove("d-none");

  try {
    const response = await api.get(endpoint);
    console.log("tryyy");

    return response.data;
  } catch (error) {
    document.querySelector(".loaderBox").classList.add("d-none");
    console.error("Registration failed:", error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  } finally {
    document.querySelector(".loaderBox").classList.add("d-none");
  }
};
export const updateEntity = async (endpoint, data) => {
  const formData = await convertToFormData(data);

  document.querySelector(".loaderBox").classList.remove("d-none");

  try {
    const response = await api.post(endpoint, data,);
    return response.data;
  } catch (error) {
    document.querySelector(".loaderBox").classList.ass("d-none");

    console.error("Registration failed:", error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  } finally {
    document.querySelector(".loaderBox").classList.add("d-none");
  }
};
export const deleteEntity = async (endpoint) => {
  console.log("deleteee");
  document.querySelector(".loaderBox").classList.remove("d-none");
  try {
    const response = await api.post(endpoint);
    return response.data;
  } catch (error) {
    document.querySelector(".loaderBox").classList.add("d-none");

    console.error("Registration failed:", error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  } finally {
    document.querySelector(".loaderBox").classList.add("d-none");
  }
};
