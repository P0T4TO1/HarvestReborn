"use client";

import { ILote } from "@/interfaces";
import React, { useState, useEffect } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
} from "@mui/material";
import { Image } from "@nextui-org/react";
import { TableProductsInventory } from "@/components";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface RowProps {
  lote: ILote;
  allLotes: ILote[];
}

export const Row = ({ lote, allLotes }: RowProps) => {
  const [open, setOpen] = useState(false);
  const [mergeLotes, setMergeLotes] = useState<ILote[]>([]);

  useEffect(() => {
    const mergeLotes = allLotes.filter(
      (loteFilter) => loteFilter.id_producto === lote.id_producto
    );
    setMergeLotes(mergeLotes);
  }, [allLotes, lote]);

  return (
    <React.Fragment>
      <TableRow key={lote.id_lote}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            className="dark:text-gray-300"
          >
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Image
            src={lote.producto?.imagen_producto}
            alt="imagenproduct"
            style={{ width: "100px", height: "100px" }}
          />
        </TableCell>
        <TableCell align="right" className="dark:text-gray-300">
          {lote.producto?.nombre_producto}
        </TableCell>
        <TableCell align="right" className="dark:text-gray-300">
          {
            allLotes?.filter(
              (loteFilter) => loteFilter.id_producto === lote.id_producto
            ).length
          }
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                className="dark:text-gray-300"
              >
                Lotes de {lote.producto?.nombre_producto}
              </Typography>
              <TableProductsInventory lotes={mergeLotes}/>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
