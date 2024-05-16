import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect, notFound } from "next/navigation";
import { getPublicactionById, getLotesForPosts } from "@/actions";
import { PublicacionEdit } from "@/components";
import prisma from "@/lib/prisma";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.id_rol !== 2) redirect("/home");

  const user = await prisma.d_duenonegocio.findUnique({
    where: { id_user: session.user.id },
    include: { negocio: true },
  });

  if (!user?.negocio?.id_negocio) notFound();

  const { id } = params;
  const lotes = await getLotesForPosts(user?.negocio?.id_negocio);
  const publicacion = await getPublicactionById(Number(id));

  if (!publicacion || !lotes) return notFound();

  if (publicacion.negocio.dueneg.user?.id !== session.user.id) return notFound();

  return (
    <section className="w-full flex flex-col md:flex-row text-[#161931] min-h-screen">
      <PublicacionEdit publicacion={publicacion} lotes={lotes} />
    </section>
  );
};

export default Page;
