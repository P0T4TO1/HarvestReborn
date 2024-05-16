import { NegocioInfoAdmin } from "@/components";

interface Props {
  params: { id: number };
}

const AdminDashboardNegociosNamePage = async ({ params }: Props) => {
  return (
    <>
      <NegocioInfoAdmin id_negocio={params.id} />
    </>
  );
};

export default AdminDashboardNegociosNamePage;
