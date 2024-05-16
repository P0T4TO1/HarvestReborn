import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { Disponibilidad, EstadoPublicacion } from "@prisma/client";

async function changeEstadoPublicacion(
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
  const { estado } = (await request.json()) as {
    estado?: EstadoPublicacion;
  };
  const { id } = params;

  try {
    const publicacion = await prisma.m_publicaciones.update({
      where: {
        id_publicacion: parseInt(id as string),
      },
      data: {
        estado_publicacion: estado,
      },
    });
    return NextResponse.json(publicacion, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al actualizar la publicación" },
      { status: 500 }
    );
  }
}

export { changeEstadoPublicacion as PUT };
