import DatabaseClient from './DatabaseClient.js';
import mysql          from 'mysql2/promise';
import dotenv         from 'dotenv';

dotenv.config();

export default class MySQLClient extends DatabaseClient {

    async connect() {
        this.connection = await mysql.createConnection({
            host: process.env.MYSQL_DB_HOST,
            user: process.env.MYSQL_DB_USER,
            password: process.env.MYSQL_DB_PASSWORD,
            database: process.env.MYSQL_DB_DATABASE,
        });
    }

    async executeQuery(query) {
        try {
            const [rows] = await this.connection.execute(query);
            return rows;
        } catch (err) {
            console.error('Error executing the query:', err);
        }
    }

    async closeConnection() {
        try {
            if (this.connection) {
                await this.connection.end();
                console.log('Connection closed.');
            }
        } catch (err) {
            console.error('Error closing the connection:', err);
        }
    }
}