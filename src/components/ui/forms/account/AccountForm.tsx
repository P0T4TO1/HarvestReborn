"use client";

import { FC, useState, useContext } from "react";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";

import { hrApi } from "@/api";
import { Estado, IUser } from "@/interfaces";
import { verifyOldPassword } from "@/helpers";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { accountSchema } from "@/validations/profile.validation";

import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "sonner";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";

interface IFormData {
  oldPassword: string;
  password: string;
  confirmPassword: string;
  estado?: Estado;
}

interface Props {
  user: IUser;
}

export const AccountForm: FC<Props> = ({ user }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<IFormData>({
    resolver: zodResolver(accountSchema),
  });
  const router = useRouter();
  const { logout } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [errorMessage, setErrorMessage] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const onSubmitEmail = async () => {
    if (!email) return setErrorMessage("Email no puede estar vacío");
    setLoading(true);

    await hrApi
      .put(`/user/account/${user.id}`, { email })
      .then(() => {
        toast("Perfil actualizado", SUCCESS_TOAST);
        window.location.reload();
      })
      .catch((err) => {
        toast("Error al actualizar perfil", DANGER_TOAST);
        console.error(err);
        setLoading(false);
        return null;
      });
  };

  const onDeactivate = async () => {
    setLoading(true);
    await hrApi
      .put(`/user/account/deactivate/${user.id}`, { estado: Estado.Inactivo })
      .then(() => {
        toast("Cuenta desactivada", SUCCESS_TOAST);
        logout();
        router.refresh();
      })
      .catch(() => {
        toast("Error al desactivar cuenta", DANGER_TOAST);
        setLoading(false);
        return null;
      });
  };

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    setLoading(true);
    try {
      const passwordExists = await verifyOldPassword(
        user?.id as string,
        data.oldPassword
      );
      if (passwordExists.message === "Contraseña incorrecta") {
        setError("oldPassword", { message: "Contraseña incorrecta" });
        setLoading(false);
        return null;
      }

      await hrApi
        .put(`/user/account/${user.id}`, data)
        .then(() => {
          toast("Perfil actualizado", SUCCESS_TOAST);
          window.location.reload();
        })
        .catch(() => {
          toast("Error al actualizar perfil", DANGER_TOAST);
          setLoading(false);
          return null;
        });
    } catch (error) {
      toast("Error al actualizar perfil", DANGER_TOAST);
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Desactivar cuenta</ModalHeader>
          <ModalBody>
            ¿Estás seguro de que deseas desactivar tu cuenta? Esta acción no se
            puede deshacer.
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={onClose}>
              Cancelar
            </Button>
            <Button
              color="success"
              onPress={() => {
                onDeactivate();
                onClose();
              }}
            >
              Desactivar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full pb-8 mt-8 sm:max-w-3xl sm:rounded-lg">
            <h2 className="text-2xl font-bold sm:text-xl dark:text-gray-300">
              Cuenta
            </h2>
            {user.oAuthId ? (
              <>
                <div className="flex flex-col items-center mt-8 sm:mt-14 text-[#202142] justify-center w-full gap-4">
                  <div className="w-full flex flex-col gap-4">
                    <Input
                      type="email"
                      label="Email"
                      placeholder="Email"
                      defaultValue={email}
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
                  onSubmit={() => onSubmitEmail()}
                >
                  <div className="w-full flex flex-col">
                    <Input
                      type="email"
                      label="Email"
                      placeholder="Email"
                      defaultValue={email}
                      onChange={(e) => setEmail(e.target.value)}
                      isDisabled={!isEditing}
                    />
                    {errorMessage && (
                      <span className="text-red-500 text-sm">
                        {errorMessage}
                      </span>
                    )}
                  </div>
                  <Button
                    type="submit"
                    color="success"
                    variant="solid"
                    isLoading={loading}
                    isDisabled={!isEditing}
                  >
                    Guardar cambios
                  </Button>
                </form>
                <form
                  className="flex flex-col items-center mt-8 sm:mt-14 text-[#202142] justify-center w-full gap-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="w-full flex flex-col">
                    <Input
                      type="password"
                      label="Contraseña actual  "
                      {...register("oldPassword")}
                    />
                    {errors.oldPassword && (
                      <span className="text-red-500 text-sm">
                        {errors.oldPassword.message}
                      </span>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    <Input
                      type="password"
                      label="Nueva contraseña"
                      {...register("password")}
                    />
                    {errors.password && (
                      <span className="text-red-500 text-sm">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    <Input
                      type="password"
                      label="Confirmar contraseña"
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <span className="text-red-500 text-sm">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </div>
                  <Button
                    type="submit"
                    color="success"
                    variant="solid"
                    isLoading={loading}
                    isDisabled={!isEditing}
                  >
                    Guardar cambios
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button type="button" color="danger" onPress={() => onOpen()}>
            Desactivar cuenta
          </Button>
        </div>
      </div>
    </>
  );
};
