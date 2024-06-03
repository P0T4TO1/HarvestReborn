import { NegociosList } from '@/components';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import { getAllActiveStores, getStoresNearby } from '@/actions';
import { getAdressByUserId } from '@/helpers';

const NegociosPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.id_rol === 4) redirect('/auth/register?oauth=true');

  if (session) {
    const res = await getAdressByUserId(session.user.id);
    if (!res) {
      return (
        <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
          <h1>
            Hubo un error al cargar la página. Por favor, cierre sesión y vuelva
            a intentarlo.
          </h1>
        </section>
      );
    }
    const { direccion_negocio } = res;

    if (!direccion_negocio) {
      return (
        <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
          <h1>
            Hubo un error al cargar la página. Por favor, cierre sesión y vuelva
            a intentarlo.
          </h1>
        </section>
      );
    }

    const stores = await getStoresNearby(direccion_negocio);

    if (!stores)
      return (
        <div className="flex justify-center items-center h-screen">
          <p className="text-2xl text-gray-400">No hay negocios cerca de ti</p>
        </div>
      );

    return (
      <>
        <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
          <NegociosList stores={stores} />
        </section>
      </>
    );
  }

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
