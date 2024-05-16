"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { negocioDescriptionSchema } from "@/validations/negocio.validation";
import { INegocio } from "@/interfaces";
import { hrApi } from "@/api";
import { toast } from "sonner";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";
import {
  Textarea,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "@nextui-org/react";

interface DescriptionDataProps {
  negocio: INegocio;
}

interface IFormData {
  descripcion_negocio: string;
}

export const DescriptionForm = ({ negocio }: DescriptionDataProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(negocioDescriptionSchema),
    defaultValues: {
      descripcion_negocio: negocio.descripcion_negocio ?? "",
    },
  });

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      await hrApi
        .put(`/store/${negocio.id_negocio}`, {
          ...negocio,
          descripcion_negocio: data.descripcion_negocio,
        })
        .then((res) => {
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
      return;
    }
  };

  return (
    <div id={"descripcion"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="p-6">
          <CardHeader className="flex justify-between">
            <h4 className="text-lg font-semibold">Descripción de tu negocio</h4>
            <Button size="md" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancelar" : "Editar"}
            </Button>
          </CardHeader>
          <CardBody>
            <div>
              <Textarea
                {...register("descripcion_negocio")}
                label="Descripción"
                errorMessage={errors.descripcion_negocio?.message}
                isDisabled={!isEditing}
                defaultValue={negocio.descripcion_negocio ?? ""}
                description="Escribe una descripción de tu negocio para que tus clientes sepan más acerca de ti."
              />
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
