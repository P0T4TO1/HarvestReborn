"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerPersonalDataSchema } from "@/validations/auth.validation";
import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { zodResolver } from "@hookform/resolvers/zod";

interface IFormData {
  nombre: string;
  apellidos: string;
  dia_nacimiento?: string;
  mes_nacimiento?: string;
  year_nacimiento?: string;
  fecha_nacimiento: string;
  tipo: string;
}

const months = [
  { key: "01", value: "Enero" },
  { key: "02", value: "Febrero" },
  { key: "03", value: "Marzo" },
  { key: "04", value: "Abril" },
  { key: "05", value: "Mayo" },
  { key: "06", value: "Junio" },
  { key: "07", value: "Julio" },
  { key: "08", value: "Agosto" },
  { key: "09", value: "Septiembre" },
  { key: "10", value: "Octubre" },
  { key: "11", value: "Noviembre" },
  { key: "12", value: "Diciembre" },
];

interface PersonalDataFormProps {
  isOAuth?: boolean;
}

export const PersonalDataForm = ({ isOAuth }: PersonalDataFormProps) => {
  const { setPersonalData, setIndexActive, user, personalData } =
    useContext(AuthContext);

  const { register, handleSubmit, formState, watch } = useForm<IFormData>({
    resolver: zodResolver(registerPersonalDataSchema),
    defaultValues: {
      nombre: personalData.nombre ?? "",
      apellidos: personalData.apellidos ?? "",
      dia_nacimiento: "",
      mes_nacimiento: "",
      year_nacimiento: "",
      fecha_nacimiento: "",
      tipo: "",
    },
  });

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    data.fecha_nacimiento = `${data.year_nacimiento}-${data.mes_nacimiento}-${data.dia_nacimiento}`;
    try {
      setPersonalData(data);
      setIndexActive(3);
    } catch (error) {
      toast.error("Error al registrar usuario");
    }
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 grid-flow-row gap-6">
          <div className="relative">
            <Input
              type="text"
              id="nombre"
              label="Nombre(s)"
              isDisabled={user?.id_rol === 4}
              defaultValue={personalData.nombre ?? ""}
              {...register("nombre")}
            />
            <p className="text-red-700 text-xs">
              {formState.errors.nombre?.message}
            </p>
          </div>

          <div className="relative">
            <Input
              type="text"
              id="apellidos"
              label="Apellidos"
              isDisabled={user?.id_rol === 4}
              defaultValue={personalData.apellidos ?? ""}
              {...register("apellidos")}
            />
            {formState.errors?.apellidos && (
              <p className="text-red-700 text-xs">
                {formState.errors.apellidos?.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="relative">
            <p className="ml-2 mb-2 text-sm text-gray-600 font-medium">
              Fecha de nacimiento
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="relative">
              <Input
                radius="sm"
                id="dia_nacimiento"
                type="text"
                label="Día"
                {...register("dia_nacimiento")}
              />
              {formState.errors?.dia_nacimiento && (
                <p className="text-red-700 text-xs">
                  {formState.errors.dia_nacimiento?.message}
                </p>
              )}
            </div>
            <div className="relative">
              <Select
                isRequired
                radius="sm"
                id="mes_nacimiento"
                label="Mes"
                {...register("mes_nacimiento")}
              >
                {months.map((month) => (
                  <SelectItem value={month.key} key={month.key}>
                    {month.value}
                  </SelectItem>
                ))}
              </Select>
              {formState.errors?.mes_nacimiento && (
                <p className="text-red-700 text-xs">
                  {formState.errors.mes_nacimiento?.message}
                </p>
              )}
            </div>
            <div className="relative">
              <Input
                radius="sm"
                id="año_nacimiento"
                type="text"
                label="Año"
                {...register("year_nacimiento")}
              />
              {formState.errors?.year_nacimiento && (
                <p className="text-red-700 text-xs">
                  {formState.errors.year_nacimiento?.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          <Select
            isRequired
            radius="sm"
            label="Tipo de usuario"
            id="tipo"
            {...register("tipo")}
          >
            <SelectItem value="negocio" key="negocio">
              Negocio local
            </SelectItem>
            <SelectItem value="cliente" key="cliente">
              Cliente
            </SelectItem>
          </Select>
          {formState.errors?.tipo && (
            <p className="text-red-700 text-xs">
              {formState.errors.tipo?.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center bg-green-800 hover:bg-green-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
        >
          Siguiente
        </button>
        {!isOAuth && (
          <button
            type="button"
            onClick={() => setIndexActive(1)}
            className="w-full flex justify-center bg-gray-800 hover:bg-gray-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
          >
            Regresar
          </button>
        )}
      </form>
    </>
  );
};
