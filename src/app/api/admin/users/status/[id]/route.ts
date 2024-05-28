import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import { UserStatusEmail } from "@/components";

import { sendEmail } from "@/utils/sendEmail";

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
  const { status } = (await req.json()) as {
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

      await sendEmail(
        user?.email as string,
        "Estado de tu usuario en Harvest Reborn",
        emailHtml
      );

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

      await sendEmail(
        user?.email as string,
        "Estado de tu usuario en Harvest Reborn",
        emailHtml
      );

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
