"use server";

import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export const oAuthToDb = async (
  oAuthEmail: string,
  oAuthName?: string,
  oAuthProviderAccountId?: string,
  oAuthGivenName?: string,
  oAuthFamilyName?: string
) => {
  const user = await prisma.m_user.findUnique({
    where: {
      email: oAuthEmail,
    },
    include: {
      duenonegocio: {
        include: {
          negocio: {
            include: {
              inventario: {
                select: {
                  id_inventario: true,
                },
              },
            },
          },
        },
      },
      cliente: {
        include: {
          historial: true,
        },
      },
    },
  });
  const [name, lastName] = oAuthName?.split(" ") || ["", ""];

  if (user) {
    await prisma.m_user.update({
      where: {
        id: user.id,
      },
      data: {
        email: oAuthEmail,
        emailVerified: true,
        oAuthId: oAuthProviderAccountId,
      },
    });
    const {
      id,
      email,
      id_rol,
      estado,
      password,
      oAuthId,
      duenonegocio,
      cliente,
    } = user;
    if (id_rol === 4) {
      return {
        id,
        email,
        id_rol,
        estado,
        nombre: oAuthGivenName || name,
        apellidos: oAuthFamilyName || lastName,
        password,
        oAuthId,
      };
    }
    return {
      id,
      email,
      id_rol,
      estado,
      password,
      oAuthId,
      duenonegocio,
      cliente,
    };
  }

  const role =
    oAuthEmail === "jaretgarciagomez@gmail.com" ||
    oAuthEmail === "saulchanona@yahoo.com" ||
    oAuthEmail === "elbonixd5@gmail.com"
      ? 1
      : 2 || 3;

  const password = Math.random().toString(36).slice(-8);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt) as string;

  const newUser = await prisma.m_user.create({
    data: {
      email: oAuthEmail,
      password: hash,
      emailVerified: true,
      oAuthId: oAuthProviderAccountId,
      id_rol: role === 1 ? 1 : 4,
    },
  });

  const { email, id_rol, id, oAuthId } = newUser;
  return {
    id,
    email,
    nombre: oAuthGivenName || name,
    apellidos: oAuthFamilyName || lastName,
    id_rol,
    password: hash,
    oAuthId,
  };
};
