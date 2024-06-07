'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import {
  Image,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Accordion,
  AccordionItem,
  useDisclosure,
} from '@nextui-org/react';
import { IoMdMore } from 'react-icons/io';
import Carousel from 'react-material-ui-carousel';
import { SendMessageModal } from '@/components';
import { IoChatbubbleEllipsesOutline, IoBookmark } from 'react-icons/io5';

import { DisponibilidadPublicacion, IPublicacion } from '@/interfaces';

interface Props {
  publication: IPublicacion;
}

export const ViewPublication = ({ publication }: Props) => {
  const { data: session } = useSession();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const pathname = usePathname();
  const router = useRouter();

  const onContact = async () => {
    if (!session) {
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }
    onOpen();
  };

  return (
    <div className="md:flex h-full">
      {session && (
        <SendMessageModal
          publication={publication}
          useDisclosure={{ isOpen, onClose }}
          id_user={session.user.id}
        />
      )}
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
              onClick={() => onContact()}
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
                  ? 'Venta'
                  : 'Donación'}
              </p>
            </div>
            <Accordion>
              <AccordionItem title="Productos">
                {publication.lotes?.map((lote) => (
                  <div key={lote.id_lote} className="flex justify-between mt-2">
                    <p>{lote.producto.nombre_producto}</p>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">
                          {lote.last_cantidad !== 0
                            ? lote.last_cantidad
                            : lote.cantidad_producto}{' '}
                          kg
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </AccordionItem>
            </Accordion>
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
              style={{ border: '0' }}
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
