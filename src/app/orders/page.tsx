import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

import {
  OrdersCliente,
  OrdersTable,
  SidebarWrapperNegocio,
  NavbarWrapperNegocio,
  NavbarComponent,
  Footer,
} from '@/components';
import { IOrden, EstadoOrden } from '@/interfaces';
import { getIdNegocioByUserId, getIdClienteByUserId } from '@/helpers';

const getOrdersCliente = async (id_cliente: number) => {
  if (!id_cliente) return;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/customer/order/all/${id_cliente}`,
      {
        method: 'GET',
        headers: headers(),
      }
    );
    const orders = (await res.json()) as unknown as IOrden[];
    return {
      todos: orders,
      pendientes: orders.filter(
        (order) => order.estado_orden === EstadoOrden.PENDIENTE
      ),
      en_proceso: orders.filter(
        (order) => order.estado_orden === EstadoOrden.EN_PROCESO
      ),
      finalizados: orders.filter(
        (order) => order.estado_orden === EstadoOrden.FINALIZADO
      ),
      cancelados: orders.filter(
        (order) => order.estado_orden === EstadoOrden.CANCELADO
      ),
      rechazados: orders.filter(
        (order) => order.estado_orden === EstadoOrden.RECHAZADO
      ),
    };
  } catch (error) {
    console.error(error);
    return;
  }
};

const getOrdersNegocio = async (id_negocio: number) => {
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

const OrdersPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/login');
  if (session.user.id_rol === 4) redirect('/auth/register?oauth=true');
  if (session.user.id_rol === 1 || session?.user.id_rol === 7)
    redirect('/admin/dashboard');

  if (session.user.id_rol === 2) {
    const res = await getIdNegocioByUserId(session.user.id);
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
    const { id_negocio } = res;

    const orders = await getOrdersNegocio(id_negocio);

    if (!orders)
      return (
        <section className="flex flex-col relative overflow-hidden min-h-screen">
          <h1>No hay ordenes</h1>
        </section>
      );

    return (
      <section className="flex">
        <SidebarWrapperNegocio />
        <NavbarWrapperNegocio>
          <div className="pt-12 container mx-auto min-h-screen">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-black flex flex-col leading-none dark:text-green-600 text-green-900">
                Pedidos
              </h1>
            </div>

            <OrdersTable orders={orders} />
          </div>
          <Footer />
        </NavbarWrapperNegocio>
      </section>
    );
  }

  const res = await getIdClienteByUserId(session.user.id);

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

  const { id_cliente } = res;

  const orders = await getOrdersCliente(id_cliente);

  if (!orders)
    return (
      <section className="flex flex-col relative overflow-hidden min-h-screen">
        <h1>No hay ordenes</h1>
      </section>
    );

  return (
    <>
      <NavbarComponent />
      <OrdersCliente orders={orders} />
      <Footer />
    </>
  );
};

export default OrdersPage;
