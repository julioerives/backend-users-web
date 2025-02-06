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