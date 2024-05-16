import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function getFaqs() {
  const preguntas = await prisma.c_preguntasFrecuentes.findMany({
    include: {
      respuestas: true,
    },
  });
  return NextResponse.json(preguntas, { status: 200 });
}

export { getFaqs as GET };
