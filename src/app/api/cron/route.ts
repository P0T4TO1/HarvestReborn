import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import sgMail from "@sendgrid/mail";
import { render } from "@react-email/render";
import { today, getLocalTimeZone } from "@internationalized/date";
import { VencimientoNotificationEmail } from "@/components";
import { ILote } from "@/interfaces";

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? "");

export async function GET(req: NextRequest) {
  try {
    const lotes = await prisma.m_lote.findMany({
      include: {
        inventario: {
          select: {
            negocio: {
              select: {
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
        },
        producto: true,
      },
    });

    const lotesVencidos = lotes.filter((lote) => {
      return (
        new Date(lote.fecha_vencimiento) <
        today(getLocalTimeZone()).toDate(getLocalTimeZone())
      );
    });

    await prisma.m_lote.updateMany({
      where: {
        id_lote: {
          in: lotesVencidos.map((lote) => lote.id_lote),
        },
      },
      data: {
        estado_lote: "VENCIDO",
      },
    });

    const lotesParaAvisar = lotes.filter((lote) => {
      const fechaVencimiento = new Date(lote.fecha_vencimiento);
      const fechaHoy = today(getLocalTimeZone()).toDate(getLocalTimeZone());
      const diferencia = fechaVencimiento.getTime() - fechaHoy.getTime();
      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

      return dias <= lote.dias_aviso;
    });

    const emailsHTML = lotesParaAvisar.map((lote) => {
      return render(
        VencimientoNotificationEmail({
          email_negocio: lote.inventario.negocio.dueneg.user.email,
          lote: lote as unknown as ILote,
        })
      );
    });

    const msgs = lotesParaAvisar.map((lote, index) => {
      return {
        to: lote.inventario.negocio.dueneg.user.email,
        from: "Harvest Reborn<harvestreborn@gmail.com>",
        subject: "Aviso de vencimiento de lote",
        html: emailsHTML[index],
      };
    });

    try {
      await sgMail.send(msgs);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          error: true,
          message: "Error al enviar correos",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(lotesParaAvisar, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: true,
        message: "Error general del metodo GET",
      },
      { status: 500 }
    );
  }
}
