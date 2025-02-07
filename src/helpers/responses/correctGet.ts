import { QueryResult } from "mysql2";
import { ResponseWithNoData } from "../../models/response";

export const correctGetUser = (message: string, users: QueryResult): ResponseWithNoData => ({
    message: message,
    users: users,
    error: false,
})