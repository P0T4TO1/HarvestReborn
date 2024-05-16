import { ILote, IProductoOrden } from "@/interfaces";

export interface IProduct {
  id_producto: number;
  nombre_producto: string;
  imagen_producto: string;
  descripcion?: string;
  enTemporada: boolean;
  categoria: Category;

  lote?: ILote;
  productoOrden?: IProductoOrden;
}

export enum Category {
  FRUTA = "FRUTA",
  VERDURA = "VERDURA",
}
