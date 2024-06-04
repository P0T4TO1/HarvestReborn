import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { headers } from 'next/headers';
import { isValidToken } from '@/lib/jwt';

async function getProductById(
  request: Request,
  { params }: { params: { id: string } },
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
        { message: 'Falta Id del producto' },
        { status: 400 },
      );
    }

    const product = await prisma.m_producto.findUnique({
      where: {
        id_producto: parseInt(params.id as string, 10),
      },
    });

    return NextResponse.json(product, { status: 200 });
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
  try {
    if (!params.id) {
      return NextResponse.json(
        { message: 'Falta Id del producto' },
        { status: 400 }
      );
    }

    const product = await prisma.m_producto.findUnique({
      where: {
        id_producto: parseInt(params.id as string, 10),
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al buscar el inventario' },
      { status: 500 }
    );
  }
}

export { getProductById as GET };
