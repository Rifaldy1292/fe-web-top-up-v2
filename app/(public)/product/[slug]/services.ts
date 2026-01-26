import axiosClient from "@/lib/axiosInstance";

export const getListPacketGame = (id: number) => {
  return axiosClient.get(`/list-packet/game/${id}`);
};

export const getNicknameByIdServerMl = (id: number, server: number) => {
  return axiosClient.get("/games/cek-id", {
    params: {
      id: id,
      server: server,
    },
  });
};
