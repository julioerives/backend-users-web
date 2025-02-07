import { PoolConnection } from "mysql2/promise";
import { User } from "../models/user.model";
import bcrypt from "bcrypt"
import { ResourceExistsException } from "../exceptions/ResourceExistsException";
import { EMAIL_EXISTS } from "../helpers/constants/errorResponse";

export const addUserService = async (user: User, connection: PoolConnection) => {
    const [email] = await connection.query("SELECT email FROM users WHERE email = ?", [user.email])
    console.log("🚀 ~ addUserService ~ email:", email)
    if (email) {
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
    const [result] = await connection.query("DELETE FROM users WHERE id_user =?", [id]);
    return result;
}