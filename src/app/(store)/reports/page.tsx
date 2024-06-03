import { headers } from 'next/headers';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

import { ILote, IOrden } from '@/interfaces';
import { ReportsSection } from '@/components';
import { getIdNegocioByUserId } from '@/helpers';
import { getLocalTimeZone, today } from '@internationalized/date';

export const revalidate = 3600;

const getOrders = async (id_negocio: number) => {
  if (!id_negocio) return;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/store/orders/${id_negocio}`,
      {
        method: 'GET',
        headers: headers(),
      }
    );
    const data = await res.json();
    return data as unknown as IOrden[];
  } catch (error) {
    console.error(error);
    return;
  }
};

const getLotes = async (id_negocio: number) => {
  if (!id_negocio) return;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/store/inventory/batch/order/${id_negocio}`,
      {
        method: 'GET',
        headers: headers(),
      }
    );
    const lotes = (await res.json()) as unknown as ILote[];

    const lotesVencidos = lotes.filter((lote) => {
      return (
        new Date(lote.fecha_vencimiento) <
        today(getLocalTimeZone()).toDate(getLocalTimeZone())
      );
    });

    const lotesPorVencer = lotes.filter((lote) => {
      return (
        new Date(lote.fecha_vencimiento) >
          new Date(
            new Date().setDate(
              today(getLocalTimeZone()).toDate(getLocalTimeZone()).getDate() + 3
            )
          ) &&
        new Date(lote.fecha_vencimiento) <
          new Date(
            new Date().setDate(
              today(getLocalTimeZone()).toDate(getLocalTimeZone()).getDate() + 7
            )
          )
      );
    });

    const lotesVigentes = lotes.filter((lote) => {
      return (
        new Date(lote.fecha_vencimiento) >
        new Date(
          new Date().setDate(
            today(getLocalTimeZone()).toDate(getLocalTimeZone()).getDate() + 7
          )
        )
      );
    });

    return {
      all: lotes,
      lotesVencidos,
      lotesPorVencer,
      lotesVigentes,
    };
  } catch (error) {
    console.error(error);
    return;
  }
};

const ReportsPage = async () => {
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

  const orders = await getOrders(id_negocio);
  const lotes = await getLotes(id_negocio);

  if (!orders || !lotes)
    return (
      <section className="flex flex-col relative overflow-hidden min-h-screen">
        <h1>No hay datos</h1>
      </section>
    );

  const products = orders.map((order) => order.productoOrden);
  const productsMoreRequested = products.reduce((acc, product) => {
    product.forEach((product) => {
      const found = acc.find(
        (item) => item.id_producto === product.id_producto
      );
      if (!found) {
        acc.push(product);
      } else {
        found.cantidad_orden += product.cantidad_orden;
      }
      return acc;
    });
    return acc;
  }, []);

  return (
    <section className="flex flex-col relative overflow-hidden min-h-screen">
      <ReportsSection
        orders={orders}
        lotes={lotes}
        productsMoreRequested={productsMoreRequested}
      />
    </section>
  );
};

export default ReportsPage;
