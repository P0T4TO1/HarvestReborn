"use client";

import React, { ChangeEvent, useContext, useState } from "react";
import { Sidebar } from "./sidebar.styles";
import {
  SidebarMenu,
  SidebarItem,
  DropdownComponent,
  DarkModeSwitch,
} from "@/components";
import { usePathname } from "next/navigation";
import { UiContext } from "@/context/ui";
import { FaSearch, FaChevronLeft } from "react-icons/fa";
import { Input, Link, Button, Tooltip } from "@nextui-org/react";
import { IChatWithLastMessage } from "@/interfaces";
import { useSession } from "next-auth/react";

interface Props {
  chats: IChatWithLastMessage[];
}

export const SidebarWrapperChats = ({ chats }: Props) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);

  const [search, setSearch] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const results = !search
    ? chats
    : chats.filter((dato) =>
        dato.participants?.some(
          (p) =>
            p.user?.duenonegocio?.negocio?.nombre_negocio
              ?.toLowerCase()
              .includes(search.toLocaleLowerCase()) ||
            p.user?.cliente?.nombre_cliente
              ?.toLowerCase()
              .includes(search.toLocaleLowerCase()) ||
            p.user?.email.toLowerCase().includes(search.toLocaleLowerCase())
        )
      );

  const getChatPartnerName = (chat: IChatWithLastMessage) => {
    const chatPartner = chat.participants?.filter(
      (p) => p.id_user !== session?.user.id
    );
    return (
      chatPartner
        ?.map((partnerChat) => {
          return (
            partnerChat.user?.duenonegocio?.negocio?.nombre_negocio ??
            partnerChat.user?.cliente?.nombre_cliente ??
            partnerChat.user?.email
          );
        })
        ?.toString() ?? ""
    );
  };

  return (
    <aside className="h-screen z-[50] sticky top-0">
      {isMenuOpen ? (
        <div className={Sidebar.Overlay()} onClick={toggleSideMenu} />
      ) : null}
      <div
        className={`bg-background transition-transform h-full fixed -translate-x-full w-96 shrink-0 z-[202] overflow-y-auto border-r border-divider flex-col py-6 px-3 md:ml-0 md:flex md:static md:h-screen md:translate-x-0 ${
          isMenuOpen ? "translate-x-0 ml-0 [display:inherit]" : ""
        }`}
      >
        <div className={"flex gap-4 items-center px-6 flex-col"}>
          <div className="flex items-center justify-between gap-2 w-full">
            <div className="flex items-center">
              <Tooltip content="Volver al inicio" placement="bottom">
                <Link href={"/home"}>
                  <Button isIconOnly variant="light">
                    <FaChevronLeft size={20} />
                  </Button>
                </Link>
              </Tooltip>
              <h3 className="text-xl font-medium m-0 text-default-900 whitespace-nowrap">
                Chats
              </h3>
            </div>
            <div className="flex items-center justify-center">
              <DarkModeSwitch />
              <DropdownComponent />
            </div>
          </div>
          <div className="w-full">
            <Input
              startContent={<FaSearch size={20} />}
              placeholder="Buscar chat..."
              size="md"
              width="100%"
              defaultValue={search}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            {chats.length === 0 ? (
              <p className="text-sm text-zinc-500">
                No tienes chats aún, comienza uno!
              </p>
            ) : (
              <SidebarMenu title="Todos los chats">
                {results.map((chat) => (
                  <SidebarItem
                    key={chat.id}
                    href={`/chats/chat/${chat.id}`}
                    isActive={pathname === `/chats/chat/${chat.id}`}
                    title={getChatPartnerName(chat)}
                  >
                    <p className="mt-1 max-w-md">
                      <span className="text-zinc-400">
                        {chat.lastMessage.senderId === session?.user.id
                          ? "Tú: "
                          : `${chat.lastMessage.senderName}: `}
                      </span>
                      {chat.lastMessage.text}
                    </p>
                  </SidebarItem>
                ))}
              </SidebarMenu>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
