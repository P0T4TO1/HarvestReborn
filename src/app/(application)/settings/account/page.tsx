import { AccountForm } from '@/components';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { IUser } from '@/interfaces';

const getAccount = async (id_user: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/account/${id_user}`, {
      method: 'GET',
      headers: new Headers(headers()),
    });
    const data = await res.json();
    return data as unknown as IUser;
  } catch (error) {
    console.error(error);
    return;
  }
};

const Account = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/login');
  if (session.user.id_rol === 4) redirect('/auth/register?oauth=true');
  const user = await getAccount(session.user.id);

  if (!user)
    return (
      <div className="container mx-auto">
        <h1>Usuario no encontrado</h1>
      </div>
    );

  return (
    <>
      <AccountForm user={user} />
    </>
  );
};

export default Account;
