"use client";

import { useContext, useEffect, useState } from "react";
import {
  clienteProfileSchema,
  duenegProfileSchema,
} from "@/validations/profile.validation";
import { IUser } from "@/interfaces";
import { AuthContext } from "@/context/auth";
import { hrApi } from "@/api";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

interface IFormData {
  dueneg?: {
    nombre_dueneg: string;
    apellidos_dueneg: string;
    dia_nacimiento: string;
    mes_nacimiento: string;
    year_nacimiento: string;
    fecha_nacimiento?: string;
    negocio: {
      nombre_negocio: string;
      direccion_negocio: string;
      calle: string;
      colonia: string;
      alcaldia: string;
      cp: string;
      telefono_negocio: string;
      email_negocio?: string;
    };
  };

  cliente?: {
    nombre_cliente: string;
    apellidos_cliente: string;
    telefono_cliente: string;
    dia_nacimiento: string;
    mes_nacimiento: string;
    year_nacimiento: string;
    fecha_nacimiento?: string;
    nombre_negocio?: string;
    direccion_negocio?: string;
    calle?: string;
    colonia?: string;
    alcaldia?: string;
    cp: string;
  };
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

interface ProfileFormProps {
  profile: IUser;
  isEditing: boolean;
}

interface IResponse {
  c_cve_ciudad: string;
  d_codigo: string;
  d_asenta: string;
  d_tipo_asenta: string;
  D_mnpio: string;
  d_estado: string;
  d_ciudad: string;
  d_CP: string;
  c_estado: string;
  c_oficina: string;
  c_CP: string;
  c_tipo_asenta: string;
  c_mnpio: string;
  id_asenta_cpcons: string;
  d_zona: string;
}

export const ProfileForm = ({ profile, isEditing }: ProfileFormProps) => {
  const { user } = useContext(AuthContext);
  const [postalCode, setPostalCode] = useState(
    profile.duenonegocio?.negocio?.direccion_negocio?.split(", ")[3] ??
      profile.cliente?.direccion_negocio?.split(", ")[3]
  );
  const [alcaldia, setAlcaldia] = useState(
    profile.duenonegocio?.negocio?.direccion_negocio?.split(", ")[2] ??
      profile.cliente?.direccion_negocio?.split(", ")[2]
  );
  const [colonia, setColonia] = useState(
    profile.duenonegocio?.negocio?.direccion_negocio?.split(", ")[1] ??
      profile.cliente?.direccion_negocio?.split(", ")[1]
  );
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<IFormData>({
    resolver:
      user?.id_rol === 2
        ? zodResolver(duenegProfileSchema)
        : zodResolver(clienteProfileSchema),
    defaultValues: {
      dueneg: {
        nombre_dueneg: profile.duenonegocio?.nombre_dueneg ?? "",
        apellidos_dueneg: profile.duenonegocio?.apellidos_dueneg ?? "",
        fecha_nacimiento: profile.duenonegocio?.fecha_nacimiento ?? "",
        dia_nacimiento: profile.duenonegocio?.fecha_nacimiento
          ?.toString()
          .split("-")[2]
          .split("T")[0],
        mes_nacimiento:
          months.find(
            (month) =>
              month.key ===
              profile.duenonegocio?.fecha_nacimiento?.toString().split("-")[1]
          )?.value ?? "",
        year_nacimiento: profile.duenonegocio?.fecha_nacimiento
          ?.toString()
          .split("-")[0],
        negocio: {
          nombre_negocio: profile.duenonegocio?.negocio?.nombre_negocio ?? "",
          direccion_negocio:
            profile.duenonegocio?.negocio?.direccion_negocio ?? "",
          calle:
            profile.duenonegocio?.negocio?.direccion_negocio?.split(",")[0],
          colonia:
            profile.duenonegocio?.negocio?.direccion_negocio?.split(", ")[1],
          alcaldia:
            profile.duenonegocio?.negocio?.direccion_negocio?.split(", ")[2],
          cp: profile.duenonegocio?.negocio?.direccion_negocio?.split(", ")[3],
          telefono_negocio:
            profile.duenonegocio?.negocio?.telefono_negocio ?? "",
          email_negocio: profile.duenonegocio?.negocio?.email_negocio ?? "",
        },
      },
      cliente: {
        nombre_cliente: profile.cliente?.nombre_cliente ?? "",
        apellidos_cliente: profile.cliente?.apellidos_cliente ?? "",
        telefono_cliente: profile.cliente?.telefono_cliente ?? "",
        fecha_nacimiento: profile.cliente?.fecha_nacimiento ?? "",
        nombre_negocio: profile.cliente?.nombre_negocio ?? "",
        direccion_negocio: profile.cliente?.direccion_negocio ?? "",
        dia_nacimiento: profile.cliente?.fecha_nacimiento
          ?.toString()
          .split("-")[2]
          .split("T")[0],
        mes_nacimiento:
          months.find(
            (month) =>
              month.key ===
              profile.cliente?.fecha_nacimiento?.toString().split("-")[1]
          )?.value ?? "",
        year_nacimiento: profile.cliente?.fecha_nacimiento
          ?.toString()
          .split("-")[0],
        calle: profile.cliente?.direccion_negocio?.split(",")[0],
        colonia: profile.cliente?.direccion_negocio?.split(", ")[1],
        alcaldia: profile.cliente?.direccion_negocio?.split(", ")[2],
        cp: profile.cliente?.direccion_negocio?.split(", ")[3],
      },
    },
  });

  useEffect(() => {
    if (postalCode?.length === 5) {
      axios.get("/CP_CDMX.json").then((direction) => {
        console.log(direction, "direction");
        if (direction) {
          if (
            direction.data.some(
              (item: IResponse) => item.d_codigo === postalCode
            )
          ) {
            setError("dueneg.negocio.cp", { message: "" });
          } else {
            setError("dueneg.negocio.cp", {
              message: "Código postal no encontrado",
            });
            return;
          }
          direction.data.map((item: IResponse) => {
            if (item.d_codigo !== postalCode) {
              return;
            } else {
              const coloniaString = item.d_asenta;
              const municipioString = item.D_mnpio;
              setError("dueneg.negocio.cp", { message: "" });
              setError("cliente.cp", { message: "" });
              setColonia(coloniaString);
              setAlcaldia(municipioString);
            }
          });
        } else {
          return;
        }
      });
    }
  }, [postalCode, setError]);

  const onUpdateProfile: SubmitHandler<IFormData> = async (data) => {
    setIsLoading(true);
    try {
      let id_duenonegocio = user?.duenonegocio?.id_dueneg;
      let id_cliente = user?.cliente?.id_cliente;
      await hrApi
        .put(`/user/profile/${user?.id}`, {
          ...data,
          id_duenonegocio,
          id_cliente,
          fecha_nacimiento_d: `${data.dueneg?.year_nacimiento}-${data.dueneg?.mes_nacimiento}-${data.dueneg?.dia_nacimiento}`,
          fecha_nacimiento_c: `${data.cliente?.year_nacimiento}-${data.cliente?.mes_nacimiento}-${data.cliente?.dia_nacimiento}`,
        })
        .then((res) => {
          if (res.status === 200) {
            toast("Perfil actualizado", SUCCESS_TOAST);
            window.location.reload();
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err, "hubo un error");
          toast("Error al actualizar perfil", DANGER_TOAST);
          setIsLoading(false);
          return null;
        });
    } catch (e) {
      toast("Hubo un error", DANGER_TOAST);
      console.error(e);
    }
  };

  return (
    <>
      <div className="grid max-w-5xl mx-auto">
        <form
          onSubmit={handleSubmit(onUpdateProfile)}
          className="items-center mt-8 sm:mt-14 text-[#202142]"
        >
          {user?.id_rol === 2 && (
            <>
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="w-full pt-4">
                  <Input
                    type="text"
                    className="w-full"
                    label="Nombre(s)"
                    defaultValue={profile.duenonegocio?.nombre_dueneg}
                    isDisabled={!isEditing}
                    {...register("dueneg.nombre_dueneg")}
                    aria-label={"Nombre del dueño"}
                  />
                  {errors?.dueneg?.nombre_dueneg && (
                    <p className="text-red-500 text-xs">
                      {errors?.dueneg?.nombre_dueneg.message}
                    </p>
                  )}
                </div>

                <div className="w-full pt-4">
                  <Input
                    type="text"
                    className="w-full"
                    label="Apellidos"
                    defaultValue={profile.duenonegocio?.apellidos_dueneg}
                    isDisabled={!isEditing}
                    {...register("dueneg.apellidos_dueneg")}
                    aria-label={"Apellidos del dueño"}
                  />
                  {errors?.dueneg?.apellidos_dueneg && (
                    <p className="text-red-500 text-xs">
                      {errors?.dueneg?.apellidos_dueneg.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <div className="relative">
                    <p className="ml-2 mb-2 text-sm text-gray-400 font-medium">
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
                        {...register("dueneg.dia_nacimiento")}
                        defaultValue={
                          profile.duenonegocio?.fecha_nacimiento
                            ?.toString()
                            .split("-")[2]
                            .split("T")[0]
                        }
                        isDisabled={!isEditing}
                        aria-label={"Día de nacimiento"}
                      />
                      {errors?.dueneg?.dia_nacimiento && (
                        <p className="text-red-500 text-xs">
                          {errors?.dueneg?.dia_nacimiento.message}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <Select
                        radius="sm"
                        id="mes_nacimiento"
                        label="Mes"
                        {...register("dueneg.mes_nacimiento")}
                        isDisabled={!isEditing}
                        defaultSelectedKeys={[
                          months.find(
                            (month) =>
                              month.key ===
                              profile.duenonegocio?.fecha_nacimiento
                                ?.toString()
                                .split("-")[1]
                          )?.key as string,
                        ]}
                      >
                        {months.map((month) => (
                          <SelectItem value={month.key} key={month.key}>
                            {month.value}
                          </SelectItem>
                        ))}
                      </Select>
                      {errors?.dueneg?.mes_nacimiento && (
                        <p className="text-red-500 text-xs">
                          {errors?.dueneg?.mes_nacimiento.message}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <Input
                        radius="sm"
                        id="año_nacimiento"
                        type="text"
                        label="Año"
                        {...register("dueneg.year_nacimiento")}
                        defaultValue={
                          profile.duenonegocio?.fecha_nacimiento
                            ?.toString()
                            .split("-")[0]
                        }
                        isDisabled={!isEditing}
                        aria-label={"Año de nacimiento"}
                      />
                      {errors?.dueneg?.year_nacimiento && (
                        <p className="text-red-500 text-xs">
                          {errors?.dueneg?.year_nacimiento.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="w-full">
                  <Input
                    type="text"
                    className="w-full"
                    label="Nombre del Negocio"
                    defaultValue={profile.duenonegocio?.negocio?.nombre_negocio}
                    isDisabled={!isEditing}
                    {...register("dueneg.negocio.nombre_negocio")}
                    aria-label={"Nombre del negocio"}
                  />
                  {errors?.dueneg?.negocio?.nombre_negocio && (
                    <p className="text-red-500 text-xs">
                      {errors?.dueneg?.negocio?.nombre_negocio.message}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <Input
                    type="text"
                    className="w-full"
                    label="Número de teléfono"
                    defaultValue={
                      profile.duenonegocio?.negocio?.telefono_negocio
                    }
                    isDisabled={!isEditing}
                    {...register("dueneg.negocio.telefono_negocio")}
                    aria-label={"Teléfono del negocio"}
                  />
                  {errors?.dueneg?.negocio?.telefono_negocio && (
                    <p className="text-red-500 text-xs">
                      {errors?.dueneg?.negocio?.telefono_negocio.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-2 sm:mb-6">
                <Input
                  type="text"
                  className="w-full"
                  label="Dirección del Negocio"
                  defaultValue={
                    profile.duenonegocio?.negocio?.direccion_negocio
                  }
                  isDisabled
                  aria-label={"Dirección del negocio"}
                />
                {errors?.dueneg?.negocio?.direccion_negocio && (
                  <p className="text-red-500 text-xs">
                    {errors?.dueneg?.negocio?.direccion_negocio.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div>
                  <Input
                    type="text"
                    className="w-full"
                    label="Calle y número"
                    defaultValue={
                      profile.duenonegocio?.negocio?.direccion_negocio?.split(
                        ","
                      )[0]
                    }
                    isDisabled={!isEditing}
                    aria-label={"Calle y número"}
                  />
                  {errors?.dueneg?.negocio?.calle && (
                    <p className="text-red-500 text-xs">
                      {errors?.dueneg?.negocio?.calle.message}
                    </p>
                  )}
                </div>
                <div className="mb-2 sm:mb-6">
                  <Input
                    type="text"
                    className="w-full"
                    label="Colonia"
                    defaultValue={colonia}
                    value={colonia}
                    isDisabled
                    aria-label={"Colonia"}
                    {...register("dueneg.negocio.colonia")}
                  />
                  {errors?.dueneg?.negocio?.colonia && (
                    <p className="text-red-500 text-xs">
                      {errors?.dueneg?.negocio?.colonia.message}
                    </p>
                  )}
                </div>
                <div className="mb-2 sm:mb-6">
                  <Input
                    type="text"
                    className="w-full"
                    label="Alcaldía"
                    defaultValue={alcaldia}
                    value={alcaldia}
                    isDisabled
                    aria-label={"Alcaldía"}
                    {...register("dueneg.negocio.alcaldia")}
                  />
                  {errors?.dueneg?.negocio?.alcaldia && (
                    <p className="text-red-500 text-xs">
                      {errors?.dueneg?.negocio?.alcaldia.message}
                    </p>
                  )}
                </div>
                <div className="mb-2 sm:mb-6">
                  <Input
                    type="text"
                    className="w-full"
                    label="Código Postal"
                    defaultValue={
                      profile.duenonegocio?.negocio?.direccion_negocio?.split(
                        ","
                      )[3]
                    }
                    isDisabled={!isEditing}
                    aria-label={"Código postal"}
                    {...register("dueneg.negocio.cp")}
                    onChange={(e) => {
                      setPostalCode(e.target.value);
                    }}
                  />
                  {errors?.dueneg?.negocio?.cp && (
                    <p className="text-red-500 text-xs">
                      {errors?.dueneg?.negocio?.cp.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <Input
                  type="email"
                  className="w-full"
                  label="Email del Negocio"
                  defaultValue={profile.duenonegocio?.negocio?.email_negocio}
                  isDisabled={!isEditing}
                  {...register("dueneg.negocio.email_negocio")}
                  aria-label={"Email del negocio"}
                />
                {errors?.dueneg?.negocio?.email_negocio && (
                  <p className="text-red-500 text-xs">
                    {errors?.dueneg?.negocio?.email_negocio.message}
                  </p>
                )}
              </div>
            </>
          )}

          {user?.id_rol === 3 && (
            <>
              <div className="grid grid-cols-2 grid-flow-row gap-6 mt-6">
                <div className="w-full">
                  <Input
                    type="text"
                    id="nombre"
                    className="w-full"
                    label="Nombre(s)"
                    defaultValue={profile.cliente?.nombre_cliente}
                    isDisabled={!isEditing}
                    {...register("cliente.nombre_cliente")}
                  />
                  {errors?.cliente?.nombre_cliente && (
                    <p className="text-red-500 text-xs">
                      {errors?.cliente?.nombre_cliente.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Input
                    type="text"
                    id="apellidos"
                    className="w-full"
                    label="Apellidos"
                    defaultValue={profile.cliente?.apellidos_cliente}
                    isDisabled={!isEditing}
                    {...register("cliente.apellidos_cliente")}
                  />
                  {errors?.cliente?.apellidos_cliente && (
                    <p className="text-red-500 text-xs">
                      {errors?.cliente?.apellidos_cliente.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Input
                    type="text"
                    id="tel_c"
                    className="w-full"
                    label="Número de teléfono"
                    defaultValue={profile.cliente?.telefono_cliente}
                    isDisabled={!isEditing}
                    {...register("cliente.telefono_cliente")}
                  />
                  {errors?.cliente?.telefono_cliente && (
                    <p className="text-red-500 text-xs">
                      {errors?.cliente?.telefono_cliente.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="relative">
                    <p className="ml-2 mb-2 text-sm text-gray-400 font-medium">
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
                        {...register("cliente.dia_nacimiento")}
                        defaultValue={
                          profile.cliente?.fecha_nacimiento
                            ?.toString()
                            .split("-")[2]
                            .split("T")[0]
                        }
                        isDisabled={!isEditing}
                      />
                      {errors?.cliente?.dia_nacimiento && (
                        <p className="text-red-500 text-xs">
                          {errors?.cliente?.dia_nacimiento.message}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <Select
                        radius="sm"
                        id="mes_nacimiento"
                        label="Mes"
                        {...register("cliente.mes_nacimiento")}
                        isDisabled={!isEditing}
                        defaultSelectedKeys={[
                          months.find(
                            (month) =>
                              month.key ===
                              profile.cliente?.fecha_nacimiento
                                ?.toString()
                                .split("-")[1]
                          )?.key as string,
                        ]}
                      >
                        {months.map((month) => (
                          <SelectItem value={month.key} key={month.key}>
                            {month.value}
                          </SelectItem>
                        ))}
                      </Select>
                      {errors?.cliente?.mes_nacimiento && (
                        <p className="text-red-500 text-xs">
                          {errors?.cliente?.mes_nacimiento.message}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <Input
                        radius="sm"
                        id="año_nacimiento"
                        type="text"
                        label="Año"
                        {...register("cliente.year_nacimiento")}
                        defaultValue={
                          profile.cliente?.fecha_nacimiento
                            ?.toString()
                            .split("-")[0]
                        }
                        isDisabled={!isEditing}
                      />
                      {errors?.cliente?.year_nacimiento && (
                        <p className="text-red-500 text-xs">
                          {errors?.cliente?.year_nacimiento.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-2 sm:my-6 w-full">
                <Input
                  type="text"
                  id="nombre_negocio_c"
                  className="w-full"
                  label="Nombre del negocio"
                  defaultValue={profile.cliente?.nombre_negocio}
                  isDisabled={!isEditing}
                  {...register("cliente.nombre_negocio")}
                />
                {errors?.cliente?.nombre_negocio && (
                  <p className="text-red-500 text-xs">
                    {errors?.cliente?.nombre_negocio.message}
                  </p>
                )}
              </div>
              <div className="my-2 sm:my-6 w-full">
                <Input
                  type="text"
                  id="direction"
                  className="w-full"
                  label="Dirección"
                  defaultValue={profile.cliente?.direccion_negocio}
                  isDisabled
                />
                {errors?.cliente?.direccion_negocio && (
                  <p className="text-red-500 text-xs">
                    {errors?.cliente?.direccion_negocio.message}
                  </p>
                )}
              </div>
            </>
          )}

          <div className="flex justify-end">
            <Button
              onPress={() => {
                if (user?.id_rol === 2) {
                  setValue("dueneg.negocio.colonia", colonia ?? "");
                  setValue("dueneg.negocio.alcaldia", alcaldia ?? "");
                } else {
                  setValue("cliente.colonia", colonia ?? "");
                  setValue("cliente.alcaldia", alcaldia ?? "");
                }
              }}
              isDisabled={!isEditing}
              isLoading={isLoading}
              type="submit"
              color="success"
            >
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
