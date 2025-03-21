import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { TipoAlmacenaje } from '@/interfaces';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { headers } from 'next/headers';
import { isValidToken } from '@/lib/jwt';

async function getLoteById(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    if (!params.id) {
      return NextResponse.json(
        { message: 'Falta Id del lote' },
        { status: 400 }
      );
    }

    const lote = await prisma.m_lote.findUnique({
      where: {
        id_lote: parseInt(params.id as string, 10),
      },
      include: {
        producto: true,
      },
    });

    return NextResponse.json(lote, { status: 200 });
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
  if (!params.id) {
    return NextResponse.json({ message: 'Falta Id del lote' }, { status: 400 });
  }

  const lote = await prisma.m_lote.findUnique({
    where: {
      id_lote: parseInt(params.id as string, 10),
    },
    include: {
      producto: true,
    },
  });

  return NextResponse.json(lote, { status: 200 });
}

type Data = {
  cantidad_producto: string;
  fecha_entrada: string;
  fecha_vencimiento: string;
  dias_aviso: string;
  precio_kg: string;
  tipo_almacenaje: TipoAlmacenaje;
};

async function updateLote(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const body = await request.json();
    const {
      cantidad_producto,
      fecha_entrada,
      fecha_vencimiento,
      dias_aviso,
      precio_kg,
      tipo_almacenaje,
    } = body as Data;

    try {
      if (!params.id) {
        return NextResponse.json(
          { message: 'Falta Id del lote' },
          { status: 400 }
        );
      }

      const lote = await prisma.m_lote.update({
        where: {
          id_lote: parseInt(params.id, 10),
        },
        data: {
          cantidad_producto: parseInt(cantidad_producto, 10),
          last_cantidad: parseInt(cantidad_producto, 10),
          fecha_entrada: new Date(fecha_entrada).toISOString(),
          fecha_vencimiento: new Date(fecha_vencimiento).toISOString(),
          dias_aviso: parseInt(dias_aviso, 10),
          precio_kg: parseFloat(precio_kg),
          last_precio_kg: parseFloat(precio_kg),
          monto_total: parseFloat(cantidad_producto) * parseFloat(precio_kg),
          last_monto_total:
            parseFloat(cantidad_producto) * parseFloat(precio_kg),
          tipo_almacenaje: tipo_almacenaje,
        },
      });

      return NextResponse.json(lote, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: 'Error al actualizar lote' },
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
  const body = await request.json();
  const {
    cantidad_producto,
    fecha_entrada,
    fecha_vencimiento,
    dias_aviso,
    precio_kg,
    tipo_almacenaje,
  } = body as Data;

  try {
    if (!params.id) {
      return NextResponse.json(
        { message: 'Falta Id del lote' },
        { status: 400 }
      );
    }

    const lote = await prisma.m_lote.update({
      where: {
        id_lote: parseInt(params.id, 10),
      },
      data: {
        cantidad_producto: parseInt(cantidad_producto, 10),
        last_cantidad: parseInt(cantidad_producto, 10),
        fecha_entrada: new Date(fecha_entrada).toISOString(),
        fecha_vencimiento: new Date(fecha_vencimiento).toISOString(),
        dias_aviso: parseInt(dias_aviso, 10),
        precio_kg: parseFloat(precio_kg),
        last_precio_kg: parseFloat(precio_kg),
        monto_total: parseFloat(cantidad_producto) * parseFloat(precio_kg),
        last_monto_total: parseFloat(cantidad_producto) * parseFloat(precio_kg),
        tipo_almacenaje: tipo_almacenaje,
      },
    });

    return NextResponse.json(lote, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error al actualizar lote' },
      { status: 500 }
    );
  }
}

export { getLoteById as GET, updateLote as PUT };
