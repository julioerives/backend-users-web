import { Request, Response } from "express"
import { User } from "../models/user.model";
import { correctResponse } from "../helpers/responses/correctResponse";
import { GET_MESSAGE, POST_MESSAGE } from "../helpers/constants/correctResponses";
import { errorResponse } from "../helpers/responses/errorResponse";
import { DATA_NOT_FOUND, DEFAULT_ERROR_RESPONSE } from "../helpers/constants/errorResponse";
import { getConnection } from "../database/database";
import { PoolConnection } from "mysql2/promise";
import { addUserService, deleteUserService, getUsersService } from "../services/user.service";
import { ZodError } from "zod";
import { userSchema } from "../schemas/user.schema";

export const insertUserController = async (req: Request, res: Response) => {
    let connection!: PoolConnection;
    try {
        connection = await getConnection();
        const user: User = req.body;
        console.log("🚀 ~ insertUserController ~ user:", user)
        userSchema.parse(user);
        await addUserService(user, connection)
        res.status(201).json(correctResponse<User>(POST_MESSAGE, user));
    } catch (error: any) {
        console.log("🚀 ~ insertUser ~ error:", error)
        if (error instanceof ZodError) {
            res.status(400).json(errorResponse(error.message))
            return
        }
        res.status(500).json(errorResponse(DEFAULT_ERROR_RESPONSE));
    } finally {
        connection?.release()
    }
}

export const getUserController = async (req: Request, res: Response) => {
    let connection!: PoolConnection;

    try {
        connection = await getConnection();
        let users = await getUsersService(connection) as User[]
        if (users.length < 0) {
            res.status(404).json(errorResponse(DATA_NOT_FOUND));
            return;
        }
        res.status(201).json(correctResponse<User[]>(GET_MESSAGE, users));
    } catch (error: any) {
        console.log("🚀 ~ getUser ~ error:", error)
        res.status(500).json(errorResponse(DEFAULT_ERROR_RESPONSE))
    } finally {
        connection?.release()
    }
}
export const deleteUserController = async(req:Request, res:Response)=>{
    let connection!: PoolConnection;
    try {
        connection = await getConnection();
        const id_user:string = req.params.id ;
        if (!id_user) {
            res.status(400).json(errorResponse("El id es requerido"));
            return;
        }
        await deleteUserService(connection,id_user)
        res.status(204).json(correctResponse("Registro eliminado correctamente", null));
    } catch (error: any) {
        console.log("🚀 ~ deleteUserController ~ error:", error)
        res.status(500).json(errorResponse(DEFAULT_ERROR_RESPONSE))
    } finally {
        connection?.release()
    }
}