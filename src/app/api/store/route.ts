import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function getAllNegocios(req: NextRequest, res: NextResponse) {
  const negocios = await prisma.m_negocio.findMany({
    include: {
      inventario: {
        include: {
          lote: {
            include: {
              producto: true,
            },
          },
        },
      },
    },
  });
  return NextResponse.json(negocios, { status: 200 });
}

export { getAllNegocios as GET };
