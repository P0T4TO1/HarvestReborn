import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { UserInfoAdmin } from "@/components";

interface Props {
  params: { id: string };
}

const AdminDashboardUserPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.id_rol !== 1) redirect("/home");
  return (
    <>
      <UserInfoAdmin id_user={params.id} />
    </>
  );
};

export default AdminDashboardUserPage;
