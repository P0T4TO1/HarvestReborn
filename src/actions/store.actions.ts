'use server';

import axios from 'axios';
import { today, getLocalTimeZone } from '@internationalized/date';
import { ILote, INegocio, IPublicacion, EstadoLote } from '@/interfaces';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

export const getNegocioById = async (id_negocio: number) => {
  if (!id_negocio) return;
  try {
    const { data } = await axios.get<INegocio>(
      `${process.env.NEXT_PUBLIC_API_URL}/store/${id_negocio}?api_key=${process.env.API_KEY}`
    );

    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getPublicactionById = async (
  id_publicacion: number,
  headers: ReadonlyHeaders
) => {
  if (!id_publicacion) return;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/store/publication/${id_publicacion}`,
      {
        method: 'GET',
        headers: new Headers(headers),
      }
    );
    const data = await res.json();
    return data as unknown as IPublicacion;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const changePublicationStatus = async (
  id_publicacion: number,
  estado: string,
  headers: ReadonlyHeaders
) => {
  if (!id_publicacion || !estado) return;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/store/publication/status/${id_publicacion}`,
      {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ estado }),
      }
    );
    const data = await res.json();
    return data as unknown as IPublicacion;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getLotesForPosts = async (
  id_negocio: number,
  headers: ReadonlyHeaders
) => {
  if (!id_negocio) return;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/store/inventory/batch/all/${id_negocio}`,
      {
        method: 'GET',
        headers: new Headers(headers),
      }
    );

    const lotes = (await res.json()) as unknown as ILote[];

    const allExceptExpired = lotes.filter(
      (lote) => lote.estado_lote !== EstadoLote.Vencido && !lote.id_publicacion
    );

    const lotesBuenEstado = allExceptExpired.filter((lote) => {
      return (
        new Date(lote.fecha_vencimiento) >
        new Date(
          new Date().setDate(
            today(getLocalTimeZone()).toDate(getLocalTimeZone()).getDate() + 7
          )
        )
      );
    });

    const lotesRecomendados = allExceptExpired.filter((lote) => {
      const fechaVencimiento = new Date(lote.fecha_vencimiento);
      const fechaHoy = today(getLocalTimeZone()).toDate(getLocalTimeZone());
      const diferencia = fechaVencimiento.getTime() - fechaHoy.getTime();
      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

      return dias <= lote.dias_aviso;
    });

    return {
      todos: allExceptExpired,
      buenEstado: lotesBuenEstado,
      apuntoVencer: lotesRecomendados,
    };
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getAllActiveStores = async () => {
  try {
    const { data } = await axios.get<INegocio[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/store/active?api_key=${process.env.API_KEY}`
    );

    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getAllNegocios = async () => {
  try {
    const { data } = await axios.get<INegocio[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/store?api_key=${process.env.API_KEY}`
    );

    return data;
  } catch (error) {
    console.error(error);
    return;
  }
}

export const getBatchsByStore = async (id_negocio: number) => {
  if (!id_negocio) return;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/store/inventory/batch/customers/${id_negocio}?api_key=${process.env.API_KEY}`
    );

    return data as unknown as ILote[];
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getDistinctProducts = async (
  id_negocio: number,
  isUserCustomer?: boolean
) => {
  if (!id_negocio) return;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/store/inventory/batch/all/distinct/${id_negocio}?api_key=${process.env.API_KEY}`
    );

    if (isUserCustomer) {
      const lotes = data as unknown as ILote[];
      const lotesBuenEstado = lotes.filter(
        (lote) => lote.estado_lote !== EstadoLote.Vencido
      );
      return lotesBuenEstado;
    }

    return data as unknown as ILote[];
  } catch (error) {
    console.error(error);
    return;
  }
};
