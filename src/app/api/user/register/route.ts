import { NextResponse, NextRequest } from 'next/server';
import { hash } from 'bcrypt';
import crypto from 'crypto';
import { render } from '@react-email/render';

import { sendEmail } from '@/utils/sendEmail';

import { signToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';
import { VerifyEmail } from '@/components';

interface Data {
  email: string;
  password: string;
  tipo: string;
  nombre: string;
  apellidos: string;
  fecha_nacimiento: string;
  nombreNegocio: string;
  telefono: string;
  calle: string;
  colonia: string;
  alcaldia: string;
  cp: string;
}

async function registerUser(req: NextRequest) {
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
  const {
    email = '',
    password = '',
    tipo = '',
    nombre = '',
    apellidos = '',
    fecha_nacimiento = '',
    nombreNegocio = '',
    telefono = '',
    calle = '',
    colonia = '',
    alcaldia = '',
    cp = '',
  } = (await req.json()) as Data;
  try {
    const ceo: number =
      email === 'jaretgarciagomez@gmail.com' ||
      email === 'elbonixd5@gmail.com' ||
      email === 'saulchanona@yahoo.com'
        ? 1
        : 2 || 3;

    const emailVerificationToken = crypto.randomBytes(32).toString('base64url');

    if (tipo === 'cliente') {
      const newUser = await prisma.m_user.upsert({
        where: { email },
        create: {
          email,
          password: await hash(password, 10),
          emailVerificationToken,
          id_rol: ceo === 1 ? 1 : 3,
          cliente: {
            create: {
              nombre_cliente: nombre,
              apellidos_cliente: apellidos,
              telefono_cliente: telefono,
              fecha_nacimiento: new Date(fecha_nacimiento),
              nombre_negocio: nombreNegocio || '',
              direccion_negocio:
                calle.concat(', ', colonia, ', ', alcaldia, ', ', cp) || '',
              historial: {
                create: {},
              },
            },
          },
        },
        update: {
          email,
          password: await hash(password, 10),
          id_rol: ceo === 1 ? 1 : 3,
          cliente: {
            upsert: {
              create: {
                nombre_cliente: nombre,
                apellidos_cliente: apellidos,
                telefono_cliente: telefono,
                fecha_nacimiento: new Date(fecha_nacimiento),
                nombre_negocio: nombreNegocio || '',
                direccion_negocio:
                  calle.concat(', ', colonia, ', ', alcaldia, ', ', cp) || '',
                historial: {
                  create: {},
                },
              },
              update: {
                nombre_cliente: nombre,
                apellidos_cliente: apellidos,
                telefono_cliente: telefono,
                fecha_nacimiento: new Date(fecha_nacimiento),
                nombre_negocio: nombreNegocio || '',
                direccion_negocio:
                  calle.concat(', ', colonia, ', ', alcaldia, ', ', cp) || '',
              },
            },
          },
        },
      });

      if (!newUser.emailVerified) {
        let link = '';
        if (process.env.NODE_ENV === 'development') {
          link = `http://localhost:3000/auth/email-verification?token=${emailVerificationToken}`;
        } else {
          link = `https://harvestreborn.me/auth/email-verification?token=${emailVerificationToken}`;
        }

        const emailHtml = render(
          VerifyEmail({
            emailVerificationToken: link,
            email,
          }) as React.ReactElement
        );

        try {
          await sendEmail(email, 'Verifica tu correo electrónico', emailHtml);
        } catch (error) {
          console.error(error);
          return NextResponse.json(
            {
              message: 'Error al enviar el correo',
            },
            { status: 500 }
          );
        }
      }

      const { id } = newUser;

      const token = signToken(id, email);
      return NextResponse.json(
        {
          token,
          user: {
            email,
          },
          message: 'Usuario creado correctamente y correo enviado',
        },
        { status: 201 }
      );
    }

    if (tipo === 'negocio') {
      const newUser = await prisma.m_user.upsert({
        where: { email },
        create: {
          email,
          password: await hash(password, 10),
          emailVerificationToken,
          id_rol: ceo === 1 ? 1 : 2,
          duenonegocio: {
            create: {
              nombre_dueneg: nombre,
              apellidos_dueneg: apellidos,
              fecha_nacimiento: new Date(fecha_nacimiento),
              negocio: {
                create: {
                  nombre_negocio: nombreNegocio,
                  telefono_negocio: telefono,
                  direccion_negocio:
                    calle.concat(', ', colonia, ', ', alcaldia, ', ', cp) || '',
                  inventario: {
                    create: {},
                  },
                  historial: {
                    create: {},
                  },
                },
              },
            },
          },
        },
        update: {
          email,
          password: await hash(password, 10),
          id_rol: ceo === 1 ? 1 : 2,
          duenonegocio: {
            upsert: {
              create: {
                nombre_dueneg: nombre,
                apellidos_dueneg: apellidos,
                fecha_nacimiento: new Date(fecha_nacimiento),
                negocio: {
                  create: {
                    nombre_negocio: nombreNegocio,
                    telefono_negocio: telefono,
                    direccion_negocio:
                      calle.concat(', ', colonia, ', ', alcaldia, ', ', cp) ||
                      '',
                    inventario: {
                      create: {},
                    },
                    historial: {
                      create: {},
                    },
                  },
                },
              },
              update: {
                nombre_dueneg: nombre,
                apellidos_dueneg: apellidos,
                fecha_nacimiento: new Date(fecha_nacimiento),
                negocio: {
                  upsert: {
                    create: {
                      nombre_negocio: nombreNegocio,
                      telefono_negocio: telefono,
                      direccion_negocio:
                        calle.concat(', ', colonia, ', ', alcaldia, ', ', cp) ||
                        '',
                      inventario: {
                        create: {},
                      },
                      historial: {
                        create: {},
                      },
                    },
                    update: {
                      nombre_negocio: nombreNegocio,
                      telefono_negocio: telefono,
                      direccion_negocio:
                        calle.concat(', ', colonia, ', ', alcaldia, ', ', cp) ||
                        '',
                      updatedAt: new Date(),
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!newUser.emailVerified) {
        let link = '';
        if (process.env.NODE_ENV === 'development') {
          link = `http://localhost:3000/auth/email-verification?token=${emailVerificationToken}`;
        } else {
          link = `https://harvestreborn.me/auth/email-verification?token=${emailVerificationToken}`;
        }

        const emailHtml = render(
          VerifyEmail({
            emailVerificationToken: link,
            email,
          }) as React.ReactElement
        );

        try {
          await sendEmail(email, 'Verifica tu correo electrónico', emailHtml);
        } catch (error) {
          console.error(error);
          return NextResponse.json(
            {
              message: 'Error al enviar el correo',
            },
            { status: 500 }
          );
        }
      }

      const { id } = newUser;

      const token = signToken(id, email);
      return NextResponse.json(
        {
          token,
          user: {
            email,
          },
          message: 'Usuario creado correctamente y correo enviado',
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'Error al crear el usuario',
      },
      { status: 500 }
    );
  }
}
export { registerUser as POST };
