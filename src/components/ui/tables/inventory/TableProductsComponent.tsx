"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ILote } from "@/interfaces";
import { Row } from "@/components";

interface ProductsCollapsibleTableProps {
  lotesById: ILote[];
  allLotes: ILote[];
}

export const ProductsCollapsibleTable = ({
  lotesById,
  allLotes,
}: ProductsCollapsibleTableProps) => {
  return (
    <>
      <TableContainer component={Paper} className="dark:bg-[#1D1C19]">
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="left" className="dark:text-gray-300">
                Ver lotes
              </TableCell>
              <TableCell className="dark:text-gray-300">Imagen</TableCell>
              <TableCell align="right" className="dark:text-gray-300">
                Nombre del producto
              </TableCell>
              <TableCell align="right" className="dark:text-gray-300">
                No. de lotes
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lotesById?.map((loteMap) => (
              <Row lote={loteMap} allLotes={allLotes} key={loteMap.id_lote} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
