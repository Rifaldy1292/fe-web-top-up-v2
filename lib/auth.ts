import axiosClient from "./axiosInstance";

export async function signIn(data: any) {
  const response = await axiosClient.post("/auth/signin", data);
  if (response.data?.data && typeof window !== "undefined") {
    localStorage.setItem("access_token", response.data.data.accessToken);
    localStorage.setItem("refresh_token", response.data.data.refreshToken);
  }
  return response.data;
}

export async function signUp(data: any) {
  const response = await axiosClient.post("/auth/signup", data);
  if (response.data?.data && typeof window !== "undefined") {
    localStorage.setItem("access_token", response.data.data.accessToken);
    localStorage.setItem("refresh_token", response.data.data.refreshToken);
  }
  return response.data;
}

export async function logOut() {
  try {
    await axiosClient.get("/auth/logout");
  } catch (error) {
    console.error("Logout failed", error);
  } finally {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  }
}