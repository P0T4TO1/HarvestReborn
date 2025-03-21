'use server';

import { revalidatePath } from 'next/cache';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

import axios, { AxiosError } from 'axios';
import { IPublicacion } from '@/interfaces';

export const getActivePublications = async (
  offset: number,
  limit: number,
  search?: string
) => {
  try {
    if (!search) {
      const { data } = await axios.get<IPublicacion[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/publications/active?offset=${offset}&limit=${limit}&api_key=${process.env.API_KEY}`
      );
      return data as unknown as IPublicacion[];
    }

    const { data } = await axios.get<IPublicacion[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/publications/active?q=${search}&offset=${offset}&limit=${limit}&api_key=${process.env.API_KEY}`
    );

    revalidatePath('/(application)/market');
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
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/publications/${id}?api_key=${process.env.API_KEY}`
    );
    revalidatePath('/(application)/market/item/[id]', 'page');
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

export const getActivePublicactionsByStore = async (
  id_negocio: number,
  headers: ReadonlyHeaders
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/store/publication/active/${id_negocio}`,
      {
        method: 'GET',
        headers: new Headers(headers),
      }
    );
    const data = (await res.json()) as unknown as IPublicacion[];
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
