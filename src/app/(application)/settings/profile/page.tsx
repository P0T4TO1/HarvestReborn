import { ProfileSection } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { getProfile } from "@/actions";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.id_rol === 4) redirect("/auth/register?oauth=true");

  const profile = await getProfile(session.user.id);

  if (!profile)
    return (
      <div className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        Error al cargar el perfil
      </div>
    );

  return (
    <>
      <ProfileSection profile={profile} />
    </>
  );
};

export default Profile;
