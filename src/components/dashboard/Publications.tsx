"use client";

import {
  BreadcrumbItem,
  Breadcrumbs,
} from "@nextui-org/react";
import { FaHome } from "react-icons/fa";
import { BsFilePost } from "react-icons/bs";
import { TablePublications } from "@/components";

import { IPublicacion } from "@/interfaces";

interface Props {
  publications: IPublicacion[];
}

export const PublicationsAdmin = ({ publications }: Props) => {
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
          startContent={<BsFilePost size={25} />}
        >
          Publicaciones
        </BreadcrumbItem>
      </Breadcrumbs>

      <h3 className="text-xl font-semibold">Todos las publicaciones</h3>

      <div className="max-w-[95rem] mx-auto w-full">
        <TablePublications publications={publications} />
      </div>
    </div>
  );
};
