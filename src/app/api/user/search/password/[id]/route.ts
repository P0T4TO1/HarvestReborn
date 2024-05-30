import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

async function searchPassword(
  request: Request,
  { params }: { params: { id: string } },
) {
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
  const { password } = (await request.json()) as {
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
      return NextResponse.json({ user, message: "Contraseña correcta" }, { status: 200 });
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

export { searchPassword as POST };
