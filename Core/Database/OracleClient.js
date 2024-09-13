import DatabaseClient from './DatabaseClient.js';
import oracledb       from 'oracledb';
import dotenv         from 'dotenv';

dotenv.config();

oracledb.initOracleClient({ libDir: process.env.ORACLE_INSTANT_CLIENT_DIR });

export default class OracleClient extends DatabaseClient {

    async connect() {
        try {
            this.connection = await oracledb.getConnection({
                user: process.env.ORACLE_DB_USER,
                password: process.env.ORACLE_DB_PASSWORD,
                connectString: process.env.ORACLE_DB_SID,
            });
        } catch (err) {
            console.error('Error connecting to Oracle:', err);
        }
    }

    async executeQuery(query) {
        try {
            const result = await this.connection.execute(query);
            console.log(result);
        } catch (err) {
            console.error('Error executing the query:', err);
        }
    }

    async closeConnection() {
        try {
            await this.connection.close();
            console.log('Connection closed.');
        } catch (err) {
            console.error('Error closing the connection:', err);
        }
    }
}