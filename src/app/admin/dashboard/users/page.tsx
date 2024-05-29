import { UsersAdmin } from '@/components';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getUsersForAdmin, getUsersForSuperAdmin } from '@/actions';

const UsersPage = async () => {
  const session = await getServerSession(authOptions);
  const users =
    session?.user.id_rol === 1
      ? await getUsersForSuperAdmin()
      : await getUsersForAdmin();

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
