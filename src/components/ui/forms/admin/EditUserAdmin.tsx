"use client";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { adminEditUserValidation } from "@/validations/admin.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { hrApi } from "@/api";
import { toast } from "sonner";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";
import { IUser } from "@/interfaces";

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

interface IFormData {
  email: string;
  nombre: string;
  apellidos: string;
  fecha_nacimiento: string;
  dia_nacimiento: string;
  mes_nacimiento: string;
  year_nacimiento: string;
  tipo: string;
  nombre_negocio: string;
  telefono: string;
  calle: string;
  colonia: string;
  alcaldia: string;
  cp: string;
}

const roles = [
  { name: "Admin", id_rol: 1 },
  { name: "Negocio", id_rol: 2 },
  { name: "Cliente", id_rol: 3 },
  { name: "oAuth", id_rol: 4 },
  { name: "Soporte", id_rol: 5 },
  { name: "Admin soporte", id_rol: 6 },
  { name: "Super admin", id_rol: 7 },
];

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

interface Props {
  user: IUser;
  isEditing: boolean;
}

export const EditUserForm = ({ user, isEditing }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    getValues,
    setValue,
  } = useForm<IFormData>({
    resolver: zodResolver(adminEditUserValidation),
    defaultValues: {
      email: user.email,
      nombre:
        user.duenonegocio?.nombre_dueneg ?? user.cliente?.nombre_cliente ?? "",
      apellidos:
        user.duenonegocio?.apellidos_dueneg ??
        user.cliente?.apellidos_cliente ??
        "",
      fecha_nacimiento:
        user.duenonegocio?.fecha_nacimiento ??
        user.cliente?.fecha_nacimiento ??
        "",
      dia_nacimiento:
        user.duenonegocio?.fecha_nacimiento.split("-")[2].split("T")[0] ??
        user.cliente?.fecha_nacimiento.split("-")[2].split("T")[0] ??
        "",
      mes_nacimiento:
        user.duenonegocio?.fecha_nacimiento.split("-")[1] ??
        user.cliente?.fecha_nacimiento.split("-")[1] ??
        "",
      year_nacimiento:
        user.duenonegocio?.fecha_nacimiento.split("-")[0] ??
        user.cliente?.fecha_nacimiento.split("-")[0] ??
        "",
      tipo:
        user.id_rol === 1 ? "admin" : user.id_rol === 2 ? "negocio" : "cliente",
      nombre_negocio:
        user.duenonegocio?.negocio?.nombre_negocio ??
        user.cliente?.nombre_negocio ??
        "",
      telefono:
        user.duenonegocio?.negocio?.telefono_negocio ??
        user.cliente?.telefono_cliente ??
        "",
      calle:
        user.duenonegocio?.negocio?.direccion_negocio.split(", ")[0] ??
        user.cliente?.direccion_negocio?.split(", ")[0] ??
        "",
      colonia:
        user.duenonegocio?.negocio?.direccion_negocio.split(", ")[1] ??
        user.cliente?.direccion_negocio?.split(", ")[1] ??
        "",
      alcaldia:
        user.duenonegocio?.negocio?.direccion_negocio.split(", ")[2] ??
        user.cliente?.direccion_negocio?.split(", ")[2] ??
        "",
      cp:
        user.duenonegocio?.negocio?.direccion_negocio.split(", ")[3] ??
        user.cliente?.direccion_negocio?.split(", ")[3] ??
        "",
    },
  });

  useEffect(() => {
    if (!getValues("cp")) {
      return;
    }
    if (getValues("cp")?.length === 5) {
      axios.get("/CP_CDMX.json").then((direction) => {
        if (direction) {
          if (
            direction.data.some(
              (item: IResponse) => item.d_codigo === getValues("cp")!
            )
          ) {
            setError("cp", { message: "" });
          } else {
            setError("cp", { message: "Código postal no encontrado" });
            return;
          }
          direction.data.map((item: IResponse) => {
            if (item.d_codigo !== getValues("cp")!) {
              return;
            } else {
              setValue("colonia", item.d_asenta);
              setValue("alcaldia", item.D_mnpio);
              setError("cp", { message: "" });
            }
          });
        } else {
          return;
        }
      });
    }
  }, [getValues, setError, setValue]);

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      data.fecha_nacimiento = `${data.dia_nacimiento}-${data.mes_nacimiento}-${data.year_nacimiento}`;
      const res = await hrApi
        .put(`/admin/users/${user.id}`, data)
        .then(() => {
          toast("Usuario editado con éxito", SUCCESS_TOAST);
          window.location.reload();
          return true;
        })
        .catch((err) => {
          toast("Hubo un error", DANGER_TOAST);
          console.log(err);
          return null;
        });
      if (res) {
        console.log("Usuario editado");
      } else {
        console.log("Hubo un error data");
      }
    } catch (error) {
      console.log(error);
      console.log("Hubo un error");
    }
  };

  return (
    <div className="my-10 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div className="max-w-[95rem] mx-auto w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-3 gap-4"
        >
          <div>
            <Input
              label="Email"
              variant="bordered"
              {...register("email")}
              defaultValue={user.email}
              isDisabled={!isEditing}
            />
            {errors?.email && (
              <p className="text-red-700 text-xs">{errors?.email.message}</p>
            )}
          </div>
          <div>
            <Input
              label="Nombre(s)"
              variant="bordered"
              {...register("nombre")}
              defaultValue={
                user.duenonegocio?.nombre_dueneg || user.cliente?.nombre_cliente
              }
              isDisabled={!isEditing}
            />
            {errors?.nombre && (
              <p className="text-red-700 text-xs">{errors?.nombre.message}</p>
            )}
          </div>
          <div>
            <Input
              label="Apellidos"
              variant="bordered"
              {...register("apellidos")}
              defaultValue={
                user.duenonegocio?.apellidos_dueneg ||
                user.cliente?.apellidos_cliente
              }
              isDisabled={!isEditing}
            />
            {errors?.apellidos && (
              <p className="text-red-700 text-xs">
                {errors?.apellidos.message}
              </p>
            )}
          </div>
          <div>
            <Input
              radius="sm"
              id="dia_nacimiento"
              variant="bordered"
              type="text"
              label="Día"
              {...register("dia_nacimiento")}
              defaultValue={
                user.duenonegocio?.fecha_nacimiento
                  .split("-")[2]
                  .split("T")[0] ||
                user.cliente?.fecha_nacimiento.split("-")[2].split("T")[0]
              }
              isDisabled={!isEditing}
            />
            {errors?.dia_nacimiento && (
              <p className="text-red-700 text-xs">
                {errors?.dia_nacimiento.message}
              </p>
            )}
          </div>
          <div>
            <Select
              isRequired
              radius="sm"
              id="mes_nacimiento"
              label="Mes"
              variant="bordered"
              {...register("mes_nacimiento")}
              isDisabled={!isEditing}
              defaultSelectedKeys={[
                months.find(
                  (month) =>
                    month.key ===
                      user?.duenonegocio?.fecha_nacimiento
                        .toString()
                        .split("-")[1] ||
                    user?.cliente?.fecha_nacimiento?.toString().split("-")[1]
                )?.key as string,
              ]}
            >
              {months.map((month) => (
                <SelectItem value={month.key} key={month.key}>
                  {month.value}
                </SelectItem>
              ))}
            </Select>
            {errors?.mes_nacimiento && (
              <p className="text-red-700 text-xs">
                {errors?.mes_nacimiento.message}
              </p>
            )}
          </div>
          <div>
            <Input
              radius="sm"
              id="año_nacimiento"
              type="text"
              label="Año"
              variant="bordered"
              {...register("year_nacimiento")}
              defaultValue={
                user.duenonegocio?.fecha_nacimiento.split("-")[0] ||
                user.cliente?.fecha_nacimiento.split("-")[0]
              }
              isDisabled={!isEditing}
            />
            {errors?.year_nacimiento && (
              <p className="text-red-700 text-xs">
                {errors?.year_nacimiento.message}
              </p>
            )}
          </div>
          <div>
            <Select
              isRequired
              radius="sm"
              label="Tipo de usuario"
              id="tipo"
              variant="bordered"
              {...register("tipo")}
              isDisabled={!isEditing}
              defaultSelectedKeys={
                roles.find((role) => role.id_rol === user.id_rol)?.name
              }
            >
              {roles.map((role) => (
                <SelectItem key={role.name} value={role.name}>
                  {role.name}
                </SelectItem>
              ))}
            </Select>
            {errors?.tipo && (
              <p className="text-red-700 text-xs">{errors?.tipo.message}</p>
            )}
          </div>
          <div>
            <Input
              type="text"
              id="nombreNegocio"
              label="Nombre del negocio"
              variant="bordered"
              isRequired={getValues("tipo") === "negocio"}
              {...register("nombre_negocio")}
              defaultValue={
                user.duenonegocio?.negocio?.nombre_negocio ||
                user.cliente?.nombre_negocio
              }
              isDisabled={!isEditing}
            />
            {errors?.nombre_negocio && (
              <p className="text-red-700 text-xs">
                {errors?.nombre_negocio.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type="text"
              id="telefono"
              label="Número de teléfono"
              variant="bordered"
              {...register("telefono")}
              defaultValue={
                user.duenonegocio?.negocio?.telefono_negocio ||
                user.cliente?.telefono_cliente
              }
              isDisabled={!isEditing}
            />
            {errors?.telefono && (
              <p className="text-red-700 text-xs">{errors?.telefono.message}</p>
            )}
          </div>
          <div>
            <Input
              type="text"
              id="cp"
              label="Código postal"
              variant="bordered"
              {...register("cp")}
              defaultValue={
                user.duenonegocio?.negocio?.direccion_negocio.split(", ")[3] ||
                user.cliente?.direccion_negocio?.split(", ")[3]
              }
              isDisabled={!isEditing}
            />
            {errors?.cp && (
              <p className="text-red-700 text-xs">{errors?.cp.message}</p>
            )}
          </div>
          <div>
            <Input
              type="text"
              id="colonia"
              label="Colonia"
              variant="bordered"
              isDisabled
              defaultValue={getValues("colonia")}
              value={getValues("colonia")}
              {...register("colonia")}
            />
            {errors?.colonia && (
              <p className="text-red-700 text-xs">{errors?.colonia.message}</p>
            )}
          </div>
          <div>
            <Input
              type="text"
              id="calle"
              variant="bordered"
              label="Calle y número"
              {...register("calle")}
              defaultValue={
                user.duenonegocio?.negocio?.direccion_negocio.split(", ")[0] ||
                user.cliente?.direccion_negocio?.split(", ")[0]
              }
              isDisabled={!isEditing}
            />
            {errors?.calle && (
              <p className="text-red-700 text-xs">{errors?.calle.message}</p>
            )}
          </div>
          <div>
            <Input
              type="text"
              id="alcaldia"
              label="Alcaldía"
              variant="bordered"
              isDisabled
              defaultValue={getValues("alcaldia")}
              value={getValues("alcaldia")}
              {...register("alcaldia")}
            />
            {errors?.alcaldia && (
              <p className="text-red-700 text-xs">{errors?.alcaldia.message}</p>
            )}
          </div>
          <div>
            <Button color="primary" type="submit" isDisabled={!isEditing}>
              Guardar cambios
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
