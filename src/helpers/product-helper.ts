import { hrApi } from "@/api";

export const searchProductByName = async (name: string) => {
  const res = await hrApi.get(`/admin/product/search/${name}`);
  return res.data;
};
