import { FieldPacket, PoolConnection, RowDataPacket } from "mysql2/promise";
import { User } from "../models/user.model";
import bcrypt from "bcrypt"
import { ResourceExistsException } from "../exceptions/ResourceExistsException";
import { EMAIL_EXISTS } from "../helpers/constants/errorResponse";
import { ResultSetHeader } from "mysql2/promise";
export const addUserService = async (user: User, connection: PoolConnection) => {
    const [rows, fields]: [RowDataPacket[], FieldPacket[]] = await connection.query("SELECT email FROM users WHERE email = ?", [user.email])
    if (rows.length) {
        throw new ResourceExistsException(EMAIL_EXISTS)
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(String(user.password), salt);
    const [result] = await connection.query("INSERT INTO users(name,email,password) values(?,?,?)", [user.name, user.email, user.password]);
    return result;
}

export const getUsersService = async (connection: PoolConnection) => {
    const query: string = `
    SELECT
        id_user,
        name,
        email,
        active,
        DATE_FORMAT(createdAt, '%Y-%m-%d') AS createdAt,
        DATE_FORMAT(updatedAt, '%Y-%m-%d') AS updatedAt
    FROM users
    `
    const [result] = await connection.query(query);
    return result;
}
export const deleteUserService = async (connection: PoolConnection, id: string) => {
    const [result] = await connection.query<ResultSetHeader>("DELETE FROM users WHERE id_user =?", [id]);
    return result;
}
export const deactivateUserService = async (connection: PoolConnection, id: string):Promise<ResultSetHeader> => {
    const [result] = await connection.query<ResultSetHeader>("UPDATE users SET active = 0 WHERE id_user =?", [id]);
    return result;
}