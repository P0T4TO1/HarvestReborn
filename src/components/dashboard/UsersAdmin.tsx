"use client";

import {
  Button,
  CircularProgress,
  BreadcrumbItem,
  Breadcrumbs,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TableUsers } from "@/components";
import { IUser } from "@/interfaces";
import { hrApi } from "@/api";
import { FaHome } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdPersonAdd } from "react-icons/md";

export const UsersAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = React.useState<IUser[]>([]);
  
  useEffect(() => {
    hrApi
      .get("/admin/users")
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="my-10 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <Breadcrumbs size="lg">
        <BreadcrumbItem
          href={"/admin/dashboard"}
          startContent={<FaHome size={25} />}
        >
          Home
        </BreadcrumbItem>
        <BreadcrumbItem
          href={"/admin/dashboard/users"}
          startContent={<FaPeopleGroup size={25} />}
        >
          Usuarios
        </BreadcrumbItem>
        <BreadcrumbItem>Listado</BreadcrumbItem>
      </Breadcrumbs>

      <h3 className="text-xl font-semibold">Todos los usuarios</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex flex-row gap-3.5 flex-wrap">
          {/*<AddUser />*/}
          <Link href={"/admin/dashboard/users/add"}>
            <Button
              color="primary"
              variant="faded"
              startContent={<MdPersonAdd size={25} />}
            >
              Agregar usuario
            </Button>
          </Link>
          {/*<Button*/}
          {/*  color="primary"*/}
          {/*  startContent={*/}
          {/*    <span className="material-symbols-outlined">ios_share</span>*/}
          {/*  }*/}
          {/*>*/}
          {/*  Export to CSV*/}
          {/*</Button>*/}
        </div>
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold">Cargando...</h2>
          <CircularProgress size="lg" aria-label="Loading..." />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold text-red-800">
            Hubo un error al cargar los usuarios
          </h3>
        </div>
      ) : (
        <div className="max-w-[95rem] mx-auto w-full">
          <TableUsers users={users} />
        </div>
      )}
    </div>
  );
};
