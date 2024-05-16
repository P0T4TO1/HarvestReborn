import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { DisponibilidadPublicacion } from "@/interfaces";

async function deletePublicacion(
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
  const { id } = params;

  try {
    const publicacion = await prisma.m_publicaciones.delete({
      where: {
        id_publicacion: parseInt(id as string),
      },
    });
    return NextResponse.json(publicacion, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al eliminar la publicación" },
      { status: 500 }
    );
  }
}

interface Data {
  id_negocio: number;
  titulo_publicacion: string;
  descripcion_publicacion: string;
  price?: number;
  disponibilidad: string;
  images_publicacion: string[];
  images_urls: string[];
  lotes: number[];
}

async function updatePublicacion(
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
  const { id } = params;
  const body = (await request.json()) as Data;
  const {
    id_negocio,
    titulo_publicacion,
    descripcion_publicacion,
    price,
    disponibilidad,
    images_urls,
    lotes,
  } = body;

  try {
    const publicacion = await prisma.m_publicaciones.update({
      where: {
        id_publicacion: parseInt(id as string),
      },
      data: {
        id_negocio: Number(id_negocio),
        titulo_publicacion,
        descripcion_publicacion,
        precio_publicacion: parseFloat(price?.toFixed(2) ?? "0.00") ?? 0.0,
        disponibilidad:
          DisponibilidadPublicacion[
            disponibilidad as keyof typeof DisponibilidadPublicacion
          ] ?? DisponibilidadPublicacion.En_venta,
        images_publicacion: images_urls,
        lotes: {
          connect: lotes.map((id) => ({ id_lote: id })),
        },
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

export { deletePublicacion as DELETE, updatePublicacion as PUT };
