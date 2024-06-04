import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Estado } from '@/interfaces';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { headers } from 'next/headers';

async function deactivateAccount(
  request: Request,
  { params }: { params: { id: string } }
) {
  const headersList = headers();
  const referer = headersList.get('authorization');
  const mobileToken = referer?.split(' ')[1];

  if (mobileToken && mobileToken !== 'undefined') {
    if (!params.id) {
      return NextResponse.json(
        {
          error: 'Internal Server Error',
          message: 'No se ha enviado el correo',
        },
        { status: 200 }
      );
    }

    const user = await prisma.m_user.update({
      where: {
        id: params.id,
      },
      data: {
        estado: 'INACTIVO',
      },
    });

    return NextResponse.json(
      { user, message: 'Cuenta desactivada' },
      { status: 200 }
    );
  }

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
  const { estado } = (await request.json()) as {
    estado: string;
  };

  try {
    if (!params.id) {
      return NextResponse.json(
        {
          error: 'Internal Server Error',
          message: 'No se ha enviado el correo',
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
      { user, message: 'Cuenta desactivada' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'Error al desactivar la cuenta',
      },
      { status: 500 }
    );
  }
}

export { deactivateAccount as PUT };
