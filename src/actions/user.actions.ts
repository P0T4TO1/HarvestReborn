import { IUser } from "@/interfaces";
import { AxiosError } from "axios";
import { serverApi } from "@/api/hrApi";

export const getProfile = async (id_user: string) => {
  try {
    const { data } = await serverApi.get<IUser>(`/user/profile/${id_user}`);
    return data as unknown as IUser;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
      return;
    }
    console.error(error);
    return;
  }
};
