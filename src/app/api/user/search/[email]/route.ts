import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

async function searchUserByEmail(
  request: Request,
  { params }: { params: { email: string } },
  req: NextRequest,
  res: NextResponse
) {
  try {
    if (!params.email) {
      return NextResponse.json(
        {
          error: "Internal Server Error",
          message: "No se ha enviado el correo",
        },
        { status: 200 }
      );
    }

    const user = await prisma.m_user.findUnique({
      where: {
        email: params.email,
      },
    });

    if (user) {
      return NextResponse.json(
        {
          error: "Internal Server Error",
          message: "Este correo ya esta registrado",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { user, message: "No existe el usuario" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Error al buscar el usuario",
      },
      { status: 500 }
    );
  }
}

export { searchUserByEmail as GET };
