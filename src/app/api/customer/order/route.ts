import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { BagType, Estado, IOrden } from "@/interfaces";
import sgMail from "@sendgrid/mail";
import { render } from "@react-email/render";
import { OrderNotificationEmail } from "@/components";
import { generateOrderId } from "@/utils/orderid";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

interface Data {
  fecha_orden: string;
  hora_orden: string;
  monto_total: number;
  id_cliente: number;
  id_historial: number;
  bag: BagType;
}

async function createOrder(req: NextRequest, res: NextResponse) {
  const data = (await req.json()) as Data;
  const {
    fecha_orden,
    hora_orden,
    monto_total,
    id_cliente,
    id_historial,
    bag,
  } = data;

  try {
    const orders = () => {
      const promise = data.bag.map(async (item) => {
        const order = (await prisma.d_orden.create({
          data: {
            id_orden: generateOrderId() || "",
            fecha_orden: new Date(fecha_orden),
            hora_orden: new Date(hora_orden),
            monto_total: item.total,
            estado_orden: Estado.Pendiente,
            id_cliente: id_cliente,
            id_historial: id_historial,
            id_negocio: item.id_negocio,
            productoOrden: {
              createMany: {
                data: item.productos.map((product) => {
                  if (!product.lote) {
                    throw new Error("No se ha seleccionado un lote");
                  }
                  return {
                    id_producto: product.id_producto,
                    cantidad_orden: product.cantidad_orden,
                    monto: product.monto,
                    id_lote: product.lote.id_lote,
                  };
                }),
              },
            },
          },
          include: {
            cliente: {
              select: {
                id_user: true,
                nombre_cliente: true,
              },
            },
            negocio: {
              select: {
                dueneg: {
                  select: {
                    id_user: true,
                  },
                },
                nombre_negocio: true,
              },
            },
          },
        })) as unknown as IOrden;
        return order;
      });
      return promise;
    };

    const ordersPromised = await Promise.all(orders());

    const emailCliente = await prisma.d_cliente.findFirst({
      where: {
        id_cliente: id_cliente,
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!emailCliente) {
      return NextResponse.json(
        {
          error: true,
          message: "No se encontró el cliente",
        },
        { status: 404 }
      );
    }

    const emailsPromise = bag.map(async (item) => {
      const negocio = await prisma.m_negocio.findFirst({
        where: {
          id_negocio: item.id_negocio,
        },
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
      });

      if (!negocio) {
        throw new Error("Negocio no encontrado");
      }
      return negocio.email_negocio || negocio.dueneg.user.email;
    });

    const emails = await Promise.all(emailsPromise);

    if (!emails) {
      return NextResponse.json(
        {
          error: true,
          message: "No se encontraron los correos de los negocios",
        },
        { status: 404 }
      );
    }

    const emailsHTML = emails.map((email) => {
      return render(
        OrderNotificationEmail({
          email_cliente: emailCliente.user.email,
          email_negocio: email,
          fecha_orden: fecha_orden,
          hora_orden: hora_orden,
          monto_total: monto_total,
        })
      );
    });

    const msgs = emails.map((email, index) => {
      return {
        to: email,
        from: "Harvest Reborn<harvestreborn@gmail.com>",
        subject: "Nueva orden en Harvest Reborn",
        html: emailsHTML[index],
      };
    });

    try {
      await sgMail.send(msgs);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Error al enviar correos" },
        { status: 400 }
      );
    }


    return NextResponse.json(
      {
        orders: ordersPromised,
        message: "Orden creada con éxito",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: true,
        message: "Error al crear la order",
      },
      { status: 500 }
    );
  }
}

export { createOrder as POST };
