import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function deleteUser(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  if (!params.id)
    return NextResponse.json(
      { message: "Falta id del usuario" },
      { status: 400 }
    );

  try {
    const user = await prisma.m_user.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error al eliminar el usuario" },
      { status: 500 }
    );
  }
}

interface Data {
  email: string;
  nombre: string;
  apellidos: string;
  fecha_nacimiento: string;
  dia_nacimiento: string;
  mes_nacimiento: string;
  year_nacimiento: string;
  tipo: string;
  nombre_negocio: string;
  telefono: string;
  calle: string;
  colonia: string;
  alcaldia: string;
  cp: string;
}

async function updateUser(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  const {
    email,
    nombre,
    apellidos,
    fecha_nacimiento,
    dia_nacimiento,
    mes_nacimiento,
    year_nacimiento,
    tipo,
    nombre_negocio,
    telefono,
    calle,
    colonia,
    alcaldia,
    cp,
  } = (await new Response(request.body).json()) as Data;

  if (!params.id)
    return NextResponse.json(
      { message: "Falta id del usuario" },
      { status: 400 }
    );

  try {
    if (tipo === "negocio") {
      const user = await prisma.m_user.update({
        where: {
          id: params.id,
        },
        data: {
          email,
          id_rol: 2,
          duenonegocio: {
            update: {
              nombre_dueneg: nombre,
              apellidos_dueneg: apellidos,
              fecha_nacimiento:
                new Date(
                  `${year_nacimiento}-${mes_nacimiento}-${dia_nacimiento}`
                ) ?? new Date(fecha_nacimiento),
              negocio: {
                update: {
                  nombre_negocio,
                  telefono_negocio: telefono,
                  direccion_negocio:
                    calle.concat(", ", colonia, ", ", alcaldia, ", ", cp) || "",
                },
              },
            },
          },
        },
      });
      return NextResponse.json(user, { status: 200 });
    } else if (tipo === "cliente") {
      const user = await prisma.m_user.update({
        where: {
          id: params.id,
        },
        data: {
          email,
          id_rol: 3,
          cliente: {
            update: {
              nombre_cliente: nombre,
              apellidos_cliente: apellidos,
              fecha_nacimiento: new Date(
                `${year_nacimiento}-${mes_nacimiento}-${dia_nacimiento}` ??
                  new Date(fecha_nacimiento)
              ),
            },
          },
        },
      });
      return NextResponse.json(user, { status: 200 });
    } else if (tipo === "admin") {
      const user = await prisma.m_user.update({
        where: {
          id: params.id,
        },
        data: {
          email,
          id_rol: 1,
        },
      });
      return NextResponse.json(user, { status: 200 });
    } else if (tipo === "soporte") {
      const user = await prisma.m_user.update({
        where: {
          id: params.id,
        },
        data: {
          email,
          id_rol: 5,
        },
      });
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Tipo de usuario no válido" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error al actualizar el usuario" },
      { status: 500 }
    );
  }
}

async function getUser(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  if (!params.id)
    return NextResponse.json(
      { message: "Falta id del usuario" },
      { status: 400 }
    );

  try {
    const user = await prisma.m_user.findUnique({
      where: {
        id: params.id,
      },
      include: {
        duenonegocio: {
          include: {
            negocio: true,
          },
        },
        cliente: true,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error al obtener el usuario" },
      { status: 500 }
    );
  }
}

export { deleteUser as DELETE, updateUser as PUT, getUser as GET };
