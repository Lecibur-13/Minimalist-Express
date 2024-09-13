import PostgresClient from '../Core/Database/PostgreClient.js';
import MongoDBClient  from '../Core/Database/MongoClient.js';
import OracleClient   from '../Core/Database/OracleClient.js';
import MySQLClient    from '../Core/Database/MySQLClient.js';
import dotenv         from 'dotenv';

dotenv.config();

export default function DatabaseClient() {
  switch (process.env.DB_TYPE) {
    case 'oracle':
      return new OracleClient();
    case 'postgres':
      return new PostgresClient();
    case 'mysql':
      return new MySQLClient();
    case 'mongodb':
      return new MongoDBClient();
    default:
      console.log('Unsupported database type');
  }
}

global.DB = DatabaseClient();
