import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

async function changePassword(req: NextRequest, res: NextResponse) {
  const { resetToken, password } = (await new Response(req.body).json()) as {
    resetToken: string;
    password: string;
  };

  const user = await prisma.m_user.findFirst({
    where: {
      resetPasswordToken: resetToken,
    },
  });
  if (!user) {
    return NextResponse.json(
      {
        message: "Token inválido",
      },
      { status: 400 }
    );
  }
  const resetPasswordTokenExpiry = user.resetPasswordExpires;
  if (!resetPasswordTokenExpiry) {
    return NextResponse.json(
      {
        message: "Token expirado",
      },
      { status: 400 }
    );
  }
  const now = new Date();
  if (now > resetPasswordTokenExpiry) {
    return NextResponse.json(
      {
        message: "Token expirado",
      },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.m_user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
  });
  return NextResponse.json(
    {
      message: "Contraseña actualizada",
    },
    { status: 200 }
  );
}

export { changePassword as POST };