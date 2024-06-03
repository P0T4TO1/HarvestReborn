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
    });

    const distinctProducts = lotes.reduce((acc: any, lote) => {
      const existingProduct = acc.find(
        (product: any) =>
          product.producto.id_producto === lote.producto.id_producto
      );

      if (existingProduct) {
        existingProduct.cantidad_producto += lote.cantidad_producto;
      } else {
        acc.push({
          ...lote,
          cantidad_producto: lote.cantidad_producto,
        });
      }

      return acc;
    }, []);

    return NextResponse.json(distinctProducts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al buscar el inventario' },
      { status: 500 }
    );
  }
}

export { getLotesFromInventory as GET };
