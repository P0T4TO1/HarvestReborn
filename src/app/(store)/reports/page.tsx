import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { notFound } from "next/navigation";
import { ReportsSection } from "@/components";
import { getOrders, getLotes } from "@/actions";
import prisma from "@/lib/prisma";

export const revalidate = 3600;

const ReportsPage = async () => {
  const session = await getServerSession(authOptions);

  const user = await prisma.d_duenonegocio.findUnique({
    where: { id_user: session?.user.id },
    include: { negocio: true },
  });

  if (!user?.negocio?.id_negocio) notFound();

  const orders = await getOrders(user?.negocio?.id_negocio);
  const lotes = await getLotes(user?.negocio?.id_negocio);

  if (!orders || !lotes) return (
    <section className="flex flex-col relative overflow-hidden min-h-screen">
      <h1>No hay datos</h1>
    </section>
  );

  return (
    <section className="flex flex-col relative overflow-hidden min-h-screen">
      <ReportsSection orders={orders} lotes={lotes} />
    </section>
  );
};

export default ReportsPage;
