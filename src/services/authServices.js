import { convertToFormData } from "../utils/convertToFormData";
import api from "./axiosInstance";

export const registerUser = async (formData) => {
  const formDataMethod = convertToFormData(formData);

  try {
    const response = await api.post("/user-register", formDataMethod);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const loginUser = async (formData) => {
  const formDataMethod = convertToFormData(formData);

  try {
    const response = await api.post("/user-login", formDataMethod);
    localStorage.setItem("accessToken", response?.data?.data.accessToken);
    localStorage.setItem("refreshToken", response?.data?.data.refresh);


    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const forgotPassword = async (email) => {
  const formDataMethod = convertToFormData(email);

  try {
    const response = await api.post("/forgot-password", formDataMethod);
    return response.data;
  } catch (error) {
    console.error("Failed to send verification code:", error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const verifyOTP = async (otp) => {
  localStorage.setItem("otp", otp);
  const email = localStorage.getItem("email");
  const formData = convertToFormData({ otp, email });
  try {
    const response = await api.post("/otp-verification", formData);
    return response.data;
  } catch (error) {
    console.error("OTP verification failed:", error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};
export const resetPassword = async (password, password_confirmation) => {
  const email = localStorage.getItem("email");
  const otp = localStorage.getItem("otp");

  const data = { email, password, password_confirmation, otp };

  const formData = convertToFormData(data);

  try {
    const response = await api.post("/reset-password", formData);
    return response.data;
  } catch (error) {
    console.error("Reset password failed:", error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post("/logout");
    localStorage.removeItem("accessToken");
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error(error || "Something went wrong");
  }
};
