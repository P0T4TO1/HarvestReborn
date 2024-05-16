"use client";

import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { adminAddUserValidation } from "@/validations/admin.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { hrApi } from "@/api";
import { toast } from "sonner";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";
import { useRouter } from "next/navigation";
import { searchUserByEmail } from "@/helpers";
import { FaHome } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

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
  password: string;
  confirmPassword: string;
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

const months = {
  "01": "Enero",
  "02": "Febrero",
  "03": "Marzo",
  "04": "Abril",
  "05": "Mayo",
  "06": "Junio",
  "07": "Julio",
  "08": "Agosto",
  "09": "Septiembre",
  "10": "Octubre",
  "11": "Noviembre",
  "12": "Diciembre",
};

export const AddUserForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    getValues,
    setValue,
  } = useForm<IFormData>({
    resolver: zodResolver(adminAddUserValidation),
  });

  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleConfirm, setVisibleConfirm] = useState<boolean>(false);

  useEffect(() => {
    if (getValues("cp").length === 5) {
      axios.get("/CP_CDMX.json").then((direction) => {
        if (direction) {
          if (
            direction.data.some(
              (item: IResponse) => item.d_codigo === getValues("cp")
            )
          ) {
            setError("cp", { message: "" });
          } else {
            setError("cp", { message: "Código postal no encontrado" });
            return;
          }
          direction.data.map((item: IResponse) => {
            if (item.d_codigo !== getValues("cp")) {
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
      const userExists = await searchUserByEmail(data.email);

      if (userExists.message === "Este correo ya esta registrado") {
        setError("email", { message: "Este correo ya esta registrado" });
        return null;
      }

      const res = await hrApi
        .post("/admin/users", data)
        .then(() => {
          toast("Usuario agregado con éxito", SUCCESS_TOAST);
          router.push("/admin/dashboard/users");
          return true;
        })
        .catch((err) => {
          toast("Hubo un error", DANGER_TOAST);
          console.log(err);
          return null;
        });
      if (res) {
        console.log("Usuario agregado");
      } else {
        console.log("Hubo un error data");
      }
    } catch (error) {
      toast("Hubo un error", DANGER_TOAST);
      console.log(error);
      console.log("Hubo un error");
    }
  };

  return (
    <div className="my-10 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <Breadcrumbs size="lg">
        <BreadcrumbItem
          href={"/admin/dashboard"}
          startContent={<FaHome size={20} />}
        >
          Home
        </BreadcrumbItem>
        <BreadcrumbItem
          href={"/admin/dashboard/users"}
          startContent={<FaPeopleGroup size={20} />}
        >
          Usuarios
        </BreadcrumbItem>
        <BreadcrumbItem href={"/admin/dashboard/users"}>Listado</BreadcrumbItem>
        <BreadcrumbItem>Agregar</BreadcrumbItem>
      </Breadcrumbs>

      <h3 className="text-xl font-semibold">Agregar usuario nuevo</h3>
      <div className="max-w-[95rem] mx-auto w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-3 gap-4"
        >
          <div>
            <Input label="Email" variant="bordered" {...register("email")} />
            {errors?.email && (
              <p className="text-red-700 text-xs">{errors?.email.message}</p>
            )}
          </div>
          <div className="relative">
            <Input
              label="Contraseña"
              type={`${visible ? "text" : "password"}`}
              variant="bordered"
              {...register("password")}
              endContent={
                <button
                  onClick={() => setVisible(!visible)}
                  type="button"
                  className="flex items-center absolute inset-y-0 right-0 mr-3 cursor-pointer text-sm leading-5 text-green-700"
                >
                  {visible ? (
                    <MdOutlineVisibilityOff />
                  ) : (
                    <MdOutlineVisibility />
                  )}
                </button>
              }
            />
            {errors?.password && (
              <p className="text-red-700 text-xs">{errors?.password.message}</p>
            )}
          </div>
          <div className="relative">
            <Input
              label="Confirmar contraseña"
              type={`${visibleConfirm ? "text" : "password"}`}
              variant="bordered"
              {...register("confirmPassword")}
              endContent={
                <button
                  onClick={() => setVisibleConfirm(!visibleConfirm)}
                  type="button"
                  className="flex items-center absolute inset-y-0 right-0 mr-3 cursor-pointer text-sm leading-5 text-green-700"
                >
                  {visibleConfirm ? (
                    <MdOutlineVisibilityOff />
                  ) : (
                    <MdOutlineVisibility />
                  )}
                </button>
              }
            />
            {errors?.confirmPassword && (
              <p className="text-red-700 text-xs">
                {errors?.confirmPassword.message}
              </p>
            )}
          </div>
          <div>
            <Input
              label="Nombre(s)"
              variant="bordered"
              {...register("nombre")}
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
            >
              {Object.entries(months).map(([key, value]) => (
                <SelectItem value={key} key={key}>
                  {value}
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
            >
              <SelectItem value="admin" key="admin">
                Administrador
              </SelectItem>
              <SelectItem value="negocio" key="negocio">
                Negocio local
              </SelectItem>
              <SelectItem value="cliente" key="cliente">
                Cliente
              </SelectItem>
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
            <Button color="primary" type="submit">
              Agregar usuario
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
