import { AsideAccount } from "@/components";
import { ReactNode } from "react";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <section className="w-full flex flex-col gap-5 container pt-16 md:flex-row text-[#161931] min-h-screen">
      <AsideAccount />
      {children}
    </section>
  );
}
