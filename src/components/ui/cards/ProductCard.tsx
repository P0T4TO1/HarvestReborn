"use client";

import { FC, ReactNode } from "react";
import { ILote, IProduct } from "@/interfaces";
import { Card, CardBody, Image } from "@nextui-org/react";

interface Props {
  children?: ReactNode;
  lote?: ILote;
  product?: IProduct;
  route: string;
}

export const ProductCard: FC<Props> = ({ lote, product, children, route }) => {
  return (
    <>
      {route === "add-product" ? (
        <>
          <Card className="product">
            <div className="left-side bg-[#87b663]">
              <Image src={product?.imagen_producto} alt="" className="image" />
            </div>
            <div className="right-side flex flex-col border-1 border-gray-300">
              <h2 className="name text-md font-semibold text-center">
                {product?.nombre_producto}
              </h2>
              {product && (
                <div className="setting-icon-container">{children}</div>
              )}
            </div>
          </Card>
        </>
      ) : route === "negocio-prods-cliente" ? (
        <Card>
          <CardBody className="overflow-visible p-0 grid grid-cols-2">
            <div className="flex justify-center">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={lote?.producto.nombre_producto}
                className="w-full object-cover min-h-[140px]"
                src={lote?.producto?.imagen_producto}
                classNames={{
                  img: "max-h-[152px]",
                }}
              />
            </div>
            <div className="flex flex-col px-4 w-full">
              <h4 className="text-lg font-semibold mt-2">
                {lote?.producto.nombre_producto}
              </h4>
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">
                  Quedan {lote?.cantidad_producto} kg
                </p>
                <p className="text-lg font-semibold text-green-800 mt-2">
                  ${lote?.precio_kg} el kg
                </p>
              </div>
              <div className="flex h-full items-end mb-2">{children}</div>
            </div>
          </CardBody>
        </Card>
      ) : null}
    </>
  );
};

export default ProductCard;
