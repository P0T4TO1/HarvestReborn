import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

type Data = {
  userId: string;
  userId2: string;
  chatName: string;
  chatId: string;
};

async function createChat(req: NextRequest, res: NextResponse) {
  const { userId, userId2, chatName, chatId } = await req.json() as Data;

  try {
    const chatExists = await prisma.m_chat.findUnique({
      where: { id_chat: chatId },
    });

    if (chatExists) {
      return NextResponse.json(
        {
          error: "Internal Server Error",
          message: "El chat ya existe",
        },
        { status: 200 }
      );
    }

    const chat = await prisma.m_chat.create({
      data: {
        id_chat: chatId,
        nombre_chat: chatName,
        fecha_creacion: new Date(),
        id_user_creator: userId,
        participantes: {
          create: [
            {
              id_user: userId,
            },
            {
              id_user: userId2,
            },
          ],
        },
      },
    });
    return NextResponse.json(
      { ...chat, message: "Chat creado con éxito" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al crear el chat" },
      { status: 500 }
    );
  }
}

export { createChat as POST };
