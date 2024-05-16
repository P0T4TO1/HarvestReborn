import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { getPublicationById } from "@/actions";
import { ViewPublication } from "@/components";

interface MarketPostPageProps {
  params: {
    id: string;
  };
}

const MarketPostPage = async ({ params }: MarketPostPageProps) => {
  const session = await getServerSession(authOptions);
  if (session?.user.id_rol === 4) redirect("/auth/register?oauth=true");
  if (session?.user.id_rol === 2) redirect("/inventory");

  const { id } = params;

  const publication = await getPublicationById(id);

  if (!publication) {
    redirect("/market");
  }

  return (
    <>
      <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
        <ViewPublication publication={publication} />
      </section>
    </>
  );
};

export default MarketPostPage;
