import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function getProfile(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  if (!params.id)
    return NextResponse.json(
      { message: "Falta Id del usuario" },
      { status: 400 }
    );

  const profile = await prisma.m_user.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!profile)
    return NextResponse.json(
      { message: "No existe usuario por ese id" },
      { status: 400 }
    );

  if (profile?.id_rol === 2) {
    const duenonegocio = await prisma.d_duenonegocio.findFirst({
      where: {
        id_user: profile.id,
      },
      include: {
        negocio: true,
      },
    });
    return NextResponse.json({ ...profile, duenonegocio }, { status: 200 });
  } else if (profile?.id_rol === 3) {
    const cliente = await prisma.d_cliente.findFirst({
      where: {
        id_user: profile.id,
      },
    });
    return NextResponse.json({ ...profile, cliente }, { status: 200 });
  }

  return NextResponse.json({ ...profile }, { status: 200 });
}

interface ProfileData {
  id_dueneg?: number;
  id_cliente?: number;
  dueneg?: {
    nombre_dueneg: string;
    apellidos_dueneg: string;
    dia_nacimiento: string;
    mes_nacimiento: string;
    year_nacimiento: string;
    fecha_nacimiento: string;
    negocio: {
      nombre_negocio: string;
      direccion_negocio: string;
      calle: string;
      colonia: string;
      alcaldia: string;
      cp: string;
      telefono_negocio: string;
      email_negocio?: string;
    };
  };

  cliente?: {
    nombre_cliente: string;
    apellidos_cliente: string;
    telefono_cliente: string;
    dia_nacimiento: string;
    mes_nacimiento: string;
    year_nacimiento: string;
    fecha_nacimiento: string;
    nombre_negocio?: string;
    direccion_negocio?: string;
    calle?: string;
    colonia?: string;
    alcaldia?: string;
    cp?: string;
  };
  fecha_nacimiento_d: string;
  fecha_nacimiento_c: string;
}

async function updateProfile(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  const data: ProfileData = await new Response(request.body).json();
  console.log(data, params.id);

  if (!params.id)
    return NextResponse.json(
      { message: "Falta Id del usuario" },
      { status: 400 }
    );

  try {
    if (data.dueneg) {
      await prisma.m_user.update({
        where: {
          id: params.id,
        },
        data: {
          duenonegocio: {
            update: {
              where: {
                id_dueneg: data.id_dueneg,
              },
              data: {
                nombre_dueneg: data.dueneg.nombre_dueneg,
                apellidos_dueneg: data.dueneg.apellidos_dueneg,
                fecha_nacimiento: new Date(data.fecha_nacimiento_d),
                negocio: {
                  update: {
                    nombre_negocio: data.dueneg.negocio.nombre_negocio,
                    telefono_negocio: data.dueneg.negocio.telefono_negocio,
                    direccion_negocio: data.dueneg.negocio.direccion_negocio,
                    email_negocio: data.dueneg.negocio.email_negocio || "",
                  },
                },
              },
            },
          },
        },
      });
      return NextResponse.json(
        { message: "Usuario dueño de negocio actualizado correctamente" },
        { status: 200 }
      );
    } else if (data.cliente) {
      await prisma.m_user.update({
        where: {
          id: params.id,
        },
        data: {
          cliente: {
            update: {
              where: {
                id_cliente: data.id_cliente,
              },
              data: {
                nombre_cliente: data.cliente.nombre_cliente,
                apellidos_cliente: data.cliente.apellidos_cliente,
                telefono_cliente: data.cliente.telefono_cliente,
                fecha_nacimiento: new Date(data.fecha_nacimiento_c),
              },
            },
          },
        },
      });
      return NextResponse.json(
        { message: "Usuario cliente actualizado correctamente" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error al actualizar usuario" },
      { status: 400 }
    );
  }
}

export { getProfile as GET, updateProfile as PUT };
