"use client";

import NextLink from "next/link";
import React, {useContext} from "react";
import { UiContext } from "@/context/ui";
import clsx from "clsx";

interface Props {
  title: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  href?: string;
  children?: React.ReactNode;
}

export const SidebarItem = ({ icon, title, isActive, href = "", children }: Props) => {
  const { toggleSideMenu } = useContext(UiContext);

  const handleClick = () => {
    if (window.innerWidth < 768) {
      toggleSideMenu();
    }
  };
  return (
    <NextLink
      href={href}
      className="text-default-900 active:bg-none max-w-full"
    >
      <div
        className={clsx(
          isActive
            ? "bg-primary-100 text-primary-500"
            : "hover:bg-default-100",
          "flex gap-2 w-full min-h-[44px] px-3.5 h-full items-center rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]",
          children && "flex-col !items-start py-3.5"
        )}
        onClick={handleClick}
      >
        {icon}
        <span className="text-default-900">{title}</span>
        {children}
      </div>
    </NextLink>
  );
};
