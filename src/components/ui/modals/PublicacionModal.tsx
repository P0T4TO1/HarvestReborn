"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { IPublicacion, EstadoPublicacion } from "@/interfaces";
import { DisponibilidadPublicacion } from "@prisma/client";

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  Button,
  Image,
  Divider,
  CircularProgress,
  Link,
} from "@nextui-org/react";
import {
  FaPlayCircle,
  FaCheck,
  FaPauseCircle,
  FaRegTrashAlt,
} from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { CiViewList } from "react-icons/ci";

import { hrApi } from "@/api";
import { toast } from "sonner";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";

interface Props {
  useDisclosure: { isOpen: boolean; onClose: () => void };
  publicacion: IPublicacion;
  loading: boolean;
}

export const PublicacionModal = ({
  useDisclosure: { isOpen, onClose },
  publicacion,
  loading,
}: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onChangeEstado = async (id_publicacion: number, estado: string) => {
    setIsLoading(true);
    if (!id_publicacion) {
      toast.error(
        "Error al actualizar el estado de la publicación",
        DANGER_TOAST
      );
      setIsLoading(false);
      return;
    }
    await hrApi
      .put(`/store/publication/estado/${id_publicacion}`, {
        estado,
      })
      .then((res) => {
        if (res.status === 200) {
          toast("Estado de la publicación actualizado", SUCCESS_TOAST);
          router.push("/store/publications");
        }
      })
      .catch(() => {
        toast("Error al actualizar el estado de la publicación", DANGER_TOAST);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDelete = async (id_publicacion: number) => {
    setIsLoading(true);
    if (!id_publicacion) {
      toast("Error al eliminar la publicación", DANGER_TOAST);
      setIsLoading(false);
      return;
    }
    await hrApi
      .delete(`/store/publication/${id_publicacion}`)
      .then((res) => {
        if (res.status === 200) {
          toast("Publicación eliminada", SUCCESS_TOAST);
          router.push("/store/publications");
        }
      })
      .catch(() => {
        toast("Error al eliminar la publicación", DANGER_TOAST);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" className="max-w-3xl">
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
                <ModalHeader className="flex items-center justify-center">
                  <h2 className="text-xl font-semibold text-center">
                    Tú publicación
                  </h2>
                </ModalHeader>
                <Divider />
                <ModalBody className="grid grid-cols-1 md:grid-cols-2 py-6">
                  <div className="flex flex-col">
                    <div className="flex gap-4">
                      <Image
                        src={publicacion.images_publicacion[0]}
                        alt={publicacion.titulo_publicacion}
                        className="w-24 h-24"
                      />
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center">
                          <span className="text-red-600">
                            {publicacion.estado_publicacion !==
                              EstadoPublicacion.Activo &&
                              publicacion.estado_publicacion.charAt(0) +
                                publicacion.estado_publicacion
                                  .slice(1)
                                  .toLowerCase()}
                          </span>
                          <span className="text-md"> &#8729; </span>
                          <p className="text-lg font-semibold">
                            {publicacion.titulo_publicacion}
                          </p>
                        </div>
                        <p className="text-sm">
                          MX${publicacion.precio_publicacion}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Button
                        color="primary"
                        variant="flat"
                        className="w-full"
                        isLoading={isLoading}
                        onClick={() =>
                          onChangeEstado(
                            publicacion.id_publicacion!,
                            (publicacion.disponibilidad ===
                            DisponibilidadPublicacion.EN_VENTA
                              ? EstadoPublicacion.Vendido
                              : publicacion.disponibilidad ===
                                  DisponibilidadPublicacion.DONACION
                                ? EstadoPublicacion.Donado
                                : EstadoPublicacion.Activo) as string
                          )
                        }
                        startContent={
                          publicacion.estado_publicacion ===
                          EstadoPublicacion.Activo ? (
                            <FaCheck />
                          ) : (
                            <FaPlayCircle />
                          )
                        }
                      >
                        {publicacion.disponibilidad ===
                        DisponibilidadPublicacion.EN_VENTA
                          ? "Marcar como vendido"
                          : publicacion.disponibilidad ===
                              DisponibilidadPublicacion.DONACION
                            ? "Marcar como donado"
                            : "Marcar como disponible"}
                      </Button>
                      <div className="mt-4 flex gap-4">
                        <div className="flex flex-col items-center">
                          <Button
                            isIconOnly
                            radius="full"
                            onPress={() => {
                              onChangeEstado(
                                publicacion.id_publicacion!,
                                publicacion.estado_publicacion ===
                                  EstadoPublicacion.Pendiente
                                  ? EstadoPublicacion.Activo
                                  : EstadoPublicacion.Pendiente
                              );
                            }}
                            isDisabled={isLoading}
                          >
                            <FaPauseCircle size={21} />
                          </Button>
                          <p className="text-sm text-center">
                            {publicacion.estado_publicacion ===
                            EstadoPublicacion.Pendiente
                              ? "Marcar como disponible"
                              : "Marcar como pendiente"}
                          </p>
                        </div>
                        <div className="flex flex-col items-center">
                          <Button
                            isIconOnly
                            radius="full"
                            onPress={() => {
                              handleDelete(publicacion.id_publicacion!);
                            }}
                            isDisabled={isLoading}
                          >
                            <FaRegTrashAlt size={21} />
                          </Button>
                          <p className="text-sm text-center">
                            Eliminar publicación
                          </p>
                        </div>
                        <div className="flex flex-col items-center">
                          <Link
                            href={`market/item/edit/${publicacion.id_publicacion}`}
                          >
                            <Button
                              isIconOnly
                              radius="full"
                              isDisabled={isLoading}
                            >
                              <MdEdit size={21} />
                            </Button>
                          </Link>
                          <p className="text-sm text-center">
                            Editar publicación
                          </p>
                        </div>
                        <div className="flex flex-col items-center">
                          <Link
                            href={`/publicacion/${publicacion.id_publicacion}`}
                          >
                            <Button
                              isIconOnly
                              radius="full"
                              isDisabled={isLoading}
                            >
                              <CiViewList size={21} />
                            </Button>
                          </Link>
                          <p className="text-sm text-center">Ver publicación</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Divider orientation="vertical" />
                    <div>
                      <p className="text-lg font-semibold">
                        Descripción de la publicación
                      </p>
                      <p className="text-sm">
                        {publicacion.descripcion_publicacion}
                      </p>
                    </div>
                  </div>
                </ModalBody>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
