"use client";

import React, { useContext } from "react";
import { usePathname } from "next/navigation";

import { Image } from "@nextui-org/react";
import { Sidebar } from "./sidebar.styles";
import { SidebarMenu, SidebarItem } from "@/components";
import { UiContext } from "@/context/ui";

import { MdOutlineStorefront, MdOutlineInventory2 } from "react-icons/md";
import { IoChatbubblesOutline, IoNotifications } from "react-icons/io5";
import { FaChartBar, FaHome, FaBoxOpen } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";

export const SidebarWrapperNegocio = () => {
  const pathname = usePathname();
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);

  return (
    <aside className="h-screen z-[50] sticky top-0">
      {isMenuOpen ? (
        <div className={Sidebar.Overlay()} onClick={toggleSideMenu} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: isMenuOpen,
        })}
      >
        <div className={Sidebar.Header()}>
          <div className="flex items-center gap-2">
            <Image src="/images/logo.png" width={50} height={50} alt="Logo" />
            <h3 className="text-xl font-medium m-auto text-default-900 whitespace-nowrap">
              Dashboard
            </h3>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Inicio"
              icon={<FaHome size={24} />}
              isActive={pathname === "/home"}
              href="/home"
            />
            <SidebarMenu title="Menu Principal">
              <SidebarItem
                isActive={pathname === "/store/settings"}
                title="Mi Negocio"
                icon={<MdOutlineStorefront size={24} />}
                href="/store/settings"
              />
              <SidebarItem
                isActive={pathname === "/inventory"}
                title="Inventario"
                icon={<MdOutlineInventory2 size={24} />}
                href="/inventory"
              />
              <SidebarItem
                isActive={pathname === "/orders"}
                title="Pedidos"
                icon={<FaBoxOpen size={24} />}
                href="/orders"
              />
              <SidebarItem
                isActive={pathname === "/store/publications"}
                title="Mis Publicaciones"
                icon={<BsPostcard size={24} />}
                href="/store/publications"
              />
              <SidebarItem
                isActive={pathname === "/chats"}
                title="Chats"
                icon={<IoChatbubblesOutline size={24} />}
                href="/chats"
              />
              <SidebarItem
                isActive={pathname === "/reports"}
                title="Reportes"
                icon={<FaChartBar size={24} />}
                href={"/reports"}
              />
              <SidebarItem
                isActive={pathname === "/notifications"}
                title="Notificaciones"
                icon={<IoNotifications size={24} />}
                href="/notifications"
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
