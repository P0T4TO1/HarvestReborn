import { INegocio, IUser } from "@/interfaces";

export interface IDuenoNegocio {
  id_dueneg?: number;
  nombre_dueneg: string;
  apellidos_dueneg: string;
  fecha_nacimiento: string;

  id_user: string;
  user?: IUser;
  
  negocio: INegocio;
}
