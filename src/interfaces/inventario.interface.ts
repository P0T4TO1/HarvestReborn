import { INegocio, ILote } from "@/interfaces";

export interface IInventario {
  id_inventario?: number;

  id_negocio: number;
  negocio?: INegocio;
  
  lote?: ILote[];
}
