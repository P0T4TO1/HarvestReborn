"use client";

import React, { useState, useMemo, useCallback, Key, useEffect } from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Tooltip,
  useDisclosure,
  User,
} from "@nextui-org/react";
import { toast } from "sonner";
import {
  OrderModal,
  SUCCESS_TOAST,
  DANGER_TOAST,
  ChangeStatus,
} from "@/components";
import { FaX } from "react-icons/fa6";
import { FaChevronDown, FaSearch, FaEye, FaCheck } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";

import { hrApi } from "@/api";
import { IOrden, IProductoOrden } from "@/interfaces";
import {
  columnsOrders,
  statusOptionsOrders,
  statusColorMapOrders as statusColorMap,
  INITIAL_VISIBLE_COLUMNS,
} from "@/utils/data-table";
import { capitalize } from "@/utils/capitalize";
import { EstadoOrden } from "@/interfaces";

type Props = {
  orders: IOrden[];
};

export const OrdersTable = ({ orders }: Props) => {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const rowsPerPage = 10;
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "fecha_orden",
    direction: "ascending",
  });
  const [tipoModal, setTipoModal] = useState("");
  const [orderModal, setOrderModal] = useState<IOrden | undefined>();
  const [productsModal, setProductsModal] = useState<IProductoOrden[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columnsOrders;

    return columnsOrders.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredOrders = [...orders];

    if (hasSearchFilter) {
      filteredOrders = filteredOrders.filter((orden) =>
        orden.cliente?.nombre_cliente
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptionsOrders.length
    ) {
      filteredOrders = filteredOrders.filter((orden) =>
        Array.from(statusFilter).includes(orden.estado_orden)
      );
    }

    return filteredOrders;
  }, [orders, filterValue, statusFilter, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    const { column, direction } = sortDescriptor;

    return items.sort((a, b) => {
      if (
        (a[column as keyof IOrden] ?? "") < (b[column as keyof IOrden] ?? "")
      ) {
        return direction === "ascending" ? -1 : 1;
      }
      if (
        (a[column as keyof IOrden] ?? "") > (b[column as keyof IOrden] ?? "")
      ) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [sortDescriptor, items]);

  const { onOpen, onClose, isOpen } = useDisclosure();

  const handleAcceptOrder = (id_orden: string) => {
    try {
      hrApi
        .put(`/store/orders/status/${id_orden}`, {
          estado: "EN_PROCESO",
        })
        .then((res) => {
          if (res.status === 200) {
            toast("Pedido aceptado", SUCCESS_TOAST);
          }
        })
        .catch(() => {
          toast("Error al aceptar el pedido", DANGER_TOAST);
        });
    } catch (error) {
      console.error(error);
      toast("Error al aceptar el pedido", DANGER_TOAST);
    }
  };

  const renderCell = useCallback(
    (order: IOrden, columnKey: Key) => {
      const cellValue = order[columnKey as keyof IOrden];

      switch (columnKey) {
        case "id_orden":
          return <>{order.id_orden}</>;
        case "cliente.nombre_cliente":
          return (
            <>
              <User
                name={order.cliente?.nombre_cliente}
                description={order.cliente?.user.email}
              />
            </>
          );
        case "fecha_orden":
          return (
            <div>
              {new Date(order.fecha_orden).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </div>
          );
        case "monto_total":
          return (
            <div>
              ${order.productoOrden?.reduce((acc, curr) => acc + curr.monto, 0)}{" "}
              MXN
            </div>
          );
        case "estado_orden":
          return (
            <Chip
              color={
                statusColorMap[
                  order.estado_orden as keyof typeof statusColorMap
                ] as ChipProps["color"]
              }
              variant="flat"
              size="md"
            >
              {order.estado_orden.charAt(0) +
                order.estado_orden.slice(1).toLowerCase()}
            </Chip>
          );
        case "acciones":
          return (
            <div className="flex items-center gap-4">
              <Tooltip content="Ver detalles">
                <Button
                  isIconOnly
                  variant="light"
                  onClick={() => {
                    setLoading(true);
                    setOrderModal(order);
                    setProductsModal(order.productoOrden!);
                    onOpen();
                  }}
                >
                  <FaEye size={20} />
                </Button>
              </Tooltip>

              {order.estado_orden === EstadoOrden.EN_PROCESO ? (
                <>
                  <Tooltip content="Completar pedido" color="success">
                    <Button isIconOnly variant="light">
                      <FaCheck size={20} className="text-green-700" />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Cancelar pedido" color="danger">
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => {
                        setTipoModal("cancelar");
                        setLoading(true);
                        setOrderModal(order);
                        setOpenModal(!openModal);
                      }}
                    >
                      <MdCancelPresentation
                        size={20}
                        className="text-red-600"
                      />
                    </Button>
                  </Tooltip>
                </>
              ) : (
                <Tooltip content="Aceptar pedido" color="success">
                  <Button
                    isIconOnly
                    variant="light"
                    onPress={() => handleAcceptOrder(order.id_orden!)}
                  >
                    <FaCheck size={20} className="text-green-700" />
                  </Button>
                </Tooltip>
              )}

              {order.estado_orden === EstadoOrden.PENDIENTE && (
                <Tooltip content="Rechazar pedido" color="danger">
                  <Button
                    isIconOnly
                    variant="light"
                    onPress={() => {
                      setTipoModal("rechazar");
                      setLoading(true);
                      setOrderModal(order);
                      setOpenModal(!openModal);
                    }}
                  >
                    <FaX size={20} className="text-red-600" />
                  </Button>
                </Tooltip>
              )}
            </div>
          );
        default:
          return cellValue;
      }
    },
    [onOpen, openModal]
  );

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por cliente..."
            startContent={<FaSearch size={20} />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<FaChevronDown size={20} />} variant="flat">
                  Estado
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptionsOrders.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<FaChevronDown size={20} />} variant="flat">
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columnsOrders.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total de pedidos: {orders.length}
          </span>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    orders.length,
    onClear,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos los pedidos seleccionados"
            : `${selectedKeys.size} de ${filteredItems.length} pedidos seleccionados`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys,
    page,
    pages,
    filteredItems.length,
    onNextPage,
    onPreviousPage,
  ]);

  useEffect(() => {
    if (orderModal) {
      setLoading(false);
    }
  }, [orderModal]);

  return (
    <div className=" w-full flex flex-col gap-4 mt-2 p-2 sm:p-4">
      <OrderModal
        loading={loading}
        order={orderModal as IOrden}
        products={productsModal}
        useDisclosure={{ isOpen, onClose }}
      />

      <ChangeStatus
        useDisclosure={{
          isOpen: openModal,
          onClose: () => setOpenModal(!openModal),
        }}
        order={orderModal as IOrden}
        loading={loading}
        tipo={tipoModal}
      />

      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No hay pedidos encontrados"}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.id_orden}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey) as any}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
