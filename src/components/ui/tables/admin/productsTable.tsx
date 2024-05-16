"use client";

import React, { useState, useMemo, useCallback, ChangeEvent, Key } from "react";
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
  Chip,
  Selection,
  ChipProps,
  SortDescriptor,
  Tooltip,
  useDisclosure,
  Pagination,
  Input,
  Image,
} from "@nextui-org/react";
import { IProduct } from "@/interfaces";
import {
  columnsProductos as columns,
  categoryColorMap as statusColorMap,
  categoryOptionsProductos as statusOptions,
} from "@/utils/data-table";
import { hrApi } from "@/api";
import { toast } from "sonner";
import {
  DANGER_TOAST,
  EditProductAdminModal,
  SUCCESS_TOAST,
} from "@/components";
import { FaChevronDown, FaEdit, FaRegTrashAlt, FaSearch } from "react-icons/fa";
import { capitalize } from "@/utils/capitalize";

interface Props {
  products: IProduct[];
}

const INITIAL_VISIBLE_COLUMNS = [
  "imagen_producto",
  "nombre_producto",
  "descripcion",
  "enTemporada",
  "categoria",
  "acciones",
];

export const TableProducts = ({ products }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "fecha_orden",
    direction: "ascending",
  });

  const [loadingModal, setLoadingModal] = useState(true);
  const [product, setProduct] = useState<IProduct>();

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredOrders = [...products];

    if (hasSearchFilter) {
      filteredOrders = filteredOrders.filter((mergeOrder) =>
        mergeOrder.nombre_producto
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredOrders = filteredOrders.filter((producto) =>
        Array.from(statusFilter).includes(producto.categoria)
      );
    }

    return filteredOrders;
  }, [products, filterValue, statusFilter, hasSearchFilter]);

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
        (a[column as keyof IProduct] ?? "") <
        (b[column as keyof IProduct] ?? "")
      ) {
        return direction === "ascending" ? -1 : 1;
      }
      if (
        (a[column as keyof IProduct] ?? "") >
        (b[column as keyof IProduct] ?? "")
      ) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((producto: IProduct, columnKey: Key) => {
    const cellValue = producto[columnKey as keyof IProduct];

    switch (columnKey) {
      case "no. de producto":
        return <>{columnKey + 1 + rowsPerPage * (page - 1)}</>;
      case "imagen_producto":
        return (
          <Image
            src={producto.imagen_producto}
            alt={producto.nombre_producto}
            className="w-12 h-12 rounded-full"
          />
        );
      case "nombre_producto":
        return cellValue;
      case "descripcion":
        return cellValue;
      case "enTemporada":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={`${producto.enTemporada ? "success" : "danger"}`}
          >
            {producto.enTemporada ? "Si" : "No"}
          </Chip>
        );
      case "categoria":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={statusColorMap[producto.categoria] as ChipProps["color"]}
          >
            {producto.categoria}
          </Chip>
        );
      case "acciones":
        return (
          <div className="flex items-center gap-2">
            <div>
              <Tooltip content="Editar">
                <Button
                  type="button"
                  variant="light"
                  isIconOnly
                  onPress={() => {
                    getProduct(producto.id_producto).then(() => {});
                    setLoadingModal(true);
                    onOpen();
                  }}
                >
                  <FaEdit className="text-blue-800 cursor-pointer" size={20} />
                </Button>
              </Tooltip>
            </div>
            <div>
              <Tooltip content="Eliminar">
                <Button
                  type="button"
                  variant="light"
                  isIconOnly
                  onPress={() => handleDelete(producto.id_producto)}
                >
                  <FaRegTrashAlt
                    className="text-red-800 cursor-pointer"
                    size={20}
                  />
                </Button>
              </Tooltip>
            </div>
          </div>
        );
      default:
        return cellValue;
    }
  }, [onOpen, page, rowsPerPage]);

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

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

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
            placeholder="Buscar por nombre..."
            startContent={<FaSearch size={20} />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<FaChevronDown size={20} />} variant="flat">
                  Categorias
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
                {statusOptions.map((status) => (
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
                {columns.map((column) => (
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
            Total de productos: {products.length}
          </span>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    products.length,
    onClear,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos los productos seleccionados"
            : `${selectedKeys.size} de ${filteredItems.length} productos seleccionados`}
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
  }, [selectedKeys, page, pages, filteredItems.length, onNextPage, onPreviousPage]);

  const getProduct = async (id: number) => {
    setLoadingModal(true);
    await hrApi.get(`/products/${id}`).then((res) => {
      if (res.status === 200) {
        setProduct(res.data);
      } else {
        toast("Hubo un error al obtener el producto", DANGER_TOAST);
        console.log("Error al obtener producto", res.data);
      }
      setLoadingModal(false);
    });
  };

  const handleDelete = async (id: number) => {
    await hrApi.delete("/admin/product", { data: { id } }).then((res) => {
      if (res.status === 200) {
        toast("Producto eliminado con éxito", SUCCESS_TOAST);
        window.location.reload();
      } else {
        toast("Hubo un error al borrar el producto", DANGER_TOAST);
        console.log("Error al borrar producto", res.data);
      }
    });
  };

  return (
    <>
      {product && (
        <EditProductAdminModal
          product={product as IProduct}
          useDisclosure={{ isOpen, onClose }}
          loading={loadingModal}
        />
      )}

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
          <TableBody
            emptyContent={"No hay productos en la aplicación"}
            items={sortedItems}
          >
            {(item) => (
              <TableRow key={item.id_producto}>
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
