"use client";

import React, { useState } from "react";
import { hrApi } from "@/api";
import { Input, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { toast } from "sonner";
import { SUCCESS_TOAST } from "@/components";
import { useRouter } from "next/navigation";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

interface ChangePasswordFormProps {
  resetPasswordToken: string;
}

export const ChangePasswordForm = ({
  resetPasswordToken,
}: ChangePasswordFormProps) => {
  const router = useRouter();

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleConfirm, setVisibleConfirm] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    const response = await hrApi.post("user/change-password", {
      resetToken: resetPasswordToken,
      password,
    });
    if (response.status !== 200) {
      setMessage("Error al cambiar la contraseña");
      return;
    } else {
      setMessage(response.data.message);
      toast("Contraseña cambiada correctamente", SUCCESS_TOAST);
      router.push("/auth/login");
    }
  };

  return (
    <section className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent">
      <div className="flex justify-center self-center z-10 shadow-xl">
        <Card className="p-6 mx-auto w-[386px]">
          <CardHeader>
            <h3 className="font-semibold text-2xl dark:text-gray-200 text-gray-800">
              Cambiar contraseña{" "}
            </h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              <div className="relative">
                <Input
                  type="password"
                  label="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              </div>
              <div className="relative">
                <Input
                  type="password"
                  label="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <Button
                color="secondary"
                variant="bordered"
                onClick={handleSubmit}
              >
                Cambiar contraseña
              </Button>
              <p>{message}</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};
