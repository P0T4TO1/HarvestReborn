import { z } from "zod";

export const registerUserDataSchema = z
  .object({
    email: z
      .string({ required_error: "El correo es obligatorio" })
      .email({ message: "Correo invalido" })
      .max(100, { message: "El correo debe tener menos de 100 caracteres" }),
    password: z
      .string({ required_error: "La contraseña es obligatoria" })
      .min(3, { message: "La contraseña debe tener mínimo 3 caracteres" })
      .max(100, {
        message: "La contraseña debe tener menos de 100 caracteres",
      }),
    confirmPassword: z
      .string({
        required_error: "La confirmación de la contraseña es obligatoria",
      })
      .min(3, {
        message:
          "La confirmación de la contraseña debe tener mínimo 3 caracteres",
      })
      .max(100, {
        message:
          "La confirmación de la contraseña debe tener menos de 100 caracteres",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const registerPersonalDataSchema = z
  .object({
    nombre: z
      .string({ required_error: "El nombre es obligatorio" })
      .min(3, { message: "El nombre debe tener mínimo 3 caracteres" })
      .max(100, { message: "El nombre debe tener menos de 100 caracteres" }),
    apellidos: z
      .string({ required_error: "Los apellidos son obligatorios" })
      .min(3, { message: "Los apellidos deben tener mínimo 3 caracteres" })
      .max(100, {
        message: "Los apellidos deben tener menos de 100 caracteres",
      }),
    fecha_nacimiento: z.string({
      required_error: "La fecha de nacimiento es obligatoria",
    }),
    dia_nacimiento: z
      .string({ required_error: "El día es obligatorio" })
      .min(2, {
        message: "El día debe tener mínimo 2 caracteres",
      })
      .max(2, { message: "El día debe tener menos de 2 caracteres" }),
    mes_nacimiento: z.string({ required_error: "El mes es obligatorio" }),
    year_nacimiento: z
      .string({ required_error: "El año es obligatorio" })
      .min(4, {
        message: "El año debe tener mínimo 4 caracteres",
      })
      .max(4, { message: "El año debe tener menos de 4 caracteres" }),
    tipo: z.string({ required_error: "El tipo es obligatorio" }),
  })
  .superRefine((data, ctx) => {
    const mayorEdad = new Date().getFullYear() - 18;

    const { dia_nacimiento, mes_nacimiento, year_nacimiento } = data;
    if (
      parseInt(mes_nacimiento) === 1 ||
      parseInt(mes_nacimiento) === 3 ||
      parseInt(mes_nacimiento) === 5 ||
      parseInt(mes_nacimiento) === 7 ||
      parseInt(mes_nacimiento) === 8 ||
      parseInt(mes_nacimiento) === 10 ||
      parseInt(mes_nacimiento) === 12
    ) {
      if (parseInt(dia_nacimiento) > 31) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: 31,
          type: "string",
          inclusive: true,
          message: "El día no puede ser mayor a 31",
          path: ["dia_nacimiento"],
        });
      }
    } else if (
      parseInt(mes_nacimiento) === 4 ||
      parseInt(mes_nacimiento) === 6 ||
      parseInt(mes_nacimiento) === 9 ||
      parseInt(mes_nacimiento) === 11
    ) {
      if (parseInt(dia_nacimiento) > 30) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: 30,
          type: "string",
          inclusive: true,
          message: "El día no puede ser mayor a 30",
          path: ["dia_nacimiento"],
        });
      }
    } else if (parseInt(mes_nacimiento) === 2) {
      if (parseInt(year_nacimiento) % 4 === 0) {
        if (parseInt(dia_nacimiento) > 29) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            maximum: 29,
            type: "string",
            inclusive: true,
            message: "El día no puede ser mayor a 29",
            path: ["dia_nacimiento"],
          });
        }
      } else {
        if (parseInt(dia_nacimiento) > 28) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            maximum: 28,
            type: "string",
            inclusive: true,
            message: "El día no puede ser mayor a 28",
            path: ["dia_nacimiento"],
          });
        }
      }
    }
    if (parseInt(mes_nacimiento) > 12) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        maximum: 12,
        type: "string",
        inclusive: true,
        message: "El mes no puede ser mayor a 12",
        path: ["mes_nacimiento"],
      });
    }
    if (parseInt(year_nacimiento) > mayorEdad) {
      console.log(mayorEdad, "mayorEdad");
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: mayorEdad,
        type: "string",
        inclusive: true,
        message: "Debes ser mayor de edad para registrarte",
        path: ["year_nacimiento"],
      });
    }
    return null;
  });

export const registerContactDataSchema = z.object({
  nombreNegocio: z.string().optional(),
  telefono: z
    .string({ required_error: "El telefono es obligatorio" })
    .min(10, { message: "El telefono debe tener mínimo 10 caracteres" })
    .max(10, { message: "El telefono debe tener menos de 10 caracteres" }),
  calle: z
    .string({ required_error: "La calle es obligatoria" })
    .min(3, { message: "La calle debe tener mínimo 3 caracteres" })
    .max(100, { message: "La calle debe tener menos de 100 caracteres" }),
  colonia: z
    .string({ required_error: "La colonia es obligatoria" })
    .min(3, { message: "La colonia debe tener mínimo 3 caracteres" })
    .max(100, { message: "La colonia debe tener menos de 100 caracteres" }),
  alcaldia: z
    .string({ required_error: "La alcaldia es obligatoria" })
    .min(3, { message: "La alcaldia debe tener mínimo 3 caracteres" })
    .max(100, { message: "La alcaldia debe tener menos de 100 caracteres" }),
  cp: z
    .string({ required_error: "El código postal es obligatorio" })
    .min(5, { message: "El código postal debe tener mínimo 5 caracteres" })
    .max(5, { message: "El código postal debe tener menos de 5 caracteres" }),
});

export const loginSchema = z.object({
  user_email: z
    .string({ required_error: "El correo es obligatorio" })
    .email({ message: "Correo invalido" })
    .max(100, { message: "El correo debe tener menos de 100 caracteres" }),
  user_password: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(3, { message: "La contraseña debe tener mínimo 3 caracteres" })
    .max(100, { message: "La contraseña debe tener menos de 100 caracteres" }),
});
