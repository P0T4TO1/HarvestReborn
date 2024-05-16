"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerContactDataSchema } from "@/validations/auth.validation";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import axios from "axios";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";

interface IFormData {
  nombreNegocio: string;
  telefono: string;
  calle: string;
  colonia: string;
  alcaldia: string;
  cp: string;
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

export const ContactDataForm = () => {
  const {
    setContactData,
    userData,
    personalData,
    setIndexActive,
    registerContext,
    logout,
  } = useContext(AuthContext);
  const [postalCode, setPostalCode] = useState("");
  const [alcaldia, setAlcaldia] = useState("");
  const [colonia, setColonia] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<IFormData>({
    resolver: zodResolver(registerContactDataSchema),
    defaultValues: {
      nombreNegocio: "",
      telefono: "",
      calle: "",
      colonia: "",
      alcaldia: "",
      cp: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (postalCode.length === 5) {
      axios.get("/CP_CDMX.json").then((direction) => {
        if (direction) {
          if (
            direction.data.some(
              (item: IResponse) => item.d_codigo === postalCode
            )
          ) {
            setError("cp", { type: "manual", message: "" });
          } else {
            setError("cp", {
              type: "manual",
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
              setError("cp", { type: "manual", message: "" });
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

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      setContactData(data);
      const res = await registerContext({
        ...userData,
        ...personalData,
        ...data,
      });
      if (res.hasError) {
        toast(res.message, DANGER_TOAST);
        return;
      } else {
        toast("¡Registro exitoso!", SUCCESS_TOAST);
        if (userData.isEmailVerified) {
          logout();
          setIndexActive(1);
        } else {
          router.push(`/auth/email-verification?u=${userData.email}`);
          setIndexActive(1);
        }
      }
    } catch (error) {
      toast.error("Error al registrar usuario", DANGER_TOAST);
    }
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 grid-flow-row gap-6">
          <div className="relative">
            <Input
              type="text"
              id="nombreNegocio"
              label={`${
                personalData.tipo === "negocio"
                  ? "Nombre del negocio"
                  : "Nombre del negocio(si aplica)"
              }`}
              {...register("nombreNegocio")}
            />
            {errors?.nombreNegocio && (
              <p className="text-red-700 text-xs">
                {errors?.nombreNegocio.message}
              </p>
            )}
          </div>

          <div className="relative">
            <Input
              type="text"
              id="telefono"
              label="Número de teléfono"
              {...register("telefono")}
            />
            {errors?.telefono && (
              <p className="text-red-700 text-xs">{errors?.telefono.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 grid-flow-row gap-6">
          <div className="relative">
            <Input
              type="text"
              id="cp"
              label="Código postal"
              {...register("cp")}
              onChange={(e) => {
                setPostalCode(e.target.value);
              }}
            />
            {errors?.cp && (
              <p className="text-red-700 text-xs">{errors?.cp.message}</p>
            )}
          </div>
          <div className="relative">
            <Input
              type="text"
              id="colonia"
              label="Colonia"
              isDisabled
              defaultValue={colonia}
              value={colonia}
              {...register("colonia")}
            />
            {errors?.colonia && (
              <p className="text-red-700 text-xs">{errors?.colonia.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 grid-flow-row gap-6">
          <div className="relative">
            <Input
              type="text"
              id="calle"
              label="Calle y número"
              {...register("calle")}
            />
            {errors?.calle && (
              <p className="text-red-700 text-xs">{errors?.calle.message}</p>
            )}
          </div>
          <div className="relative">
            <Input
              type="text"
              id="alcaldia"
              label="Alcaldía"
              isDisabled
              defaultValue={alcaldia}
              value={alcaldia}
              {...register("alcaldia")}
            />
            {errors?.alcaldia && (
              <p className="text-red-700 text-xs">{errors?.alcaldia.message}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          onClick={() => {
            setValue("colonia", colonia);
            setValue("alcaldia", alcaldia);
          }}
          className="w-full flex justify-center bg-green-800 hover:bg-green-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
        >
          Registrarse
        </button>
        <button
          type="button"
          onClick={() => {
            setIndexActive(2);
          }}
          className="w-full flex justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
        >
          Atrás
        </button>
      </form>
    </>
  );
};
