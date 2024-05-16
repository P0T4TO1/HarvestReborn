import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { getActivePublications } from "@/actions";
import { AllPublications } from "@/components";

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const INITIAL_NUMBER_OF_USERS = 10;

const MarketPage = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);
  if (session?.user.id_rol === 4) redirect("/auth/register?oauth=true");
  if (session?.user.id_rol === 2) redirect("/inventory");

  const publications = await getActivePublications(
    0,
    INITIAL_NUMBER_OF_USERS,
    searchParams.q as string
  );

  if (!publications)
    return (
      <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
        <h1>No hay publicaciones</h1>
      </section>
    );

  return (
    <>
      <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
        <AllPublications initialPublications={publications} />
      </section>
    </>
  );
};

export default MarketPage;
