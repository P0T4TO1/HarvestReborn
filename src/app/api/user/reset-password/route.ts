import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { ResetPassEmail } from "@/components";
import sgMail from "@sendgrid/mail";
import { render } from "@react-email/render";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "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");

async function resetPassword(req: NextRequest, res: NextResponse) {
  const { email } = (await new Response(req.body).json()) as { email: string };

  const user = await prisma.m_user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: "Correo no encontrado",
      },
      { status: 400 }
    );
  }

  const resetPasswordToken = crypto.randomBytes(32).toString("base64url");
  const today = new Date();
  const expiryDate = new Date(today.setDate(today.getDate() + 1));

  await prisma.m_user.update({
    where: {
      id: user.id,
    },
    data: {
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpires: expiryDate,
    },
  });

  let link = "";
  if (process.env.NODE_ENV === "development") {
    link = `http://localhost:3000/auth/reset-password?token=${resetPasswordToken}`;
  } else {
    link = `https://harvestreborn.me/auth/reset-password?token=${resetPasswordToken}`;
  }

  const emailHtml = render(
    ResetPassEmail({ resetPasswordToken: link, email }) as React.ReactElement
  );

  const msg = {
    from: "Harvest Reborn<harvestreborn@gmail.com>",
    to: email,
    subject: "Restablecer tu contraseña",
    html: emailHtml,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error al enviar el correo",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      message: "Correo enviado",
    },
    { status: 200 }
  );
}

export { resetPassword as POST };
