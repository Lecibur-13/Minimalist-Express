import DatabaseClient from './Config/database.config.js';
import Logger         from './Logger/Logger.js';
import router         from './routes/api.js';
import cookieParser   from 'cookie-parser';
import express        from 'express';
import helmet         from 'helmet';
import https          from 'https';
import cors           from 'cors';
import fs             from 'fs';

import { json }       from 'express';

const APP = express();
const PORT = process.env.SERVER_PORT || 3000;

// Inicializar logger
Logger();

// Configurar Express
APP.use(json());
APP.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE' ],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware de seguridad
APP.use(cookieParser());
APP.use(helmet());

// Inicializar el pool de conexiones antes de iniciar el servidor
async function startServer() {
  try {

    // Inicializar el cliente global
    global.DB = DatabaseClient();
    // await global.DB.connect();
    console.log(global.DB);

    // Configurar rutas
    APP.use('/api', router);

    // Iniciar servidor Express
    APP.listen(PORT, () => { });

    // HTTPS Config
    /* const privateKey = fs.readFileSync('path/to/your/private-key.pem', 'utf8');
     const certificate = fs.readFileSync('path/to/your/certificate.pem', 'utf8');
     const ca = fs.readFileSync('path/to/your/ca.pem', 'utf8');

     const credentials = {
       key: privateKey,
       cert: certificate,
       ca: ca
     };*/

    // HTTPS Server
    /*https.createServer(credentials, APP).listen(PORT, () => {
      console.log(`Servidor HTTPS escuchando en el puerto ${PORT}`);
    });*/

  } catch (err) {
    console.error('Error al iniciar el servidor:', err);
  }
}

startServer();