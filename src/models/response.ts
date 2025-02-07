import { QueryResult } from "mysql2";

export interface Response<T> {
    message: string;
    error: boolean;
    data: T;
}

// There is not always data available, so this interface is to just print the msg ^^.
export interface ResponseWithNoData {
    message: string;
    users: QueryResult 
    error: boolean;
}