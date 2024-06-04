import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function getIdNegocioByUserId(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id)
    return NextResponse.json(
      { message: 'Falta id del usuario' },
      { status: 400 }
    );

  const { id } = params;

  try {
    const user = await prisma.m_user.findUnique({
      where: {
        id,
      },
      include: {
        duenonegocio: {
          select: {
            id_dueneg: true,
          },
        },
      },
    });

    const store = await prisma.m_negocio.findUnique({
      where: {
        id_dueneg: user?.duenonegocio?.id_dueneg,
      },
    });

    return NextResponse.json(store?.id_negocio, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error al obtener la información del negocio' },
      { status: 500 }
    );
  }
}

export { getIdNegocioByUserId as GET };
