"use client";

import React, { useEffect, useState } from "react";
import { ILote, INegocio } from "@/interfaces";
import { hrApi } from "@/api";
import {
  CircularProgress,
  Image,
  Button,
  BreadcrumbItem,
  Breadcrumbs,
} from "@nextui-org/react";
import {
  ProductsCollapsibleTable,
  EditNegocioAdmin,
  DANGER_TOAST,
} from "@/components";
import { FaHome, FaEdit } from "react-icons/fa";
import { MdOutlineStorefront } from "react-icons/md";
import { toast } from "sonner";

interface NegocioInfoAdminProps {
  id_negocio: number;
}

export const NegocioInfoAdmin = ({ id_negocio }: NegocioInfoAdminProps) => {
  const [negocio, setNegocio] = useState<INegocio>();
  const [allLotes, setAllLotes] = useState<ILote[]>([]);
  const [lotesSorted, setLotesSorted] = useState<ILote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    hrApi
      .get(`/admin/users/stores/${id_negocio}`)
      .then((res) => {
        if (res.status === 200) {
          setNegocio(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        toast("Hubo un error", DANGER_TOAST);
        setLoading(false);
      });
    hrApi
      .get(`/store/inventory/batch/all/distinct/${id_negocio}`)
      .then((res) => {
        if (res.status === 200) {
          setLotesSorted(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        toast("Error al obtener productos", DANGER_TOAST);
      });
    hrApi
      .get(`/store/inventory/batch/all/${id_negocio}`)
      .then((res) => {
        if (res.status === 200) {
          setAllLotes(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        toast("Error al obtener productos", DANGER_TOAST);
      });
  }, [id_negocio]);

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
        <BreadcrumbItem href={"/admin/dashboard/stores"}>
          Listado
        </BreadcrumbItem>
        <BreadcrumbItem>Info</BreadcrumbItem>
      </Breadcrumbs>

      <h3 className="text-xl font-semibold">Información del negocio</h3>

      {loading ? (
        <CircularProgress size="lg" aria-label="Loading..." />
      ) : error ? (
        <p>Hubo un error</p>
      ) : (
        <>
          <div className="max-w-[95rem] mx-auto w-full">
            <div className="flex flex-col gap-4">
              <div className="col-span-2">
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
              </div>
              <EditNegocioAdmin
                negocio={negocio as INegocio}
                isEditing={isEditing}
              />
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Imágenes</span>
                {negocio?.images_negocio.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={index.toString()}
                    width={200}
                    height={200}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Productos</span>
                <ProductsCollapsibleTable
                  allLotes={allLotes}
                  lotesById={lotesSorted}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
