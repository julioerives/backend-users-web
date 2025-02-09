import { config } from "dotenv";
import mysql, { Pool, PoolConnection } from "mysql2/promise";
config()
const pool: Pool = mysql.createPool({
    host: 'mysql', // Nombre del servicio en docker-compose.yml
    port: 3306, 
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

export const getConnection = async (): Promise<PoolConnection> => {
    return await pool.getConnection();
};