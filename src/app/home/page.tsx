import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import {
  HomeCliente,
  HomeNegocio,
  SidebarWrapperNegocio,
  NavbarWrapperNegocio,
  NavbarComponent,
  Footer,
} from "@/components";
import { Spinner } from "@nextui-org/react";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.id_rol === 4) redirect("/auth/register?oauth=true");
  if (session.user.id_rol === 1) redirect("/admin/dashboard");
  if (session.user.id_rol === 5) redirect(process.env.NEXT_PUBLIC_SUPPORT_APP_URL ?? "/");

  return (
    <>
      {!session ? (
        <div className="flex flex-col items-center justify-center">
          <Spinner size="lg" />
          <p>Cargando...</p>
        </div>
      ) : session?.user.id_rol === 2 ? (
        <>
          <section className="flex">
            <SidebarWrapperNegocio />
            <NavbarWrapperNegocio>
              <HomeNegocio />
              <Footer />
            </NavbarWrapperNegocio>
          </section>
        </>
      ) : (
        <>
          <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
            <NavbarComponent />
            <HomeCliente />
            <Footer />
          </section>
        </>
      )}
    </>
  );
};

export default HomePage;
