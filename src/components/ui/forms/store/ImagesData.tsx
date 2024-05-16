"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { negocioImagesSchema } from "@/validations/negocio.validation";
import { INegocio } from "@/interfaces";
import { hrApi } from "@/api";
import { toast } from "sonner";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
} from "@nextui-org/react";

interface ImagesDataProps {
  negocio: INegocio;
}

export const ImagesForm = ({ negocio }: ImagesDataProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleSubmit, setValue, getValues } = useForm({
    resolver: zodResolver(negocioImagesSchema),
    defaultValues: {
      images_negocio: negocio.images_negocio,
    },
  });

  const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }
    try {
      for (const file of Array.from(target.files)) {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await hrApi.post("/store/upload", formData);
        setValue(
          "images_negocio",
          [...getValues("images_negocio"), data.secure_url],
          {
            shouldValidate: true,
          }
        );
      }
    } catch (error) {
      toast("Ocurrió un error al cargar las imágenes", DANGER_TOAST);
      console.log({ error });
    }
  };

  const onDeleteImage = (image: string) => {
    setValue(
      "images_negocio",
      getValues("images_negocio").filter((img) => img !== image),
      { shouldValidate: true }
    );
  };

  const onSubmit: SubmitHandler<{ images_negocio: string[] }> = async (
    data
  ) => {
    try {
      await hrApi
        .put(`/store/${negocio.id_negocio}`, {
          ...negocio,
          images_negocio: data.images_negocio,
        })
        .then(() => {
          toast("Datos actualizados con éxito", SUCCESS_TOAST);
          window.location.reload();
          return;
        })
        .catch((err) => {
          toast("Ocurrió un error al actualizar los datos", DANGER_TOAST);
          console.error(err);
        });
      return;
    } catch (error) {
      console.error(error);
      toast("Ocurrió un error al actualizar los datos", DANGER_TOAST);
    }
  };

  return (
    <div id={"imagenes"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="p-6">
          <CardHeader className="flex justify-between">
            <h4 className="text-lg font-semibold">Imágenes de tu negocio</h4>
            <Button size="md" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancelar" : "Editar"}
            </Button>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-600">
                Agrega las imágenes de tu negocio
              </p>
              <Button
                onClick={() => fileInputRef.current?.click()}
                isDisabled={!isEditing}
              >
                Cargar imágenes
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/png, image/gif, image/jpeg"
                style={{ display: "none" }}
                onChange={onFilesSelected}
              />
            </div>
            <div className="grid grid-cols-2 gap-6 mt-6">
              {getValues("images_negocio")?.map((image, index) => (
                <div key={index}>
                  <Image
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    className="w-full max-h-96 object-cover rounded-lg"
                  />
                  <Button
                    onClick={() => onDeleteImage(image)}
                    size="sm"
                    variant="shadow"
                    isDisabled={!isEditing}
                  >
                    Eliminar
                  </Button>
                </div>
              ))}
            </div>
          </CardBody>
          <CardFooter>
            <Button isDisabled={!isEditing} type="submit">
              Guardar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
