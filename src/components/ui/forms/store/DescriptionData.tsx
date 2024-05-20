"use client";

import { useFormContext } from "react-hook-form";

import { INegocio } from "@/interfaces";
import { IFormDataStoreSettings } from "@/components/stores";

import {
  Textarea,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";

interface DescriptionDataProps {
  negocio: INegocio;
}

export const DescriptionForm = ({ negocio }: DescriptionDataProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<IFormDataStoreSettings>();

  return (
    <div id={"descripcion"}>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <Card className="p-6">
        <CardHeader className="flex justify-between">
          <h4 className="text-lg font-semibold">Descripción de tu negocio</h4>
        </CardHeader>
        <CardBody>
          <div>
            <Textarea
              {...register("descripcion_negocio")}
              label="Descripción"
              isDisabled={!watch("isEditing")}
              defaultValue={negocio.descripcion_negocio ?? ""}
              description="Escribe una descripción de tu negocio para que tus clientes sepan más acerca de ti."
            />
            {errors.descripcion_negocio && (
              <span className="text-red-500">
                {errors.descripcion_negocio.message}
              </span>
            )}
          </div>
        </CardBody>
      </Card>
      {/* </form> */}
    </div>
  );
};
