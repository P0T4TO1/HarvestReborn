import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";

export const dynamic = "force-dynamic";

async function getAllUsers(req: NextRequest, res: NextResponse) {
  const users = await prisma.m_user.findMany({
    include: {
      duenonegocio: true,
      cliente: true,
    },
  });

  return NextResponse.json(users, { status: 200 });
}

async function addUser(req: NextRequest, res: NextResponse) {
  const {
    email,
    password,
    nombre,
    apellidos,
    fecha_nacimiento,
    tipo,
    nombre_negocio,
    telefono,
    calle,
    colonia,
    alcaldia,
    cp,
  } = (await new Response(req.body).json()) as {
    email: string;
    password: string;
    nombre: string;
    apellidos: string;
    fecha_nacimiento: string;
    tipo: string;
    nombre_negocio: string;
    telefono: string;
    calle: string;
    colonia: string;
    alcaldia: string;
    cp: string;
  };

  try {
    if (tipo === "negocio") {
      const newUser = await prisma.m_user.create({
        data: {
          email,
          password: await hash(password, 10),
          id_rol: 2,
          duenonegocio: {
            create: {
              nombre_dueneg: nombre,
              apellidos_dueneg: apellidos,
              fecha_nacimiento: new Date(fecha_nacimiento),
              negocio: {
                create: {
                  nombre_negocio,
                  telefono_negocio: telefono,
                  direccion_negocio:
                    calle.concat(", ", colonia, ", ", alcaldia, ", ", cp) || "",
                  inventario: {
                    create: {},
                  },
                },
              },
            },
          },
        },
      });
      return NextResponse.json(newUser, { status: 201 });
    } else if (tipo === "cliente") {
      const newUser = await prisma.m_user.create({
        data: {
          email,
          password: await hash(password, 10),
          id_rol: 3,
          cliente: {
            create: {
              nombre_cliente: nombre,
              apellidos_cliente: apellidos,
              telefono_cliente: telefono,
              fecha_nacimiento: new Date(fecha_nacimiento),
              nombre_negocio: nombre_negocio || "",
              direccion_negocio:
                calle.concat(", ", colonia, ", ", alcaldia, ", ", cp) || "",
            },
          },
        },
      });
      return NextResponse.json(newUser, { status: 201 });
    } else if (tipo === "admin") {
      const newUser = await prisma.m_user.create({
        data: {
          email,
          password: await hash(password, 10),
          id_rol: 1,
        },
      });
      return NextResponse.json(newUser, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error al crear el usuario" },
      { status: 500 }
    );
  }
}

export { getAllUsers as GET, addUser as POST };
