"use client";

import { FC, useContext, useEffect, useState } from "react";
import { Estado, IUser } from "@/interfaces";
import { AuthContext } from "@/context/auth";
import { hrApi } from "@/api";
import { CircularProgress } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input, Button } from "@nextui-org/react";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";
import { accountSchema } from "@/validations/profile.validation";
import { toast } from "sonner";
import { verifyOldPassword } from "@/helpers";

type Errors = {
  email?: string;
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
  estado?: string;
} | null;

interface IFormData {
  email: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
  estado?: Estado;
}

export const AccountForm: FC = () => {
  const methods = useForm<IFormData>();
  const { handleSubmit, register } = methods;
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [account, setAccount] = useState<IUser>();
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState<Errors>(null);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    hrApi
      .get(`/user/account/${user?.id}`)
      .then((res) => {
        if (res.status === 200) {
          setAccount(res.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [user?.id]);

  const onSubmitEmail = async (data: IFormData) => {
    try {
      const res = await hrApi
        .put(`/user/account/${user?.id}`, data)
        .then(() => {
          toast("Perfil actualizado", SUCCESS_TOAST);
        })
        .catch((err) => {
          toast("Error al actualizar perfil", DANGER_TOAST);
          console.error(err);
          return null;
        });
      if (res) {
        return res;
      }
    } catch (error) {
      toast("Hubo un error", DANGER_TOAST);
      console.error(error);
    }
  };

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      const validations = accountSchema.safeParse(data);
      if (!validations.success) {
        console.log("error", validations.error.issues);
        let newErrors: Errors = {};

        validations.error.issues.forEach((issue) => {
          newErrors = { ...newErrors, [issue.path[0]]: issue.message };
        });
        setErrors(newErrors);
        return null;
      } else {
        setErrors(null);
      }

      const passwordExists = await verifyOldPassword(
        user?.id as string,
        data.oldPassword
      );
      if (passwordExists.message === "Contraseña incorrecta") {
        setErrors({ oldPassword: "Contraseña incorrecta" });
        return null;
      }

      const res = await hrApi
        .put(`/user/account/${user?.id}`, data)
        .then(() => {
          toast("Perfil actualizado", SUCCESS_TOAST);
        })
        .catch((err) => {
          return null;
        });
      if (res) {
        return res;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
      <div className="p-2 md:p-4">
        <div className="w-full pb-8 mt-8 sm:max-w-3xl sm:rounded-lg">
          <h2 className="text-2xl font-bold sm:text-xl dark:text-gray-300">
            Cuenta
          </h2>
          {loading ? (
            <CircularProgress
              size="lg"
              aria-label="Loading..."
              className="mt-4"
            />
          ) : error ? (
            <p>Hubo un error</p>
          ) : (
            <>
              {user?.oAuthId ? (
                <>
                  <div className="flex flex-col items-center mt-8 sm:mt-14 text-[#202142] justify-center w-full gap-4">
                    <div className="w-full flex flex-col gap-4">
                      <Input
                        type="email"
                        label="Email"
                        placeholder="Email"
                        defaultValue={user?.email}
                        isDisabled
                      />
                      <div className="text-red-400">
                        No puedes cambiar tu correo electrónico porque te
                        registraste con Google
                      </div>
                      <div className="text-red-400">
                        Si deseas cambiar tu correo electrónico, contacta a
                        soporte
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    variant="solid"
                    color="success"
                  >
                    {isEditing ? "Cancelar" : "Editar"}
                  </Button>
                  <form
                    className="flex flex-col items-center mt-8 sm:mt-14 text-[#202142] justify-center w-full gap-4"
                    onSubmit={handleSubmit(onSubmitEmail)}
                  >
                    <div className="w-full flex flex-col gap-4">
                      <Input
                        type="email"
                        label="Email"
                        placeholder="Email"
                        defaultValue={account?.email}
                        isDisabled={!isEditing}
                        {...register("email")}
                      />
                      {errors?.email && (
                        <span className="text-red-500">{errors?.email}</span>
                      )}
                    </div>
                    <Button type="submit" color="success" variant="solid">
                      {loading ? (
                        <CircularProgress size="md" />
                      ) : (
                        "Guardar cambios"
                      )}
                    </Button>
                  </form>
                  <form
                    className="flex flex-col items-center mt-8 sm:mt-14 text-[#202142] justify-center w-full gap-4"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="w-full flex flex-col gap-4">
                      <Input
                        type="password"
                        label="Contraseña actual  "
                        {...register("oldPassword")}
                      />
                      {errors?.oldPassword && (
                        <span className="text-red-500">
                          {errors?.oldPassword}
                        </span>
                      )}
                    </div>
                    <div className="w-full flex flex-col gap-4">
                      <Input
                        type="password"
                        label="Nueva contraseña"
                        {...register("password")}
                      />
                      {errors?.password && (
                        <span className="text-red-500">{errors?.password}</span>
                      )}
                    </div>
                    <div className="w-full flex flex-col gap-4">
                      <Input
                        type="password"
                        label="Confirmar contraseña"
                        {...register("confirmPassword")}
                      />
                      {errors?.confirmPassword && (
                        <span className="text-red-500">
                          {errors?.confirmPassword}
                        </span>
                      )}
                    </div>
                    <Button type="submit" color="success" variant="solid">
                      {loading ? (
                        <CircularProgress size="md" />
                      ) : (
                        "Guardar cambios"
                      )}
                    </Button>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Button type="button" color="danger">
          Desactivar cuenta
        </Button>
      </div>
    </div>
  );
};
