"use client";

import { useState, useEffect } from "react";

import { Tab, Tabs, Button } from "@nextui-org/react";
import {
  GeneralDataForm,
  DescriptionForm,
  ImagesForm,
  DANGER_TOAST,
  SUCCESS_TOAST,
} from "@/components";
import { toast } from "sonner";
import { FaEdit } from "react-icons/fa";

import { zodResolver } from "@hookform/resolvers/zod";
import { negocioData } from "@/validations/negocio.validation";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";

import { hrApi } from "@/api";
import { INegocio } from "@/interfaces";
import { get } from "http";

interface Props {
  negocio: INegocio;
}

export interface IFormDataStoreSettings {
  nombre_negocio: string;
  telefono_negocio: string;
  email_negocio: string;
  direccion_negocio: string;
  calle: string;
  colonia: string;
  alcaldia: string;
  cp: string;
  descripcion_negocio: string;
  images_urls: string[];
  images_files?: File[];
  isEditing: boolean;
}

export const StoreSettings = ({ negocio }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<IFormDataStoreSettings>({
    resolver: zodResolver(negocioData),
    defaultValues: {
      nombre_negocio: negocio.nombre_negocio,
      telefono_negocio: negocio.telefono_negocio,
      email_negocio: negocio.email_negocio,
      direccion_negocio: negocio.direccion_negocio,
      calle: negocio.direccion_negocio.split(",")[0],
      colonia: negocio.direccion_negocio.split(", ")[1],
      alcaldia: negocio.direccion_negocio.split(", ")[2],
      cp: negocio.direccion_negocio.split(", ")[3],
      descripcion_negocio: negocio.descripcion_negocio,
      images_urls: negocio.images_negocio,
      isEditing: false,
    },
  });

  const {
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<IFormDataStoreSettings> = async (data) => {
    data.images_files = getValues("images_files");
    setIsLoading(true);
    setIsEditing(false);
    const imagesURLs: string[] = [];
    
    try {
      if (data.images_files) {
        const formData = new FormData();
        data.images_files.forEach((file) => {
          formData.append("files", file);
        });

        await hrApi
          .post("/store/publication/upload", formData)
          .then((response) => {
            console.log("File uploaded successfully");
            imagesURLs.push(...response.data.secure_urls);
            data.images_urls = imagesURLs;
          })
          .catch((error) => {
            console.error(error, "Error al subir las imágenes a la API");
            toast("Ocurrió un error al crear la publicación", DANGER_TOAST);
          });
      }

      await hrApi
        .put(`/store/${negocio.id_negocio}`, data)
        .then(() => {
          toast("Datos actualizados con éxito", SUCCESS_TOAST);
          setIsLoading(false);
          window.location.reload();
        })
        .catch((err) => {
          toast("Ocurrió un error al actualizar los datos", DANGER_TOAST);
          setIsLoading(false);
          console.error(err);
        });
      return;
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast("Ocurrió un error al actualizar los datos", DANGER_TOAST);
      return;
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <div className="container m-auto mt-8 h-full p-4">
          <div>
            <h1 className="text-2xl font-black flex flex-col gap-4 leading-none dark:text-green-600 text-green-900">
              Tú negocio
            </h1>
            <Button
              type="button"
              color="success"
              className="my-4"
              size="md"
              onClick={() => {
                setIsEditing(!isEditing);
                setValue("isEditing", !isEditing);
              }}
              startContent={<FaEdit size={20} />}
            >
              {isEditing ? "Cancelar" : "Editar"}
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <Button
                isLoading={isLoading}
                isDisabled={!isEditing}
                type="submit"
              >
                Guardar
              </Button>
              <div className="container m-auto h-full py-4">
                {errors.descripcion_negocio && (
                  <span className="text-red-500 text-sm">
                    {errors.descripcion_negocio.message}
                  </span>
                )}
                {errors.images_urls && (
                  <span className="text-red-500 text-sm">
                    {errors.images_urls.message}
                  </span>
                )}
              </div>
              <Tabs variant="underlined" aria-label="Tabs variants">
                <Tab title="Datos del negocio">
                  <GeneralDataForm negocio={negocio} />
                </Tab>
                <Tab title="Descripción">
                  <DescriptionForm negocio={negocio} />
                </Tab>
                <Tab title="Imágenes">
                  <ImagesForm negocio={negocio} />
                </Tab>
              </Tabs>
            </form>
          </div>
        </div>
      </FormProvider>
    </>
  );
};
