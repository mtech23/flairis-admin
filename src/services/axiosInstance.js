import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

// Request interceptor to add the token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration and refreshing
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          // Attempt to refresh the token
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/auth/refresh-token`,
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          // Save the new token
          const newToken = response.data.accessToken;
          if (newToken) {
            localStorage.setItem("accessToken", newToken);

            // Update the authorization header in the original request
            originalRequest.headers.Authorization = `Bearer ${newToken}`;

            // Retry the original request
            return api(originalRequest);
          } else {
            window.location.href = "/blinds-and-shades-admin/login";
          }
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);

          // Optionally, redirect to login page or show a message to the user
          window.location.href = "/blinds-and-shades-admin/login";
          return Promise.reject(refreshError);
        }
      } else {
        window.location.href = "/blinds-and-shades-admin/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
