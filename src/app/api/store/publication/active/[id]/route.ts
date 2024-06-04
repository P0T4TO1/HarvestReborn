import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { headers } from 'next/headers';

async function getPublicactionsByStore(
  request: Request,
  { params }: { params: { id: string } }
) {
  const headersList = headers();
  const referer = headersList.get('authorization');
  const mobileToken = referer?.split(' ')[1];

  if (mobileToken && mobileToken !== 'undefined') {
    if (!params.id)
      return NextResponse.json(
        { message: 'Falta id del negocio' },
        { status: 400 }
      );

    try {
      const publications = await prisma.m_publicaciones.findMany({
        where: {
          id_negocio: parseInt(params.id),
          estado_general: 'ACTIVO',
          estado_publicacion: 'ACTIVO',
        },
        include: {
          lotes: true,
          negocio: {
            select: {
              dueneg: {
                select: {
                  id_user: true,
                },
              },
              nombre_negocio: true,
            },
          },
        },
      });
      return NextResponse.json(publications, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: 'Error al obtener la publicación' },
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

  if (!params.id)
    return NextResponse.json(
      { message: 'Falta id del negocio' },
      { status: 400 }
    );

  try {
    const publications = await prisma.m_publicaciones.findMany({
      where: {
        id_negocio: parseInt(params.id),
        estado_general: 'ACTIVO',
        estado_publicacion: 'ACTIVO',
      },
      include: {
        lotes: true,
        negocio: {
          select: {
            dueneg: {
              select: {
                id_user: true,
              },
            },
            nombre_negocio: true,
          },
        },
      },
    });
    return NextResponse.json(publications, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error al obtener la publicación' },
      { status: 500 }
    );
  }
}

export { getPublicactionsByStore as GET };
