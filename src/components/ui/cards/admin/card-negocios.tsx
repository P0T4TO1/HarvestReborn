"use client";

import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { MdOutlineStorefront } from "react-icons/md";

interface CardNegociosAdminProps {
  negocios: number;
}

export const CardNegociosAdmin = ({ negocios }: CardNegociosAdminProps) => {
  return (
    <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <MdOutlineStorefront size={24} className="text-white" />
          <div className="flex flex-col">
            <span className="text-white">Negocios registrados</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-xl font-semibold">{negocios}</span>
        </div>
      </CardBody>
    </Card>
  );
};
