import { NavbarWrapperChats } from "@/components";

const page = async () => {
  return (
    <>
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <NavbarWrapperChats />
        <div className="flex justify-center items-center h-full">
          <h2 className="font-bold text-2xl mb-4">
            Selecciona un chat para comenzar
          </h2>
        </div>
      </div>
    </>
  );
};

export default page;
