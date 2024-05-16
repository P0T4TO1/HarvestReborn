import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function getAllClientes(req: NextRequest, res: NextResponse) {
  const clientes = await prisma.d_cliente.findMany();
  return NextResponse.json(clientes, { status: 200 });
}

export { getAllClientes as GET };
