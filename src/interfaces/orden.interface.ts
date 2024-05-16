import { ICliente, ILote, INegocio, IProduct } from "@/interfaces";

export interface IOrden {
  id_orden: string;
  fecha_orden: string | Date;
  hora_orden: string | Date;
  monto_total: number;
  estado_orden: EstadoOrden | string;

  id_cliente: number;
  cliente?: ICliente;

  id_negocio: number;
  negocio?: INegocio;

  id_historial?: number;

  productoOrden: IProductoOrden[];

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface IProductoOrden {
  id_productoOrden?: number;
  cantidad_orden: number;
  monto: number;

  id_orden?: number;
  orden?: IOrden;

  id_producto: number;
  producto?: IProduct;

  id_lote?: number;
  lote?: ILote;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export enum EstadoOrden {
  PENDIENTE = "PENDIENTE",
  EN_PROCESO = "EN_PROCESO",
  RECHAZADO = "RECHAZADO",
  FINALIZADO = "FINALIZADO",
  CANCELADO = "CANCELADO",
}

export interface IMergedOrder {
  id_orden: number;
  orden: IOrden;
  productos: IProductoOrden[];
}

export interface ProductsOrder {
  id_negocio: number;
  nombre_negocio: string;
  productos: IProductoOrden[];
  total: number;
}

export type BagType = ProductsOrder[];
