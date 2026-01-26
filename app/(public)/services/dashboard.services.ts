import axiosClient from "@/lib/axiosInstance";

export const getListGame = () => {
  return axiosClient.get("/games");
};
