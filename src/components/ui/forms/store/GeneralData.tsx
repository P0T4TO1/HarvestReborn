"use client";

import { useFormContext } from "react-hook-form";

import {
  Input,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";

import { INegocio } from "@/interfaces";
import { IFormDataStoreSettings } from "@/components/stores";

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
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<IFormDataStoreSettings>();

  return (
    <div id={"negocio"}>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <Card className="p-6">
        <CardHeader className="flex justify-between">
          <h1 className="text-2xl font-semibold">Datos del negocio</h1>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Input
                label="Nombre del negocio"
                defaultValue={negocio.nombre_negocio}
                isDisabled={!watch("isEditing")}
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
                isDisabled={!watch("isEditing")}
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
                isDisabled={!watch("isEditing")}
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
                  isDisabled={!watch("isEditing")}
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
                  isDisabled={!watch("isEditing")}
                />
                {errors.colonia && (
                  <span className="text-red-500">{errors.colonia.message}</span>
                )}
              </div>
              <div>
                <Input
                  label="Alcaldía"
                  defaultValue={negocio.direccion_negocio.split(",")[2]}
                  {...register("alcaldia")}
                  isDisabled={!watch("isEditing")}
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
                  isDisabled={!watch("isEditing")}
                />
                {errors.cp && (
                  <span className="text-red-500">{errors.cp.message}</span>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      {/* </form> */}
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
