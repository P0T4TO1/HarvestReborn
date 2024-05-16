import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { DisponibilidadPublicacion } from "@/interfaces";

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

async function createPost(req: NextRequest) {
  const body = (await req.json()) as Data;
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
    const post = await prisma.m_publicaciones.create({
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

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      body: { message: "Error al crear la publicación" },
    });
  }
}

export { createPost as POST };
