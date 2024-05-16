import { ReactNode } from "react";
import { NavbarComponent, Footer } from "@/components";

export default function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <section>
      <NavbarComponent />
      {children}
      <Footer />
    </section>
  );
}
