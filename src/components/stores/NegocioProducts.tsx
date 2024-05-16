"use client";

import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { ILote, IProductoOrden } from "@/interfaces";
import { Input, Button, Checkbox } from "@nextui-org/react";
import { ProductCard, DANGER_TOAST } from "@/components";
import { BagContext } from "@/context/order";
import { FaSearch } from "react-icons/fa";
import { toast } from "sonner";

interface NegocioProductsProps {
  lotes: ILote[];
  nombre_negocio: string;
}

export const NegocioProducts = ({
  nombre_negocio,
  lotes,
}: NegocioProductsProps) => {
  const { addProductToBag } = useContext(BagContext);
  const [isSeletedFrutas, setIsSelectedFrutas] = useState(false);
  const [isSeletedVerduras, setIsSelectedVerduras] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredLotes = [...lotes];

    if (hasSearchFilter) {
      filteredLotes = filteredLotes.filter((lote) =>
        lote.producto.nombre_producto
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }
    if (isSeletedFrutas && isSeletedVerduras) {
      return filteredLotes;
    } else if (isSeletedFrutas) {
      return filteredLotes.filter(
        (lote) => lote.producto.categoria === "FRUTA"
      );
    } else if (isSeletedVerduras) {
      return filteredLotes.filter(
        (lote) => lote.producto.categoria === "VERDURA"
      );
    } else {
      return filteredLotes;
    }
  }, [filterValue, hasSearchFilter, isSeletedFrutas, isSeletedVerduras, lotes]);

  const itemsToDisplay = useMemo(() => {
    return filteredItems;
  }, [filteredItems]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);

  const onAddProduct = (product: IProductoOrden) => {
    addProductToBag(product);
  };

  return (
    <div className="pt-16 container mx-auto">
      <h1 className="font-bebas-neue uppercase text-4xl font-black flex flex-col leading-none dark:text-green-600 text-green-900">
        {nombre_negocio.replace("%20", " ")}
        <span className="text-xl dark:text-gray-300 text-gray-900 font-semibold">
          Aquí puedes ver los productos disponibles en este negocio
        </span>
      </h1>
      <div className="flex mt-2 w-2/5">
        <Input
          isClearable
          area-label="Buscar productos"
          className="w-full sm:max-w-[44%]"
          placeholder="Buscar por nombre..."
          startContent={<FaSearch size={20} />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
      </div>

      <div className="grid lg:grid-cols-6 mt-12 grid-cols-1">
        <div className="lg:col-span-1 block px-4">
          <div className="flex flex-col gap-4 mt-4">
            <h3>Filtros</h3>
            <Checkbox
              isSelected={isSeletedFrutas}
              onValueChange={setIsSelectedFrutas}
            >
              Frutas
            </Checkbox>
            <Checkbox
              isSelected={isSeletedVerduras}
              onValueChange={setIsSelectedVerduras}
            >
              Verduras
            </Checkbox>
          </div>
        </div>
        <div className="lg:col-span-5 flex justify-center lg:block">
          <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {itemsToDisplay.map((lote) => (
              <li key={lote.id_producto} className="p-2 flex">
                <ProductCard lote={lote} route={"negocio-prods-cliente"}>
                  <Button
                    className="w-full dark:text-gray-200 text-white bg-[#00994F]"
                    size="md"
                    onClick={() => {
                      onAddProduct({
                        id_producto: lote.id_producto,
                        cantidad_orden: 1,
                        monto: lote.precio_kg,
                        id_orden: undefined,
                        producto: lote.producto,
                        lote: lote,
                      });
                    }}
                  >
                    Agregar a la bolsa
                  </Button>
                </ProductCard>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
