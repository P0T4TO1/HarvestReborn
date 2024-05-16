import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { notFound, redirect } from "next/navigation";
import { PublicacionSection } from "@/components";
import { getLotesForPosts } from "@/actions";
import prisma from "@/lib/prisma";

export const revalidate = 3600;

const PublicacionPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.id_rol !== 2) redirect("/home");

  const user = await prisma.d_duenonegocio.findUnique({
    where: { id_user: session.user.id },
    include: { negocio: true },
  });

  if (!user?.negocio?.id_negocio) notFound();

  const lotes = await getLotesForPosts(user?.negocio?.id_negocio);

  if (!lotes) notFound();

  return (
    <section className="w-full flex flex-col md:flex-row text-[#161931] min-h-screen">
      <PublicacionSection lotes={lotes}/>
    </section>
  );
};

export default PublicacionPage;