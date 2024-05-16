"use client";

import { FC, useContext } from "react";
import { AuthContext } from "@/context/auth";
import { useSession, signOut } from "next-auth/react";
import { SUCCESS_TOAST, showToast } from "@/components/ui/toast";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
} from "@nextui-org/react";
import { FaBoxOpen, FaRegUserCircle } from "react-icons/fa";
import {
  MdOutlineDashboard,
  MdOutlineInventory2,
  MdOutlineLogin,
  MdOutlineLogout,
  MdOutlinePersonAdd,
  MdOutlineSettings,
} from "react-icons/md";

export const DropdownComponent: FC = () => {
  const { data: session } = useSession();
  const { user } = useContext(AuthContext);

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button variant="light" isIconOnly color="default">
            <FaRegUserCircle size={20} />
          </Button>
        </DropdownTrigger>
        {session && user?.id_rol !== 4 ? (
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownSection>
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Inicio sesión como:</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem
                key="settings"
                href={`/settings/profile`}
                startContent={<MdOutlineSettings size={20} />}
              >
                Cuenta
              </DropdownItem>
              {user?.id_rol === 2 ? (
                <DropdownItem
                  key="inventory"
                  href={"/inventory"}
                  startContent={<MdOutlineInventory2 size={20} />}
                >
                  Mi inventario
                </DropdownItem>
              ) : user?.id_rol === 3 ? (
                <DropdownItem
                  key="orders"
                  href={"/orders"}
                  startContent={<FaBoxOpen size={20} />}
                >
                  Mis pedidos
                </DropdownItem>
              ) : (
                <DropdownItem
                  key="dashboard"
                  href={"/admin/dashboard"}
                  startContent={<MdOutlineDashboard size={20} />}
                >
                  Dashboard
                </DropdownItem>
              )}
            </DropdownSection>
            <DropdownSection>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => {
                  signOut().then(async () => {
                    showToast("Logout Successful", SUCCESS_TOAST);
                  });
                }}
                startContent={<MdOutlineLogout size={20} />}
              >
                Cerrar sesión
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        ) : (
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              key="login"
              color="primary"
              href={"/auth/login"}
              startContent={<MdOutlineLogin size={20} />}
            >
              Iniciar sesión
            </DropdownItem>
            <DropdownItem
              key="register"
              color="success"
              href={"/auth/register"}
              startContent={<MdOutlinePersonAdd size={20} />}
            >
              Regístrate
            </DropdownItem>
          </DropdownMenu>
        )}
      </Dropdown>
    </>
  );
};
