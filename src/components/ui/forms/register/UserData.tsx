"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerUserDataSchema } from "@/validations/auth.validation";
import { searchUserByEmail } from "@/helpers";
import { Input } from "@nextui-org/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { DANGER_TOAST } from "@/components";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

interface IFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  isEmailVerified: boolean;
}

export const UserDataForm = () => {
  const { setUserData, setIndexActive, indexActive, userData } =
    useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormData>({
    resolver: zodResolver(registerUserDataSchema),
    defaultValues: {
      email: userData.email ?? "",
      password: userData.password ?? "",
      confirmPassword: userData ? userData.password : "",
      isEmailVerified: userData ? userData.isEmailVerified : false,
    },
  });
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleConfirm, setVisibleConfirm] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      const res = await searchUserByEmail(data.email);

      if (res.message === "Este correo ya esta registrado") {
        setError("email", {
          message: "Este correo ya esta registrado",
        });
        toast("Este correo ya esta registrado", DANGER_TOAST);
        return null;
      }
      setUserData(data);
      setIndexActive(2);
    } catch (error) {
      console.error(error);
      toast("Error al registrar usuario", DANGER_TOAST);
    }
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 grid-flow-row gap-6">
          <div className="relative">
            <Input
              type="email"
              id="email"
              label="Correo electrónico"
              {...register("email")}
            />
            {errors?.email && (
              <p className="text-red-700 text-xs">{errors?.email.message}</p>
            )}
          </div>

          <div className="relative">
            <Input
              type={`${visible ? "text" : "password"}`}
              id="contraseña"
              label="Contraseña"
              {...register("password")}
              endContent={
                <button
                  onClick={() => setVisible(!visible)}
                  type="button"
                  className="flex items-center absolute inset-y-0 right-0 mr-3 cursor-pointer text-sm leading-5 text-green-700"
                >
                  {visible ? (
                    <MdOutlineVisibilityOff size={24} />
                  ) : (
                    <MdOutlineVisibility size={24} />
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
              type={`${visibleConfirm ? "text" : "password"}`}
              id="confirmar-contraseña"
              label="Confirmar contraseña"
              {...register("confirmPassword")}
              endContent={
                <button
                  onClick={() => setVisibleConfirm(!visibleConfirm)}
                  type="button"
                  className="flex items-center absolute inset-y-0 right-0 mr-3 cursor-pointer text-sm leading-5 text-green-700"
                >
                  {visibleConfirm ? (
                    <MdOutlineVisibilityOff size={24} />
                  ) : (
                    <MdOutlineVisibility size={24} />
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
        </div>
        <button
          type="submit"
          className="w-full flex justify-center bg-green-800 hover:bg-green-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
        >
          Siguiente
        </button>
      </form>
    </>
  );
};
