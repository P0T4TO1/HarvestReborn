import { IUser } from "./user.interface";

export interface IMensaje {
  id_mensaje: string;
  cuerpo_mensaje: string;
  tipo_mensaje: tipo_mensaje;
  leido: boolean;

  createdAt?: string;
  deletedAt?: string;

  id_chat: string;
  chat?: IChat;

  id_user: string;
  user?: IUser;
}

export interface IParticipantes {
  id_participantes: number;

  id_user: string;
  user?: IUser;

  id_chat: string;
  chat?: IChat;
}

export interface IChat {
  id_chat: string;
  nombre_chat: string;
  fecha_creacion: string | Date;

  id_user_creator: string;
  user?: IUser;

  participantes: IParticipantes[];
  mensajes: IMensaje[];
}

export enum tipo_mensaje {
  texto = "TEXTO",
  imagen = "IMAGEN",
  video = "VIDEO",
  audio = "AUDIO",
  documento = "DOCUMENTO",
}

export interface IChatWithLastMessage {
  id: string;
  name: string;
  lastMessage: {
    text: string;
    senderId: string;
    senderName?: string;
  };
  participants?: IParticipantes[];
}
