import prisma from '@/lib/prisma';
import { cache } from 'react';

export const getChatsByUserId = cache(async (userId: string) => {
  const chats = await prisma.m_chat.findMany({
    where: {
      participantes: {
        some: {
          id_user: userId,
        },
      },
    },
    include: {
      user: true,
      participantes: {
        include: {
          user: {
            select: {
              email: true,
              duenonegocio: {
                select: {
                  negocio: {
                    select: {
                      nombre_negocio: true,
                    },
                  },
                },
              },
              cliente: {
                select: {
                  nombre_cliente: true,
                },
              },
            },
          },
        },
      },
      mensajes: {
        include: {
          user: {
            select: {
              email: true,
              duenonegocio: {
                select: {
                  negocio: {
                    select: {
                      nombre_negocio: true,
                    },
                  },
                },
              },
              cliente: {
                select: {
                  nombre_cliente: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return chats;
});
