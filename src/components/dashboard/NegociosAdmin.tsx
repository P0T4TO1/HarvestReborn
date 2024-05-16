"use client";

import React, { useEffect, useState } from "react";
import { TableNegocios } from "@/components";
import { INegocio } from "@/interfaces";
import { hrApi } from "@/api";
import {
  CircularProgress,
  BreadcrumbItem,
  Breadcrumbs,
} from "@nextui-org/react";
import { FaHome } from "react-icons/fa";
import { MdOutlineStorefront } from "react-icons/md";

export const NegociosAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [negocios, setNegocios] = React.useState<INegocio[]>([]);

  useEffect(() => {
    hrApi
      .get("/admin/users/stores")
      .then((res) => {
        if (res.status === 200) {
          setNegocios(res.data);
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
          href={"/admin/dashboard/stores"}
          startContent={<MdOutlineStorefront size={25} />}
        >
          Negocios
        </BreadcrumbItem>
        <BreadcrumbItem>Listado</BreadcrumbItem>
      </Breadcrumbs>

      <h3 className="text-xl font-semibold">Todos los negocios</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex flex-row gap-3.5 flex-wrap">
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
          <CircularProgress size="lg" aria-label="Loading..." />
        </div>
      ) : error ? (
        <p>Hubo un error</p>
      ) : (
        <div className="max-w-[95rem] mx-auto w-full">
          <TableNegocios negocios={negocios} />
        </div>
      )}
    </div>
  );
};
