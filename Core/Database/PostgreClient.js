import DatabaseClient from './DatabaseClient.js';
import Pool           from 'pg-pool';
import dotenv         from 'dotenv';

dotenv.config();

export default class PostgresClient extends DatabaseClient {

    constructor() {
        super();
        this.pool = new Pool({
            user: process.env.PG_DB_USER,
            host: process.env.PG_DB_HOST,
            database: process.env.PG_DB_DATABASE,
            password: process.env.PG_DB_PASSWORD,
            port: process.env.PG_DB_PORT,
        });
    }

    async connect() {
        try {
            this.connection = await this.pool.connect();
        } catch (err) {
            console.error('Error connecting to Oracle:', err);
        }
    }

    async executeQuery(query) {
        try {
            const result = await this.connection.query(query);
            return result.rows;
        } catch (err) {
            console.error('Error executing the query:', err);
        }
    }

    async closeConnection() {
        try {
            if (this.connection) {
                this.connection.release();
                console.log('Connection closed.');
            }
        } catch (err) {
            console.error('Error closing the connection:', err);
        }
    }
}