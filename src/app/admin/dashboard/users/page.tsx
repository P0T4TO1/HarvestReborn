import { UsersAdmin } from '@/components';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { IUser } from '@/interfaces';

const getUsersForSuperAdmin = async () => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/users/all`
    );
    return data.json() as unknown as IUser[];
  } catch (error) {
    console.error(error);
    return;
  }
};

const getUsersForAdmin = async () => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/users`
    );
    return data.json() as unknown as IUser[];
  } catch (error) {
    console.error(error);
    return;
  }
};

const UsersPage = async () => {
  const session = await getServerSession(authOptions);

  if(session?.user.id_rol === 1) {
    const users = await getUsersForSuperAdmin();
    if (!users) {
      return (
        <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
          <h1>No hay usuarios</h1>
        </section>
      );
    }
    return (
      <>
        <UsersAdmin users={users} />
      </>
    );
  }

  const users = await getUsersForAdmin();

  if (!users) {
    return (
      <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
        <h1>No hay publicaciones</h1>
      </section>
    );
  }

  return (
    <>
      <UsersAdmin users={users} />
    </>
  );
};

export default UsersPage;
