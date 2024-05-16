"use client";

import { pusherClient } from "@/lib/pusher";
import { cn, toPusherKey } from "@/utils/cn";
import { Message } from "@/validations/chat.validation";
import { FC, useEffect, useRef, useState } from "react";
import { IUser } from "@/interfaces";

interface MessagesProps {
  initialMessages: Message[];
  sessionId: string;
  chatId: string;
  sessionImg: string | null | undefined;
  chatPartner: IUser;
}

export const Messages: FC<MessagesProps> = ({
  initialMessages,
  sessionId,
  chatId,
  chatPartner,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`chat:${chatId}`));

    const messageHandler = (message: Message) => {
      setMessages((prev) => [message, ...prev]);
    };

    pusherClient.bind("incoming-message", messageHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`));
      pusherClient.unbind("incoming-message", messageHandler);
    };
  }, [chatId]);

  const scrollDownRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      id="messages"
      className="flex h-full max-h-[75vh] flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <div ref={scrollDownRef} />

      {messages.map((message, index) => {
        const isCurrentUser = message.id_user === sessionId;

        const hasNextMessageFromSameUser =
          messages[index - 1]?.id_user === messages[index].id_user;

        return (
          <div
            className="chat-message"
            key={`${message.id_mensaje}-${message.createdAt}`}
          >
            <div
              className={cn("flex items-end", {
                "justify-end": isCurrentUser,
              })}
            >
              <div
                className={cn(
                  "flex flex-col space-y-2 text-base max-w-xs mx-2",
                  {
                    "order-1 items-end": isCurrentUser,
                    "order-2 items-start": !isCurrentUser,
                  }
                )}
              >
                <span
                  className={cn("px-4 py-2 rounded-lg inline-block", {
                    "dark:bg-green-700 bg-green-600 text-white": isCurrentUser,
                    "bg-gray-200 text-gray-900": !isCurrentUser,
                    "rounded-br-none":
                      !hasNextMessageFromSameUser && isCurrentUser,
                    "rounded-bl-none":
                      !hasNextMessageFromSameUser && !isCurrentUser,
                  })}
                >
                  {message.cuerpo_mensaje}{" "}
                  <span
                    className={`ml-2 text-xs text-gray-400 ${isCurrentUser && "text-gray-300"}`}
                  >
                    {new Date(message.createdAt).toLocaleTimeString("es-MX", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </span>
              </div>

              <div
                className={cn("relative w-6 h-6", {
                  "order-2": isCurrentUser,
                  "order-1": !isCurrentUser,
                  invisible: hasNextMessageFromSameUser,
                })}
              >
                <p className="text-xs text-gray-400">
                  {isCurrentUser
                    ? "Tú"
                    : chatPartner.duenonegocio?.negocio?.nombre_negocio ??
                      chatPartner.cliente?.nombre_cliente}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
