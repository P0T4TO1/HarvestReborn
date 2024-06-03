import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

import { MisPublicaciones } from '@/components';

import { IPublicacion } from '@/interfaces';
import { getIdNegocioByUserId } from '@/helpers';

const getPublications = async (id_negocio: number) => {
  if (!id_negocio) return;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/store/publication?id_negocio=${id_negocio}`,
      {
        method: 'GET',
        headers: headers(),
      }
    );
    const data = await res.json();
    return data as unknown as IPublicacion[];
  } catch (error) {
    console.error(error);
    return;
  }
};

const MisPublicacionesPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return notFound();
  }

  const res = await getIdNegocioByUserId(session.user.id);

  if (!res) {
    return (
      <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
        <h1>
          Hubo un error al cargar la página. Por favor, cierre sesión y vuelva a
          intentarlo.
        </h1>
      </section>
    );
  }

  const { id_negocio } = res;

  const publicaciones = await getPublications(id_negocio);

  if (!publicaciones)
    return (
      <section className="flex flex-col relative overflow-hidden min-h-screen">
        <h1>No hay publicaciones</h1>
      </section>
    );

  return (
    <section className="flex flex-col relative overflow-hidden min-h-screen">
      <MisPublicaciones publicaciones={publicaciones} headers={headers()} />
    </section>
  );
};

export default MisPublicacionesPage;
