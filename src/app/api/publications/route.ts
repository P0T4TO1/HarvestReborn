import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

async function getAllPublications(req: NextRequest) {
  const publications = await prisma.m_publicaciones.findMany({
    include: {
      lotes: true,
    },
  });
  return NextResponse.json(publications, { status: 200 });
}

export { getAllPublications as GET };
