import { PoolConnection } from "mysql2/promise";
import { User } from "../models/user.model";

export const addUser = async (user: User, connection:PoolConnection) => {
    const [result] = await connection.query("INSERT INTO users(name,email,password) values(?,?,?)",[user.name,user.email,user.password] );
    return result;
}