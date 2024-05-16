import { SidebarWrapper, NavbarWrapper } from "@/components";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.id_rol !== 1) redirect("/home");
  return (
    <>
      <div className="flex">
        <SidebarWrapper />
        <NavbarWrapper>{children}</NavbarWrapper>
      </div>
    </>
  );
}
