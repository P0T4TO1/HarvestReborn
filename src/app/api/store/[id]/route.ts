import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

async function getNegocioById(
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

  if (!params.id)
    return NextResponse.json(
      { message: 'Falta id del negocio' },
      { status: 400 }
    );

  const negocio = await prisma.m_negocio.findFirst({
    where: {
      id_negocio: parseInt(params.id.toString()),
    },
    include: {
      inventario: {
        include: {
          lote: {
            include: {
              producto: true,
            },
            distinct: ['id_producto'],
          },
        },
      },
      dueneg: {
        include: {
          user: true,
        },
      },
    },
  });
  return NextResponse.json(negocio, { status: 200 });
}

interface Data {
  nombre_negocio: string;
  telefono_negocio: string;
  email_negocio: string;
  direccion_negocio: string;
  calle: string;
  colonia: string;
  alcaldia: string;
  cp: string;
  images_urls?: string[];
  descripcion_negocio?: string;
}

async function updateNegocioById(
  request: Request,
  { params }: { params: { id: string } }
) {
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

  const {
    nombre_negocio,
    telefono_negocio,
    email_negocio,
    direccion_negocio,
    calle,
    colonia,
    alcaldia,
    cp,
    descripcion_negocio,
    images_urls,
  } = (await request.json()) as Data;
  const newDireccion = `${calle}, ${colonia}, ${alcaldia}, ${cp}`;
  if (!params.id)
    return NextResponse.json(
      { message: 'Falta id del negocio' },
      { status: 400 }
    );

  try {
    const negocio = await prisma.m_negocio.update({
      where: {
        id_negocio: parseInt(params.id.toString()),
      },
      data: {
        nombre_negocio: nombre_negocio,
        telefono_negocio: telefono_negocio,
        direccion_negocio:
          newDireccion === 'undefined, undefined, undefined, undefined'
            ? direccion_negocio
            : newDireccion,
        email_negocio: email_negocio,
        descripcion_negocio: descripcion_negocio,
        images_negocio: images_urls ?? [],
      },
    });
    return NextResponse.json(negocio, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error al actualizar el negocio' },
      { status: 500 }
    );
  }
}

export { getNegocioById as GET, updateNegocioById as PUT };
