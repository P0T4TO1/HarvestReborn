"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { negocioGeneralDataSchema } from "@/validations/negocio.validation";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "@nextui-org/react";
import { toast } from "sonner";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";
import { hrApi } from "@/api";
import { INegocio } from "@/interfaces";

interface Props {
  negocio: INegocio;
}

interface IFormData {
  nombre_negocio: string;
  telefono_negocio: string;
  email_negocio: string;
  direccion_negocio: string;
  calle: string;
  colonia: string;
  alcaldia: string;
  cp: string;
}

export const GeneralDataForm = ({ negocio }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(negocioGeneralDataSchema),
    defaultValues: {
      nombre_negocio: negocio.nombre_negocio,
      telefono_negocio: negocio.telefono_negocio,
      email_negocio: negocio.email_negocio,
      direccion_negocio: negocio.direccion_negocio,
      calle: negocio.direccion_negocio.split(",")[0],
      colonia: negocio.direccion_negocio.split(",")[1],
      alcaldia: negocio.direccion_negocio.split(",")[2],
      cp: negocio.direccion_negocio.split(",")[3],
    },
  });

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      await hrApi
        .put(`/store/${negocio.id_negocio}`, data)
        .then(() => {
          toast("Datos actualizados con éxito", SUCCESS_TOAST);
          window.location.reload();
        })
        .catch((error) => {
          toast("Error al actualizar los datos", DANGER_TOAST);
          console.error(error);
        });
      return;
    } catch (error) {
      toast("Hubo un error", DANGER_TOAST);
      console.error(error);
      return null;
    }
  };

  return (
    <div id={"negocio"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="p-6">
          <CardHeader className="flex justify-between">
            <h1 className="text-2xl font-semibold">Datos del negocio</h1>
            <Button size="md" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancelar" : "Editar"}
            </Button>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Input
                  label="Nombre del negocio"
                  defaultValue={negocio.nombre_negocio}
                  isDisabled={!isEditing}
                  {...register("nombre_negocio")}
                />
                {errors.nombre_negocio && (
                  <span className="text-red-500">
                    {errors.nombre_negocio.message}
                  </span>
                )}
              </div>
              <div>
                <Input
                  label="Teléfono"
                  isDisabled={!isEditing}
                  defaultValue={negocio.telefono_negocio}
                  {...register("telefono_negocio")}
                />
                {errors.telefono_negocio && (
                  <span className="text-red-500">
                    {errors.telefono_negocio.message}
                  </span>
                )}
              </div>
              <div>
                <Input
                  label="Correo electrónico"
                  isDisabled={!isEditing}
                  defaultValue={negocio.email_negocio}
                  {...register("email_negocio")}
                />
                {errors.email_negocio && (
                  <span className="text-red-500">
                    {errors.email_negocio.message}
                  </span>
                )}
              </div>
              <div>
                <Input
                  label="Dirección del negocio"
                  defaultValue={negocio.direccion_negocio}
                  {...register("direccion_negocio")}
                  isDisabled
                />
                {errors.direccion_negocio && (
                  <span className="text-red-500">
                    {errors.direccion_negocio.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mt-6">Dirección</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Input
                    label="Calle"
                    defaultValue={negocio.direccion_negocio.split(",")[0]}
                    {...register("calle")}
                    isDisabled={!isEditing}
                  />
                  {errors.calle && (
                    <span className="text-red-500">{errors.calle.message}</span>
                  )}
                </div>
                <div>
                  <Input
                    label="Colonia"
                    defaultValue={negocio.direccion_negocio.split(",")[1]}
                    {...register("colonia")}
                    isDisabled={!isEditing}
                  />
                  {errors.colonia && (
                    <span className="text-red-500">
                      {errors.colonia.message}
                    </span>
                  )}
                </div>
                <div>
                  <Input
                    label="Alcaldía"
                    defaultValue={negocio.direccion_negocio.split(",")[2]}
                    {...register("alcaldia")}
                    isDisabled={!isEditing}
                  />
                  {errors.alcaldia && (
                    <span className="text-red-500">
                      {errors.alcaldia.message}
                    </span>
                  )}
                </div>
                <div>
                  <Input
                    label="Código Postal"
                    defaultValue={negocio.direccion_negocio.split(",")[3]}
                    {...register("cp")}
                    isDisabled={!isEditing}
                  />
                  {errors.cp && (
                    <span className="text-red-500">{errors.cp.message}</span>
                  )}
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <Button isDisabled={!isEditing} type="submit">
              Guardar
            </Button>
          </CardFooter>
        </Card>
      </form>
      <div className="container mt-4">
        <iframe
          style={{ border: "0" }}
          width="100%"
          height="450"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAIAxu9rSTpzfa_kkep1niIDxKvMtypqXM&q=${negocio?.direccion_negocio}`}
        ></iframe>
      </div>
    </div>
  );
};
