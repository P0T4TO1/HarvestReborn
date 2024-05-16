import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { TipoAlmacenaje } from "@/interfaces";

type Data = {
  id: number;
  cantidad_producto: string;
  fecha_entrada: string;
  fecha_vencimiento: string;
  dias_aviso: string;
  precio_kg: string;
  tipo_almacenaje: TipoAlmacenaje;
  inventory_id: number;
};

async function addProductToInventory(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  const body = await request.json();
  const {
    id,
    cantidad_producto,
    fecha_entrada,
    fecha_vencimiento,
    dias_aviso,
    precio_kg,
    tipo_almacenaje,
    inventory_id,
  } = body as Data;

  if (!params.id)
    return NextResponse.json(
      { message: "Falta Id del producto" },
      { status: 400 }
    );

  if (
    !id ||
    !cantidad_producto ||
    !fecha_entrada ||
    !fecha_vencimiento ||
    !dias_aviso ||
    !precio_kg ||
    !inventory_id
  ) {
    return NextResponse.json(
      { message: "Faltan datos del producto" },
      { status: 400 }
    );
  }

  try {
    const product = await prisma.m_lote.create({
      data: {
        cantidad_producto: parseInt(cantidad_producto, 10),
        fecha_entrada: new Date(fecha_entrada).toISOString(),
        fecha_vencimiento: new Date(fecha_vencimiento).toISOString(),
        dias_aviso: parseInt(dias_aviso, 10),
        precio_kg: parseFloat(precio_kg),
        monto_total: parseFloat(precio_kg) * parseInt(cantidad_producto, 10),
        tipo_almacenaje: tipo_almacenaje,
        inventario: {
          connect: {
            id_inventario: inventory_id,
          },
        },
        producto: {
          connect: {
            id_producto: id,
          },
        },
      },
    });

    return NextResponse.json(product, { status: 200 }) as any;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error al agregar producto al inventario" },
      { status: 500 }
    );
  }
}

async function deleteProductFromInventory(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  if (!params.id)
    return NextResponse.json(
      { message: "Falta Id del producto" },
      { status: 400 }
    ) as any;

  try {
    const product = await prisma.m_lote.delete({
      where: {
        id_lote: parseInt(params.id, 10),
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al borrar producto del inventario" },
      { status: 500 }
    );
  }
}

export {
  addProductToInventory as POST,
  deleteProductFromInventory as DELETE,
};
