"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Select,
  SelectItem,
  Image,
  Button,
} from "@nextui-org/react";
import { IOrden, ILote, IProductoOrden } from "@/interfaces";
import {
  FaRegCheckCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { MdOutlinePendingActions, MdDownloading } from "react-icons/md";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import Slider from "react-slick";

interface ReportsSectionProps {
  orders: IOrden[];
  lotes: {
    all: ILote[];
    lotesVencidos: ILote[];
    lotesPorVencer: ILote[];
    lotesVigentes: ILote[];
  };
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  nextArrow: (
    <Button variant="light" size="sm" isIconOnly>
      <FaChevronRight />
    </Button>
  ),
  prevArrow: (
    <Button variant="light" size="sm" isIconOnly>
      <FaChevronLeft />
    </Button>
  ),
};

export const ReportsSection = ({ orders, lotes }: ReportsSectionProps) => {
  const products = orders.map((order) => order.productoOrden);

  const productsMoreRequested = products.reduce((acc, product) => {
    product.forEach((product) => {
      const found = acc.find(
        (item) => item.id_producto === product.id_producto
      );
      if (!found) {
        acc.push(product);
      } else {
        found.cantidad_orden += product.cantidad_orden;
      }
      return acc;
    });
    return acc;
  }, []);

  return (
    <div className="pt-8 container mx-auto p-4">
      <div>
        <h1 className="text-2xl font-black flex flex-col leading-none dark:text-green-600 text-green-900">
          Reportes
        </h1>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="text-xl font-medium">Pedidos</h2>
          <div className="flex flex-wrap gap-4 mt-5">
            <Card
              className="p-4"
              shadow="sm"
              classNames={{
                base: "border border-green-500",
              }}
            >
              <CardBody>
                <p className="text-green-600 font-semibold text-2xl text-center">
                  {
                    orders.filter(
                      (order) => order.estado_orden === "FINALIZADO"
                    ).length
                  }
                </p>
              </CardBody>
              <CardFooter>
                <FaRegCheckCircle size={21} />
                <span>Finalizados</span>
              </CardFooter>
            </Card>
            <Card
              className="p-4"
              shadow="sm"
              classNames={{
                base: "border border-blue-500",
              }}
            >
              <CardBody>
                <p className="text-blue-600 font-semibold text-2xl text-center">
                  {
                    orders.filter(
                      (order) => order.estado_orden === "EN_PROCESO"
                    ).length
                  }
                </p>
              </CardBody>
              <CardFooter>
                <MdDownloading size={21} />
                <span>En proceso</span>
              </CardFooter>
            </Card>
            <Card
              className="p-4"
              shadow="sm"
              classNames={{
                base: "border border-yellow-500",
              }}
            >
              <CardBody>
                <p className="text-yellow-600 font-semibold text-2xl text-center">
                  {
                    orders.filter((order) => order.estado_orden === "PENDIENTE")
                      .length
                  }
                </p>
              </CardBody>
              <CardFooter>
                <MdOutlinePendingActions size={21} />
                <span>Pendientes</span>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-medium">Lotes</h2>
          <div className="flex flex-col gap-4 mt-5">
            <Card
              shadow="sm"
              classNames={{
                base: "border border-gray-400",
              }}
            >
              <CardBody>
                <div className="flex justify-between">
                  <p className="text-default-500 text-lg text-center">
                    Total de lotes
                  </p>
                  <p className="text-default-600 font-semibold text-lg text-center">
                    {lotes.all.length}
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card
              shadow="sm"
              classNames={{
                base: "border border-gray-400",
              }}
            >
              <CardBody>
                <div className="flex justify-between">
                  <p className="text-default-500 text-lg text-center">
                    Lotes en buen estado
                  </p>
                  <p className="text-default-600 font-semibold text-lg text-center">
                    {lotes.lotesVigentes.length}
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card
            shadow="sm"
            classNames={{
              base: "border border-gray-300",
            }}
          >
            <CardHeader>
              <p className="text-lg font-semibold">Productos</p>
            </CardHeader>
            <Divider />
            <CardBody className="justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <p className="text-default-500 text-lg text-center">
                      Total de lotes
                    </p>
                    <p className="text-default-600 font-semibold text-lg text-center">
                      {lotes.all.length}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-default-500 text-lg text-center">
                      Lotes en buen estado
                    </p>
                    <p className="text-default-600 font-semibold text-lg text-center">
                      {lotes.lotesVigentes.length}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-yellow-500 text-lg text-center">
                      Lotes apunto de vencer
                    </p>
                    <p className="text-yellow-600 font-semibold text-lg text-center">
                      {lotes.lotesPorVencer.length}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-red-500 text-lg text-center">
                      Lotes vencidos
                    </p>
                    <p className="text-red-600 font-semibold text-lg text-center">
                      {lotes.lotesVencidos.length}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-lg font-semibold">Lotes en buen estado</p>
                  <Gauge
                    width={100}
                    height={100}
                    innerRadius="65%"
                    value={lotes.lotesVigentes.length}
                    valueMax={lotes.all.length}
                    className="text-default-600 text-2xl font-semibold"
                    text={({ value, valueMax }) => `${value} / ${valueMax}`}
                    sx={() => ({
                      [`& .${gaugeClasses.valueArc}`]: {
                        fill: "#16A34A",
                      },
                    })}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
          <Card
            shadow="sm"
            classNames={{
              base: "border border-gray-300",
            }}
          >
            <CardHeader>
              <div className="w-full flex justify-between">
                <p className="text-lg font-semibold">Prodcutos más pedidos</p>
                <div>
                  <Select
                    placeholder="Seleccionar"
                    size="sm"
                    className="w-40"
                    selectedKeys={"3"}
                  >
                    <SelectItem key="1" value="1">
                      Hoy
                    </SelectItem>
                    <SelectItem key="2" value="2">
                      Esta semana
                    </SelectItem>
                    <SelectItem key="3" value="3">
                      Este mes
                    </SelectItem>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="px-4">
                <div className="slider-container">
                  <Slider {...settings}>
                    {productsMoreRequested.map((product) => (
                      <div
                        key={product.id_producto}
                        className="flex flex-col gap-4 p-4 items-center justify-center"
                      >
                        <Image
                          src={product.producto?.imagen_producto}
                          alt={product.producto?.nombre_producto}
                          width={80}
                          height={80}
                          className="rounded-lg m-auto"
                          classNames={{
                            wrapper: "m-auto",
                          }}
                        />
                        <div className="flex flex-col gap-2 items-center justify-center">
                          <p className="text-lg font-semibold">
                            {product.producto?.nombre_producto}
                          </p>
                          <p className="text-default-500">
                            {product.producto?.descripcion}
                          </p>
                          <p className="text-default-600 font-semibold">
                            {product.cantidad_orden} pedidos
                          </p>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
