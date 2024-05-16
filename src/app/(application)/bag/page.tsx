import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { BagPageComponent } from "@/components";

const BagPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.id_rol === 4) redirect("/auth/register?oauth=true");
  if (session?.user.id_rol === 2) redirect("/inventory");

  return (
    <>
      <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
        <BagPageComponent />
      </section>
    </>
  );
};

export default BagPage;
