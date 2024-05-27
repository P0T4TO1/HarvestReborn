"use client";

import React, { useContext } from "react";
import { Image } from "@nextui-org/react";

import { UiContext } from "@/context/ui";
import { usePathname } from "next/navigation";

import { Sidebar } from "./sidebar.styles";
import { SidebarMenu, SidebarItem } from "@/components";

import {
  MdOutlineDashboard,
  MdOutlineStorefront,
} from "react-icons/md";
import { BsFilePost } from "react-icons/bs";
import { FaAppleAlt } from "react-icons/fa";
import { FaPeopleGroup, FaTicket, FaUserGroup } from "react-icons/fa6";

export const SidebarWrapper = () => {
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
            <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
              Dashboard
            </h3>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<MdOutlineDashboard size={24} />}
              isActive={pathname === "/admin/dashboard"}
              href="/admin/dashboard"
            />
            <SidebarMenu title="Menu Principal">
              <SidebarItem
                isActive={pathname === "/admin/dashboard/users"}
                title="Usuarios"
                icon={<FaPeopleGroup size={24} />}
                href="/admin/dashboard/users"
              />
              <SidebarItem
                isActive={pathname === "/admin/dashboard/products"}
                title="Productos"
                icon={<FaAppleAlt size={24} />}
                href="/admin/dashboard/products"
              />
              <SidebarItem
                isActive={pathname === "/admin/dashboard/stores"}
                title="Negocios"
                icon={<MdOutlineStorefront size={24} />}
                href="/admin/dashboard/stores"
              />
              <SidebarItem
                isActive={pathname === "/admin/dashboard/customers"}
                title="Clientes"
                icon={<FaUserGroup size={24} />}
                href="/admin/dashboard/customers"
              />
              <SidebarItem
                isActive={pathname === "/admin/dashboard/publications"}
                title="Publicaciones"
                icon={<BsFilePost size={24} />}
                href="/admin/dashboard/publications"
              />
            </SidebarMenu>
            <SidebarMenu title="Dashboard soporte">
              <SidebarItem
                isActive={pathname === "/dashboard/admin"}
                title="Soporte"
                icon={<FaTicket size={24} />}
                href={`${process.env.NEXT_PUBLIC_SUPPORT_APP_URL}/dashboard/admin`}
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
