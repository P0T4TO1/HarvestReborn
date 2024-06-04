import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { DisponibilidadPublicacion } from '@/interfaces';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { headers } from 'next/headers';
import { isValidToken } from '@/lib/jwt';

interface Data {
  id_negocio: number;
  titulo_publicacion: string;
  descripcion_publicacion: string;
  price?: number;
  disponibilidad: string;
  images_publicacion: string[];
  images_urls: string[];
  lotes: number[];
}

async function createPost(req: NextRequest) {
  const headersList = headers();
  const referer = headersList.get('authorization');
  const mobileToken = referer?.split(' ')[1];

  if (mobileToken && mobileToken !== 'undefined') {
    const session = await isValidToken(mobileToken);

    if (session === 'JWT no es válido' || !session) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'Invalid session token',
        },
        { status: 401 }
      );
    }

    const body = (await req.json()) as Data;
    const {
      id_negocio,
      titulo_publicacion,
      descripcion_publicacion,
      price,
      disponibilidad,
      images_urls,
      lotes,
    } = body;

    try {
      const post = await prisma.m_publicaciones.create({
        data: {
          id_negocio: Number(id_negocio),
          titulo_publicacion,
          descripcion_publicacion,
          precio_publicacion: parseFloat(price?.toFixed(2) ?? '0.00') ?? 0.0,
          disponibilidad: disponibilidad as DisponibilidadPublicacion,
          images_publicacion: images_urls,
          lotes: {
            connect: lotes.map((id) => ({ id_lote: id })),
          },
        },
      });

      return NextResponse.json(post);
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        status: 500,
        body: { message: 'Error al crear la publicación' },
      });
    }
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
  const body = (await req.json()) as Data;
  const {
    id_negocio,
    titulo_publicacion,
    descripcion_publicacion,
    price,
    disponibilidad,
    images_urls,
    lotes,
  } = body;

  try {
    const post = await prisma.m_publicaciones.create({
      data: {
        id_negocio: Number(id_negocio),
        titulo_publicacion,
        descripcion_publicacion,
        precio_publicacion: parseFloat(price?.toFixed(2) ?? '0.00') ?? 0.0,
        disponibilidad: disponibilidad as DisponibilidadPublicacion,
        images_publicacion: images_urls,
        lotes: {
          connect: lotes.map((id) => ({ id_lote: id })),
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      body: { message: 'Error al crear la publicación' },
    });
  }
}

async function getAllPublicationsByStoreId(req: NextRequest) {
  const headersList = headers();
  const referer = headersList.get('authorization');
  const mobileToken = referer?.split(' ')[1];

  if (mobileToken && mobileToken !== 'undefined') {
    const session = await isValidToken(mobileToken);

    if (session === 'JWT no es válido' || !session) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'Invalid session token',
        },
        { status: 401 }
      );
    }

    const urlSearchParams = new URLSearchParams(req.nextUrl.searchParams);
    const id_negocio = urlSearchParams.get('id_negocio');

    if (!id_negocio) {
      return NextResponse.json(
        { message: 'Falta id del negocio' },
        { status: 400 }
      );
    }

    try {
      const publicaciones = await prisma.m_publicaciones.findMany({
        where: {
          id_negocio: parseInt(id_negocio),
        },
        include: {
          lotes: true,
        },
      });
      return NextResponse.json(publicaciones, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: 'Error al obtener las publicaciones' },
        { status: 500 }
      );
    }
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
  const urlSearchParams = new URLSearchParams(req.nextUrl.searchParams);
  const id_negocio = urlSearchParams.get('id_negocio');

  if (!id_negocio) {
    return NextResponse.json(
      { message: 'Falta id del negocio' },
      { status: 400 }
    );
  }

  try {
    const publicaciones = await prisma.m_publicaciones.findMany({
      where: {
        id_negocio: parseInt(id_negocio),
      },
      include: {
        lotes: true,
      },
    });
    return NextResponse.json(publicaciones, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error al obtener las publicaciones' },
      { status: 500 }
    );
  }
}

export { createPost as POST, getAllPublicationsByStoreId as GET };
