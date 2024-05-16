import prisma from "@/lib/prisma";
import { seedDatabase } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

async function initialData(req: NextRequest, res: NextResponse) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ message: "Not allowed" }, { status: 405 });
  }
  //
  // await prisma.d_cliente.deleteMany();
  await prisma.m_lote.deleteMany();
  // await prisma.c_inventario.deleteMany();
  // await prisma.m_negocio.deleteMany();
  // await prisma.d_duenonegocio.deleteMany();
  // await prisma.m_user.deleteMany();
  // await prisma.c_rol.deleteMany();
  // await prisma.c_rol.createMany({
  //   data: [
  //     {
  //       id_rol: 1,
  //       nombre_rol: "admin",
  //     },
  //     {
  //       id_rol: 2,
  //       nombre_rol: "negocio",
  //     },
  //     {
  //       id_rol: 3,
  //       nombre_rol: "cliente",
  //     },
  //   ],
  // });

  await prisma.m_producto.deleteMany();
  await prisma.m_producto.createMany({
    data: seedDatabase.initialData.products as [],
  });

  return NextResponse.json({ message: "Database seeded" }, { status: 200 });
}

export { initialData as GET, initialData as POST };
