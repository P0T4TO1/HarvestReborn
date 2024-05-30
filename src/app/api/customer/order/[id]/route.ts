import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

async function getOrderById(
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
  try {
    const order = await prisma.d_orden.findUnique({
      where: {
        id_orden: params.id,
      },
      include: {
        productoOrden: {
          include: {
            producto: true,
          },
        },
        negocio: {
          select: {
            nombre_negocio: true,
            dueneg: {
              select: {
                id_user: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: true, message: 'Error al obtener la orden' },
      { status: 500 }
    );
  }
}

export { getOrderById as GET };
