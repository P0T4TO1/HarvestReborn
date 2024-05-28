"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import React, { useState } from "react";
import { hrApi } from "@/api";
import { toast } from "sonner";
import { SUCCESS_TOAST, DANGER_TOAST } from "@/components";

interface Props {
  useDisclosure: {
    isOpen: boolean;
    onOpenChange: () => void;
  };
  loading: boolean;
  id: string;
}

export const DeleteUserConfirm = ({
  useDisclosure: { isOpen, onOpenChange },
  loading,
  id,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await hrApi.delete(`/admin/users/${id}`).then(() => {
        toast("Usuario eliminado correctamente", SUCCESS_TOAST);
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast("Error al eliminar el usuario", DANGER_TOAST);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Eliminar usuario</ModalHeader>
            <ModalBody>
              <p>¿Estás seguro de que deseas eliminar este usuario?</p>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={onClose}
                color="primary"
                variant="ghost"
                isDisabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                onClick={() => handleDelete(id)}
                isLoading={isLoading}
                color="danger"
              >
                Eliminar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
