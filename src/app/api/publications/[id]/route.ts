import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

async function getPublicationById(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id) {
    return NextResponse.json(
      { message: "Falta id de la publicación" },
      { status: 400 }
    );
  }

  const publication = await prisma.m_publicaciones.findUnique({
    where: {
      id_publicacion: parseInt(id),
    },
    include: {
      lotes: true,
      negocio: {
        include: {
          dueneg: {
            select: {
              id_user: true,
            },
          },
        },
      },
    },
  });

  if (!publication) {
    return NextResponse.json(
      { message: "No se encontró la publicación" },
      { status: 404 }
    );
  }

  return NextResponse.json(publication, { status: 200 });
}

export { getPublicationById as GET };
