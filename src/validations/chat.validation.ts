import { z } from "zod";

export const addFriendValidator = z.object({
  email: z.string().email(),
});

export const messageValidator = z.object({
  id_mensaje: z.string(),
  cuerpo_mensaje: z.string(),
  tipo_mensaje: z.enum(["TEXTO", "IMAGEN", "VIDEO", "AUDIO", "DOCUMENTO"]),
  leido: z.boolean(),
  createdAt: z.date().or(z.string()),
  deletedAt: z.string().or(z.null()).optional(),
  id_chat: z.string(),
  id_user: z.string(),
})

export const messageArrayValidator = z.array(messageValidator)

export type Message = z.infer<typeof messageValidator>