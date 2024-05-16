import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function getNegocioById(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  if (!params.id)
    return NextResponse.json(
      { message: "Falta id del negocio" },
      { status: 400 }
    );

  const negocio = await prisma.m_negocio.findFirst({
    where: {
      id_negocio: parseInt(params.id.toString()),
    },
    include: {
      inventario: {
        include: {
          lote: {
            include: {
              producto: true,
            },
            distinct: ["id_producto"],
          },
        },
      },
      dueneg: {
        include: {
          user: true,
        },
      },
    },
  });
  return NextResponse.json(negocio, { status: 200 });
}

interface Data {
  nombre_negocio: string;
  telefono_negocio: string;
  email_negocio: string;
  direccion_negocio: string;
  calle: string;
  colonia: string;
  alcaldia: string;
  cp: string;
  images_negocio?: string[];
  descripcion_negocio?: string;
}

async function updateNegocioById(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  const {
    nombre_negocio,
    telefono_negocio,
    email_negocio,
    direccion_negocio,
    calle,
    colonia,
    alcaldia,
    cp,
    descripcion_negocio,
    images_negocio,
  } = (await new Response(request.body).json()) as Data;
  const newDireccion = `${calle}, ${colonia}, ${alcaldia}, ${cp}`;
  if (!params.id)
    return NextResponse.json(
      { message: "Falta id del negocio" },
      { status: 400 }
    );

  try {
    const negocio = await prisma.m_negocio.update({
      where: {
        id_negocio: parseInt(params.id.toString()),
      },
      data: {
        nombre_negocio: nombre_negocio,
        telefono_negocio: telefono_negocio,
        direccion_negocio:
          newDireccion === "undefined, undefined, undefined, undefined"
            ? direccion_negocio
            : newDireccion,
        email_negocio: email_negocio,
        descripcion_negocio: descripcion_negocio,
        images_negocio: images_negocio ?? [],
      },
    });
    return NextResponse.json(negocio, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error al actualizar el negocio" },
      { status: 500 }
    );
  }
}

export { getNegocioById as GET, updateNegocioById as PUT };
