import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getLotesFromInventory(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  try {
    if (!params.id)
      return NextResponse.json(
        { message: "Falta Id del inventario" },
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
      distinct: ["id_producto"],
    });

    return NextResponse.json(lotes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al buscar el inventario" },
      { status: 500 }
    );
  }
}

export { getLotesFromInventory as GET };
