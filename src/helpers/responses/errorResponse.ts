import { Response } from "../../models/response";

export const errorResponse = (message: string): Response<null> => ({
    message: message,
    error: true,
    data: null
})