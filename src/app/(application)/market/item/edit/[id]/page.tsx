import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

import { headers } from 'next/headers';
import { redirect, notFound } from 'next/navigation';

import { PublicacionEdit } from '@/components';
import { getIdNegocioByUserId } from '@/helpers';
import { getPublicactionById, getLotesForPosts } from '@/actions';

interface PageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params }: PageProps) => {
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

  const { id } = params;
  const lotes = await getLotesForPosts(id_negocio, headers());
  const publicacion = await getPublicactionById(Number(id), headers());

  if (!publicacion || !lotes) return notFound();

  if (publicacion.negocio.dueneg.user?.id !== session.user.id)
    return notFound();

  return (
    <section className="w-full flex flex-col md:flex-row text-[#161931] min-h-screen">
      <PublicacionEdit publicacion={publicacion} lotes={lotes} />
    </section>
  );
};

export default Page;
