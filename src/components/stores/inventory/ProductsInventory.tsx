'use client';

import React, { ChangeEvent, useState } from 'react';

import { ILote } from '@/interfaces';

import { Input, Button, Link } from '@nextui-org/react';
import { FaSearch } from 'react-icons/fa';
import { ProductsCollapsibleTable } from '@/components';
import { MdAddCircleOutline, MdOutlinePostAdd } from 'react-icons/md';

interface Props {
  lotes: ILote[];
  allLotes: ILote[];
}

export const ProductsInventory = ({ lotes, allLotes }: Props) => {
  const [search, setSearch] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const results = !search
    ? lotes
    : lotes.filter((dato) =>
        dato.producto?.nombre_producto
          .toLowerCase()
          .includes(search.toLocaleLowerCase())
      );

  return (
    <div className="pt-8 container mx-auto">
      <div className="p-4 flex flex-col gap-4">
        <h1 className="text-2xl font-black flex flex-col leading-none dark:text-green-600 text-green-900">
          Tú inventario
        </h1>
        <Link href={'/inventory/add-product'}>
          <Button
            color="primary"
            variant="faded"
            startContent={<MdAddCircleOutline size={25} />}
          >
            <span className="ml-2">Agregar productos</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="mt-4 p-2 lg:w-1/2">
          <Input
            isClearable
            size="md"
            radius="lg"
            placeholder="Buscar productos..."
            type="text"
            startContent={<FaSearch size={25} />}
            defaultValue={search}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4 p-2 flex justify-end">
          <Link href={'/market/item/create'}>
            <Button
              color="primary"
              variant="faded"
              startContent={<MdOutlinePostAdd size={25} />}
            >
              <span className="ml-2">Crear publicación de productos</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="w-full sm:p-4">
        <div className="rounded-md sm:border">
          <ProductsCollapsibleTable lotesById={results} allLotes={allLotes} />
        </div>
      </div>
    </div>
  );
};
