"use client";

import { hrApi } from "@/api";
import { FC, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Button, Textarea } from "@nextui-org/react";
import { IUser } from "@/interfaces";
import { IoMdSend } from "react-icons/io";
import { DANGER_TOAST } from "../ui";

interface ChatInputProps {
  chatPartner: IUser;
  chatId: string;
}

export const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const sendMessage = async () => {
    if (!input) return;
    setIsLoading(true);

    try {
      await hrApi
        .post("/chat/message/send", {
          text: input,
          chatId,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      setInput("");
      textareaRef.current?.focus();
    } catch {
      toast("Error al enviar el mensaje", DANGER_TOAST);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div className="relative flex-1 overflow-hidden rounded-lg">
        <Textarea
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="block w-full resize-none border-0 bg-transparent text-gray-900 dark:text-gray-200 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
        />

        <div
          onClick={() => textareaRef.current?.focus()}
          className="py-2"
          aria-hidden="true"
        >
          <div className="py-px">
            <div className="h-9" />
          </div>
        </div>

        <div className="absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
          <div className="flex-shrin-0">
            <Button
              isLoading={isLoading}
              onClick={sendMessage}
              type="submit"
              startContent={<IoMdSend size={20} />}
            >
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
