'use client';

import { ILote, INegocio } from '@/interfaces';
import { NegocioProducts } from '@/components';

interface NegocioProductsProps {
  nombre_negocio: string;
  lotes: ILote[];
  negocio: INegocio;
}

export const ProductsListContainer = ({
  nombre_negocio,
  lotes,
  negocio
}: NegocioProductsProps) => {
  return (
    <>
      <NegocioProducts nombre_negocio={nombre_negocio} lotes={lotes} negocio={negocio} />
    </>
  );
};
