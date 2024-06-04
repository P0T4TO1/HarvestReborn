import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { headers } from 'next/headers';

async function getAccountData(
  request: Request,
  { params }: { params: { id: string } }
) {
  const headersList = headers();
  const referer = headersList.get('authorization');
  const mobileToken = referer?.split(' ')[1];

  if (mobileToken && mobileToken !== 'undefined') {
    if (!params.id)
      return NextResponse.json(
        { message: 'Falta Id del usuario' },
        { status: 400 }
      );

    const account = await prisma.m_user.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!account)
      return NextResponse.json(
        { message: 'No existe usuario por ese id' },
        { status: 400 }
      );
    return NextResponse.json({ ...account }, { status: 200 });
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
  if (!params.id)
    return NextResponse.json(
      { message: 'Falta Id del usuario' },
      { status: 400 }
    );

  const account = await prisma.m_user.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!account)
    return NextResponse.json(
      { message: 'No existe usuario por ese id' },
      { status: 400 }
    );
  return NextResponse.json({ ...account }, { status: 200 });
}

async function updateAccountData(
  request: Request,
  { params }: { params: { id: string } }
) {
  const headersList = headers();
  const referer = headersList.get('authorization');
  const mobileToken = referer?.split(' ')[1];

  if (mobileToken && mobileToken !== 'undefined') {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    if (!params.id)
      return NextResponse.json(
        { message: 'Falta Id del usuario' },
        { status: 400 }
      );

    const account = await prisma.m_user.update({
      where: {
        id: params.id,
      },
      data: {
        email,
        password: await hash(password, 10),
      },
    });

    return NextResponse.json({ ...account }, { status: 200 });
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
  const { email, password } = (await request.json()) as {
    email: string;
    password: string;
  };

  if (!params.id)
    return NextResponse.json(
      { message: 'Falta Id del usuario' },
      { status: 400 }
    );

  const account = await prisma.m_user.update({
    where: {
      id: params.id,
    },
    data: {
      email,
      password: await hash(password, 10),
    },
  });

  return NextResponse.json({ ...account }, { status: 200 });
}

export { getAccountData as GET, updateAccountData as PUT };
