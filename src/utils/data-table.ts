// Objetivo: Contiene las constantes que se utilizan en las tablas de datos
import { TipoAlmacenaje } from '@/interfaces';
import exp from 'constants';

// Ordenes de negocio/ejemplo
export const statusColorMapOrders = {
  PENDIENTE: 'warning',
  EN_PROCESO: 'primary',
  RECHAZADO: 'danger',
  FINALIZADO: 'success',
  CANCELADO: 'danger',
};

export const columnsOrders = [
  { name: 'NO. DE ORDEN', uid: 'id_orden', sortable: true },
  { name: 'CLIENTE', uid: 'cliente.nombre_cliente', sortable: true },
  { name: 'FECHA', uid: 'fecha_orden', sortable: true },
  { name: 'TOTAL', uid: 'monto_total', sortable: true },
  { name: 'ESTADO', uid: 'estado_orden', sortable: true },
  { name: 'ACCIONES', uid: 'acciones' },
];

export const statusOptionsOrders = [
  { name: 'PENDIENTE', uid: 'PENDIENTE' },
  { name: 'EN PROCESO', uid: 'EN_PROCESO' },
  { name: 'RECHAZADO', uid: 'RECHAZADO' },
  { name: 'FINALIZADO', uid: 'FINALIZADO' },
  { name: 'CANCELADO', uid: 'CANCELADO' },
];

export const INITIAL_VISIBLE_COLUMNS = [
  'id_orden',
  'cliente.nombre_cliente',
  'fecha_orden',
  'monto_total',
  'estado_orden',
  'acciones',
];

// Clientes
export const columnsClientes = [
  { name: 'ID', uid: 'id_cliente', sortable: true },
  { name: 'NOMBRE', uid: 'nombre_cliente', sortable: true },
  { name: 'APELLIDOS', uid: 'apellidos_cliente', sortable: true },
  { name: 'TELÉFONO', uid: 'telefono_cliente', sortable: true },
  { name: 'ID USUARIO', uid: 'id_user', sortable: true },
  { name: 'ACCIONES', uid: 'acciones' },
];

// Negocios
export const statusColorMapNegocios = {
  ACTIVO: 'success',
  INACTIVO: 'error',
  PENDIENTE: 'warning',
};

export const statusOptionsNegocios = [
  { name: 'ACTIVO', uid: 'ACTIVO' },
  { name: 'INACTIVO', uid: 'INACTIVO' },
  { name: 'PENDIENTE', uid: 'PENDIENTE' },
];

export const columnsNegocios = [
  { name: 'ID', uid: 'id_negocio', sortable: true },
  { name: 'NOMBRE', uid: 'nombre_negocio', sortable: true },
  { name: 'DIRECCIÓN', uid: 'direccion_negocio', sortable: true },
  { name: 'FECHA DE CREACIÓN', uid: 'createdAt', sortable: true },
  { name: 'ID DUEÑO', uid: 'id_dueneg', sortable: true },
  { name: 'ESTADO', uid: 'estado_negocio', sortable: true },
  { name: 'ACCIONES', uid: 'acciones' },
];

// Productos
export const categoryColorMap = {
  VERDURA: 'primary',
  FRUTA: 'secondary',
  OTROS: 'default',
};

export const columnsProductos = [
  { name: 'NO. PRODUCTO', uid: 'no. de producto', sortable: true },
  { name: 'IMAGEN', uid: 'imagen_producto' },
  { name: 'NOMBRE', uid: 'nombre_producto', sortable: true },
  { name: 'DESCRIPCIÓN', uid: 'descripcion', sortable: true },
  { name: 'EN TEMPORADA', uid: 'enTemporada', sortable: true },
  { name: 'CATEGORÍA', uid: 'categoria', sortable: true },
  { name: 'ACCIONES', uid: 'acciones' },
];

export const categoryOptionsProductos = [
  { name: 'VERDURA', uid: 'VERDURA' },
  { name: 'FRUTA', uid: 'FRUTA' },
  { name: 'OTROS', uid: 'OTROS' },
];

// Usuarios
export const columnsUsuarios = [
  { name: 'ID', uid: 'id', sortable: true },
  {
    name: 'NOMBRE',
    uid: 'duenonegocio?.nombre_dueneg ?? cliente?.nombre_cliente',
    sortable: true,
  },
  {
    name: 'APELLIDO',
    uid: 'duenonegocio?.apellidos_dueneg ?? cliente?.apellidos_cliente',
    sortable: true,
  },
  { name: 'CORREO', uid: 'email', sortable: true },
  { name: 'ROL', uid: 'id_rol', sortable: true },
  { name: 'ESTADO', uid: 'estado', sortable: true },
  { name: 'CORREO VERIFICADO', uid: 'emailVerified' },
  { name: 'ACCIONES', uid: 'acciones' },
];

export const statusColorMapUsuarios = {
  ACTIVO: 'success',
  INACTIVO: 'error',
  PENDIENTE: 'warning',
};

export const statusOptionsUsuarios = [
  { name: 'ACTIVO', uid: 'ACTIVO' },
  { name: 'INACTIVO', uid: 'INACTIVO' },
];

export const rolOptionsUsuarios = [
  { name: 'Super Admin', uid: 1 },
  { name: 'Dueño de negocio', uid: 2 },
  { name: 'Cliente', uid: 3 },
  { name: 'Registro oAuth', uid: 4 },
  { name: 'Soporte', uid: 5 },
  { name: 'Admin Soporte', uid: 6 },
  { name: 'Admin', uid: 7 },
];

// Lotes
export const columnsLotes = [
  { name: 'ID', uid: 'id_lote', sortable: true },
  { name: 'NO. DE LOTE', uid: 'no_lote', sortable: true },
  { name: 'TIPO DE ALMACENAMIENTO', uid: 'tipo_almacenaje', sortable: true },
  { name: 'CANTIDAD INICIAL EN KG', uid: 'cantidad_producto', sortable: true },
  { name: 'CANTIDAD ACTUAL EN KG', uid: 'last_cantidad', sortable: true },
  { name: 'FECHA DE ENTRADA', uid: 'fecha_entrada', sortable: true },
  { name: 'HORA DE ENTRADA', uid: 'hora_entrada', sortable: true },
  {
    name: 'FECHA APROX. DE VENCIMIENTO',
    uid: 'fecha_vencimiento',
    sortable: true,
  },
  { name: 'ACCIONES', uid: 'acciones' },
];

export const storageOptionsLotes = [
  { name: 'HUACAL', uid: TipoAlmacenaje.Huacal },
  { name: 'CAJA', uid: TipoAlmacenaje.Caja },
  { name: 'BOLSA', uid: TipoAlmacenaje.Bolsa },
  { name: 'CANASTA', uid: TipoAlmacenaje.Canasta },
  { name: 'OTRO', uid: TipoAlmacenaje.Otro },
];

export const fechasVencimientoOptionsLotes = [
  { name: 'Lejano', uid: 'LEJANO' },
  { name: 'Próximo', uid: 'PROXIMO' },
  { name: 'Cercano', uid: 'CERCANO' },
  { name: 'Vencido', uid: 'VENCIDO' },
];

export const storageColorMapLotes = {
  HUACAL: 'primary',
  CAJA: 'secondary',
  BOLSA: 'success',
  CANASTA: 'warning',
  OTRO: 'error',
};

export const columnsPublications = [
  { name: 'ID', uid: 'id_publicacion', sortable: true },
  { name: 'USUARIO', uid: 'negocio.dueneg.user?.email', sortable: true },
  { name: 'NEGOCIO', uid: 'negocio.nombre_negocio', sortable: true },
  { name: 'TÍTULO', uid: 'titulo_publicacion', sortable: true },
  { name: 'DISPONIBILIDAD', uid: 'disponibilidad', sortable: true },
  { name: 'ESTADO', uid: 'estado_publicacion', sortable: true },
  { name: 'ESTADO GENERAL', uid: 'estado_general', sortable: true },
  { name: 'FECHA DE PUBLICACIÓN', uid: 'createdAt', sortable: true },
  { name: 'ACCIONES', uid: 'acciones' },
];

export const availabilityOptionsPublications = [
  { name: 'EN VENTA', uid: 'EN_VENTA' },
  { name: 'DONACIÓN', uid: 'DONACION' },
];

export const availabilityColorMapPublications = {
  EN_VENTA: 'primary',
  DONACION: 'secondary',
};

export const statusOptionsPublications = [
  { name: 'ACTIVO', uid: 'ACTIVO' },
  { name: 'INACTIVA', uid: 'INACTIVA' },
  { name: 'PENDIENTE', uid: 'PENDIENTE' },
  { name: 'RECHAZADA', uid: 'RECHAZADA' },
  { name: 'VENDIDO', uid: 'VENDIDO' },
  { name: 'DONADO', uid: 'DONADO' },
];

export const statusColorMapPublications = {
  ACTIVO: 'success',
  INACTIVA: 'danger',
  PENDIENTE: 'warning',
  RECHAZADA: 'danger',
  VENDIDO: 'secondary',
  DONADO: 'secondary',
};

export const statusOptionsPublicationsGeneral = [
  { name: 'ACTIVO', uid: 'ACTIVO' },
  { name: 'INACTIVO', uid: 'INACTIVO' },
  { name: 'PENDIENTE', uid: 'PENDIENTE' },
];

export const statusColorMapPublicationsGeneral = {
  ACTIVO: 'success',
  INACTIVO: 'danger',
  PENDIENTE: 'warning',
};
