import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { TipoAlmacenaje } from "@/interfaces";

async function getLoteById(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  if (!params.id) {
    return NextResponse.json({ message: "Falta Id del lote" }, { status: 400 });
  }

  const lote = await prisma.m_lote.findUnique({
    where: {
      id_lote: parseInt(params.id as string, 10),
    },
    include: {
      producto: true,
    },
  });

  return NextResponse.json(lote, { status: 200 });
}

type Data = {
  cantidad_producto: string;
  fecha_entrada: string;
  fecha_vencimiento: string;
  dias_aviso: string;
  precio_kg: string;
  tipo_almacenaje: TipoAlmacenaje;
};

async function updateLote(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  const body = await request.json();
  const {
    cantidad_producto,
    fecha_entrada,
    fecha_vencimiento,
    dias_aviso,
    precio_kg,
    tipo_almacenaje,
  } = body as Data;

  try {
    if (!params.id) {
      return NextResponse.json(
        { message: "Falta Id del lote" },
        { status: 400 }
      );
    }

    const lote = await prisma.m_lote.update({
      where: {
        id_lote: parseInt(params.id, 10),
      },
      data: {
        cantidad_producto: parseInt(cantidad_producto, 10),
        fecha_entrada: new Date(fecha_entrada).toISOString(),
        fecha_vencimiento: new Date(fecha_vencimiento).toISOString(),
        dias_aviso: parseInt(dias_aviso, 10),
        precio_kg: parseFloat(precio_kg),
        monto_total: parseFloat(cantidad_producto) * parseFloat(precio_kg),
        tipo_almacenaje: tipo_almacenaje,
      },
    });

    return NextResponse.json(lote, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error al actualizar lote" },
      { status: 500 }
    );
  }
}

export { getLoteById as GET, updateLote as PUT };
