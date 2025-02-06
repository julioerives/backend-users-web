import { config } from "dotenv";
import jwt from 'jsonwebtoken';
import { ROUTES_NOT_PROTECTED } from "../constants/routesNotProtected";
import { errorResponse } from "../responses/errorResponse";
import { MISSING_TOKEN } from "../constants/errorResponse";
import { Request, Response } from "express";
import { getCookie } from "../cookies";

config();
export function validateToken(req: Request, res: Response, next: any) {
    if (ROUTES_NOT_PROTECTED.includes(req.path)) {
        return next();
    }
    if (!process.env.JWT_KEY) {
        throw new Error('Secret key is not defined in environment variables');
    }
    const accessToken = getCookie<string>('token', req);
    if (!accessToken) {
        res.status(401).json(errorResponse(MISSING_TOKEN))
        return
    }
    const token = accessToken.split(' ')[1];
    jwt.verify(token, process.env.JWT_KEY, (err: any, user: any) => {
        next();
    })
}