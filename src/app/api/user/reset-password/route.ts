import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { ResetPassEmail } from '@/components';
import { render } from '@react-email/render';

import { sendEmail } from '@/utils/sendEmail';

async function resetPassword(req: NextRequest) {
  const urlSearchParams = new URLSearchParams(req.nextUrl.searchParams);
  const api_key = urlSearchParams.get('api_key');

  if (api_key !== process.env.API_KEY) {
    return NextResponse.json(
      {
        message:
          'You are not authorized to access this route. Please provide a valid API key.',
      },
      { status: 401 }
    );
  }
  const { email } = (await req.json()) as { email: string };

  const user = await prisma.m_user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: 'Correo no encontrado',
      },
      { status: 400 }
    );
  }

  const resetPasswordToken = crypto.randomBytes(32).toString('base64url');
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

  let link = '';
  if (process.env.NODE_ENV === 'development') {
    link = `http://localhost:3000/auth/reset-password?token=${resetPasswordToken}`;
  } else {
    link = `https://harvestreborn.me/auth/reset-password?token=${resetPasswordToken}`;
  }

  const emailHtml = render(
    ResetPassEmail({ resetPasswordToken: link, email }) as React.ReactElement
  );

  await sendEmail(email, 'Restablecer tu contraseña', emailHtml);

  return NextResponse.json(
    {
      message: 'Correo enviado',
    },
    { status: 200 }
  );
}

export { resetPassword as POST };
