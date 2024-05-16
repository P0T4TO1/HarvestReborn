import axios, { AxiosError } from "axios";
import { IPublicacion } from "@/interfaces";

export const revalidate = 3600;

export const getAllPublications = async () => {
  try {
    const { data } = await axios.get<IPublicacion[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/publications`
    );
    return data as unknown as IPublicacion[];
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
      return;
    }
    console.error(error);
    return;
  }
};

export const getActivePublications = async (
  offset: number,
  limit: number,
  search?: string
) => {
  try {
    if (!search) {
      const { data } = await axios.get<IPublicacion[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/publications/active?offset=${offset}&limit=${limit}`
      );
      return data as unknown as IPublicacion[];
    }

    const { data } = await axios.get<IPublicacion[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/publications/active?q=${search}&offset=${offset}&limit=${limit}`
    );
    return data as unknown as IPublicacion[];
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
      return;
    }
    console.error(error);
    return;
  }
};

export const getPublicationById = async (id: string) => {
  try {
    const { data } = await axios.get<IPublicacion>(
      `${process.env.NEXT_PUBLIC_API_URL}/publications/${id}`
    );
    return data as unknown as IPublicacion;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
      return;
    }
    console.error(error);
    return;
  }
};
