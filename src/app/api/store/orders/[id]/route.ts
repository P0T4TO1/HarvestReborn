import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { IProductoOrden } from "@/interfaces";
import { EstadoOrden } from "@prisma/client";

async function getOrdersByNegocio(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  if (!params.id)
    return NextResponse.json(
      { message: "Falta id del negocio" },
      { status: 400 }
    );
  try {
    const orders = await prisma.d_orden.findMany({
      where: {
        id_negocio: parseInt(params.id.toString()),
      },
      include: {
        negocio: true,
        productoOrden: {
          include: {
            producto: true,
          },
        },
        cliente: {
          include: {
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al encontrar ordenes" },
      { status: 500 }
    );
  }
}

interface Data {
  fecha_orden: string;
  hora_orden: string;
  monto_subtotal: number;
  monto_total: number;
  estado_orden: string;
  id_cliente: number;
  id_historial: number;
  productos: IProductoOrden[];
}

async function editOrder(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  if (!params.id)
    return NextResponse.json(
      { message: "Falta id de la orden" },
      { status: 400 }
    );
  const { id } = params;
  const body = (await request.json()) as Data;

  try {
    const order = await prisma.d_orden.update({
      where: {
        id_orden: id,
      },
      data: {
        fecha_orden: new Date(body.fecha_orden),
        hora_orden: new Date(body.hora_orden),
        monto_total: body.monto_total,
        estado_orden: body.estado_orden as EstadoOrden,
        id_cliente: body.id_cliente,
        id_historial: body.id_historial,
        productoOrden: {
          deleteMany: {},
          createMany: {
            data: body.productos.map((product) => {
              if (!product.lote) {
                throw new Error("No se ha seleccionado un lote");
              }
              return {
                id_producto: product.id_producto,
                cantidad_orden: product.cantidad_orden,
                monto: product.monto,
                id_lote: product.lote.id_lote,
              };
            }),
          },
        },
      },
    });
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al editar la orden" },
      { status: 500 }
    );
  }
}

export { getOrdersByNegocio as GET };
