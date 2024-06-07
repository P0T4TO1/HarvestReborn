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
          'You are not authorized to access this route. Please provide a valid API key.',
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
        estado_lote: 'ACTIVO',
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
      orderBy: {
        fecha_entrada: 'desc',
      },
      distinct: ['id_producto'],
    });

    // const distinctLotes = lotes.reduce((acc: any, lote) => {
    //   const sameProduct = acc.find(
    //     (item: any) => item.id_producto === lote.id_producto
    //   );

    //   if (sameProduct) {
    //     sameProduct.last_cantidad += lote.last_cantidad;
    //     return acc;
    //   } else {
    //     return [...acc, lote];
    //   }
    // }, []);

    return NextResponse.json(lotes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error al buscar el inventario' },
      { status: 500 }
    );
  }
}

export { getLotesFromInventory as GET };
