import bcrypt from 'bcrypt';
import { signToken } from '@/lib/jwt';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function loginUser(req: NextRequest) {
  const urlSearchParams = new URLSearchParams(req.nextUrl.searchParams);
  const api_key = urlSearchParams.get('api_key');

  if (api_key !== process.env.API_KEY) {
    return NextResponse.json(
      {
        message:
          'You are not authorized to access this route. Please provide a valid API key.',
      },
      { status: 401 }
    );
  }

  const { email, password } = (await req.json()) as {
    email: string;
    password: string;
  };

  const user = await prisma.m_user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({
      message: 'Correo o contraseña no válidos - Email',
    });
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return NextResponse.json({
      message: 'Correo o contraseña no válidos - Password',
    });
  }

  const { id, id_rol } = user;

  const token = signToken(id, email);

  return NextResponse.json({
    token,
    user: {
      email,
      role: id_rol.toString(),
      name: 'random name',
    },
  });
}

export { loginUser as GET, loginUser as POST };
