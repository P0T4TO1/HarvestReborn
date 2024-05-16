import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { EstadoGeneral } from "@prisma/client";

async function getActivePublications(req: NextRequest) {
  const urlSearchParams = new URLSearchParams(req.nextUrl.searchParams);
  const search = urlSearchParams.get("q");
  const offset = urlSearchParams.get("offset");
  const limit = urlSearchParams.get("limit");

  if (search) {
    const publications = await prisma.m_publicaciones.findMany({
      where: {
        estado_general: EstadoGeneral.ACTIVO,
        OR: [
          {
            titulo_publicacion: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            descripcion_publicacion: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        lotes: true,
      },
      skip: Number(offset),
      take: Number(limit),
    });
    return NextResponse.json(publications, { status: 200 });
  }

  const publications = await prisma.m_publicaciones.findMany({
    where: {
      estado_general: EstadoGeneral.ACTIVO,
    },
    include: {
      lotes: true,
    },
    skip: Number(offset),
    take: Number(limit),
  });
  return NextResponse.json(publications, { status: 200 });
}

export { getActivePublications as GET };
