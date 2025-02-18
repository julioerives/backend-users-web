import { z } from "zod";
import { User } from "../models/user.model";

export const userSchema = z.object({
    name: z.string({
        required_error: "El campo nombre es requerido",
        invalid_type_error: "El campo nombre tiene que ser una cadena"
    }).min(2, {
        message: "El nombre debe tener al menos 2 caracteres"
    }).max(50, {
        message: "El nombre no puede tener más de 50 caracteres"
    }),
    password:z.string({
        required_error: "La contraseña es requerida",
      }).min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
        .regex(/[A-Z]/, { message: "La contraseña debe incluir al menos una letra mayúscula" })
        .regex(/\d/, { message: "La contraseña debe incluir al menos un número" }),
    email: z.string().email({
        message: "EL correo debe de ser un correo valido",
    }),

})
export const userLogInSchema = z.object({
    email: z.string().email({
        message: "EL correo debe de ser un correo valido",
    }),
    password: z.string({
        required_error: "El campo contraseña es requerido",
        invalid_type_error: "El campo contraseña tiene que ser una cadena"
    })
})