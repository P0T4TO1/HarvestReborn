import { hrApi } from "@/api";
import prisma from "@/lib/prisma";

export const searchUserByEmail = async (email: string) => {
  const res = await hrApi.get(`/user/search/${email}`);
  return res.data;
};

export const verifyOldPassword = async (id: string, password: string) => {
  const res = await hrApi.post(`/user/search/password/${id}`, { password });
  return res.data;
};

export const isEmailVerified = async (email: string) => {
  const res = await hrApi.get(`/user/search/verify/${email}`);
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
