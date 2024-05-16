import { IProduct, IPublicacion, IInventario } from "@/interfaces";

export interface ILote {
  id_lote: number;
  cantidad_producto: number;
  last_cantidad?: number;
  fecha_entrada: string;
  fecha_vencimiento: string;
  precio_kg: number;
  last_precio_kg?: number;
  monto_total: number;
  last_monto_total?: number;
  dias_aviso: number;

  disponibilidad: Disponibilidad;
  estado_lote: EstadoLote;
  tipo_almacenaje: TipoAlmacenaje;

  id_inventario: number;
  inventario: IInventario;

  id_producto: number;
  producto: IProduct;

  id_proveedor?: number;

  id_publicacion?: number;
  publicacion?: IPublicacion;
}

export interface IMergedLote {
  id_lote: number;
  cantidad_producto: number;
  fecha_entrada: string;
  fecha_vencimiento: string;
  precio_kg: number;
  monto_total: number;

  producto: IProduct;
}

export enum Disponibilidad {
  en_venta = "EN_VENTA",
  donacion = "DONACION",
  vendido = "VENDIDO",
  donado = "DONADO",
}

export enum EstadoLote {
  Activo = "ACTIVO",
  Vendido = "VENDIDO",
  Vencido = "VENCIDO",
  Terminado = "TERMINADO",
}

export enum TipoAlmacenaje {
  Huacal = "HUACAL",
  Caja = "CAJA",
  Bolsa = "BOLSA",
  Canasta = "CANASTA",
  Otro = "OTRO",
}
