import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Estado } from '@/interfaces';
import { render } from '@react-email/render';
import { NegocioActivationEmail } from '@/components';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

import { sendEmail } from '@/utils/sendEmail';

export const dynamic = 'force-dynamic';

async function getNegocioByIDAdmin(
  request: Request,
  { params }: { params: { id: string } },
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
  if (!params.id)
    return NextResponse.json(
      { message: 'Falta id del negocio' },
      { status: 400 }
    );

  const negocio = await prisma.m_negocio.findFirst({
    where: {
      id_negocio: parseInt(params.id, 10),
    },
    include: {
      dueneg: {
        include: {
          user: true,
        },
      },
      inventario: {
        include: {
          lote: {
            include: {
              producto: true,
            },
          },
        },
      },
    },
  });
  return NextResponse.json(negocio, { status: 200 });
}

interface Data {
  nombre_negocio: string;
  direccion_negocio: string;
  calle: string;
  colonia: string;
  alcaldia: string;
  cp: string;
  telefono_negocio: string;
  email_negocio?: string;
  descripcion_negocio?: string;
  estado_negocio: Estado;
}

async function updateNegocioData(
  request: Request,
  { params }: { params: { id: string } },
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
    calle,
    colonia,
    alcaldia,
    cp,
    telefono_negocio,
    email_negocio,
    descripcion_negocio,
    estado_negocio,
  } = (await request.json()) as Data;
  const dir_negocio = calle.concat(', ', colonia, ', ', alcaldia, ', ', cp);

  const updatedNegocio = await prisma.m_negocio.update({
    where: {
      id_negocio: parseInt(params.id, 10),
    },
    data: {
      nombre_negocio,
      direccion_negocio: dir_negocio,
      telefono_negocio,
      email_negocio,
      descripcion_negocio,
      estado_negocio,
    },
  });

  const user = await prisma.m_user.findFirst({
    where: {
      duenonegocio: {
        negocio: {
          id_negocio: parseInt(params.id, 10),
        },
      },
    },
  });

  const emailHtml = render(
    NegocioActivationEmail({
      email: user?.email,
      status: estado_negocio,
    }) as React.ReactElement
  );

  await sendEmail(
    user?.email as string,
    'Estado de tu negocio en Harvest Reborn',
    emailHtml
  );

  return NextResponse.json(updatedNegocio, { status: 200 });
}

export { getNegocioByIDAdmin as GET, updateNegocioData as PUT };
