import { Request, Response } from "express";

export const addCookie = <T>(name: string, value: T, res: Response, age: number = 3600000) => {
    res.cookie(name, JSON.stringify(value), { expires: new Date(Date.now() + age) });
}
export const getCookie = <R>(name: string, req: Request): R => {
    const accessToken = req.cookies[name];
    return accessToken ? JSON.parse(accessToken) : null;
}
export const deleteCookie = (name: string, res: Response) => {
    res.clearCookie(name);
}