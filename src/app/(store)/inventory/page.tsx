import { ProductsInventory } from "@/components";

const InventoryPage = async () => {
  return (
    <>
      <section className="flex flex-col relative overflow-hidden min-h-screen">
        <ProductsInventory />
      </section>
    </>
  );
};

export default InventoryPage;
