'use server';

import axios from 'axios';
import prisma from '@/lib/prisma';

export const searchUserByEmail = async (email: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/user/search/${email}?api_key=${process.env.API_KEY}`
  );
  return res.data;
};

export const verifyOldPassword = async (id: string, password: string) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/user/search/password/${id}?api_key=${process.env.API_KEY}`,
    { password }
  );
  return res.data;
};

export const isEmailVerified = async (email: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/user/search/verify/${email}?api_key=${process.env.API_KEY}`
  );
  return res.data;
};

export const getIdNegocioByUserId = async (id: string) => {
  const id_negocio = await prisma.m_negocio.findFirst({
    where: {
      dueneg: {
        id_user: id,
      },
    },
    select: {
      id_negocio: true,
    },
  });
  return id_negocio;
};

export const getIdClienteByUserId = async (id: string) => {
  const id_cliente = await prisma.d_cliente.findFirst({
    where: {
      id_user: id,
    },
    select: {
      id_cliente: true,
    },
  });
  return id_cliente;
};

export const getAdressByUserId = async (id: string) => {
  const direccion_negocio = await prisma.d_cliente.findFirst({
    where: {
      id_user: id,
    },
    select: {
      direccion_negocio: true,
    },
  });
  return direccion_negocio;
};
