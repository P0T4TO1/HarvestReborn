"use client";

import React, { useState, useCallback, useMemo } from "react";

import { IOrden, EstadoOrden } from "@/interfaces";

import {
  Card,
  CardFooter,
  CardBody,
  CardHeader,
  Link,
  Button,
  Chip,
  ChipProps,
  Divider,
  Accordion,
  AccordionItem,
  Input,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import { AsideAccount, ChangeStatus } from "@/components";
import { FaSearch } from "react-icons/fa";

const statusColorMap = {
  PENDIENTE: "warning",
  EN_PROCESO: "primary",
  RECHAZADO: "danger",
  FINALIZADO: "success",
  CANCELADO: "danger",
};

interface OrdersClienteProps {
  orders: {
    todos: IOrden[];
    pendientes: IOrden[];
    en_proceso: IOrden[];
    finalizados: IOrden[];
    cancelados: IOrden[];
    rechazados: IOrden[];
  };
}

export const OrdersCliente = ({ orders }: OrdersClienteProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orderToCancel, setOrderToCancel] = useState<IOrden | null>(null);

  const [filterValue, setFilterValue] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const hasSearchFilter = Boolean(searchValue);

  const filteredItems = useMemo(() => {
    let filteredOrders = [...orders.todos];

    if (hasSearchFilter) {
      filteredOrders = filteredOrders.filter((order) =>
        order.id_orden
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase())
      );
    }
    if (filterValue !== "all") {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.estado_orden === (filterValue.toUpperCase() as EstadoOrden)
      );
    }

    return filteredOrders;
  }, [orders, searchValue, filterValue, hasSearchFilter]);

  const itemsToDisplay = useMemo(() => {
    return filteredItems;
  }, [filteredItems]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setSearchValue(value);
    } else {
      setSearchValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setSearchValue("");
  }, []);

  return (
    <section className="w-full flex flex-col gap-5 pt-16 md:flex-row min-h-screen">
      {orderToCancel && (
        <ChangeStatus
          order={orderToCancel}
          tipo="cancelar"
          useDisclosure={{ isOpen, onClose }}
          loading={false}
        />
      )}

      <AsideAccount />
      <div className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="w-full pb-8 mt-8 sm:rounded-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-black flex flex-col leading-none dark:text-green-600 text-green-900">
              Mis ordenes
            </h1>
            <div className="flex items-center justify-between">
              <Input
                isClearable
                area-label="Buscar productos"
                className="w-full"
                placeholder="Buscar orden..."
                startContent={<FaSearch size={20} />}
                value={searchValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
            </div>
          </div>

          <div className="flex w-full flex-col mt-4">
            <Tabs
              aria-label="Options"
              color="primary"
              variant="underlined"
              selectedKey={filterValue}
              onSelectionChange={setFilterValue as any}
              classNames={{
                tabList:
                  "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                tab: "h-12",
              }}
            >
              <Tab
                key="all"
                title={
                  <div className="flex items-center space-x-2">
                    <span>Todas</span>
                    <Chip size="sm" variant="faded">
                      {orders.todos.length}
                    </Chip>
                  </div>
                }
              />
              <Tab
                key="pendiente"
                title={
                  <div className="flex items-center space-x-2">
                    <span>Pendientes</span>
                    <Chip size="sm" variant="faded">
                      {orders.pendientes.length}
                    </Chip>
                  </div>
                }
              />
              <Tab
                key="en_proceso"
                title={
                  <div className="flex items-center space-x-2">
                    <span>En proceso</span>
                    <Chip size="sm" variant="faded">
                      {orders.en_proceso.length}
                    </Chip>
                  </div>
                }
              />
              <Tab
                key="finalizado"
                title={
                  <div className="flex items-center space-x-2">
                    <span>Finalizadas</span>
                    <Chip size="sm" variant="faded">
                      {orders.finalizados.length}
                    </Chip>
                  </div>
                }
              />
              <Tab
                key="cancelado"
                title={
                  <div className="flex items-center space-x-2">
                    <span>Canceladas</span>
                    <Chip size="sm" variant="faded">
                      {orders.cancelados.length}
                    </Chip>
                  </div>
                }
              />
              <Tab
                key="rechazado"
                title={
                  <div className="flex items-center space-x-2">
                    <span>Rechazadas</span>
                    <Chip size="sm" variant="faded">
                      {orders.rechazados.length}
                    </Chip>
                  </div>
                }
              />
            </Tabs>
          </div>

          <div className="mt-6">
            {itemsToDisplay.map((order) => (
              <Card
                key={order.id_orden}
                className="p-4 mt-6"
                aria-label="card-order-cliente"
              >
                <CardHeader className="flex justify-between">
                  <div className="flex items-center justify-center">
                    <Chip variant="flat" size="lg">
                      Orden:{" "}
                      <span className="text-blue-600">#{order.id_orden}</span>
                    </Chip>
                    <p className="ml-2 hidden lg:block">
                      Fecha:{" "}
                      {new Date(order.fecha_orden).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <Link href={`/orders/${order.id_orden}`}>
                      <Button color="success" variant="ghost">
                        Ver orden
                      </Button>
                    </Link>
                    {order.estado_orden === EstadoOrden.PENDIENTE ||
                    order.estado_orden === EstadoOrden.EN_PROCESO ? (
                      <Button
                        color="danger"
                        size="md"
                        onClick={() => {
                          setOrderToCancel(order);
                          onOpen();
                        }}
                        className="ml-2 hidden md:block"
                      >
                        Cancelar orden
                      </Button>
                    ) : null}
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="block lg:hidden">
                    Fecha:{" "}
                    {new Date(order.fecha_orden).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p>
                    Total:{" "}
                    <span className="text-blue-600">
                      ${order.monto_total} MXN
                    </span>
                  </p>
                  <Accordion>
                    <AccordionItem
                      title="Productos"
                      subtitle="Ver productos de la orden"
                    >
                      <div className="flex flex-col gap-2">
                        {order.productoOrden?.map((producto) => (
                          <div
                            key={producto.id_producto}
                            className="flex items-center justify-between"
                          >
                            <p>{producto.producto?.nombre_producto}</p>
                            <p>
                              ${producto.monto} MXN x {producto.cantidad_orden}{" "}
                              kg
                            </p>
                          </div>
                        ))}
                      </div>
                    </AccordionItem>
                  </Accordion>
                </CardBody>
                <Divider />
                <CardFooter className="flex justify-between">
                  <Chip
                    variant="flat"
                    color={
                      statusColorMap[
                        order.estado_orden as keyof typeof statusColorMap
                      ] as ChipProps["color"]
                    }
                  >
                    {order.estado_orden}
                  </Chip>
                  {order.estado_orden === EstadoOrden.PENDIENTE ||
                  order.estado_orden === EstadoOrden.EN_PROCESO ? (
                    <Button
                      color="danger"
                      size="md"
                      onClick={() => {
                        setOrderToCancel(order);
                        onOpen();
                      }}
                      className="ml-2 block md:hidden"
                    >
                      Cancelar orden
                    </Button>
                  ) : null}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
