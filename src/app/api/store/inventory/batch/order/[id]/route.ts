import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ILote } from '@/interfaces';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { headers } from 'next/headers';
import { isValidToken } from '@/lib/jwt';

async function getLotes(
  request: Request,
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

    if (!params.id) {
      return NextResponse.json(
        { message: 'Falta Id del lote' },
        { status: 400 }
      );
    }

    const lotes = (await prisma.m_lote.findMany({
      where: {
        inventario: {
          id_negocio: Number(params.id),
        },
      },
      include: {
        productoOrden: {
          orderBy: {
            cantidad_orden: 'desc',
          },
        },
      },
    })) as unknown as ILote[];

    return NextResponse.json(lotes, { status: 200 });
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
  if (!params.id) {
    return NextResponse.json({ message: 'Falta Id del lote' }, { status: 400 });
  }

  const lotes = (await prisma.m_lote.findMany({
    where: {
      inventario: {
        id_negocio: Number(params.id),
      },
    },
    include: {
      productoOrden: {
        orderBy: {
          cantidad_orden: 'desc',
        },
      },
    },
  })) as unknown as ILote[];

  return NextResponse.json(lotes, { status: 200 });
}

export { getLotes as GET };
