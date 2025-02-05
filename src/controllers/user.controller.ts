import { Request, Response } from "express"
import { User } from "../models/user.model";
import { correctResponse } from "../helpers/responses/correctResponse";
import { POST_MESSAGE } from "../helpers/constants/correctResponses";
import { errorResponse } from "../helpers/responses/errorResponse";
import { DEFAULT_ERROR_RESPONSE } from "../helpers/constants/errorResponse";
import { getConnection } from "../database/database";
import { PoolConnection } from "mysql2/promise";
import { addUser } from "../services/user.service";

export const insertUser = async (req:Request, res: Response) => {
    let connection!:PoolConnection;
    try {
        connection = await getConnection();
        const user:User = req.body;
        const result = await addUser(user,connection)
        res.status(201).json(correctResponse<User>(POST_MESSAGE,user));
    } catch (error:any) {
        console.log("🚀 ~ insertUser ~ error:", error)
        res.status(500).json(errorResponse(DEFAULT_ERROR_RESPONSE));
    }finally{
        connection?.release()
    }
}