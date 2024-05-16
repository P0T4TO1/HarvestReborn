"use client";

import React, { useState, useMemo, useCallback, ChangeEvent, Key } from "react";
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
} from "@nextui-org/react";
import { INegocio } from "@/interfaces";
import {
  columnsNegocios,
  statusColorMapNegocios as statusColorMap,
  statusOptionsNegocios as statusOptions,
} from "@/utils/data-table";
import { useRouter } from "next/navigation";
import { FaChevronDown, FaRegTrashAlt, FaSearch } from "react-icons/fa";
import { MdOutlineInfo } from "react-icons/md";
import { capitalize } from "@/utils/capitalize";

interface Props {
  negocios: INegocio[];
}

const INITIAL_VISIBLE_COLUMNS = [
  "nombre_negocio",
  "direccion_negocio",
  "created_at",
  "id_dueneg",
  "estado_negocio",
  "acciones",
];

export const TableNegocios = ({ negocios }: Props) => {
  const router = useRouter();
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "fecha_orden",
    direction: "ascending",
  });

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columnsNegocios;

    return columnsNegocios.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredOrders = [...negocios];

    if (hasSearchFilter) {
      filteredOrders = filteredOrders.filter((mergeOrder) =>
        mergeOrder.nombre_negocio
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredOrders = filteredOrders.filter((negocio) =>
        Array.from(statusFilter).includes(negocio.estado_negocio)
      );
    }

    return filteredOrders;
  }, [negocios, filterValue, statusFilter, hasSearchFilter]);

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
        (a[column as keyof INegocio] ?? "") <
        (b[column as keyof INegocio] ?? "")
      ) {
        return direction === "ascending" ? -1 : 1;
      }
      if (
        (a[column as keyof INegocio] ?? "") >
        (b[column as keyof INegocio] ?? "")
      ) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((negocio: INegocio, columnKey: Key) => {
    const cellValue = negocio[columnKey as keyof INegocio];

    switch (columnKey) {
      case "id_negocio":
        return <>{cellValue}</>;
      case "nombre_negocio":
        return <>{cellValue}</>;
      case "direccion_negocio":
        return <>{cellValue}</>;
      case "created_at":
        return (
          <>{negocio.created_at?.toString().split("-")[2].split("T")[0]}</>
        );
      case "id_dueneg":
        return <>{cellValue}</>;
      case "estado_negocio":
        return (
          <>
            <Chip
              size="sm"
              variant="flat"
              color={
                statusColorMap[negocio.estado_negocio] as ChipProps["color"]
              }
            >
              {negocio.estado_negocio.charAt(0) +
                negocio.estado_negocio.slice(1).toLowerCase()}
            </Chip>
          </>
        );
      case "acciones":
        return (
          <div className="flex items-center gap-2">
            <div>
              <Tooltip content="Ver detalles" placement="top">
                <Button
                  size="sm"
                  variant="light"
                  onPress={() =>
                    router.push(`/admin/dashboard/stores/${negocio.id_negocio}`)
                  }
                >
                  <MdOutlineInfo size={20} />
                </Button>
              </Tooltip>
            </div>
            <div>
              <Tooltip
                content="Eliminar negocio"
                placement="top"
                color="danger"
              >
                <Button size="sm" variant="light">
                  <FaRegTrashAlt size={20} color="red" />
                </Button>
              </Tooltip>
            </div>
          </div>
        );
      default:
        return cellValue;
    }
  }, [router]);

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
                {columnsNegocios.map((column) => (
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
            Total de negocios: {negocios.length}
          </span>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    negocios.length,
    onClear,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos los negocios seleccionados"
            : `${selectedKeys.size} de ${filteredItems.length} negocios seleccionados`}
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
  }, [selectedKeys, page, pages, filteredItems.length, , onNextPage, onPreviousPage]);

  return (
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
          emptyContent={"No hay negocios 😭"}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.id_negocio}>
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
