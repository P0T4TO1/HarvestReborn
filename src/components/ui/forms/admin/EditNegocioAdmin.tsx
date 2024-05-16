"use client";

import {
  Input,
  Button,
  CircularProgress,
  SelectItem,
  Select,
} from "@nextui-org/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { hrApi } from "@/api";
import { toast } from "sonner";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";
import { adminEditNegocioValidation } from "@/validations/admin.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Estado, INegocio } from "@/interfaces";

interface IFormData {
  nombre_negocio: string;
  direccion_negocio: string;
  calle: string;
  colonia: string;
  alcaldia: string;
  cp: string;
  telefono_negocio: string;
  email_negocio?: string;
  descripcion_negocio?: string;
  estado_negocio: Estado;
}

interface Props {
  negocio: INegocio;
  isEditing: boolean;
}

export const EditNegocioAdmin = ({ negocio, isEditing }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(adminEditNegocioValidation),
    defaultValues: {
      nombre_negocio: negocio.nombre_negocio ?? "",
      direccion_negocio: negocio.direccion_negocio ?? "",
      calle: negocio.direccion_negocio.split(", ")[0] ?? "",
      colonia: negocio.direccion_negocio.split(", ")[1] ?? "",
      alcaldia: negocio.direccion_negocio.split(", ")[2] ?? "",
      cp: negocio.direccion_negocio.split(", ")[3] ?? "",
      telefono_negocio: negocio.telefono_negocio ?? "",
      email_negocio: negocio.email_negocio ?? "",
      descripcion_negocio: negocio.descripcion_negocio ?? "",
      estado_negocio: negocio.estado_negocio ?? "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    setLoading(true);
    try {
      const res = await hrApi.put(
        `/admin/users/stores/${negocio.id_negocio}`,
        data
      );
      if (res.status === 200) {
        toast("Negocio actualizado correctamente", SUCCESS_TOAST);
        window.location.reload();
      } else {
        toast("Error al actualizar el negocio", DANGER_TOAST);
        setError(true);
        setLoading(false);
      }
    } catch (error) {
      toast("Error al actualizar el negocio", DANGER_TOAST);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="my-10 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <p>Hubo un error</p>
      ) : (
        <>
          <div className="max-w-[95rem] mx-auto w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold mb-4">
                  Información del negocio
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Input
                    {...register("nombre_negocio")}
                    label="Nombre del negocio"
                    defaultValue={negocio.nombre_negocio}
                    isDisabled={!isEditing}
                  />
                  {errors.nombre_negocio && (
                    <span className="text-red-500">
                      {errors.nombre_negocio.message}
                    </span>
                  )}
                </div>
                <div>
                  <Input
                    {...register("direccion_negocio")}
                    label="Dirección del negocio"
                    defaultValue={negocio.direccion_negocio}
                    isDisabled={!isEditing}
                  />
                  {errors.direccion_negocio && (
                    <span className="text-red-500">
                      {errors.direccion_negocio.message}
                    </span>
                  )}
                </div>
                <div>
                  <Input
                    {...register("calle")}
                    label="Calle"
                    defaultValue={negocio.direccion_negocio.split(", ")[0]}
                    isDisabled={!isEditing}
                  />
                  {errors.calle && (
                    <span className="text-red-500">{errors.calle.message}</span>
                  )}
                </div>
                <div>
                  <Input
                    {...register("colonia")}
                    label="Colonia"
                    defaultValue={negocio.direccion_negocio.split(", ")[1]}
                    isDisabled
                  />
                  {errors.colonia && (
                    <span className="text-red-500">
                      {errors.colonia.message}
                    </span>
                  )}
                </div>
                <div>
                  <Input
                    {...register("alcaldia")}
                    label="Alcaldía"
                    defaultValue={negocio.direccion_negocio.split(", ")[2]}
                    isDisabled
                  />
                  {errors.alcaldia && (
                    <span className="text-red-500">
                      {errors.alcaldia.message}
                    </span>
                  )}
                </div>
                <div>
                  <Input
                    {...register("cp")}
                    label="Código Postal"
                    defaultValue={negocio.direccion_negocio.split(", ")[3]}
                    isDisabled={!isEditing}
                  />
                  {errors.cp && (
                    <span className="text-red-500">{errors.cp.message}</span>
                  )}
                </div>
                <div>
                  <Input
                    {...register("telefono_negocio")}
                    label="Teléfono del negocio"
                    defaultValue={negocio.telefono_negocio}
                    isDisabled={!isEditing}
                  />
                  {errors.telefono_negocio && (
                    <span className="text-red-500">
                      {errors.telefono_negocio.message}
                    </span>
                  )}
                </div>
                <div>
                  <Input
                    {...register("email_negocio")}
                    label="Email del negocio"
                    defaultValue={negocio.email_negocio}
                    isDisabled={!isEditing}
                  />
                  {errors.email_negocio && (
                    <span className="text-red-500">
                      {errors.email_negocio.message}
                    </span>
                  )}
                </div>
                <div>
                  <Select
                    radius="sm"
                    id="estado_negocio"
                    label="Estado"
                    isDisabled={!isEditing}
                    defaultSelectedKeys={[negocio.estado_negocio]}
                    {...register("estado_negocio")}
                  >
                    <SelectItem key={"ACTIVO"} value="ACTIVO">
                      Activo
                    </SelectItem>
                    <SelectItem key={"INACTIVO"} value="INACTIVO">
                      Inactivo
                    </SelectItem>
                    <SelectItem key={"PENDIENTE"} value="PENDIENTE">
                      Pendiente
                    </SelectItem>
                  </Select>
                  {errors.estado_negocio && (
                    <span className="text-red-500">
                      {errors.estado_negocio.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <p className="text-lg font-semibold my-4">Dueño del negocio</p>
                <div>
                  <div className="relative font-medium">
                    <p className="ml-2 mb-2 text-sm">Nombre del dueño</p>
                    <span>{negocio.dueneg.nombre_dueneg}</span>
                  </div>
                </div>
                <div>
                  <div className="relative font-medium">
                    <p className="ml-2 mb-2 text-sm">Apellidos del dueño</p>
                    <span>{negocio.dueneg.apellidos_dueneg}</span>
                  </div>
                </div>
                <div>
                  <div className="relative font-medium">
                    <p className="ml-2 mb-2 text-sm">Correo del dueño</p>
                    <span>{negocio.dueneg.user?.email}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-start mt-4">
                <Button isDisabled={!isEditing} type="submit" color="success">
                  Guardar
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
