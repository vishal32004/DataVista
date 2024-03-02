import { Pool } from 'pg';
export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWD,
    port: 5432,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
});