"use client";

import React, { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

import { BagContext } from "@/context/order";
import { AuthContext } from "@/context/auth";
import { BagType, IProductoOrden } from "@/interfaces";
import { chatHrefConstructor } from "@/utils/cn";
import { hrApi } from "@/api";

import {
  Divider,
  Image,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "@nextui-org/react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  MdDeleteSweep,
  MdOutlineDoNotDisturbOn,
  MdAddCircleOutline,
  MdOutlineClose,
} from "react-icons/md";
import { DANGER_TOAST, SUCCESS_TOAST, WARNING_TOAST } from "@/components";

interface BagListProps {
  editable?: boolean;
  products?: BagType;
}

export const BagList = ({ editable = false, products }: BagListProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    bag,
    clearBag,
    removeBagProduct,
    updateBagQuantity,
    numberOfProducts,
    createOrder,
    total,
  } = useContext(BagContext);
  const { data: Session } = useSession();
  const { user } = useContext(AuthContext);

  const onNewQuantity = (
    product: IProductoOrden,
    quantity: number,
    monto: number
  ) => {
    updateBagQuantity({ ...product, cantidad_orden: quantity, monto: monto });
  };

  const productsInBag = products ? products : bag;

  const onCreateOrder = () => {
    setIsLoading(true);
    if (!Session) {
      return toast(
        "Debes iniciar sesión para realizar un pedido",
        WARNING_TOAST
      );
    }
    createOrder(
      user?.cliente?.id_cliente!,
      user?.cliente?.historial.id_historial!
    )
      .then((res) => {
        if (res.hasError) {
          toast(res.message, DANGER_TOAST);
          return setIsLoading(false);
        }
        console.log(res);
        toast(res.message, SUCCESS_TOAST);
        setIsLoading(false);
        return router.push(`/orders`);
      })
      .catch(() => {
        toast("Hubo un error al realizar el pedido", DANGER_TOAST);
      });
  };

  return (
    <>
      <div className="pt-16 container mx-auto">
        <div className="flex justify-between">
          <h1 className="font-bebas-neue uppercase text-4xl font-black flex flex-col leading-none dark:text-green-600 text-green-900">
            Tu bolsa
          </h1>
          <Button
            onClick={clearBag}
            color="danger"
            startContent={<MdDeleteSweep size={25} />}
          >
            Limpiar bolsa
          </Button>
        </div>
        <div className="mt-6 grid lg:grid-cols-3 grid-cols-1">
          <div className="lg:col-span-2 pr-6">
            {productsInBag.map((product) => (
              <div
                key={
                  product.id_negocio +
                  product.productos.map((p) => p.id_producto).join("")
                }
                className="w-full"
              >
                <h3 className="text-lg mt-4">{product.nombre_negocio}</h3>
                {product.productos.map((p) => (
                  <>
                    <Divider />
                    <div className="grid grid-cols-4 py-4">
                      <div>
                        <Image
                          src={p.producto?.imagen_producto}
                          alt={p.producto?.nombre_producto}
                          width="100"
                          height="100"
                        />
                      </div>
                      <div className="flex flex-col items justify-center">
                        <p>{p.producto?.nombre_producto}</p>
                        <p>${p.monto}</p>
                      </div>
                      <div className="flex items-center justify-center">
                        {editable && (
                          <>
                            <Button
                              isIconOnly
                              isDisabled={p.cantidad_orden === 1}
                              onClick={() =>
                                onNewQuantity(
                                  p,
                                  p.cantidad_orden - 1,
                                  p.monto - p.monto / p.cantidad_orden
                                )
                              }
                              variant="light"
                              size="sm"
                            >
                              <MdOutlineDoNotDisturbOn size={25} />
                            </Button>
                            <span className="mx-4">
                              {p.cantidad_orden.toString()} kg
                            </span>
                            <Button
                              isIconOnly
                              onClick={() =>
                                onNewQuantity(
                                  p,
                                  p.cantidad_orden + 1,
                                  p.monto + p.monto / p.cantidad_orden
                                )
                              }
                              variant="light"
                              size="sm"
                            >
                              <MdAddCircleOutline size={25} />
                            </Button>
                          </>
                        )}
                      </div>
                      <div className="flex justify-end">
                        <Button
                          isIconOnly
                          onClick={() => removeBagProduct(p)}
                          color="danger"
                          variant="light"
                          size="sm"
                        >
                          <MdOutlineClose size={25} />
                        </Button>
                      </div>
                    </div>
                    <Divider />
                  </>
                ))}
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <Card
              classNames={{
                base: "border-1 border-gray-300",
              }}
            >
              <CardHeader className="py-8 px-8">
                <h3 className="text-2xl font-semibold">Resumen de pedido</h3>
              </CardHeader>
              <CardBody className="pt-2 px-8 pb-2">
                <p className="pb-4">
                  Productos:{" "}
                  {productsInBag
                    .map((product) => product.productos.length)
                    .reduce((a, b) => a + b, 0)}
                </p>
                <p className="pb-4">Cantidad: {numberOfProducts} kg</p>
                <Divider className="mb-4" />
                {productsInBag.map((product, index) => (
                  <p className="pb-2" key={index}>
                    {product.nombre_negocio}: ${product.total}
                  </p>
                ))}
                <p className="pb-4 pt-2">Total: ${total}</p>
              </CardBody>
              <CardFooter className="p-8 w-full">
                <Button
                  color="success"
                  className="w-full"
                  onClick={() => onCreateOrder()}
                  isLoading={isLoading}
                >
                  Realizar pedido
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
