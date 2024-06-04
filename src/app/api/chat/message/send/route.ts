import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/authOptions';
import { pusherServer } from '@/lib/pusher';
import { toPusherKey } from '@/utils/cn';
import { messageValidator } from '@/validations/chat.validation';
import { nanoid } from 'nanoid';
import { getServerSession } from 'next-auth';
import { IMensaje, tipo_mensaje } from '@/interfaces';
import { headers } from 'next/headers';

async function sendMessage(req: NextRequest) {
  const headersList = headers();
  const referer = headersList.get('authorization');
  const mobileToken = referer?.split(' ')[1];

  if (mobileToken && mobileToken !== 'undefined') {
    const { text, chatId }: { text: string; chatId: string } = await req.json();
    const [userId1, userId2] = chatId.split('--');

    const friendList = (await prisma.d_participantes.findMany({
      where: {
        id_chat: chatId,
      },
    })) as any[];
    const isFriend = friendList.find(
      (p) => p.id_user === userId1 || p.id_user === userId2
    );

    if (!isFriend) {
      console.log('Unauthorized friend');
      return NextResponse.json('Unauthorized', { status: 401 });
    }

    const friendId = userId1 === isFriend.id_user ? userId2 : userId1;

    const rawSender = await prisma.m_user.findUnique({
      where: { id: userId1 },
    });
    const sender = JSON.parse(JSON.stringify(rawSender));

    const timestamp = Date.now();

    const messageData: IMensaje = {
      id_mensaje: nanoid(),
      id_chat: chatId,
      id_user: userId1,
      cuerpo_mensaje: text,
      createdAt: new Date(timestamp) as any,
      tipo_mensaje: tipo_mensaje.texto,
      leido: false,
    };

    const message = messageValidator.parse(messageData);

    await pusherServer.trigger(
      toPusherKey(`chat:${chatId}`),
      'incoming-message',
      message
    );

    await pusherServer.trigger(
      toPusherKey(`user:${friendId}:chats`),
      'new_message',
      {
        ...message,
        senderImg: sender.image,
        senderName: sender.name,
      }
    );

    await prisma.d_mensajes.create({
      data: message,
    });

    return NextResponse.json(message, { status: 201 });
  }

  try {
    const { text, chatId }: { text: string; chatId: string } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      console.log('Unauthorized session');
      return NextResponse.json('Unauthorized', { status: 401 });
    }

    const [userId1, userId2] = chatId.split('--');

    if (session.user.id !== userId1 && session.user.id !== userId2) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }

    const friendId = session.user.id === userId1 ? userId2 : userId1;

    const friendList = (await prisma.d_participantes.findMany({
      where: {
        id_chat: chatId,
      },
    })) as any[];
    const isFriend = friendList.find((p) => p.id_user === friendId);

    if (!isFriend) {
      console.log('Unauthorized friend');
      return NextResponse.json('Unauthorized', { status: 401 });
    }

    const rawSender = await prisma.m_user.findUnique({
      where: { id: session.user.id },
    });
    const sender = JSON.parse(JSON.stringify(rawSender));

    const timestamp = Date.now();

    const messageData: IMensaje = {
      id_mensaje: nanoid(),
      id_chat: chatId,
      id_user: session.user.id,
      cuerpo_mensaje: text,
      createdAt: new Date(timestamp) as any,
      tipo_mensaje: tipo_mensaje.texto,
      leido: false,
    };

    const message = messageValidator.parse(messageData);

    await pusherServer.trigger(
      toPusherKey(`chat:${chatId}`),
      'incoming-message',
      message
    );

    await pusherServer.trigger(
      toPusherKey(`user:${friendId}:chats`),
      'new_message',
      {
        ...message,
        senderImg: sender.image,
        senderName: sender.name,
      }
    );

    await prisma.d_mensajes.create({
      data: message,
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    }

    return NextResponse.json('Internal Server Error', { status: 500 });
  }
}

export { sendMessage as POST };
