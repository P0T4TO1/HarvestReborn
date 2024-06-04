'use client';

import React, { ChangeEvent, useState, useMemo } from 'react';

import { INegocio } from '@/interfaces';
import { getNegocioById } from '@/actions';

import {
  CardBody,
  Link,
  Divider,
  CircularProgress,
  Button,
  Card,
  CardHeader,
  Image,
  Input,
} from '@nextui-org/react';
import {
  MdLabelImportantOutline,
  MdOutlineInventory,
  MdOutlinePermPhoneMsg,
} from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlineStorefront, MdHelpOutline } from 'react-icons/md';

interface NegociosListProps {
  stores?: {
    distanceLessThan5km: INegocio[];
    distanceMoreThan5km: INegocio[];
  };
  storesWithoutDistance?: INegocio[];
  isSession?: boolean;
}

export const NegociosList = ({
  stores,
  storesWithoutDistance,
  isSession,
}: NegociosListProps) => {
  const [negocio, setNegocio] = useState<INegocio>();
  const [loadingNegocio, setLoadingNegocio] = useState(false);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const results = useMemo(() => {
    if (!search) return stores;
    if (stores?.distanceLessThan5km) {
      return (
        stores.distanceLessThan5km.filter((store) =>
          store.nombre_negocio.toLowerCase().includes(search.toLowerCase())
        ) ||
        stores.distanceMoreThan5km.filter((store) =>
          store.nombre_negocio.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, stores]);

  const resultsWithoutDistance = useMemo(() => {
    if (!search) return storesWithoutDistance;
    if (storesWithoutDistance) {
      return storesWithoutDistance.filter((store) =>
        store.nombre_negocio.toLowerCase().includes(search.toLowerCase())
      );
    }
  }, [search, storesWithoutDistance]);

  const getNegocio = async (id?: number) => {
    if (!id) return;
    setLoadingNegocio(true);
    const negocio = await getNegocioById(id);
    console.log(negocio);
    if (!negocio) setError(true);
    setNegocio(negocio);
    setLoadingNegocio(false);
  };

  return (
    <div className="pt-16 container mx-auto">
      <h1 className="font-bebas-neue uppercase text-4xl font-black flex flex-col leading-none dark:text-green-600 text-green-900">
        Negocios
        <span className="text-xl dark:text-gray-300 text-gray-900 font-semibold">
          Aquí puedes ver los negocios donde puedes adquirir productos
        </span>
      </h1>

      <div className="flex">
        <div className="flex flex-1 justify-center sm:justify-start">
          <div className="mt-4 p-2">
            <Input
              isClearable
              aria-label="Buscar negocio por nombre"
              size="md"
              radius="lg"
              placeholder="Buscar negocio por nombre..."
              type="text"
              startContent={
                <FaSearch
                  size={25}
                  className="text-gray-500 dark:text-gray-300"
                />
              }
              defaultValue={search}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 mt-10 gap-8">
        <div className="col-span-2">
          {/* {results.map((negocio) => (
            <Card
              aria-label="Negocio"
              isPressable
              isHoverable
              shadow="lg"
              key={negocio.id_negocio}
              className="mb-6 w-full"
              classNames={{
                base: 'hover:border-green-700 border-2 border-gray-300',
              }}
              onPress={() => getNegocio(negocio.id_negocio)}
            >
              <CardHeader className="flex justify-between flex-row items-center px-5 pt-4">
                <div className="flex gap-2 justify-center items-center">
                  <MdOutlineStorefront size={25} />
                  <h2 className="text-2xl font-bold">
                    {negocio.nombre_negocio}
                  </h2>
                </div>
              </CardHeader>
              <CardBody className="overflow-visible px-5 pb-2">
                <p className="mb-4">{negocio.direccion_negocio}</p>
              </CardBody>
            </Card>
          ))} */}
          {!isSession ? (
            resultsWithoutDistance?.map((negocio) => (
              <Card
                aria-label="Negocio"
                isPressable
                isHoverable
                shadow="lg"
                key={negocio.id_negocio}
                className="mb-6 w-full"
                classNames={{
                  base: 'hover:border-green-700 border-2 border-gray-300',
                }}
                onPress={() => getNegocio(negocio.id_negocio)}
              >
                <CardHeader className="flex justify-between flex-row items-center px-5 pt-4">
                  <div className="flex gap-2 justify-center items-center">
                    <MdOutlineStorefront size={25} />
                    <h2 className="text-2xl font-bold">
                      {negocio.nombre_negocio}
                    </h2>
                  </div>
                </CardHeader>
                <CardBody className="overflow-visible px-5 pb-2">
                  <p className="mb-4">{negocio.direccion_negocio}</p>
                </CardBody>
              </Card>
            ))
          ) : (
            <>
              <div>
                <h3 className="text-lg font-bold">A menos de 5 km</h3>
                {stores?.distanceLessThan5km.map((store) => (
                  <Card
                    aria-label="Negocio"
                    isPressable
                    isHoverable
                    shadow="lg"
                    key={store.id_negocio}
                    className="mb-6 w-full"
                    classNames={{
                      base: 'hover:border-green-700 border-2 border-gray-300',
                    }}
                    onPress={() => getNegocio(store.id_negocio)}
                  >
                    <CardHeader className="flex justify-between flex-row items-center px-5 pt-4">
                      <div className="flex gap-2 justify-center items-center">
                        <MdOutlineStorefront size={25} />
                        <h2 className="text-2xl font-bold">
                          {store.nombre_negocio}
                        </h2>
                      </div>
                    </CardHeader>
                    <CardBody className="overflow-visible px-5 pb-2">
                      <p className="mb-4">{store.direccion_negocio}</p>
                    </CardBody>
                  </Card>
                ))}
              </div>
              <div>
                <h3 className="text-lg font-bold">A más de 5 km</h3>
                {stores?.distanceMoreThan5km.map((store) => (
                  <Card
                    aria-label="Negocio"
                    isPressable
                    isHoverable
                    shadow="lg"
                    key={store.id_negocio}
                    className="mb-6 w-full"
                    classNames={{
                      base: 'hover:border-green-700 border-2 border-gray-300',
                    }}
                    onPress={() => getNegocio(store.id_negocio)}
                  >
                    <CardHeader className="flex justify-between flex-row items-center px-5 pt-4">
                      <div className="flex gap-2 justify-center items-center">
                        <MdOutlineStorefront size={25} />
                        <h2 className="text-2xl font-bold">
                          {store.nombre_negocio}
                        </h2>
                      </div>
                    </CardHeader>
                    <CardBody className="overflow-visible px-5 pb-2">
                      <p className="mb-4">{store.direccion_negocio}</p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="col-span-3">
          {loadingNegocio ? (
            <CircularProgress size="lg" />
          ) : error ? (
            <p>Error al cargar los negocios</p>
          ) : negocio ? (
            <Card
              className="mb-6 w-full max-h-[50rem]"
              classNames={{
                base: 'border-2 border-gray-300',
              }}
            >
              <Image
                src={negocio?.images_negocio[0] || '/images/no-image.jpg'}
                alt={negocio?.nombre_negocio}
                className="min-w-full h-40 object-cover rounded-t-lg"
                classNames={{
                  wrapper: 'min-w-full',
                }}
              />
              <CardHeader className="px-4 flex flex-col items-start">
                <h2 className="text-2xl font-bold mb-4">
                  {negocio?.nombre_negocio}
                </h2>
                <p>Ve los productos que ofrece </p>
                <Link
                  className="mt-2"
                  href={`/stores/${negocio.id_negocio}/${negocio.nombre_negocio}`}
                >
                  <Button color="success" size="md">
                    Ver productos
                  </Button>
                </Link>
              </CardHeader>
              <Divider />
              <CardBody className="px-4 pb-4 overflow-y-scroll">
                <div className="flex flex-col mt-6">
                  <div className="flex gap-2 items-center">
                    <MdHelpOutline size={25} />
                    <h3 className="text-xl font-semibold">Descripción</h3>
                  </div>
                  <p className="mb-2 mt-2">{negocio?.descripcion_negocio}</p>
                </div>
                <Divider />
                <div className="flex flex-col mt-6">
                  <div className="flex gap-2 items-center mt-2">
                    <MdOutlineInventory size={25} />
                    <h3 className="text-xl font-semibold">
                      Productos disponibles
                    </h3>
                  </div>
                  <div className="grid grid-cols-3">
                    {negocio?.inventario?.lote?.map((lote) => (
                      <ul
                        key={lote.id_lote}
                        className="flex gap-2 items-center"
                      >
                        <li className="flex items-center">
                          <MdLabelImportantOutline />
                          <p className="mb-2 mt-2">
                            {lote.producto?.nombre_producto}
                          </p>
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
                <Divider />
                <div className="flex flex-col mt-6">
                  <div className="flex gap-2 items-center">
                    <MdOutlinePermPhoneMsg size={25} />
                    <h3 className="text-xl font-semibold mt-2">Contacto</h3>
                  </div>
                  <p className="mb-2 mt-2">{negocio?.dueneg?.nombre_dueneg}</p>
                  <p className="mb-2">{negocio?.telefono_negocio}</p>
                  <p className="mb-2">
                    {negocio?.email_negocio || negocio?.dueneg?.user?.email}
                  </p>
                </div>
                <Divider />
                <div className="flex flex-col mt-6">
                  <div className="flex gap-2 items-center">
                    <FaLocationDot size={25} />
                    <h3 className="text-xl font-semibold mt-2">Ubicación</h3>
                  </div>
                  <p className="mb-2 mt-2">{negocio?.direccion_negocio}</p>
                  <iframe
                    style={{ border: '0' }}
                    width="100%"
                    height="450"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAIAxu9rSTpzfa_kkep1niIDxKvMtypqXM&q=${negocio?.direccion_negocio}`}
                  ></iframe>
                </div>
              </CardBody>
            </Card>
          ) : (
            <Card
              classNames={{
                base: 'border-2 border-gray-300',
              }}
            >
              <CardHeader>
                <h2>Seleccione un negocio para visualizar su información</h2>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
