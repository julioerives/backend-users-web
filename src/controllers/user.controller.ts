import { Request, Response } from "express"
import { User } from "../models/user.model";
import { correctResponse } from "../helpers/responses/correctResponse";
import { GET_MESSAGE, POST_MESSAGE } from "../helpers/constants/correctResponses";
import { errorResponse } from "../helpers/responses/errorResponse";
import { DATA_NOT_FOUND, DEFAULT_ERROR_RESPONSE } from "../helpers/constants/errorResponse";
import { getConnection } from "../database/database";
import { PoolConnection } from "mysql2/promise";
import { addUser, getUsers } from "../services/user.service";
import { ZodError } from "zod";
import { userSchema } from "../schemas/user.schema";

export const insertUser = async (req: Request, res: Response) => {
    let connection!: PoolConnection;
    try {
        connection = await getConnection();
        const user: User = req.body;
        userSchema.parse(user);
        await addUser(user, connection)
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

export const getUser = async (req: Request, res: Response) => {
    let connection!: PoolConnection;

    try {
        connection = await getConnection();
        let users = await getUsers(connection) as User[]
        if(users.length < 0) {
            res.status(404).json(errorResponse(DATA_NOT_FOUND));
            return;
        }
        res.status(201).json(correctResponse<User[]>(GET_MESSAGE, users));
    } catch (error: any) {
        console.log("🚀 ~ getUser ~ error:", error)
        if (error instanceof ZodError) {
            res.status(400).json(errorResponse(error.message))
            return
        }
        res.status(500).json(errorResponse(DEFAULT_ERROR_RESPONSE))
    } finally {
        connection?.release()
    }
}