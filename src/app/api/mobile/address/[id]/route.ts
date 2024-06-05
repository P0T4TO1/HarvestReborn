import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function getAdressByUserId(
  request: Request,
  { params }: { params: { id: string } }
) {
  const url = new URL(request.url);
  const urlSearchParams = new URLSearchParams(url.searchParams);
  const api_key = urlSearchParams.get('api_key');

  if (api_key !== process.env.API_KEY) {
    console.error('Invalid API key:', api_key);
    return NextResponse.json(
      {
        message:
          'You are not authorized to access this route. Please provide a valid API key.',
      },
      { status: 401 }
    );
  }

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
      select: {
        duenonegocio: {
          select: {
            negocio: {
              select: {
                direccion_negocio: true,
              },
            },
          },
        },
        cliente: {
          select: {
            direccion_negocio: true,
          },
        },
      },
    });

    const adress =
      user?.duenonegocio?.negocio?.direccion_negocio ||
      user?.cliente?.direccion_negocio;

    if (!adress) {
      return NextResponse.json(
        { message: 'No se encontró la dirección del negocio' },
        { status: 404 }
      );
    }

    return NextResponse.json(adress, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error al obtener la información del negocio' },
      { status: 500 }
    );
  }
}

export { getAdressByUserId as GET };
