import { ProductsListContainer } from '@/components';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import { getBatchsByStore, getNegocioById } from '@/actions';

interface NegocioInfoPageProps {
  params: {
    id: number;
    name: string;
  };
}

const NegocioInfoPage = async ({ params }: NegocioInfoPageProps) => {
  const session = await getServerSession(authOptions);
  if (session?.user.id_rol === 4) redirect('/auth/register?oauth=true');
  const { id, name } = params;

  const negocio = await getNegocioById(id);
  const products = await getBatchsByStore(id);

  if (!products || !negocio)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-gray-400">
          Error al cargar la página, por favor intenlelo más tarde
        </p>
      </div>
    );

  return (
    <>
      <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
        <ProductsListContainer
          negocio={negocio}
          nombre_negocio={name}
          lotes={products}
        />
      </section>
    </>
  );
};

export default NegocioInfoPage;
