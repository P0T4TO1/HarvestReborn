import { IUser } from '@/interfaces';
import { AxiosError } from 'axios';
import { serverApi } from '@/api/hrApi';

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

export const getUsersForAdmin = async () => {
  try {
    const { data } = await serverApi.get<IUser[]>('/admin/users');
    return data as unknown as IUser[];
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
      return;
    }
    console.error(error);
    return;
  }
};

export const getUsersForSuperAdmin = async () => {
  try {
    const { data } = await serverApi.get<IUser[]>('/admin/all/users');
    return data as unknown as IUser[];
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
      return;
    }
    console.error(error);
    return;
  }
};
