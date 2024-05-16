"use client";

import React, { useState, useContext, useEffect } from "react";

import { CircularProgress } from "@nextui-org/react";
import { OrdersTable } from "@/components";

import { AuthContext } from "@/context/auth";
import { IOrden } from "@/interfaces";
import { hrApi } from "@/api";

interface OrdersNegocioProps {
  orders: IOrden[];
}

export const OrdersNegocio = ({ orders }: OrdersNegocioProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="pt-12 container mx-auto min-h-screen">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-black flex flex-col leading-none dark:text-green-600 text-green-900">
          Pedidos
        </h1>
      </div>

      {loading ? (
        <div className="flex flex-col mt-12">
          <CircularProgress size="lg" />
          <p className="dark:text-gray-300">Cargando pedidos...</p>
        </div>
      ) : error ? (
        <p>Hubo un error al cargar los pedidos</p>
      ) : (
        <>
          <OrdersTable orders={orders} />
        </>
      )}
    </div>
  );
};
