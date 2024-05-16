"use client";

import { useState, useEffect } from "react";
import { hrApi } from "@/api";
import { ILote } from "@/interfaces";
import { CircularProgress } from "@nextui-org/react";
import { NegocioProducts } from "@/components";

interface NegocioProductsProps {
  id_negocio: number;
  nombre_negocio: string;
}

export const ProductsListContainer = ({
  id_negocio,
  nombre_negocio,
}: NegocioProductsProps) => {
  const [lotes, setLotes] = useState<ILote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    hrApi
      .get(`/store/inventory/batch/all/distinct/${id_negocio}`)
      .then((res) => {
        if (res.status === 200) {
          setLotes(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        console.log("Error al obtener negocio", err);
      });
  }, [id_negocio]);

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <CircularProgress size="lg" />
          <p>Cargando productos...</p>
        </div>
      ) : error ? (
        <p>Hubo un error al cargar los productos</p>
      ) : (
        <>
          <NegocioProducts
            nombre_negocio={nombre_negocio}
            lotes={lotes}
          />
        </>
      )}
    </>
  );
};
