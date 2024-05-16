import {
  SidebarWrapperNegocio,
  NavbarWrapperNegocio,
  Footer,
} from "@/components";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.id_rol !== 2) redirect("/home");

  return (
    <>
      <div className="flex">
        <SidebarWrapperNegocio />
        <NavbarWrapperNegocio>
          {children}
          <Footer />
        </NavbarWrapperNegocio>
      </div>
    </>
  );
}
