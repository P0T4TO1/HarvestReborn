import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { render } from "@react-email/render";
import { UserStatusEmail } from "@/components";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

async function patchStatusUser(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  if (!params.id)
    return NextResponse.json(
      { message: "Falta id del usuario" },
      { status: 400 }
    );
  const { status } = (await new Response(request.body).json()) as {
    status: string;
  };

  try {
    if (status === "ACTIVO") {
      const user = await prisma.m_user.update({
        where: {
          id: params.id,
        },
        data: {
          estado: "INACTIVO",
        },
      });

      const emailHtml = render(
        UserStatusEmail({
          email: user?.email,
          status: user?.estado as string,
        }) as React.ReactElement
      );

      const msg = {
        from: "Harvest Reborn<harvestreborn@gmail.com>",
        to: user?.email,
        subject: "Estado de tu usuario en Harvest Reborn",
        html: emailHtml,
      };

      try {
        await sgMail.send(msg);
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { message: "Error al enviar correo" },
          { status: 400 }
        );
      }
      return NextResponse.json(user, { status: 200 });
    } else if (status === "INACTIVO") {
      const user = await prisma.m_user.update({
        where: {
          id: params.id,
        },
        data: {
          estado: "ACTIVO",
        },
      });

      const emailHtml = render(
        UserStatusEmail({
          email: user?.email,
          status: user?.estado as string,
        }) as React.ReactElement
      );

      const msg = {
        from: "Harvest Reborn<harvestreborn@gmail.com>",
        to: user?.email,
        subject: "Estado de tu usuario en Harvest Reborn",
        html: emailHtml,
      };

      try {
        await sgMail.send(msg);
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { message: "Error al enviar correo" },
          { status: 400 }
        );
      }
      return NextResponse.json(user, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error al desactivar el usuario" },
      { status: 500 }
    );
  }
}

export { patchStatusUser as PATCH };
