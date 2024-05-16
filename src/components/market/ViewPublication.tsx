"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  Image,
  Button,
  Link,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Carousel from "react-material-ui-carousel";
import { IoChatbubbleEllipsesOutline, IoBookmark } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";

import { DisponibilidadPublicacion, IPublicacion } from "@/interfaces";
import { chatHrefConstructor } from "@/utils/cn";
import { hrApi } from "@/api";

interface Props {
  publication: IPublicacion;
}

export const ViewPublication = ({ publication }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onContact = async (id_user: string, id_dueneg: string) => {
    setIsLoading(true);
    await hrApi
      .post(`/chat`, {
        userId: id_user,
        userId2: id_dueneg,
        chatName: `Chat entre ${id_user} y ${id_dueneg}`,
        chatId: chatHrefConstructor(id_user, id_dueneg),
      })
      .then(() => {
        router.push(`/chats/chat/${chatHrefConstructor(id_user, id_dueneg)}`);
      });
  };

  return (
    <div className="md:flex h-full">
      <div className="lg:w-4/5 mx-auto h-full">
        <Carousel
          autoPlay={false}
          indicators={false}
          navButtonsAlwaysVisible={true}
          animation="fade"
          duration={100}
          className="w-full md:h-[850px] max-h-[850px] bg-gray-300 dark:bg-gray-700 rounded-lg"
          fullHeightHover={false}
        >
          {publication.images_publicacion.map((image, index) => (
            <div
              key={index}
              className="w-full md:h-[850px] max-h-[850px] bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center"
            >
              <Image
                className="max-h-[850px]"
                src={image}
                alt="Imagen de la publicación"
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="mt-4">
        <div className="p-6">
          <h1 className="text-2xl font-bold">
            {publication.titulo_publicacion}
          </h1>
          <h3 className="text-lg font-semibold mt-2">
            MX${publication.precio_publicacion}
          </h3>
          <div className="flex items-center justify-between mt-4">
            <Button
              className="mr-2"
              startContent={<IoChatbubbleEllipsesOutline size={21} />}
              onClick={() =>
                onContact(session?.user.id!, publication.negocio.dueneg.id_user)
              }
            >
              Enviar mensaje
            </Button>
            <div>
              <Button className="mr-2" isIconOnly>
                <IoBookmark size={21} />
              </Button>
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly>
                    <IoMdMore size={21} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>Reportar</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Descripción</h3>
            <p className="mt-2">{publication.descripcion_publicacion}</p>
          </div>
          <div className="mt-4 w-1/2">
            <h3 className="text-lg font-semibold">Detalles</h3>
            <div className="flex justify-between">
              <p className="mt-2">Disponible para:</p>
              <p className="mt-2">
                {publication.disponibilidad ===
                DisponibilidadPublicacion.En_venta
                  ? "Venta"
                  : "Donación"}
              </p>
            </div>
          </div>
        </div>
        <Divider />
        <div className="p-6">
          <h3 className="text-lg font-semibold">Información del negocio</h3>
          <p className="mt-2 mb-2">{publication.negocio.nombre_negocio}</p>
          <h3 className="text-lg font-semibold">Ubicación</h3>
          <p className="mt-2">{publication.negocio.direccion_negocio}</p>
          <div className="mt-4">
            <iframe
              style={{ border: "0" }}
              width="100%"
              height="320"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAIAxu9rSTpzfa_kkep1niIDxKvMtypqXM&q=${publication.negocio.direccion_negocio}`}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
