import { Response } from "../../models/response";

export const correctResponse = <R>(message: string, data: R): Response<R> => ({
    message: message,
    error: false,
    data: data
})