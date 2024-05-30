import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

async function getAllNegocios(req: NextRequest) {
  const urlSearchParams = new URLSearchParams(req.nextUrl.searchParams);
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

  const negocios = await prisma.m_negocio.findMany({
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

export { getAllNegocios as GET };
