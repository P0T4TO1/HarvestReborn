"use client";

import React, { useContext } from "react";
import { Link } from "@nextui-org/react";
import { AuthContext } from "@/context/auth";
import { HomeNegocioCard } from "@/components";
import {
  MdInfoOutline,
  MdOutlineForum,
  MdOutlineInventory,
  MdOutlineStorefront,
} from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";

export const HomeNegocio = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <section className="min-h-screen">
        {user?.duenonegocio?.negocio?.estado_negocio === "PENDIENTE" ? (
          <>
            <div className="warning-home-negocio w-full flex items-center h-8 justify-center text-[#f5a524]">
              <MdInfoOutline size={25} className="mr-2" />
              Su negocio esta siendo verificado,&nbsp;
              <Link href={"/store/settings"}>completa los datos de tu negocio</Link>
              &nbsp; para ser verificado más rápido.
            </div>
          </>
        ) : user?.duenonegocio?.negocio?.estado_negocio === "INACTIVO" ? (
          <>
            <div className="danger-home-negocio w-full flex items-center h-8 justify-center text-[#F872A1]">
              <MdInfoOutline size={25} className="mr-2" />
              Su negocio esta inactivo, por no cumplir con los requisitos,&nbsp;
              <Link href={"/store/settings"}>completa los datos de tu negocio</Link>
              &nbsp; para ser verificado más rápido.&nbsp; Si cree que es un
              error, contacte a soporte.
            </div>
          </>
        ) : null}
        <div className="pt-10 container mx-auto">
          <div
            className="w-full sm:p-4 flex flex-col items-center justify-center"
            id="inventory-howitworks"
          >
            <h1 className="text-2xl font-semibold">
              Bienvenido {user?.duenonegocio?.nombre_dueneg} 👋
            </h1>
          </div>
        </div>

        <div className="pt-16">
          <h2 className="text-xl font-semibold text-center">
            ¿Qué quieres hacer hoy?
          </h2>
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 mx-auto">
          <HomeNegocioCard
            buttonText={"Ver inventario"}
            title={"Gestionar inventario"}
            buttonLink={"/inventory"}
            icon={<MdOutlineInventory size={30} />}
          >
            <p>
              Administra tu inventario, agrega productos, edita precios y más.
              Simplemente agrega seleccionando un producto de la lista, llena
              todos los campos y listo. Editalos cuando quieras y elimina los
              que ya no necesites.
            </p>
          </HomeNegocioCard>
          <HomeNegocioCard
            buttonText={"Ver pedidos"}
            title={"Gestionar pedidos"}
            buttonLink={"/orders"}
            icon={<FaBoxOpen size={30} />}
          >
            <p>
              Revisa los pedidos que han realizado tus clientes, aprueba o
              rechaza los pedidos, visualiza los detalles de cada uno de ellos y
              mucho más.
            </p>
          </HomeNegocioCard>
          <HomeNegocioCard
            buttonText={"Mi negocio"}
            title={"Configurar negocio"}
            buttonLink={"/store/settings"}
            icon={<MdOutlineStorefront size={30} />}
          >
            <p>
              Configura tu negocio, sube tu logo, cambia el nombre de tu
              negocio, agrega una descripción, sube fotos y mucho más. Recuerda
              que una buena presentación es clave para atraer a tus clientes.
            </p>
          </HomeNegocioCard>
          <HomeNegocioCard
            buttonText={"Contacta a tus clientes"}
            title={"Chat con clientes"}
            buttonLink={"/chats"}
            icon={<MdOutlineForum size={30} />}
          >
            <p>
              Contacta a tus clientes, responde sus dudas, envía promociones y
              ofertas, y mucho más. Recuerda que una buena atención al cliente
              es clave para fidelizar a tus clientes.
            </p>
          </HomeNegocioCard>
        </div>
      </section>
    </>
  );
};
