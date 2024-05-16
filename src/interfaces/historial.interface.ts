import { IOrden, ICliente, INegocio } from "@/interfaces";

export interface IHistorial {
  id_historial?: number;
  id_cliente: number;
  id_negocio: number;

  ordenes?: IOrden[];
  cliente?: ICliente;
  negocio?: INegocio;
}
