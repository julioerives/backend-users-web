import { Request, Response } from "express";
import { errorResponse } from "../helpers/responses/errorResponse";
import { DEFAULT_ERROR_RESPONSE } from "../helpers/constants/errorResponse";
import { PoolConnection } from "mysql2/promise";
import { getConnection } from "../database/database";
import { User } from "../models/user.model";
import { ResourceNotFound } from "../exceptions/resourceNotFoundException";

import { PasswordMismatchError } from "../exceptions/passwordMismatchException";
import { userLogInSchema, userSchema } from "../schemas/user.schema";
import { ZodError } from "zod";
import { logInService } from "../services/auth.service";
import { correctResponse } from "../helpers/responses/correctResponse";
import { accessToken } from "../helpers/JWT/accessToken";

export const logInController = async (req: Request, res: Response): Promise<any> => {
    let connection!: PoolConnection;
    try {
        connection = await getConnection();
        const user: User = req.body;
        userLogInSchema.parse(user)
        const result = await logInService(user, connection)
        const token: string = `Bearer ${accessToken<User>(user)}`;
        res.cookie("token", token, { maxAge: 36000000, httpOnly: true })
        res.status(200).json(correctResponse<User>("Autenticación exitosa", result))
    } catch (e) {
        console.log("🚀 ~ logInController ~ e:", e)
        if (e instanceof ZodError) {
            return res.status(400).json(errorResponse(e.message))
        } else if (e instanceof ResourceNotFound) {
            return res.status(404).json(errorResponse(e.message))
        } else if (e instanceof PasswordMismatchError) {
            return res.status(401).json(errorResponse(e.message))
        }
        return res.status(505).json(errorResponse(DEFAULT_ERROR_RESPONSE))
    } finally {
        connection?.release()
    }
}