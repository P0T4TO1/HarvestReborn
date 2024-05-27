import { notFound } from "next/navigation";
import { PublicacionEdit } from "@/components";
import { getPublicactionById, getLotesForPosts } from "@/actions";

interface PageProps {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ params, searchParams }: PageProps) => {
  const { id } = params;
  if (!searchParams.in) return notFound();

  const lotes = await getLotesForPosts(Number(searchParams.in));
  const publicacion = await getPublicactionById(Number(id));

  if (!publicacion || !lotes) return notFound();

  return (
    <section className="w-full flex flex-col md:flex-row text-[#161931] min-h-screen">
      <PublicacionEdit publicacion={publicacion} lotes={lotes} isAdmin />
    </section>
  );
};

export default Page;
