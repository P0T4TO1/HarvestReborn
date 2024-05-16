import { z } from "zod";
import { Disponibilidad } from "@/interfaces";

export const negocioGeneralDataSchema = z.object({
  nombre_negocio: z
    .string({
      required_error: "El nombre del negocio es requerido",
    })
    .min(3, {
      message: "El nombre del negocio debe tener al menos 3 caracteres",
    })
    .max(255, {
      message: "El nombre del negocio debe tener menos de 255 caracteres",
    }),
  direccion_negocio: z
    .string({
      required_error: "La dirección del negocio es requerida",
    })
    .min(3, {
      message: "La dirección del negocio debe tener al menos 3 caracteres",
    })
    .max(255, {
      message: "La dirección del negocio debe tener menos de 255 caracteres",
    }),
  calle: z
    .string({
      required_error: "La calle es requerida",
    })
    .min(3, {
      message: "La calle debe tener al menos 3 caracteres",
    })
    .max(255, {
      message: "La calle debe tener menos de 255 caracteres",
    }),
  colonia: z
    .string({
      required_error: "La colonia es requerida",
    })
    .min(3, {
      message: "La colonia debe tener al menos 3 caracteres",
    })
    .max(255, {
      message: "La colonia debe tener menos de 255 caracteres",
    }),
  alcaldia: z
    .string({
      required_error: "La alcaldía es requerida",
    })
    .min(3, {
      message: "La alcaldía debe tener al menos 3 caracteres",
    })
    .max(255, {
      message: "La alcaldía debe tener menos de 255 caracteres",
    }),
  cp: z
    .string({
      required_error: "El código postal es requerido",
    })
    .min(3, {
      message: "El código postal debe tener al menos 3 caracteres",
    })
    .max(255, {
      message: "El código postal debe tener menos de 255 caracteres",
    }),
  telefono_negocio: z
    .string({
      required_error: "El teléfono del negocio es requerido",
    })
    .min(3, {
      message: "El teléfono del negocio debe tener al menos 3 caracteres",
    })
    .max(255, {
      message: "El teléfono del negocio debe tener menos de 255 caracteres",
    }),
  email_negocio: z.string().optional(),
});

export const negocioDescriptionSchema = z.object({
  descripcion_negocio: z
    .string({
      required_error: "La descripción del negocio es requerida",
    })
    .min(3, {
      message: "La descripción del negocio debe tener al menos 3 caracteres",
    })
    .max(255, {
      message: "La descripción del negocio debe tener menos de 255 caracteres",
    }),
});

export const negocioImagesSchema = z.object({
  images_negocio: z.array(z.string()).optional(),
});

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const postValidationSchema = z.object({
  images_publicacion: z
    .array(
      z
        .unknown()
        .transform((value) => {
          if (value instanceof FileList) {
            return Array.from(value);
          }
          return value;
        })
        .refine(
          (files) => {
            if (!files) return false;
            if (Object.keys(files).length === 0) return true;
            if (files instanceof File) {
              if (!ACCEPTED_IMAGE_TYPES.includes(files.type)) return false;
              if (files.size > MAX_FILE_SIZE) return false;
            }
            if (Array.isArray(files)) {
              for (const file of files) {
                if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return false;
                if (file.size > MAX_FILE_SIZE) return false;
              }
            }
            return true;
          },
          {
            message: "La imagen del producto no es válida",
          }
        )
    )
    .min(1, {
      message: "La imagen de la publicación es requerida",
    })
    .max(10, {
      message: "Máximo 10 imágenes por publicación",
    }),
  titulo_publicacion: z
    .string({
      required_error: "El título de la publicación es requerido",
      invalid_type_error: "El título de la publicación debe ser de tipo texto",
    })
    .min(3, {
      message: "El título de la publicación debe tener al menos 3 caracteres",
    })
    .max(255, {
      message: "El título de la publicación debe tener menos de 255 caracteres",
    }),
  descripcion_publicacion: z
    .string({
      required_error: "La descripción de la publicación es requerida",
      invalid_type_error:
        "La descripción de la publicación debe ser de tipo texto",
    })
    .min(3, {
      message:
        "La descripción de la publicación debe tener al menos 3 caracteres",
    })
    .max(400, {
      message:
        "La descripción de la publicación debe tener menos de 400 caracteres",
    }),
  price: z
    .number({
      invalid_type_error: "El precio debe ser de tipo numérico",
    })
    .optional(),
  disponibilidad: z.nativeEnum(Disponibilidad, {
    errorMap: (issue, ctx) => {
      if (issue.code === "invalid_enum_value") {
        return {
          message: "El tipo de disponibilidad no es valido o esta vacio",
        };
      }
      return { message: issue.message ?? "" };
    },
  }),
  lotes: z
    .array(z.number(), {
      required_error: "Los lotes son requeridos",
    })
    .min(1, {
      message: "Los lotes son requeridos",
    }),
});
