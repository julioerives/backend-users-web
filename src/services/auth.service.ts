import { PoolConnection } from "mysql2/promise";
import { User } from "../models/user.model";
import bcrypt from "bcrypt"
import { ResourceNotFound } from "../exceptions/resourceNotFoundException";
import { USER_NOT_EXISTS } from "../helpers/constants/errorResponse";
import { PasswordMismatchError } from "../exceptions/passwordMismatchException";

export const logInService = async (user: User, connection: PoolConnection): Promise<User> => {
    const [result]: any = await connection.query("SELECT id_user,email,name,password FROM users WHERE email = ?", [user.email]);
    if (!result) {
        throw new ResourceNotFound(USER_NOT_EXISTS)
    }
    const hashedPassword = result[0].password;
    const match = await bcrypt.compare(user.password, hashedPassword);
    if (!match) {
        throw new PasswordMismatchError(USER_NOT_EXISTS)
    }
    return {
        id_user: result[0].id_user,
        name: result[0].name,
        email: result[0].email
    };
}