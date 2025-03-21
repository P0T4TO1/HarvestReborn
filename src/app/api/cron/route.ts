import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { render } from '@react-email/render';
import { today, getLocalTimeZone } from '@internationalized/date';
import { VencimientoNotificationEmail } from '@/components';
import { ILote } from '@/interfaces';

import mailgun from 'mailgun-js';

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY || '',
  domain: process.env.MAILGUN_DOMAIN || '',
});

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

    const publicationsWithLotesVencidos = await prisma.m_publicaciones.findMany(
      {
        where: {
          lotes: {
            some: {
              id_lote: {
                in: lotesVencidos.map((lote) => lote.id_lote),
              },
            },
          },
        },
      }
    );

    await prisma.m_publicaciones.updateMany({
      where: {
        id_publicacion: {
          in: publicationsWithLotesVencidos.map(
            (publication) => publication.id_publicacion
          ),
        },
      },
      data: {
        estado_general: 'INACTIVO',
      },
    });

    await prisma.m_lote.updateMany({
      where: {
        id_lote: {
          in: lotesVencidos.map((lote) => lote.id_lote),
        },
      },
      data: {
        estado_lote: 'VENCIDO',
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
        from: 'Harvest Reborn<harvestreborn@gmail.com>',
        subject: 'Aviso de vencimiento de lote',
        html: emailsHTML[index],
      };
    });

    await Promise.all(
      msgs.map((msg) => {
        return mg.messages().send(msg);
      })
    );

    return NextResponse.json(lotesParaAvisar, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: true,
        message: 'Error general del metodo GET',
      },
      { status: 500 }
    );
  }
}
