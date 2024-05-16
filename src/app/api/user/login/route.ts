import bcrypt from "bcrypt";
import { signToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

async function loginUser(req: NextRequest, res: NextResponse) {
  const { email = "", password = "" } = await new Response(req.body).json();

  const user = await prisma.m_user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({
      message: "Correo o contraseña no válidos - Email",
    });
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return NextResponse.json({
      message: "Correo o contraseña no válidos - Password",
    });
  }

  const { id, id_rol } = user;

  const token = signToken(id, email);

  return NextResponse.json({
    token,
    user: {
      email,
      role: id_rol.toString(),
      name: "random name",
    },
  });
}

export { loginUser as GET, loginUser as POST };
