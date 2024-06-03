import {
  Estado,
  IDuenoNegocio,
  IHistorial,
  IInventario,
  IOrden,
  IPublicacion,
} from "@/interfaces";

export interface INegocio {
  id_negocio: number;
  nombre_negocio: string;
  direccion_negocio: string;
  telefono_negocio: string;
  email_negocio?: string;
  images_negocio: string[];
  descripcion_negocio?: string;

  estado_negocio: Estado;

  id_dueneg: number;
  dueneg: IDuenoNegocio;

  historial?: IHistorial;
  inventario?: IInventario;
  ordenes?: IOrden[];
  publicaciones?: IPublicacion[];

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
