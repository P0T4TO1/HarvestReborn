import prisma from "@/lib/prisma";
import { ILote } from "@/interfaces";
import { IOrden } from "@/interfaces";
import axios, { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { IPublicacion, EstadoLote } from "@/interfaces";
import { today, getLocalTimeZone } from "@internationalized/date";

export const revalidate = 3600;

export const getPublicaciones = async (id_negocio: number) => {
  if (!id_negocio) return;

  try {
    const { data } = await axios.get<IPublicacion[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/store/publication?id_negocio=${id_negocio}`
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

export const getPublicactionById = async (id_publicacion: number) => {
  if (!id_publicacion) return;

  try {
    const { data } = await axios.get<IPublicacion>(
      `${process.env.NEXT_PUBLIC_API_URL}/store/publication/${id_publicacion}`
    );

    return data as unknown as IPublicacion;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const changePublicationStatus = async (
  id_publicacion: number,
  estado: string
) => {
  if (!id_publicacion || !estado) return;

  try {
    const { data } = await axios.put<IPublicacion>(
      `${process.env.NEXT_PUBLIC_API_URL}/store/publication/status/${id_publicacion}`,
      {
        estado,
      }
    );

    return data as unknown as IPublicacion;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getOrders = async (id_negocio: number) => {
  if (!id_negocio) return;

  try {
    const orders = (await prisma.d_orden.findMany({
      where: {
        id_negocio,
      },
      select: {
        id_orden: true,
        fecha_orden: true,
        hora_orden: true,
        monto_total: true,
        estado_orden: true,
        id_cliente: true,
        cliente: {
          select: {
            id_cliente: true,
            nombre_cliente: true,
          },
        },
        productoOrden: {
          select: {
            id_productoOrden: true,
            cantidad_orden: true,
            monto: true,
            id_orden: true,
            orden: true,
            id_producto: true,
            producto: true,
          },
        },
      },
    })) as unknown as IOrden[];
    return orders;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getLotes = async (id_negocio: number) => {
  if (!id_negocio) return;

  try {
    const lotes = (await prisma.m_lote.findMany({
      where: {
        inventario: {
          id_negocio,
        },
      },
      include: {
        productoOrden: {
          orderBy: {
            cantidad_orden: "desc",
          },
        },
      },
    })) as unknown as ILote[];

    const lotesVencidos = lotes.filter((lote) => {
      return (
        new Date(lote.fecha_vencimiento) <
        today(getLocalTimeZone()).toDate(getLocalTimeZone())
      );
    });

    const lotesPorVencer = lotes.filter((lote) => {
      return (
        new Date(lote.fecha_vencimiento) >
          new Date(
            new Date().setDate(
              today(getLocalTimeZone()).toDate(getLocalTimeZone()).getDate() + 3
            )
          ) &&
        new Date(lote.fecha_vencimiento) <
          new Date(
            new Date().setDate(
              today(getLocalTimeZone()).toDate(getLocalTimeZone()).getDate() + 7
            )
          )
      );
    });

    const lotesVigentes = lotes.filter((lote) => {
      return (
        new Date(lote.fecha_vencimiento) >
        new Date(
          new Date().setDate(
            today(getLocalTimeZone()).toDate(getLocalTimeZone()).getDate() + 7
          )
        )
      );
    });

    return {
      all: lotes,
      lotesVencidos,
      lotesPorVencer,
      lotesVigentes,
    };
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getLotesForPosts = async (id_negocio: number) => {
  if (!id_negocio) return;

  try {
    const lotes = (await prisma.m_lote.findMany({
      where: {
        inventario: {
          id_negocio,
        },
      },
      include: {
        producto: true,
      },
    })) as unknown as ILote[];

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
