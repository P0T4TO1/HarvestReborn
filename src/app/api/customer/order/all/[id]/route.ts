import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { IOrden } from '@/interfaces';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { headers } from 'next/headers';
import { isValidToken } from '@/lib/jwt';

async function getCustomerOrders(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const headersList = headers();
  const referer = headersList.get('authorization');
  const mobileToken = referer?.split(' ')[1];

  if (mobileToken && mobileToken !== 'undefined') {
    const session = await isValidToken(mobileToken);

    if (session === 'JWT no es válido' || !session) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'Invalid session token',
        },
        { status: 401 }
      );
    }

    const { id: id_cliente } = params;

    if (!id_cliente)
      return NextResponse.json(
        { message: 'Falta id de cliente' },
        { status: 400 }
      );

    try {
      const orders = (await prisma.d_orden.findMany({
        where: {
          id_cliente: Number(id_cliente),
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
            include: {
              producto: true,
              orden: true,
            },
          },
        },
        orderBy: {
          fecha_orden: 'desc',
          hora_orden: 'desc',
        },
      })) as unknown as IOrden[];

      return NextResponse.json(orders, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: 'Error al obtener las ordenes' },
        { status: 500 }
      );
    }
  }

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

  const { id: id_cliente } = params;

  if (!id_cliente)
    return NextResponse.json(
      { message: 'Falta id de cliente' },
      { status: 400 }
    );

  try {
    const orders = (await prisma.d_orden.findMany({
      where: {
        id_cliente: Number(id_cliente),
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
          },
          include: {
            producto: true,
          },
        },
      },
      orderBy: {
        fecha_orden: 'desc',
        hora_orden: 'desc',
      },
    })) as unknown as IOrden[];

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error al obtener las ordenes' },
      { status: 500 }
    );
  }
}

export { getCustomerOrders as GET };
