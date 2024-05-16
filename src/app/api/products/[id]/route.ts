import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

async function getProductById(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { message: "Falta Id del producto" },
        { status: 400 }
      );
    }

    const product = await prisma.m_producto.findUnique({
      where: {
        id_producto: parseInt(params.id as string, 10),
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al buscar el inventario" },
      { status: 500 }
    );
  }
}

export { getProductById as GET };
