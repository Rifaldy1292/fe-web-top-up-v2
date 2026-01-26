// app/lib/axios.client.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (requestConfig) => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      requestConfig.headers.Authorization = `Bearer ${accessToken}`;
    }
    return requestConfig;
  },
  (requestError) => {
    return Promise.reject(requestError);
  },
);

axiosClient.interceptors.response.use(
  (response) => response,
  (responseError) => {
    if (responseError.response?.status === 401) {
      // optional: logout / redirect
    }
    return Promise.reject(responseError);
  },
);

export default axiosClient;
