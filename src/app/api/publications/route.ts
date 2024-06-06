import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

async function getAllPublications(req: NextRequest) {
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
  const urlSearchParams = new URLSearchParams(req.nextUrl.searchParams);
  const API_KEY = urlSearchParams.get('api_key');

  if (API_KEY !== process.env.API_KEY) {
    return NextResponse.json(
      {
        message:
          'You are not authorized to access this route. Please provide a valid API key.',
      },
      { status: 401 }
    );
  }

  const publications = await prisma.m_publicaciones.findMany({
    include: {
      lotes: {
        include: {
          producto: true,
        },
      },
      negocio: {
        include: {
          dueneg: {
            select: {
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return NextResponse.json(publications, { status: 200 });
}

export { getAllPublications as GET };
