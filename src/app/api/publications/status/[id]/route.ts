import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { EstadoGeneral } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

async function changeStatusPublication(
  request: Request,
  { params }: { params: { id: string } }
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
  const { id } = params;
  if (!id) {
    return NextResponse.json(
      { message: 'Falta id de la publicación' },
      { status: 400 }
    );
  }

  const { status } = (await request.json()) as { status: string };

  try {
    const updatedPublication = await prisma.m_publicaciones.update({
      where: {
        id_publicacion: Number(id),
      },
      data: {
        estado_general: status as EstadoGeneral,
      },
    });

    return NextResponse.json(updatedPublication, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'No se pudo actualizar la publicación' },
      { status: 500 }
    );
  }
}

export { changeStatusPublication as PUT };
