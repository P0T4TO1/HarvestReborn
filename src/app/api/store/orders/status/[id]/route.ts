import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { EstadoOrden } from "@prisma/client";

import sgMail from "@sendgrid/mail";
import { render } from "@react-email/render";
import { OrderStatusEmail } from "@/components";

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? "");

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

    const msg = {
      to: email,
      from: "Harvest Reborn<harvestreborn@gmail.com>",
      subject: "Estado de tu orden",
      html: emailHtml,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Error al enviar correo de notificación" },
        { status: 500 }
      );
    }

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
