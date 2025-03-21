'use client';

import React, { FC, useState, useMemo, useCallback } from 'react';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

import { IPublicacion } from '@/interfaces';
import { getPublicactionById } from '@/actions';

import {
  Card,
  CardHeader,
  Input,
  Image,
  useDisclosure,
  Link,
  Button,
} from '@nextui-org/react';
import { FaSearch } from 'react-icons/fa';
import { Disponibilidad } from '@prisma/client';
import { MdOutlinePostAdd } from 'react-icons/md';
import { DANGER_TOAST, PublicacionModal } from '@/components';

import { toast } from 'sonner';

interface Props {
  publicaciones: IPublicacion[];
  headers: ReadonlyHeaders;
}

export const MisPublicaciones: FC<Props> = ({
  publicaciones,
  headers,
}) => {
  const [filterValue, setFilterValue] = useState('');
  const hasSearchFilter = Boolean(filterValue);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [publicacion, setPublicacion] = useState<IPublicacion | null>(null);

  const filteredItems = useMemo(() => {
    let filteredLotes = [...publicaciones];

    if (hasSearchFilter) {
      filteredLotes = filteredLotes.filter((publicacion) =>
        publicacion.titulo_publicacion
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }

    return filteredLotes;
  }, [filterValue, publicaciones, hasSearchFilter]);

  const itemsToDisplay = useMemo(() => {
    return filteredItems;
  }, [filteredItems]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue('');
  }, []);

  const getPublicacion = (id_publicacion: number) => {
    getPublicactionById(id_publicacion, headers)
      .then((data) => {
        if (!data) return toast('No se encontró la publicación', DANGER_TOAST);
        setPublicacion(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast('Error al obtener la publicación', DANGER_TOAST);
        setLoading(false);
      });
  };

  return (
    <div className="h-full p-6">
      {publicacion && (
        <PublicacionModal
          useDisclosure={{ isOpen, onClose }}
          publicacion={publicacion}
          loading={loading}
          headers={headers}
        />
      )}
      <Card shadow="none">
        <CardHeader className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Mis Publicaciones</h2>
          </div>
          <div className="flex justify-end">
            <Input
              isClearable
              area-label="Buscar productos"
              className="w-1/2 md:w-1/3"
              placeholder="Buscar por nombre..."
              startContent={<FaSearch size={20} />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          </div>
        </CardHeader>
      </Card>
      <div className="flex justify-end mt-4">
        <Button
          as={Link}
          href={'/market/item/create'}
          color="primary"
          variant="faded"
          className="w-1/2 md:w-1/3"
          startContent={<MdOutlinePostAdd size={25} />}
        >
          <span className="ml-2">Crear publicación de productos</span>
        </Button>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
        {itemsToDisplay.map((publicacion) => (
          <div
            key={publicacion.id_publicacion}
            className="max-w-[15.313rem] cursor-pointer"
            onClick={() => {
              setLoading(true);
              getPublicacion(publicacion.id_publicacion!);
              onOpen();
            }}
          >
            <Image
              src={publicacion.images_publicacion[0]}
              alt={publicacion.titulo_publicacion}
              className="max-w-[15.313rem] max-h-[15.313rem] w-full h-[15.313rem] object-cover"
            />
            <p className="text-lg font-semibold mt-2">
              {publicacion.titulo_publicacion}
            </p>
            {publicacion.disponibilidad === Disponibilidad.EN_VENTA ? (
              <div className="flex">
                <p className="text-md font-normal">
                  MX${publicacion.precio_publicacion}
                </p>
              </div>
            ) : (
              <div className="flex">
                <p className="text-sm">
                  {publicacion.disponibilidad === Disponibilidad.DONACION
                    ? 'Donacion'
                    : ''}
                </p>
              </div>
            )}
            <div className="flex flex-col">
              <p className="text-xs text-default-600">
                {publicacion.estado_publicacion.charAt(0) +
                  publicacion.estado_publicacion.slice(1).toLowerCase()}
              </p>
              <p className="text-xs text-default-600">
                Publicado el:{' '}
                {new Date(publicacion.createdAt!).toLocaleDateString('es-MX', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
