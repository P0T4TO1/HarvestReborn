import { IDuenoNegocio, ICliente, INegocio } from "@/interfaces";

export interface IUser {
  id: string;
  password: string;
  email: string;
  estado: Estado;

  oAuthId?: string;

  emailVerified: boolean;

  id_rol: number;
  rol: IRol;

  nombre?: string;
  apellidos?: string;

  cliente?: ICliente;
  duenonegocio?: IDuenoNegocio;
  negocio?: INegocio;
}

export enum Estado {
  Activo = "ACTIVO",
  Inactivo = "INACTIVO",
  Pendiente = "PENDIENTE",
}

export interface IRol {
  id_rol: number;
  nombre_rol: string;

  user: IUser;
}
