"use client";

import { Link, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import React, { useContext } from "react";
import { UiContext } from "@/context/ui";
import { FaGithub } from "react-icons/fa";
import { DropdownComponent, DarkModeSwitch } from "@/components";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const { toggleSideMenu } = useContext(UiContext);
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <button onClick={toggleSideMenu} className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          <NavbarItem>
            <Link href={"/admin/dashboard"} color="foreground">
              Inicio
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href={"/admin/dashboard/users"} color="foreground">
              Usuarios
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href={"/admin/dashboard/products"} color="foreground">
              Productos
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <Link
            href="https://github.com/P0T4TO1/HarvestReborn_PA"
            target={"_blank"}
          >
            <FaGithub size={20} className="dark:text-gray-300 light:text-gray-800" />
          </Link>
          <DarkModeSwitch />
          <NavbarContent>
            <DropdownComponent />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
