import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect, notFound } from "next/navigation";
import { MisPublicaciones } from "@/components";
import prisma from "@/lib/prisma";
import { getPublicaciones } from "@/actions";

const MisPublicacionesPage = async () => {
  const session = await getServerSession(authOptions);

  const user = await prisma.d_duenonegocio.findUnique({
    where: {
      id_user: session?.user.id,
    },
    include: {
      negocio: {
        select: {
          id_negocio: true,
        },
      },
    },
  });

  if (!user) return notFound();
  if (!user.negocio) return notFound();

  const publicaciones = await getPublicaciones(user.negocio.id_negocio);

  if (!publicaciones) return (
    <section className="flex flex-col relative overflow-hidden min-h-screen">
      <h1>No hay publicaciones</h1>
    </section>
  );

  return (
    <section className="flex flex-col relative overflow-hidden min-h-screen">
      <MisPublicaciones publicaciones={publicaciones} />
    </section>
  );
};

export default MisPublicacionesPage;
