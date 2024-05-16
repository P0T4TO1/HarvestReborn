import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Estado } from "@/interfaces";

export const dynamic = "force-dynamic";

async function getAllNegociosAdmin(req: NextRequest, res: NextResponse) {
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
      dueneg: {
        include: {
          user: true,
        },
      },
    },
  });
  return NextResponse.json(negocios, { status: 200 });
}

export { getAllNegociosAdmin as GET };
