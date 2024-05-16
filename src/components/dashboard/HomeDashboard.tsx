"use client";

import React, { useState, useEffect } from "react";
import { hrApi } from "@/api";
import { IUser, IProduct, INegocio, ICliente } from "@/interfaces";
import { CircularProgress } from "@nextui-org/react";

import {
  CardNegociosAdmin,
  CardUsersAdmin,
  CardClientesAdmin,
  CardProductsAdmin,
} from "@/components";
import { FaHome } from "react-icons/fa";

export const HomeDashboard = () => {
  const [negocios, setNegocios] = useState<INegocio[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [clientes, setClientes] = useState<ICliente[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hrApi.get("/store").then((res) => setNegocios(res.data));
    hrApi.get("/admin/users").then((res) => setUsers(res.data));
    hrApi.get("/admin/users/customers").then((res) => setClientes(res.data));
    hrApi.get("/admin/product").then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="my-10 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <FaHome size={25} />
          <span>Home</span>
        </li>
      </ul>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <h3 className="text-xl font-semibold">Dashboard</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <CardUsersAdmin users={users.length} />
            <CardNegociosAdmin negocios={negocios.length} />
            <CardClientesAdmin clientes={clientes.length} />
            <CardProductsAdmin products={products.length} />
          </div>
        </>
      )}
    </div>
  );
};
