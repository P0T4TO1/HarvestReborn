"use server";

import prisma from "@/lib/prisma";
import { IOrden, EstadoOrden } from "@/interfaces";

export const getOrdersById = async (id: number) => {
  if (!id) return;

  try {
    const orders = (await prisma.d_orden.findMany({
      where: {
        id_cliente: id,
      },
      include: {
        productoOrden: {
          include: {
            producto: true,
          },
        },
      },
    })) as unknown as IOrden[];
    return {
      todos: orders,
      pendientes: orders.filter((order) => order.estado_orden === EstadoOrden.PENDIENTE),
      en_proceso: orders.filter((order) => order.estado_orden === EstadoOrden.EN_PROCESO),
      finalizados: orders.filter(
        (order) => order.estado_orden === EstadoOrden.FINALIZADO
      ),
      cancelados: orders.filter((order) => order.estado_orden === EstadoOrden.CANCELADO),
      rechazados: orders.filter((order) => order.estado_orden === EstadoOrden.RECHAZADO),
    };
  } catch (error) {
    console.error(error);
    return;
  }
};
