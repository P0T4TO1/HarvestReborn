import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getLotesFromInventory(
  request: Request,
  { params }: { params: { id: string } }
) {
  const url = new URL(request.url);
  const urlSearchParams = new URLSearchParams(url.searchParams);
  const api_key = urlSearchParams.get('api_key');

  if (api_key !== process.env.API_KEY) {
    return NextResponse.json(
      {
        message:
          'No tienes autorización para acceder a esta ruta. Por favor proporciona una API key válida.',
      },
      { status: 401 }
    );
  }

  try {
    if (!params.id)
      return NextResponse.json(
        { message: 'Falta Id del inventario' },
        { status: 400 }
      );

    const lotes = await prisma.m_lote.findMany({
      where: {
        inventario: {
          id_negocio: parseInt(params.id, 10),
        },
      },
      include: {
        producto: true,
        inventario: {
          select: {
            id_negocio: true,
            negocio: {
              select: {
                nombre_negocio: true,
              },
            },
          },
        },
      },
      distinct: ['id_producto'],
    });

    return NextResponse.json(lotes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al buscar el inventario' },
      { status: 500 }
    );
  }
}

export { getLotesFromInventory as GET };
