import { HomeDashboard } from "@/components";
import { getAllNegocios } from "@/actions";
import { IUser } from "@/interfaces";
import { headers } from "next/headers";

const getUsersForAdmin = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
      method: 'GET',
      headers: new Headers(headers()),
    });
    const data = await res.json();
    return data as unknown as IUser[];
  } catch (error) {
    console.error(error);
    return;
  }
};

const AdminDashboardPage = async () => {
  const negocios = await getAllNegocios();
  const users = await getUsersForAdmin();

  if (!negocios || !users) {
    return (
      <HomeDashboard negocios={[]} users={[]} />
    );
  }

  return (
    <>
      <HomeDashboard negocios={negocios} users={users} />
    </>
  );
};

export default AdminDashboardPage;
