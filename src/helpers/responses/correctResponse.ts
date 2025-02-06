import { Response } from "../../models/response";

export const correctResponse = <T>(message: string, data: T): Response<T> => ({
    message: message,
    error: false,
    data: data
})