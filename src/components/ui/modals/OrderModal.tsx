"use client";

import React, { useContext, useState } from "react";

import { IOrden, IProductoOrden } from "@/interfaces";
import { AuthContext } from "@/context/auth";

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  Button,
  Link,
  Image,
  CircularProgress,
  Divider,
} from "@nextui-org/react";

import { chatHrefConstructor } from "@/utils/cn";

interface Props {
  useDisclosure: { isOpen: boolean; onClose: () => void };
  order: IOrden;
  products: IProductoOrden[];
  loading: boolean;
}

export const OrderModal = ({
  useDisclosure: { isOpen, onClose },
  order,
  products,
  loading,
}: Props) => {
  const { user } = useContext(AuthContext);

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            {loading ? (
              <ModalBody>
                <div className="flex justify-center items-center">
                  <CircularProgress />
                </div>
              </ModalBody>
            ) : (
              <>
                <ModalHeader>
                  <h2 className="text-lg font-semibold">
                    Orden: #{order?.id_orden}
                  </h2>
                </ModalHeader>
                <ModalBody className="max-h-[460px] overflow-y-scroll">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">Productos</h3>
                    <div className="flex flex-col">
                      {products.map((product, index) => (
                        <div key={product.id_producto}>
                          <div className="flex justify-between py-4">
                            <div className="flex">
                              <Image
                                src={product.producto?.imagen_producto}
                                alt={product.producto?.nombre_producto}
                                classNames={{
                                  wrapper:
                                    "min-w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center",
                                  img: "max-h-20 bg-transparent",
                                }}
                              />
                              <div className="flex flex-col justify-between w-full pl-2">
                                <p className="ml-2">
                                  {product.producto?.nombre_producto}
                                </p>
                                <p className="ml-2 text-gray-600">
                                  x{product.cantidad_orden} kg
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col justify-between">
                              <p className="text-sm font-semibold text-end">
                                ${product.monto} MXN
                              </p>
                            </div>
                          </div>
                          <Divider />
                        </div>
                      ))}
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Link
                    href={`/chats/chat/${chatHrefConstructor(
                      user?.id!,
                      order?.cliente?.id_user!
                    )}`}
                  >
                    <Button color="primary">
                      Contactar al cliente por chat
                    </Button>
                  </Link>
                  <Button
                    onClick={onClose}
                    disabled={loading}
                    className="ml-2"
                    color="danger"
                  >
                    Cerrar
                  </Button>
                </ModalFooter>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
