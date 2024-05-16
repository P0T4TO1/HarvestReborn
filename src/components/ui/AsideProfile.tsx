"use client";

import { Link } from "@nextui-org/react";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";

export const AsideAccount = () => {
  const { user } = useContext(AuthContext);
  return (
    <aside className="py-4 md:w-1/4 lg:w-1/5 border-b-1 md:border-r-1">
      <div className="flex flex-col gap-2 p-4 text-sm top-12">
        <h2 className="mb-4 text-2xl font-semibold dark:text-gray-300">
          Cuenta
        </h2>
        <div>
          <Link href={`/settings/profile`}>
            <button className="flex items-center text-gray-800 dark:text-gray-300 px-3 py-2.5 font-semibold hover:text-cyan-900 hover:border hover:rounded-full">
              Perfil
            </button>
          </Link>
        </div>
        <div>
          <Link href={`/settings/account`}>
            <button className="flex items-center text-gray-800 dark:text-gray-300 px-3 py-2.5 font-semibold hover:text-cyan-900 hover:border hover:rounded-full">
              Cuenta
            </button>
          </Link>
        </div>
        {user?.id_rol === 3 && (
          <div>
            <Link href={`/orders`}>
              <button className="flex items-center text-gray-800 dark:text-gray-300 px-3 py-2.5 font-semibold hover:text-cyan-900 hover:border hover:rounded-full">
                Ordenes
              </button>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
};
