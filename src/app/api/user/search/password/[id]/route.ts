import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

async function searchPassword(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  const { password } = (await new Response(req.body).json()) as {
    password: string;
  };
  try {
    if (!params.id) {
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
        id: params.id,
      },
    });
    if (!user) {
      return NextResponse.json({
        message: "Correo o contraseña no válidos - Email",
      });
    }

    const match = await bcrypt.compare(password, user.password!);
    if (match) {
      return NextResponse.json({ user, message: "Contraseña correcta" });
    }

    return NextResponse.json({
      message: "Contraseña incorrecta",
    });
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
