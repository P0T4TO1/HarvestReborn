"use client";

import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { FaPeopleGroup } from "react-icons/fa6";

interface CardClientesAdminProps {
  clientes: number;
}

export const CardClientesAdmin = ({ clientes }: CardClientesAdminProps) => {
  return (
    <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <FaPeopleGroup size={24} className="text-white" />
          <div className="flex flex-col">
            <span className="text-white">Clientes registrados</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-xl font-semibold">{clientes}</span>
        </div>
      </CardBody>
    </Card>
  );
};
