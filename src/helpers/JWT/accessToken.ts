import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
export function accessToken<T>(data: T): string {
    if (!process.env.JWT_KEY) {
        throw new Error('Secret key is not defined in environment variables');
    }
    return jwt.sign({ data }, process.env.JWT_KEY, { expiresIn: "5h" })
}