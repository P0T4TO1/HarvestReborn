import { StoreSettings } from '@/components';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getNegocioById } from '@/actions';
import { getIdNegocioByUserId } from '@/helpers';

const MiNegocioPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user.id)
    return (
      <section className="flex flex-col relative overflow-hidden min-h-screen">
        <div>
          Error al obtener la información del usuario. Por favor, cierre sesión
          y vuelva a intentarlo.
        </div>
      </section>
    );

  const id_negocio = await getIdNegocioByUserId(session.user.id);

  if (!id_negocio)
    return (
      <section className="flex flex-col relative overflow-hidden min-h-screen">
        <div>
          Error al obtener la información del negocio. Por favor, cierre sesión
          y vuelva a intentarlo.
        </div>
      </section>
    );

  const negocio = await getNegocioById(id_negocio.id_negocio);

  if (!negocio)
    return (
      <section className="flex flex-col relative overflow-hidden min-h-screen">
        <div>
          Error al obtener la información del negocio. Por favor, cierre sesión
          y vuelva a intentarlo.
        </div>
      </section>
    );

  return (
    <section className="flex flex-col relative overflow-hidden min-h-screen">
      <StoreSettings negocio={negocio} />
    </section>
  );
};

export default MiNegocioPage;
