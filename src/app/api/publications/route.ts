import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

async function getAllPublications(req: NextRequest) {
  const urlSearchParams = new URLSearchParams(req.nextUrl.searchParams);
  const API_KEY = urlSearchParams.get("api_key");

  if (API_KEY !== process.env.API_KEY) {
    return NextResponse.json(new Error("Unauthorized"), { status: 401 });
  }

  const publications = await prisma.m_publicaciones.findMany({
    include: {
      lotes: true,
    },
  });
  return NextResponse.json(publications, { status: 200 });
}

export { getAllPublications as GET };
