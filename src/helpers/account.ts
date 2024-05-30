import { serverApi } from "@/api/hrApi";
import { IUser } from '@/interfaces';
import { AxiosError } from 'axios';

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

export const getAccount = async (id_user: string) => {
  try {
    const { data } = await serverApi.get<IUser>(`/user/account/${id_user}`);
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
