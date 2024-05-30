import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export const dynamic = "force-dynamic";

async function getAllNegociosAdmin(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
        message: 'You need to be signed in to view the protected content.',
      },
      { status: 401 }
    );
  }
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
