import { Response } from "../../models/response";

export const correctResponse = <T>(message:string,data:any):Response<T>=>({
    message:message,
    error:false,
    data:data
})