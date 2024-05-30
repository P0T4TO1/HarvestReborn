'use client';

import { ILote } from '@/interfaces';
import { NegocioProducts } from '@/components';

interface NegocioProductsProps {
  nombre_negocio: string;
  lotes: ILote[];
}

export const ProductsListContainer = ({
  nombre_negocio,
  lotes,
}: NegocioProductsProps) => {
  return (
    <>
      <NegocioProducts nombre_negocio={nombre_negocio} lotes={lotes} />
    </>
  );
};
