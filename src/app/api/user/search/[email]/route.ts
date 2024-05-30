import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function searchUserByEmail(
  request: Request,
  { params }: { params: { email: string } },
) {
  const url = new URL(request.url);
  const urlSearchParams = new URLSearchParams(url.searchParams);
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
  try {
    if (!params.email) {
      return NextResponse.json(
        {
          error: 'Internal Server Error',
          message: 'No se ha enviado el correo',
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
          error: 'Internal Server Error',
          message: 'Este correo ya esta registrado',
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { user, message: 'No existe el usuario' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'Error al buscar el usuario',
      },
      { status: 500 }
    );
  }
}

export { searchUserByEmail as GET };
