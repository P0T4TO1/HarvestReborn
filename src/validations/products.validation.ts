import { z } from "zod";
import { TipoAlmacenaje } from "@/interfaces";

export const productSchema = z
  .object({
    cantidad_producto: z
      .number({
        required_error: "La cantidad es requerida",
        invalid_type_error: "La cantidad debe ser un número",
      })
      .min(1, {
        message: "La cantidad debe ser mayor a 0",
      })
      .max(1000, {
        message: "La cantidad debe ser menor a 1000",
      }),
    precio_kg: z
      .number({
        required_error: "El precio es requerido",
        invalid_type_error: "El precio debe ser un número",
      })
      .min(1, {
        message: "El precio debe ser mayor a 0",
      })
      .max(1000, {
        message: "El precio debe ser menor a 1000",
      }),
    fecha_entrada: z.date({
      required_error: "La fecha de entrada es requerida",
      invalid_type_error: "La fecha de entrada debe ser una fecha",
    }),
    fecha_vencimiento: z.date({
      required_error: "La fecha de vencimiento es requerida",
      invalid_type_error: "La fecha de vencimiento debe ser una fecha",
    }),
    dias_aviso: z
      .number({
        required_error: "Los días de aviso son requeridos",
        invalid_type_error: "Los días de aviso deben ser un número",
      })
      .min(1, {
        message: "Los días de aviso deben ser mayores a 0",
      })
      .max(30, {
        message: "Los días de aviso deben ser menores a 30",
      }),
    tipo_almacenaje: z.nativeEnum(TipoAlmacenaje, {
      // required_error: "El tipo de almacenaje es requerido",
      // invalid_type_error: "El tipo de almacenaje no es válido",
      errorMap: (issue, ctx) => {
        if (issue.code === "invalid_enum_value") {
          return { message: "El tipo de almacenaje no es válido" };
        }
        return { message: issue.message ?? "" };
      },
    }),
  })
  .superRefine((data, ctx) => {
    if (
      data.dias_aviso >
        data.fecha_vencimiento.getDate() - data.fecha_entrada.getDate() &&
      data.dias_aviso !== 0
    ) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dias_aviso"],
        message:
          "Los días de aviso no pueden ser mayores a la diferencia de días entre la fecha de entrada y la fecha de vencimiento",
      });
    }
    return true;
  });
