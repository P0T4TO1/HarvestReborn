import { INegocio, Estado, ILote, IMensaje } from '@/interfaces';

export interface IPublicacion {
  id_publicacion: number;

  id_negocio: number;
  negocio: INegocio;

  titulo_publicacion: string;
  descripcion_publicacion: string;
  precio_publicacion?: number;
  images_publicacion: string[];

  disponibilidad: DisponibilidadPublicacion;
  estado_publicacion: EstadoPublicacion;
  estado_general: Estado;

  linkedMensajes: IMensaje[];

  lotes?: ILote[];

  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
}

export enum DisponibilidadPublicacion {
  En_venta = 'EN_VENTA',
  Donacion = 'DONACION',
}

export enum EstadoPublicacion {
  Activo = 'ACTIVO',
  Inactiva = 'INACTIVA',
  Pendiente = 'PENDIENTE',
  Rechazada = 'RECHAZADA',
  Vendido = 'VENDIDO',
  Donado = 'DONADO',
}
