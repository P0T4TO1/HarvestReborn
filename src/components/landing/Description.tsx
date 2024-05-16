"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Image, Button, Link } from "@nextui-org/react";

export const DescriptionComponent: FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const navigateTo = (url: string) => {
    router.push(url);
  };

  return (
    <section
      className="flex flex-col items-center overflow-hidden min-h-screen"
      id="inicio"
    >
      <div className="container m-auto px-4 sm:px-8 md:px-16 lg:px-32 flex relative">
        <div className="w-full sm:w-1/2 flex flex-col relative z-20 justify-center">
          <h1 className="font-bebas-neue uppercase text-4xl sm:text-5xl lg:text-6xl font-black flex flex-col leading-none text-green-900 dark:text-green-500">
            Unidos
            <span className="text-5xl sm:text-6xl lg:text-7xl text-gray-900 dark:text-gray-300">
              Desperdiciamos menos
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700 dark:text-gray-300 mt-4 sm:mt-6">
            El lugar donde tú y tu negocio ayuda a reducir el desperdicio de
            frutas y verduras en la Ciudad de México
          </p>
          <div className="flex mt-6 sm:mt-8">
            {session ? (
              <Link href={"/home"}>
                <Button
                  color="success"
                  size="lg"
                  className="mr-2 sm:mr-3"
                  variant="ghost"
                >
                  Pagina principal
                </Button>
              </Link>
            ) : (
              <Link href={"/auth/login"}>
                <Button
                  color="success"
                  size="lg"
                  className="mr-2 sm:mr-3"
                  variant="ghost"
                >
                  Únete ahora
                </Button>
              </Link>
            )}

            <Link href={"/#servicios"}>
              <Button color="success" size="lg" className="ml-2 sm:ml-3">
                Conoce más
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden sm:flex w-1/2 justify-center">
          <Image
            // src={"/images/frutas-verduras.png"}
            src={"/images/landing-page/Apilados.png"}
            alt="Apilados"
            className="max-w-xs sm:max-w-sm lg:max-w-md m-auto"
          />
        </div>
      </div>
    </section>
  );
};
