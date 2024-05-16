"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth";
import { IUser } from "@/interfaces";
import { ProfileForm } from "@/components";
import { Button } from "@nextui-org/react";
import { FaEdit } from "react-icons/fa";

interface Props {
  profile: IUser;
}

export const ProfileSection = ({ profile }: Props) => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
      <div className="p-2 md:p-4">
        <div className="w-full pb-8 mt-8 sm:max-w-5xl sm:rounded-lg">
          <h2 className="text-2xl font-bold sm:text-xl dark:text-gray-300">
            Perfil de Usuario
            {user?.id_rol === 2 ? (
              <span className="text-sm font-normal text-gray-500">
                {" "}
                (Negocio)
              </span>
            ) : user?.id_rol === 3 ? (
              <span className="text-sm font-normal text-gray-500">
                {" "}
                (Cliente)
              </span>
            ) : (
              <span className="text-sm font-normal text-gray-500">
                {" "}
                (Administrador)
              </span>
            )}
          </h2>
          <Button
            type="button"
            color="success"
            className="mt-4"
            size="md"
            onClick={() => setIsEditing(!isEditing)}
            startContent={<FaEdit size={20} />}
          >
            {isEditing ? "Cancelar" : "Editar"}
          </Button>
          <ProfileForm profile={profile} isEditing={isEditing} />
        </div>
      </div>
    </div>
  );
};
