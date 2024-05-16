"use client";

import React, { useState } from "react";

import { IOrden } from "@/interfaces";
import { hrApi } from "@/api";

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  Button,
  CircularProgress,
} from "@nextui-org/react";
import { toast } from "sonner";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";

interface RejectOrderProps {
  loading: boolean;
  order: IOrden;
  useDisclosure: { isOpen: boolean; onClose: () => void };
  tipo: string;
}

export const ChangeStatus = ({
  order,
  useDisclosure: { isOpen, onClose },
  loading,
  tipo,
}: RejectOrderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRejectOrder = (id_orden: string) => {
    setIsLoading(true);
    try {
      hrApi
        .put(`/store/orders/estado/${id_orden}`, {
          estado: "RECHAZADO",
        })
        .then((res) => {
          if (res.status === 200) {
            toast("Pedido rechazado", SUCCESS_TOAST);
          }
          setIsLoading(false);
          onClose();
          window.location.reload();
        })
        .catch(() => {
          toast("Error al rechazar el pedido", DANGER_TOAST);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      toast("Error al rechazar el pedido", DANGER_TOAST);
    }
  };

  const handleCancelOrder = (id_orden: string) => {
    setIsLoading(true);
    try {
      hrApi
        .put(`/store/orders/status/${id_orden}`, {
          estado: "CANCELADO",
        })
        .then((res) => {
          if (res.status === 200) {
            toast("Pedido cancelado", SUCCESS_TOAST);
          }
          setIsLoading(false);
          onClose();
          window.location.reload();
        })
        .catch(() => {
          toast("Error al cancelar el pedido", DANGER_TOAST);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      toast("Error al cancelar el pedido", DANGER_TOAST);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
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
                <ModalBody className="max-h-[460px]">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-semibold">
                      {tipo === "rechazar"
                        ? "¿Estás seguro de rechazar el pedido?"
                        : "¿Estás seguro de cancelar el pedido?"}
                    </h3>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="ghost"
                    color="danger"
                    isLoading={isLoading}
                    onPress={() => {
                      tipo === "rechazar"
                        ? handleRejectOrder(order.id_orden!)
                        : handleCancelOrder(order.id_orden!);
                    }}
                  >
                    {tipo === "rechazar" ? "Rechazar" : "Cancelar"}
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
