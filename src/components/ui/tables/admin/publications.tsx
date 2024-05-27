"use client";

import React, { useState, useMemo, useCallback, Key } from "react";

import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  Pagination,
  Input,
  Button,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
  SortDescriptor,
  ChipProps,
  useDisclosure,
} from "@nextui-org/react";

import { hrApi } from "@/api";
import { IPublicacion, Estado } from "@/interfaces";

import {
  columnsPublications as columns,
  statusColorMapPublications as statusColorMap,
  statusOptionsPublications as statusOptions,
  statusColorMapPublicationsGeneral as statusColorMapGeneral,
  statusOptionsPublicationsGeneral as statusOptionsGeneral,
  availabilityOptionsPublications as availabilityOptions,
  availabilityColorMapPublications as availabilityColorMap,
} from "@/utils/data-table";
import { capitalize } from "@/utils/capitalize";

import { toast } from "sonner";
import { HiDotsVertical } from "react-icons/hi";
import { DANGER_TOAST, SUCCESS_TOAST, DeleteUserConfirm } from "@/components";
import { FaCheck, FaChevronDown, FaSearch } from "react-icons/fa";
import { MdBlock } from "react-icons/md";

interface Props {
  publications: IPublicacion[];
}

const INITIAL_VISIBLE_COLUMNS = [
  "titulo_publicacion",
  "disponibilidad",
  "estado_publicacion",
  "estado_general",
  "createdAt",
  "acciones",
];

export const TablePublications = ({ publications }: Props) => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [id, setId] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [statusGeneralFilter, setStatusGeneralFilter] =
    useState<Selection>("all");
  const [availabilityFilter, setAvailabilityFilter] =
    useState<Selection>("all");

  const rowsPerPage = 10;
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "createdAt",
    direction: "ascending",
  });

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredPublications = [...publications];

    if (hasSearchFilter) {
      filteredPublications = filteredPublications.filter((publication) =>
        publication.titulo_publicacion
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredPublications = filteredPublications.filter((publication) =>
        Array.from(statusFilter).includes(publication.estado_publicacion)
      );
    }
    if (
      statusGeneralFilter !== "all" &&
      Array.from(statusGeneralFilter).length !== statusOptionsGeneral.length
    ) {
      filteredPublications = filteredPublications.filter((publication) =>
        Array.from(statusGeneralFilter).includes(publication.estado_general)
      );
    }
    if (
      availabilityFilter !== "all" &&
      Array.from(availabilityFilter).length !== availabilityOptions.length
    ) {
      filteredPublications = filteredPublications.filter((publication) =>
        Array.from(availabilityFilter).includes(publication.disponibilidad)
      );
    }

    return filteredPublications;
  }, [
    publications,
    filterValue,
    statusFilter,
    hasSearchFilter,
    availabilityFilter,
    statusGeneralFilter,
  ]);

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
        (a[column as keyof IPublicacion] ?? "") <
        (b[column as keyof IPublicacion] ?? "")
      ) {
        return direction === "ascending" ? -1 : 1;
      }
      if (
        (a[column as keyof IPublicacion] ?? "") >
        (b[column as keyof IPublicacion] ?? "")
      ) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback(
    (publication: IPublicacion, columnKey: Key) => {
      const cellValue = publication[columnKey as keyof IPublicacion];

      switch (columnKey) {
        case "id_publicacion":
          return cellValue;
        case "titulo_publicacion":
          return (
            <>
              <Tooltip content={"Ver publicación"} placement="top-start">
                <Link
                  href={`/admin/dashboard/publications/${publication.id_publicacion}?in=${publication.id_negocio}`}
                  underline="always"
                  color="foreground"
                >
                  {publication.titulo_publicacion}
                </Link>
              </Tooltip>
            </>
          );
        case "disponibilidad":
          return (
            <Chip
              color={
                availabilityColorMap[
                  publication.disponibilidad
                ] as ChipProps["color"]
              }
              size="sm"
              variant="flat"
            >
              {capitalize(publication.disponibilidad)}
            </Chip>
          );
        case "estado_publicacion":
          return (
            <Chip
              color={
                statusColorMap[
                  publication.estado_publicacion
                ] as ChipProps["color"]
              }
              size="sm"
              variant="flat"
            >
              {capitalize(publication.estado_publicacion)}
            </Chip>
          );
        case "estado_general":
          return (
            <Chip
              color={
                statusColorMapGeneral[
                  publication.estado_general
                ] as ChipProps["color"]
              }
              size="sm"
              variant="flat"
            >
              {capitalize(publication.estado_general)}
            </Chip>
          );
        case "createdAt":
          return new Date(publication.createdAt.toString()).toLocaleString(
            "es-MX",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          );
        case "acciones":
          return (
            <div className="flex gap-2">
              <Tooltip
                content={
                  publication.estado_general === Estado.Activo
                    ? "Desactivar publicación"
                    : "Activar publicación"
                }
                placement="top"
              >
                <Button
                  size="sm"
                  variant="light"
                  isIconOnly
                  color="primary"
                  onPress={() =>
                    handleChangeStatus(
                      publication.id_publicacion,
                      publication.estado_general === Estado.Activo
                        ? Estado.Inactivo
                        : Estado.Activo
                    )
                  }
                >
                  {publication.estado_general === Estado.Activo ? (
                    <MdBlock size={21} />
                  ) : (
                    <FaCheck size={21} />
                  )}
                </Button>
              </Tooltip>
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <HiDotsVertical className="text-default-300" size={21} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    href={`/market/item/${publication.id_publicacion}`}
                  >
                    Ver
                  </DropdownItem>
                  <DropdownItem
                    onPress={() => {
                      setId(publication.id_publicacion.toString());
                      onOpen();
                    }}
                  >
                    Eliminar
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
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
            placeholder="Buscar por titulo..."
            startContent={<FaSearch size={20} />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<FaChevronDown size={20} />} variant="flat">
                  Estado general
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusGeneralFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusGeneralFilter}
              >
                {statusOptionsGeneral.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<FaChevronDown size={20} />} variant="flat">
                  Disponibilidad
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={availabilityFilter}
                selectionMode="multiple"
                onSelectionChange={setAvailabilityFilter}
              >
                {availabilityOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
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
            Total de publicaciones: {publications.length}
          </span>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    publications.length,
    onClear,
    statusGeneralFilter,
    availabilityFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos los clientes seleccionados"
            : `${selectedKeys.size} de ${filteredItems.length} clientes seleccionados`}
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

  const handleChangeStatus = async (id: number, status: string) => {
    try {
      await hrApi.put(`/publications/status/${id}`, { status }).then(() => {
        toast("Se ha cambiado el estado exitosamente", SUCCESS_TOAST);
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      toast("Error al cambiar estado", DANGER_TOAST);
    }
  };

  return (
    <>
      {id && (
        <DeleteUserConfirm
          useDisclosure={{ isOpen, onOpenChange }}
          loading={false}
          id={id}
        />
      )}
      <div className=" w-full flex flex-col gap-4">
        <Table
          aria-label="Table of publications"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
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
            emptyContent={"No hay publicaciones 😭"}
            items={sortedItems}
          >
            {(item) => (
              <TableRow key={item.id_publicacion}>
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
