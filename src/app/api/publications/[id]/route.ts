import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function getPublicationById(
  request: Request,
  { params }: { params: { id: string } }
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

  const { id } = params;
  if (!id) {
    return NextResponse.json(
      { message: 'Falta id de la publicación' },
      { status: 400 }
    );
  }

  const publication = await prisma.m_publicaciones.findUnique({
    where: {
      id_publicacion: parseInt(id),
    },
    include: {
      lotes: true,
      negocio: {
        include: {
          dueneg: {
            select: {
              id_user: true,
            },
          },
        },
      },
    },
  });

  if (!publication) {
    return NextResponse.json(
      { message: 'No se encontró la publicación' },
      { status: 404 }
    );
  }

  return NextResponse.json(publication, { status: 200 });
}

export { getPublicationById as GET };
