import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Estado } from "@/interfaces";

async function deactivateAccount(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  const { estado } = (await req.json()) as {
    estado: string;
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

    const user = await prisma.m_user.update({
      where: {
        id: params.id,
      },
      data: {
        estado: estado as Estado,
      },
    });

    return NextResponse.json(
      { user, message: "Cuenta desactivada" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Error al desactivar la cuenta",
      },
      { status: 500 }
    );
  }
}
