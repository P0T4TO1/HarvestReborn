import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { EstadoGeneral } from "@prisma/client";

async function getActivePublications(req: NextRequest) {
  const urlSearchParams = new URLSearchParams(req.nextUrl.searchParams);
  const search = urlSearchParams.get("q");
  const offset = urlSearchParams.get("offset");
  const limit = urlSearchParams.get("limit");
  const api_key = urlSearchParams.get("api_key");

  if (api_key !== process.env.API_KEY) {
    return NextResponse.json(
      {
        message:
          "You are not authorized to access this route. Please provide a valid API key.",
      },
      { status: 401 }
    );
  }

  if (search) {
    const publications = await prisma.m_publicaciones.findMany({
      where: {
        estado_general: EstadoGeneral.ACTIVO,
        estado_publicacion: EstadoGeneral.ACTIVO,
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
      estado_publicacion: "ACTIVO",
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
