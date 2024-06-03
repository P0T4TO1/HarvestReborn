import { ProfileSection } from '@/components';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { IUser } from '@/interfaces';

const getProfile = async (id_user: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile/${id_user}`, {
      method: 'GET',
      headers: headers(),
    });
    const data = await res.json();
    return data as unknown as IUser;
  } catch (error) {
    console.error(error);
    return;
  }
};

const Profile = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/login');
  if (session.user.id_rol === 4) redirect('/auth/register?oauth=true');

  const profile = await getProfile(session.user.id);

  if (!profile)
    return (
      <div className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <h1>Error al cargar el perfil</h1>
      </div>
    );

  return (
    <>
      <ProfileSection profile={profile} />
    </>
  );
};

export default Profile;
