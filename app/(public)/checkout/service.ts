import axiosClient from "@/lib/axiosInstance";

export const createTopUpTransaction = (body: any) => {
  return axiosClient.post("/transaction", body);
};
