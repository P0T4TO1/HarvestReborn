import { ProductsInventory } from '@/components';
import { ILote } from '@/interfaces';
import { headers } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getDistinctProducts } from '@/actions';
import { getIdNegocioByUserId } from '@/helpers';

export const revalidate = 3600;

const getAllBatchs = async (id_negocio: number) => {
  if (!id_negocio) return;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/store/inventory/batch/all/${id_negocio}?api_key=${process.env.API_KEY}`,
      {
        method: 'GET',
        headers: headers(),
      }
    );
    const data = await res.json();
    return data as unknown as ILote[];
  } catch (error) {
    console.error(error);
    return;
  }
};

const InventoryPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
        <h1>
          Hubo un error al cargar la página. Por favor, cierre sesión y vuelva a
          intentarlo.
        </h1>
      </section>
    );
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

  const allLotes = await getAllBatchs(id_negocio);
  const lotes = await getDistinctProducts(id_negocio);

  if (!lotes || !allLotes) {
    return (
      <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
        <h1>No se encontraron lotes</h1>
      </section>
    );
  }

  return (
    <>
      <section className="flex flex-col relative overflow-hidden min-h-screen">
        <ProductsInventory allLotes={allLotes} lotes={lotes} />
      </section>
    </>
  );
};

export default InventoryPage;
