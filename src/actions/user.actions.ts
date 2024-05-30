'use server';

import { IUser } from '@/interfaces';
import axios, { AxiosError } from 'axios';
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
    const { data } = await axios.get<IUser[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/users`
    );
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
    const { data } = await axios.get<IUser[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/users/all`
    );
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

export const loginAction = async (email: string, password: string) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/login?api_key=${process.env.API_KEY}`,
      { email, password }
    );
    return data as {
      token: string;
      user: IUser;
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
      return;
    }
    console.error(error);
    return;
  }
};

export const registerAction = async (registerData: {
  email: string;
  password: string;
  tipo: string;
  nombre: string;
  apellidos: string;
  fecha_nacimiento: string;
  nombreNegocio: string;
  telefono: string;
  calle: string;
  colonia: string;
  alcaldia: string;
  cp: string;
}) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/register?api_key=${process.env.API_KEY}`,
      registerData
    );
    return data as {
      token: string;
      user: IUser;
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
      return;
    }
    console.error(error);
    return;
  }
};

export const changePassword = async (resetToken: string, password: string) => {
  try {
    const { data, status } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/change-password?api_key=${process.env.API_KEY}`,
      { resetToken, password }
    );

    if (status !== 200) {
      return {
        message: 'Error al cambiar la contraseña',
      };
    }

    return data as {
      message: string;
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
      return {
        message: 'Error al cambiar la contraseña',
      };
    }
    console.error(error);
    return {
      message: 'Error al cambiar la contraseña',
    };
  }
};

export const resetPassword = async (email: string) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/reset-password?api_key=${process.env.API_KEY}`,
      { email }
    );
    return data as {
      message: string;
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
      return {
        message: 'No se pudo enviar el correo electrónico - intente de nuevo',
      };
    }
    console.error(error);
    return {
      message: 'No se pudo enviar el correo electrónico - intente de nuevo',
    };
  }
};
