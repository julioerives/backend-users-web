import { Request, Response } from "express"
import { User } from "../models/user.model";
import { correctResponse } from "../helpers/responses/correctResponse";
import { GET_MESSAGE, POST_MESSAGE, UPDATE_MESSAGE } from "../helpers/constants/correctResponses";
import { errorResponse } from "../helpers/responses/errorResponse";
import { DATA_NOT_FOUND, DEFAULT_ERROR_RESPONSE, USER_NOT_EXISTS } from "../helpers/constants/errorResponse";
import { getConnection } from "../database/database";
import { PoolConnection, QueryResult } from "mysql2/promise";
import { addUserService, deleteUserService, getUsersService,deactivateUserService, updateUserService } from "../services/user.service";
import { ZodError } from "zod";
import { userSchema } from "../schemas/user.schema";
import { ResourceExistsException } from "../exceptions/ResourceExistsException";
import { ResourceNotFound } from "../exceptions/resourceNotFoundException";

export const insertUserController = async (req: Request, res: Response) => {
    let connection!: PoolConnection;
    try {
        connection = await getConnection();
        const user: User = req.body;
        userSchema.parse(user);
        await addUserService(user, connection)
        res.status(201).json(correctResponse<User>(POST_MESSAGE, user));
    } catch (error: any) {
        console.log("🚀 ~ insertUser ~ error:", error)
        if (error instanceof ZodError) {
            res.status(400).json(errorResponse(error.message))
            return
        }
        if (error instanceof ResourceExistsException){
            res.status(409).json(errorResponse(error.message))
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
        const result:QueryResult = await deleteUserService(connection,id_user);
        if(result.affectedRows <1){
            res.status(404).json(errorResponse(USER_NOT_EXISTS));
            return;
        }
        res.status(204).json(correctResponse("Registro eliminado correctamente", null));
    } catch (error: any) {
        console.log("🚀 ~ deleteUserController ~ error:", error)
        res.status(500).json(errorResponse(DEFAULT_ERROR_RESPONSE))
    } finally {
        connection?.release()
    }
}
export const deactivateUserController = async(req:Request, res:Response) =>{
    let connection!: PoolConnection;
    try {
        connection = await getConnection();
        const id_user:string = req.params.id ;
        if (!id_user) {
            res.status(400).json(errorResponse("El id es requerido"));
            return;
        }
        const result:QueryResult = await deactivateUserService(connection,id_user)
        if(result.affectedRows <1){
            res.status(404).json(errorResponse(USER_NOT_EXISTS));
            return;
        }
        
        res.status(204).json(correctResponse("Registro desactivado correctamente", null));
    } catch (error: any) {
        console.log("🚀 ~ desactiveUserController ~ error:", error)
        res.status(500).json(errorResponse(DEFAULT_ERROR_RESPONSE))
    } finally {
        connection?.release()
    }
}
export const updateUserController = async(req:Request, res:Response)=>{
    let connection!:PoolConnection;
    try {
        connection = await getConnection();
        const user: User = req.body;
        user.id_user = req.params.id;
        await updateUserService(connection,user)
        res.status(201).json(correctResponse<User>(UPDATE_MESSAGE, user));
    } catch (error: any) {
        console.log("🚀 ~ updateUser ~ error:", error)
        if (error instanceof ResourceNotFound){
            res.status(404).json(errorResponse(error.message))
            return
        }
        res.status(500).json(errorResponse(DEFAULT_ERROR_RESPONSE));
    } finally {
        connection?.release()
    }
}