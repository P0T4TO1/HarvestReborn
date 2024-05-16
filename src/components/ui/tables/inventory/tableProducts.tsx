"use client";

import React, { useState, useMemo, useCallback, Key } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  SortDescriptor,
  Tooltip,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  Chip,
  ChipProps,
} from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";

import { ILote } from "@/interfaces";
import {
  columnsLotes as columns,
  storageOptionsLotes,
  fechasVencimientoOptionsLotes,
  storageColorMapLotes as storageColorMap,
} from "@/utils/data-table";

import {
  FaChevronDown,
  FaRegTrashAlt,
  FaEdit,
  FaQuestion,
  FaCircle,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { capitalize } from "@/utils/capitalize";

import { hrApi } from "@/api";
import { toast } from "sonner";
import { DANGER_TOAST, EditLoteModal, SUCCESS_TOAST } from "@/components";

interface Props {
  lotes: ILote[];
}

const INITIAL_VISIBLE_COLUMNS = [
  "no_lote",
  "tipo_almacenaje",
  "fecha_entrada",
  "cantidad_producto",
  "fecha_vencimiento",
  "acciones",
];

export const TableProductsInventory = ({ lotes }: Props) => {
  const [lote, setLote] = useState<ILote>();
  const [loading, setLoading] = useState(false);
  const { onOpen, onClose, isOpen, onOpenChange } = useDisclosure();
  const [openInfoModal, setOpenInfoModal] = useState(false);

  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [storageFilter, setStorageFilter] = useState<Selection>("all");
  const [fechaVencimientoFilter, setFechaVencimientoFilter] =
    useState<Selection>("all");
  const rowsPerPage = 5;
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "fecha_orden",
    direction: "ascending",
  });

  const [page, setPage] = useState(1);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredOrders = [...lotes];

    if (
      storageFilter !== "all" &&
      Array.from(storageFilter).length !== storageOptionsLotes.length
    ) {
      filteredOrders = filteredOrders.filter((lote) => {
        return Array.from(storageFilter).includes(lote.tipo_almacenaje);
      });
    }

    if (
      fechaVencimientoFilter !== "all" &&
      Array.from(fechaVencimientoFilter).length !==
        fechasVencimientoOptionsLotes.length
    ) {
      filteredOrders = filteredOrders.filter((lote) =>
        Array.from(fechaVencimientoFilter).includes(lote.fecha_vencimiento)
      );
    }

    return filteredOrders;
  }, [lotes, storageFilter, fechaVencimientoFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    const { column, direction } = sortDescriptor;

    return items.sort((a, b) => {
      if ((a[column as keyof ILote] ?? "") < (b[column as keyof ILote] ?? "")) {
        return direction === "ascending" ? -1 : 1;
      }
      if ((a[column as keyof ILote] ?? "") > (b[column as keyof ILote] ?? "")) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [sortDescriptor, items]);

  const getLote = async (id: number) => {
    setLoading(true);
    await hrApi.get(`/store/inventory/batch/${id}`).then((res) => {
      if (res.status === 200) {
        setLote(res.data);
      } else {
        console.log("Error al obtener producto", res.data);
      }
      setLoading(false);
    });
  };

  const handleDelete = async (id: number) => {
    await hrApi.delete(`/store/inventory/${id}`).then((res) => {
      if (res.status === 200) {
        toast("Producto eliminado con éxito", SUCCESS_TOAST);
        window.location.reload();
      } else {
        toast("Hubo un error al borrar el producto", DANGER_TOAST);
        console.log("Error al borrar producto", res.data);
      }
    });
  };

  const renderCell = useCallback(
    (lote: ILote, columnKey: Key) => {
      const cellValue = lote[columnKey as keyof ILote];
      let key = 1;

      switch (columnKey) {
        case "id_lote":
          return <div className="dark:text-gray-300">{lote.id_lote}</div>;
        case "no_lote":
          return <div className="dark:text-gray-300">{key++}</div>;
        case "tipo_almacenaje":
          return (
            <>
              <Chip
                size="md"
                variant="flat"
                color={
                  storageColorMap[lote.tipo_almacenaje] as ChipProps["color"]
                }
              >
                {lote.tipo_almacenaje.charAt(0) +
                  lote.tipo_almacenaje.slice(1).toLowerCase()}
              </Chip>
            </>
          );
        case "fecha_entrada":
          return (
            <div className="dark:text-gray-300">
              {new Date(
                lote.fecha_entrada.replace(/-/g, "/").replace(/T.+/, "")
              ).toLocaleDateString("es-MX", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          );
        case "hora_entrada":
          return (
            <div className="dark:text-gray-300">
              {new Date(
                lote.fecha_entrada.replace(/-/g, "/").replace(/T.+/, "")
              ).toLocaleTimeString("es-MX", {
                hour: "numeric",
                minute: "numeric",
              })}
            </div>
          );
        case "cantidad_producto":
          return (
            <div className="dark:text-gray-300">
              {lote.cantidad_producto} kg
            </div>
          );
        case "fecha_vencimiento":
          return (
            <div className="dark:text-gray-300 flex items-center">
              <p>
                {new Date(
                  lote.fecha_vencimiento.replace(/-/g, "/").replace(/T.+/, "")
                )
                  .toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                  .toString()}
              </p>
              <span className="flex items-center gap-2 ml-2">
                {new Date(
                  lote.fecha_vencimiento.replace(/-/g, "/").replace(/T.+/, "")
                ) < today(getLocalTimeZone()).toDate(getLocalTimeZone()) ? (
                  <FaCircle className="text-red-500" size={20} />
                ) : new Date(
                    lote.fecha_vencimiento.replace(/-/g, "/").replace(/T.+/, "")
                  ) <
                  new Date(
                    new Date(
                      new Date().setDate(
                        today(getLocalTimeZone())
                          .toDate(getLocalTimeZone())
                          .getDate() + 3
                      )
                    )
                  ) ? (
                  <FaCircle className="text-[#CC4E00]" size={20} />
                ) : new Date(
                    lote.fecha_vencimiento.replace(/-/g, "/").replace(/T.+/, "")
                  ) <
                  new Date(
                    new Date().setDate(
                      today(getLocalTimeZone())
                        .toDate(getLocalTimeZone())
                        .getDate() + 7
                    )
                  ) ? (
                  <FaCircle className="text-yellow-500" size={20} />
                ) : (
                  <FaCircle className="text-green-500" size={20} />
                )}
              </span>
            </div>
          );
        case "acciones":
          return (
            <div className="flex items-center gap-2">
              <div>
                <Tooltip content="Editar">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onClick={() => {
                      getLote(lote.id_lote).then(() => {});
                      onOpen();
                    }}
                  >
                    <FaEdit className="text-blue-700" size={20} />
                  </Button>
                </Tooltip>
              </div>
              <div>
                <Tooltip content="Eliminar">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onClick={() => {
                      handleDelete(lote.id_lote).then(() => {});
                    }}
                  >
                    <FaRegTrashAlt className="text-red-700" size={20} />
                  </Button>
                </Tooltip>
              </div>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [onOpen]
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

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-3">
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
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<FaChevronDown size={20} />} variant="flat">
                  Almacenaje
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={storageFilter}
                selectionMode="multiple"
                onSelectionChange={setStorageFilter}
              >
                {storageOptionsLotes.map((option) => (
                  <DropdownItem key={option.uid} className="capitalize">
                    {capitalize(option.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<FaChevronDown size={20} />} variant="flat">
                  Fecha de vencimiento
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={fechaVencimientoFilter}
                selectionMode="multiple"
                onSelectionChange={setFechaVencimientoFilter}
              >
                {fechasVencimientoOptionsLotes.map((option) => (
                  <DropdownItem key={option.uid} className="capitalize">
                    {capitalize(option.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="flex flex-col gap-3 items-center justify-center">
            <div>
              <p className="text-default-600 text-small">
                Fechas de vencimiento
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex gap-3">
                <FaCircle className="text-green-500" size={20} />
                <span className="text-default-400 text-small">Lejano</span>
              </div>
              <div className="flex gap-3">
                <FaCircle className="text-yellow-500" size={20} />
                <span className="text-default-400 text-small">Próximo</span>
              </div>
              <div className="flex gap-3">
                <FaCircle className="text-[#CC4E00]" size={20} />
                <span className="text-default-400 text-small">Cercano</span>
              </div>
              <div className="flex gap-3">
                <FaCircle className="text-red-500" size={20} />
                <span className="text-default-400 text-small">Vencido</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              size="sm"
              variant="light"
              isIconOnly
              onPress={() => setOpenInfoModal(!openInfoModal)}
            >
              <FaQuestion className="text-blue-700" size={20} />
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total de lotes: {lotes.length}
          </span>
        </div>
      </div>
    );
  }, [
    visibleColumns,
    lotes.length,
    fechaVencimientoFilter,
    storageFilter,
    openInfoModal,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos los lotes seleccionados"
            : `${selectedKeys.size} de ${filteredItems.length} lotes seleccionados`}
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

  return (
    <>
      {lote && (
        <EditLoteModal
          lote={lote}
          useDisclosure={{ isOpen, onClose }}
          loading={loading}
        />
      )}

      <Modal
        isOpen={openInfoModal}
        onOpenChange={onOpenChange}
        closeButton={
          <Button
            isIconOnly
            variant="light"
            onPress={() => setOpenInfoModal(!openInfoModal)}
          >
            <IoMdClose size={20} />
          </Button>
        }
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Fechas de vencimiento
              </ModalHeader>
              <ModalBody>
                <div>
                  <div className="flex gap-3">
                    <FaCircle className="text-green-500" size={20} />
                    <span className="text-default-700 text-small">Lejano</span>
                  </div>
                  <p className="text-default-600 text-small">
                    Fecha de vencimiento entre 1 a 2 semanas
                  </p>
                </div>
                <div>
                  <div className="flex gap-3">
                    <FaCircle className="text-yellow-500" size={20} />
                    <span className="text-default-700 text-small">Próximo</span>
                  </div>
                  <p className="text-default-600 text-small">
                    Fecha de vencimiento entre 4 a 7 días
                  </p>
                </div>
                <div>
                  <div className="flex gap-3">
                    <FaCircle className="text-[#CC4E00]" size={20} />
                    <span className="text-default-700 text-small">Cercano</span>
                  </div>
                  <p className="text-default-600 text-small">
                    Fecha de vencimiento entre 1 a 3 días
                  </p>
                </div>
                <div>
                  <div className="flex gap-3">
                    <FaCircle className="text-red-500" size={20} />
                    <span className="text-default-700 text-small">Vencido</span>
                  </div>
                  <p className="text-default-600 text-small">
                    El producto ya venció o no está en su mejor estado
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => setOpenInfoModal(!openInfoModal)}
                >
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className=" w-full flex flex-col gap-4">
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          selectedKeys={selectedKeys}
          selectionMode="multiple"
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
          <TableBody emptyContent={"No hay lotes 😭"} items={sortedItems}>
            {(item) => (
              <TableRow key={item.id_lote}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey) as any}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
