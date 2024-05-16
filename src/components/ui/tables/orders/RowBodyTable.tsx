import * as React from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import { Image } from "@nextui-org/react";
import { IProductoOrden, IMergedOrder } from "@/interfaces";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface RowProps {
  products: IProductoOrden[];
  orden: IMergedOrder;
  children: React.ReactNode;
}

export const RowOrders = ({ products, orden, children }: RowProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow key={orden.id_orden}>
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
          {orden.id_orden}
        </TableCell>
        <TableCell align="right" className="dark:text-gray-300">
          {orden.orden?.cliente?.nombre_cliente}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Productos
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id_producto}>
                      <TableCell component="th" scope="row">
                        {product.producto?.nombre_producto}
                      </TableCell>
                      <TableCell align="right">{product.cantidad_orden}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
