import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { OrderDetails } from "@/components";

interface OrderDetailsPageProps {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const OrderDetailsPage = async ({
  params,
  searchParams,
}: OrderDetailsPageProps) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.id_rol === 4) redirect("/auth/register?oauth=true");
  if (session.user.id_rol === 1) redirect("/admin/dashboard");
  
  const { id } = params;
  
  return (
    <>
      <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
        {searchParams.new === "true" ? (
          <OrderDetails id_orden={id} newOrder />
        ) : (
          <OrderDetails id_orden={id} />
        )}
      </section>
    </>
  );
};

export default OrderDetailsPage;
