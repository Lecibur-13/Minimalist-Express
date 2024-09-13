import { MongoClient } from 'mongodb';
import DatabaseClient  from './DatabaseClient.js';
import dotenv          from 'dotenv';

dotenv.config();

export default class MongoDBClient extends DatabaseClient {

    async connect() {
        try {
            this.client = new MongoClient(process.env.MONGO_DB_URI);
            this.connection = await this.client.connect();
            this.db = this.connection.db(process.env.MONGO_DB_NAME);
        } catch (err) {
            console.error('Error connecting to Oracle:', err);
        }
    }

    async executeQuery(query) {
        try {
            const collection = this.db.collection(query.collection);
            return await collection.find(query.filter).toArray();
        } catch (err) {
            console.error('Error executing the query:', err);
        }
    }

    async closeConnection() {
        try {
            if (this.client) {
                await this.client.close();
            }
        } catch (err) {
            console.error('Error closing the connection:', err);
        }
    }
}