import { getAllPublications } from "@/actions";
import { PublicationsAdmin } from "@/components";

export const revalidate = 3600;

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
