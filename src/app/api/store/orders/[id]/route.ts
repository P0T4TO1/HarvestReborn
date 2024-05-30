import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { IOrden, IProductoOrden } from '@/interfaces';
import { EstadoOrden } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

async function getStoreOrders(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
        message: 'You need to be signed in to view the protected content.',
      },
      { status: 401 }
    );
  }
  const { id: id_negocio } = params;

  if (!id_negocio)
    return NextResponse.json(
      { message: 'Falta id de cliente' },
      { status: 400 }
    );

  try {
    const orders = (await prisma.d_orden.findMany({
      where: {
        id_negocio: Number(id_negocio),
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
            user: {
              select: {
                email: true,
              },
            },
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
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: true, message: 'Error al obtener las ordenes' },
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
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
        message: 'You need to be signed in to view the protected content.',
      },
      { status: 401 }
    );
  }
  if (!params.id)
    return NextResponse.json(
      { message: 'Falta id de la orden' },
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
                throw new Error('No se ha seleccionado un lote');
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
      { message: 'Error al editar la orden' },
      { status: 500 }
    );
  }
}

export { getStoreOrders as GET, editOrder as PUT };
