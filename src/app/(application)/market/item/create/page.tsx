import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { PublicacionSection } from '@/components';
import { getLotesForPosts } from '@/actions';
import { getIdNegocioByUserId } from '@/helpers';

export const revalidate = 3600;

const PublicacionPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/login');
  if (session.user.id_rol !== 2) redirect('/home');

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

  const lotes = await getLotesForPosts(id_negocio, headers());

  if (!lotes) {
    return (
      <section className="w-full flex flex-col md:flex-row text-[#161931] min-h-screen">
        <PublicacionSection
          lotes={{
            todos: [],
            buenEstado: [],
            apuntoVencer: [],
          }}
        />
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col md:flex-row text-[#161931] min-h-screen">
      <PublicacionSection lotes={lotes} />
    </section>
  );
};

export default PublicacionPage;
