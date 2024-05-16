import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import React from "react";
import { EmptyBag } from "@/components";

const BagPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.id_rol === 4) redirect("/auth/register?oauth=true");
  if (session?.user.id_rol === 2) redirect("/inventory");

  return (
    <>
      <section className="flex flex-col justify-center relative overflow-hidden min-h-screen">
        <EmptyBag />
      </section>
    </>
  );
};

export default BagPage;
