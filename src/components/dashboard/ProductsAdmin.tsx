"use client";

import React, { useEffect } from "react";
import { TableProducts, AddProductAdminModal } from "@/components";
import { IProduct } from "@/interfaces";
import { hrApi } from "@/api";
import {
  CircularProgress,
  BreadcrumbItem,
  Breadcrumbs,
} from "@nextui-org/react";
import { FaHome, FaAppleAlt } from "react-icons/fa";

export const ProductsAdmin = () => {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    hrApi
      .get("/admin/product")
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="my-10 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <Breadcrumbs size="lg">
        <BreadcrumbItem
          href={"/admin/dashboard"}
          startContent={<FaHome size={25} />}
        >
          Home
        </BreadcrumbItem>
        <BreadcrumbItem
          href={"/admin/dashboard/products"}
          startContent={<FaAppleAlt size={25} />}
        >
          Productos
        </BreadcrumbItem>
        <BreadcrumbItem>Listado</BreadcrumbItem>
      </Breadcrumbs>

      <h3 className="text-xl font-semibold">Todos los productos</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddProductAdminModal />
          {/*<Button*/}
          {/*  color="primary"*/}
          {/*  startContent={*/}
          {/*    <span className="material-symbols-outlined">ios_share</span>*/}
          {/*  }*/}
          {/*>*/}
          {/*  Export to CSV*/}
          {/*</Button>*/}
        </div>
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold">Cargando...</h2>
          <CircularProgress size="lg" aria-label="Loading..." />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold text-red-800">
            Hubo un error al cargar los productos
          </h3>
        </div>
      ) : (
        <div className="max-w-[95rem] mx-auto w-full">
          <TableProducts products={products} />
        </div>
      )}
    </div>
  );
};
