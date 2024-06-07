import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { EstadoPublicacion } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { headers } from 'next/headers';
import { isValidToken } from '@/lib/jwt';

async function changeEstadoPublicacion(
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

    if (!params.id)
      return NextResponse.json(
        { message: 'Falta id del negocio' },
        { status: 400 }
      );
    const { estado } = (await request.json()) as {
      estado?: EstadoPublicacion;
    };
    const { id } = params;

    try {
      const publicacion = await prisma.m_publicaciones.update({
        where: {
          id_publicacion: parseInt(id as string),
        },
        data: {
          estado_publicacion: estado,
        },
      });

      return NextResponse.json(publicacion, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: 'Error al actualizar la publicación' },
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
  const { estado } = (await request.json()) as {
    estado?: EstadoPublicacion;
  };
  const { id } = params;

  try {
    const publicacion = await prisma.m_publicaciones.update({
      where: {
        id_publicacion: parseInt(id as string),
      },
      data: {
        estado_publicacion: estado,
      },
      include: {
        lotes: true,
      },
    });

    if (publicacion.estado_publicacion === 'VENDIDO') {
      await prisma.m_lote.updateMany({
        where: {
          id_publicacion: parseInt(id as string),
        },
        data: {
          estado_lote: 'VENDIDO',
        },
      });
    } else if (publicacion.estado_publicacion === 'DONADO') {
      await prisma.m_lote.updateMany({
        where: {
          id_publicacion: parseInt(id as string),
        },
        data: {
          estado_lote: 'TERMINADO',
        },
      });
    }

    return NextResponse.json(publicacion, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error al actualizar la publicación' },
      { status: 500 }
    );
  }
}

export { changeEstadoPublicacion as PUT };
