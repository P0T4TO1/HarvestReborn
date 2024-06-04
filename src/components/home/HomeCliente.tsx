'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Link,
  Button,
} from '@nextui-org/react';
import Slider from 'react-slick';

import { INegocio, IPublicacion } from '@/interfaces';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Props {
  publications?: IPublicacion[];
  stores?: {
    distanceLessThan5km: INegocio[];
    distanceMoreThan5km: INegocio[];
  };
}

const disponibilidadOptions = {
  EN_VENTA: 'En venta',
  DONACION: 'Donación',
};

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  nextArrow: (
    <Button variant="light" size="sm" isIconOnly>
      <FaChevronRight />
    </Button>
  ),
  prevArrow: (
    <Button variant="light" size="sm" isIconOnly>
      <FaChevronLeft />
    </Button>
  ),
};

export const HomeCliente = ({ stores, publications }: Props) => {
  return (
    <>
      <div className="my-12 container mx-auto">
        <div>
          <h1 className="font-bebas-neue uppercase text-2xl font-black flex flex-col leading-none dark:text-green-600 text-green-900">
            Publicaciones destacadas
          </h1>
        </div>

        <div className="mx-auto mt-8">
          {!publications ? (
            <div className="text-center">No hay publicaciones disponibles</div>
          ) : (
            <div className="slider-container">
              <Slider {...settings}>
                {publications.map((publication) => (
                  <Card
                    key={publication.id_publicacion}
                    className="shadow-md rounded-md p-4"
                  >
                    <CardHeader className="flex justify-between items-center">
                      <h2 className="text-lg font-bold">
                        {publication.titulo_publicacion}
                      </h2>
                      <span className="text-sm text-gray-500">
                        {publication.createdAt
                          ? new Date(
                              publication.createdAt.toString()
                            ).toLocaleDateString('es-MX', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : ''}
                      </span>
                    </CardHeader>
                    <CardBody>
                      <Image
                        src={publication.images_publicacion[0]}
                        alt={publication.titulo_publicacion}
                        className="min-w-full h-40 object-cover rounded-t-lg"
                        classNames={{
                          wrapper: 'min-w-full',
                        }}
                      />
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-md text-default-600">
                          {publication.disponibilidad &&
                            disponibilidadOptions[publication.disponibilidad]}
                        </p>
                        {publication.precio_publicacion && (
                          <p className="text-md text-default-700 font-semibold">
                            ${publication.precio_publicacion} MXN
                          </p>
                        )}
                      </div>
                      <p className="text-md text-default-600">
                        Negocio: {publication.negocio.nombre_negocio}
                      </p>
                    </CardBody>
                    <CardFooter className="mt-2">
                      <Link
                        href={`/market/item/${publication.id_publicacion}`}
                        underline="always"
                      >
                        Ver más
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </Slider>
            </div>
          )}
        </div>
      </div>
      <Divider />
      <div className="my-12 container mx-auto">
        <h1 className="font-bebas-neue uppercase text-2xl font-black flex flex-col leading-none dark:text-green-600 text-green-900">
          Negocios
        </h1>
        <div>
          {!stores ||
          (stores.distanceLessThan5km.length === 0 &&
            stores.distanceMoreThan5km.length === 0) ? (
            <div className="text-center">No hay negocios disponibles</div>
          ) : (
            <>
              <div className="mt-8">
                <h3 className="text-lg font-bold">A menos de 5 km</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {stores.distanceLessThan5km.map((store) => (
                    <Card
                      key={store.id_negocio}
                      className="shadow-md rounded-md p-4"
                    >
                      <CardHeader className="flex justify-between items-center">
                        <h2 className="text-lg font-bold">
                          {store.nombre_negocio}
                        </h2>
                      </CardHeader>
                      <CardBody>
                        <p className="text-sm text-gray-500">
                          {store.direccion_negocio}
                        </p>
                      </CardBody>
                      <CardFooter className="mt-2">
                        <Link
                          href={`/stores/${store.id_negocio}/${store.nombre_negocio}`}
                          underline="always"
                        >
                          Ver más
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-bold">A más de 5 km</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {stores.distanceMoreThan5km.map((store) => (
                    <Card
                      key={store.id_negocio}
                      className="shadow-md rounded-md p-4"
                    >
                      <CardHeader className="flex justify-between items-center">
                        <h2 className="text-lg font-bold">
                          {store.nombre_negocio}
                        </h2>
                      </CardHeader>
                      <CardBody>
                        <p className="text-sm text-gray-500">
                          {store.direccion_negocio}
                        </p>
                      </CardBody>
                      <CardFooter className="mt-2">
                        <Link
                          href={`/stores/${store.id_negocio}/${store.nombre_negocio}`}
                          underline="always"
                        >
                          Ver más
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
