import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

async function getAllUsers(req: NextRequest, res: NextResponse) {
  const users = await prisma.m_user.findMany({
    include: {
      duenonegocio: true,
      cliente: true,
    },
  });

  return NextResponse.json(users, { status: 200 });
}

export { getAllUsers as GET };
