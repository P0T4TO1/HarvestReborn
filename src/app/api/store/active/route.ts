import prisma from '@/lib/prisma';
import { Estado } from '@/interfaces';
import { NextRequest, NextResponse } from 'next/server';

async function getAllActitveStores(req: NextRequest) {
  const urlSearchParams = new URLSearchParams(req.nextUrl.searchParams);
  const api_key = urlSearchParams.get('api_key');

  if (api_key !== process.env.API_KEY) {
    return NextResponse.json(
      {
        message:
          'You are not authorized to access this route. Please provide a valid API key.',
      },
      { status: 401 }
    );
  }

  const negocios = await prisma.m_negocio.findMany({
    where: {
      estado_negocio: Estado.Activo,
    },
    include: {
      inventario: {
        include: {
          lote: {
            include: {
              producto: true,
            },
          },
        },
      },
    },
  });
  return NextResponse.json(negocios, { status: 200 });
}

export { getAllActitveStores as GET };
