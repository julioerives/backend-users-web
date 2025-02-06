import { PoolConnection } from "mysql2/promise";
import { User } from "../models/user.model";
import bcrypt from "bcrypt"

export const addUser = async (user: User, connection: PoolConnection) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(String(user.password), salt);
    const [result] = await connection.query("INSERT INTO users(name,email,password) values(?,?,?)", [user.name, user.email, user.password]);
    return result;
}