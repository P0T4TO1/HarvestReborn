import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect, notFound } from "next/navigation";
import {
  OrdersCliente,
  OrdersNegocio,
  SidebarWrapperNegocio,
  NavbarWrapperNegocio,
  NavbarComponent,
  Footer,
} from "@/components";
import { getOrders as getOrdersNegocio } from "@/actions";
import { getOrdersById as getOrdersCliente } from "@/actions";
import prisma from "@/lib/prisma";

const OrdersPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.id_rol === 4) redirect("/auth/register?oauth=true");
  if (session.user.id_rol === 1) redirect("/admin/dashboard");

  if (session.user.id_rol === 2) {
    const user = await prisma.d_duenonegocio.findUnique({
      where: { id_user: session?.user.id },
      include: { negocio: true },
    });

    if (!user?.negocio?.id_negocio) return notFound();

    const orders = await getOrdersNegocio(user?.negocio?.id_negocio);

    if (!orders)
      return (
        <section className="flex flex-col relative overflow-hidden min-h-screen">
          <h1>No hay datos</h1>
        </section>
      );

    return (
      <section className="flex">
        <SidebarWrapperNegocio />
        <NavbarWrapperNegocio>
          <OrdersNegocio orders={orders} />
          <Footer />
        </NavbarWrapperNegocio>
      </section>
    );
  }

  const user = await prisma.d_cliente.findUnique({
    where: { id_user: session.user.id },
  });

  if (!user?.id_cliente) return notFound();

  const orders = await getOrdersCliente(user.id_cliente);

  if (!orders)
    return (
      <section className="flex flex-col relative overflow-hidden min-h-screen">
        <h1>No hay datos</h1>
      </section>
    );

  return (
    <>
      <NavbarComponent />
      <OrdersCliente orders={orders} />
      <Footer />
    </>
  );
};

export default OrdersPage;
