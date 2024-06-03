import { PublicationsAdmin } from '@/components';
import { IPublicacion } from '@/interfaces';
import { headers } from 'next/headers';

const getAllPublications = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/publications?api_key=${process.env.API_KEY}`,
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

async function AdminPublicationsPage() {
  const publications = await getAllPublications();

  if (!publications) {
    return (
      <section className="flex flex-col relative overflow-hidden min-h-screen">
        <h1>No hay publicaciones</h1>
      </section>
    );
  }

  return (
    <>
      <PublicationsAdmin publications={publications} />
    </>
  );
}

export default AdminPublicationsPage;
