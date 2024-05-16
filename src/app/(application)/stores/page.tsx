import { NegociosList } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

const NegociosPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.id_rol === 4) redirect("/auth/register?oauth=true");
  return (
    <>
      <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
        <NegociosList />
      </section>
    </>
  );
};

export default NegociosPage;
