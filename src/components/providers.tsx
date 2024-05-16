"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { UiProvider } from "@/context/ui";
import { BagProvider } from "@/context/order";
import { AuthProvider } from "@/context/auth";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <NextUIProvider>
        <NextThemesProvider attribute="class">
          <AuthProvider>
            <BagProvider>
              <UiProvider>{children}</UiProvider>
            </BagProvider>
          </AuthProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
};
