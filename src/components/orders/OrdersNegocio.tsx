"use client";

import React from "react";

import { OrdersTable } from "@/components";

import { IOrden } from "@/interfaces";

interface OrdersNegocioProps {
  orders: IOrden[];
}

export const OrdersNegocio = ({ orders }: OrdersNegocioProps) => {
  return (
    <div className="pt-12 container mx-auto min-h-screen">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-black flex flex-col leading-none dark:text-green-600 text-green-900">
          Pedidos
        </h1>
      </div>

      <OrdersTable orders={orders} />
    </div>
  );
};
