"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { IProduct } from "@/interfaces";
import { hrApi } from "@/api";
import { AddLoteToInventory, ProductCard } from "@/components";
import { Input, useDisclosure, CircularProgress } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";

export const AddProductLote = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [productId, setProductId] = useState<number>(0);
  const [product, setProduct] = useState<IProduct>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const results = !search
    ? products
    : products.filter((dato) =>
        dato.nombre_producto.toLowerCase().includes(search.toLocaleLowerCase())
      );

  useEffect(() => {
    hrApi
      .get("/products")
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
    <>
      <div className="pt-8 container mx-auto p-4">
        <h1 className="text-2xl font-black flex flex-col leading-none dark:text-green-600 text-green-900">
          Agregar productos
        </h1>

        <AddLoteToInventory
          id={productId}
          product={product}
          useDisclosure={{ isOpen, onClose }}
        />

        <div className="flex mt-12">
          <div className="flex flex-col flex-1 justify-center sm:justify-start">
            <h1 className="font-bebas-neue text-lg font-black flex flex-col leading-none dark:text-green-600 text-green-900">
              Todos los productos registrados
            </h1>
            <div className="flex mt-2 w-2/5">
              <Input
                size="md"
                radius="lg"
                placeholder="Buscar productos..."
                type="text"
                startContent={<FaSearch size={20} />}
                defaultValue={search}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4">
          {loading ? (
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold">Cargando...</h2>
              <CircularProgress size="lg" aria-label="Loading..." />
            </div>
          ) : error ? (
            <p>Hubo un error</p>
          ) : (
            results.map((product) => (
              <li key={product.id_producto} className="p-4 flex">
                <ProductCard product={product} route={"add-product"}>
                  <button
                    onClick={() => {
                      setProduct(product);
                      setProductId(product.id_producto);
                      onOpen();
                    }}
                  >
                    <MdAddCircleOutline size={20} className="setting-icon" />
                  </button>
                </ProductCard>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};
