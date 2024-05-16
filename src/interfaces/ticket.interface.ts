import { IUser } from "@/interfaces";

export interface ITicket {
  id_ticket?: number;
  nombre_usuario: string;
  descripcion: string;
  images: string[];
  fecha_creacion: string;
  fecha_cierre: string;
  estado_ticket: EstadoTicket;

  id_user?: number;
  user?: IUser;
}

export enum EstadoTicket {
  PENDIENTE = "PENDIENTE",
  ACTIVO = "ACTIVO",
  CERRADO = "CERRADO",
}
