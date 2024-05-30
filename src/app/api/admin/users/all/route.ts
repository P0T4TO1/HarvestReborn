import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export const dynamic = 'force-dynamic';

async function getAllUsers(req: NextRequest) {
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
  const users = await prisma.m_user.findMany({
    include: {
      duenonegocio: true,
      cliente: true,
    },
  });

  return NextResponse.json(users, { status: 200 });
}

export { getAllUsers as GET };
