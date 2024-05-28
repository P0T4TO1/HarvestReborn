import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { EstadoOrden } from "@prisma/client";

import { render } from "@react-email/render";
import { OrderStatusEmail } from "@/components";

import { sendEmail } from "@/utils/sendEmail";

async function changeEstadoOrder(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  if (!params.id)
    return NextResponse.json(
      { message: "Falta id de la orden" },
      { status: 400 }
    );
  const { id } = params;
  const body = (await request.json()) as { estado: EstadoOrden };
  const { estado } = body;

  try {
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
      },
    });

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

    await sendEmail(email, "Estado de tu orden", emailHtml);

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al cambiar estado de la orden" },
      { status: 500 }
    );
  }
}

export { changeEstadoOrder as PUT };
