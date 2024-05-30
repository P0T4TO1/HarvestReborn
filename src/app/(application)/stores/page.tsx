import { NegociosList } from '@/components';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import { getAllActiveStores } from '@/actions';

const NegociosPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.id_rol === 4) redirect('/auth/register?oauth=true');

  const stores = await getAllActiveStores();

  if (!stores)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-gray-400">No hay negocios activos</p>
      </div>
    );

  return (
    <>
      <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
        <NegociosList stores={stores} />
      </section>
    </>
  );
};

export default NegociosPage;
