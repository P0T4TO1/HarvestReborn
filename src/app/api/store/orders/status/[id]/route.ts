import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { EstadoOrden } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

import { render } from '@react-email/render';
import { OrderStatusEmail } from '@/components';
import { headers } from 'next/headers';
import { isValidToken } from '@/lib/jwt';

import { sendEmail } from '@/utils/sendEmail';

async function changeEstadoOrder(
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

    if (!params.id)
      return NextResponse.json(
        { message: 'Falta id de la orden' },
        { status: 400 }
      );
    const { id } = params;
    const body = (await request.json()) as { estado: EstadoOrden };
    const { estado } = body;

    try {
      const orderBefore = await prisma.d_orden.findUnique({
        where: {
          id_orden: id,
        },
      });

      const order = await prisma.d_orden.update({
        where: {
          id_orden: id,
        },
        data: {
          estado_orden: estado,
        },
        include: {
          cliente: {
            select: {
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
          negocio: {
            select: {
              nombre_negocio: true,
            },
          },
          productoOrden: {
            include: {
              lote: true,
            },
          },
        },
      });

      if (!orderBefore) {
        return NextResponse.json(
          { message: 'Error al cambiar estado de la orden' },
          { status: 400 }
        );
      }

      if (
        orderBefore.estado_orden === EstadoOrden.FINALIZADO &&
        order.estado_orden !== EstadoOrden.FINALIZADO
      ) {
        const { productoOrden } = order;
        for (const product of productoOrden) {
          const { id_lote, last_cantidad, last_precio_kg, last_monto_total } =
            product.lote;
          if (!last_cantidad || !last_precio_kg || !last_monto_total) {
            return NextResponse.json(
              {
                message: 'Error al cambiar estado de la orden',
              },
              { status: 400 }
            );
          }
          await prisma.m_lote.update({
            where: {
              id_lote,
            },
            data: {
              last_cantidad: last_cantidad + product.cantidad_orden,
              last_monto_total:
                last_monto_total + last_precio_kg * product.cantidad_orden,
            },
          });
        }
      }

      if (order.estado_orden === EstadoOrden.FINALIZADO) {
        const { productoOrden } = order;
        for (const product of productoOrden) {
          const { id_lote, last_cantidad, last_precio_kg, last_monto_total } =
            product.lote;
          if (!last_cantidad || last_cantidad < product.cantidad_orden) {
            return NextResponse.json(
              {
                message: 'No hay suficiente cantidad en el lote',
              },
              { status: 400 }
            );
          }
          if (!last_precio_kg || !last_monto_total) {
            return NextResponse.json(
              {
                message: 'Error al cambiar estado de la orden',
              },
              { status: 400 }
            );
          }
          await prisma.m_lote.update({
            where: {
              id_lote,
            },
            data: {
              last_cantidad: last_cantidad - product.cantidad_orden,
              last_monto_total:
                last_monto_total - last_precio_kg * product.cantidad_orden,
            },
          });
        }
      }

      const { email } = order.cliente.user;
      const { nombre_negocio } = order.negocio;

      const emailHtml = render(
        OrderStatusEmail({
          id_orden: id,
          email_cliente: email,
          nombre_negocio,
          fecha_orden: order.fecha_orden,
          estado_orden: estado,
        })
      );

      await sendEmail(email, 'Estado de tu orden', emailHtml);

      return NextResponse.json(order, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: 'Error al cambiar estado de la orden' },
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
  if (!params.id)
    return NextResponse.json(
      { message: 'Falta id de la orden' },
      { status: 400 }
    );
  const { id } = params;
  const body = (await request.json()) as { estado: EstadoOrden };
  const { estado } = body;

  try {
    const orderBefore = await prisma.d_orden.findUnique({
      where: {
        id_orden: id,
      },
    });

    const order = await prisma.d_orden.update({
      where: {
        id_orden: id,
      },
      data: {
        estado_orden: estado,
      },
      include: {
        cliente: {
          select: {
            user: {
              select: {
                email: true,
              },
            },
          },
        },
        negocio: {
          select: {
            nombre_negocio: true,
          },
        },
        productoOrden: {
          include: {
            lote: true,
          },
        },
      },
    });

    if (!orderBefore) {
      return NextResponse.json(
        { message: 'Error al cambiar estado de la orden' },
        { status: 400 }
      );
    }

    if (
      orderBefore.estado_orden === EstadoOrden.FINALIZADO &&
      order.estado_orden !== EstadoOrden.FINALIZADO
    ) {
      const { productoOrden } = order;
      for (const product of productoOrden) {
        const { id_lote, last_cantidad, last_precio_kg, last_monto_total } =
          product.lote;
        if (!last_cantidad || !last_precio_kg || !last_monto_total) {
          return NextResponse.json(
            {
              message: 'Error al cambiar estado de la orden',
            },
            { status: 400 }
          );
        }
        await prisma.m_lote.update({
          where: {
            id_lote,
          },
          data: {
            last_cantidad: last_cantidad + product.cantidad_orden,
            last_monto_total:
              last_monto_total + last_precio_kg * product.cantidad_orden,
          },
        });
      }
    }

    if (order.estado_orden === EstadoOrden.FINALIZADO) {
      const { productoOrden } = order;
      for (const product of productoOrden) {
        const { id_lote, last_cantidad, last_precio_kg, last_monto_total } =
          product.lote;
        if (!last_cantidad || last_cantidad < product.cantidad_orden) {
          return NextResponse.json(
            {
              message: 'No hay suficiente cantidad en el lote',
            },
            { status: 400 }
          );
        }
        if (!last_precio_kg || !last_monto_total) {
          return NextResponse.json(
            {
              message: 'Error al cambiar estado de la orden',
            },
            { status: 400 }
          );
        }
        await prisma.m_lote.update({
          where: {
            id_lote,
          },
          data: {
            last_cantidad: last_cantidad - product.cantidad_orden,
            last_monto_total:
              last_monto_total - last_precio_kg * product.cantidad_orden,
          },
        });
      }
    }

    const { email } = order.cliente.user;
    const { nombre_negocio } = order.negocio;

    const emailHtml = render(
      OrderStatusEmail({
        id_orden: id,
        email_cliente: email,
        nombre_negocio,
        fecha_orden: order.fecha_orden,
        estado_orden: estado,
      })
    );

    await sendEmail(email, 'Estado de tu orden', emailHtml);

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error al cambiar estado de la orden' },
      { status: 500 }
    );
  }
}

export { changeEstadoOrder as PUT };
