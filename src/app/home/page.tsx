import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import {
  HomeCliente,
  HomeNegocio,
  SidebarWrapperNegocio,
  NavbarWrapperNegocio,
  NavbarComponent,
  Footer,
} from '@/components';
import { getPublicationsByStoresNearby, getStoresNearby } from '@/actions';
import { getAdressByUserId } from '@/helpers';

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/login');
  if (session.user.id_rol === 4) redirect('/auth/register?oauth=true');
  if (session.user.id_rol === 1 || session?.user.id_rol === 7)
    redirect('/admin/dashboard');
  if (session.user.id_rol === 5 || session.user.id_rol === 6)
    redirect(process.env.NEXT_PUBLIC_SUPPORT_APP_URL ?? '/');

  if (session.user.id_rol === 2) {
    return (
      <>
        <section className="flex">
          <SidebarWrapperNegocio />
          <NavbarWrapperNegocio>
            <HomeNegocio />
            <Footer />
          </NavbarWrapperNegocio>
        </section>
      </>
    );
  }

  const res = await getAdressByUserId(session.user.id);
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
  const { direccion_negocio } = res;
  if (!direccion_negocio) {
    return (
      <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
        <h1>
          Hubo un error al cargar la página. Por favor, cierre sesión y vuelva a
          intentarlo.
        </h1>
      </section>
    );
  }

  const publications = await getPublicationsByStoresNearby(
    direccion_negocio,
    headers()
  );
  const stores = await getStoresNearby(direccion_negocio);

  return (
    <section className="flex mt-16 flex-col relative overflow-hidden min-h-screen">
      <NavbarComponent />
      <HomeCliente stores={stores} publications={publications} />
      <Footer />
    </section>
  );
};

export default HomePage;
