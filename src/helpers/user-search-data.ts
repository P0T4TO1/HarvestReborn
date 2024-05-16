import { hrApi } from "@/api";

export const searchUserByEmail = async (email: string) => {
  const res = await hrApi.get(`/user/search/${email}`);
  return res.data;
};

export const verifyOldPassword = async (id: string, password: string) => {
  const res = await hrApi.post(`/user/search/password/${id}`, { password });
  return res.data;
};

export const isEmailVerified = async (email: string) => {
  const res = await hrApi.get(`/user/search/verify/${email}`);
  return res.data;
};
