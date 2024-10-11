# Minimalist-Express

Minimalist-Express is a minimalist backend framework based on Node.js and Express, designed to create RESTful APIs quickly and efficiently. It provides a modular, scalable, and flexible structure, with support for multiple databases and easy environment variable configuration.

## Features

- **Modular architecture**: Clear and easy-to-scale structure for projects of any size.
- **Multi-database support**: Integrated connectors for PostgreSQL, MongoDB, MySQL, and Oracle.
- **Express.js**: Uses one of the most popular frameworks for Node.js.
- **Environment variable management**: Easily configure the environment with `dotenv`.
- **Basic security**: Includes basic security middlewares.

## Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- Supported database (PostgreSQL, MongoDB, MySQL, or Oracle)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Lecibur-13/Minimalist-Express.git
    cd Minimalist-Express
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Configure the environment variables. Create a `.env` file in the root of the project with the following variables:

    ```plaintext
    # Database configuration
    DB_TYPE=postgres   # postgres, mysql, mongodb, oracle
    PG_DB_USER=your_pg_user
    PG_DB_PASSWORD=your_pg_password
    PG_DB_HOST=localhost
    PG_DB_PORT=5432
    PG_DB_DATABASE=your_database_name

    MONGO_DB_URI=mongodb://localhost:27017
    MONGO_DB_NAME=your_mongo_db_name
    ```

    Adjust these values according to the type of database you are using.

## Usage

1. Start the server:

    ```bash
    node server.js
    ```

2. Access the API at `http://localhost:3000`.

## Project Structure

```
Minimalist-Express/
│
├── Config/                 # Configuration files
│   └── database.config.js  # Database configuration
│
├── Core/
│   └── Database/           # Database clients (PostgreSQL, MongoDB, etc.)
│
├── Routes/                 # Route definitions and controllers
│
├── .env                    # Environment configuration file
├── package.json            # NPM dependencies and scripts
├── server.js               # Application entry point
└── README.md               # Project documentation
```

## Middlewares

### HMAC Authentication Middleware

The HMAC authentication middleware ensures that requests to the server are properly signed using a shared secret key. This helps verify the authenticity and integrity of the data, protecting it from tampering or unauthorized access.

#### How Does It Work?

1. **Client**: The client creates a message (payload) and signs it using an HMAC (Hash-based Message Authentication Code). This HMAC is generated using a shared secret key and additional parameters such as `nonce` and `timestamp`.

2. **Server**: Upon receiving the request, the server takes the message and generates its own version of the HMAC using the same secret key and parameters. If the client's HMAC matches the one generated by the server, the request is accepted. Otherwise, it is rejected with an authentication error.

### Middleware Implementation

Below is the code to implement this middleware in your application:

```javascript
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

export default function authenticateHmac(req, res, next) {
  const { body } = req;
  const { message, hmac, nonce, timestamp } = body;
  
  const serverHmac = generateHmac(message, nonce, timestamp);
  
  if (serverHmac === hmac) {
    next();
  } else {
    res.status(401).send({
      status: 'fail',
      message: 'Unauthorized Signature'
    });
  }
};

function generateHmac(data, nonce, timestamp) {
  const toSign = `${data}:${timestamp}:${nonce}`;

  return crypto
    .createHmac('sha256', process.env.API_TOKEN_HASH)
    .update(toSign)
    .digest('hex');
}
```

### Using the Middleware

1. **Secret Key**: Make sure to define the secret key that the server will use to generate HMACs in your `.env` file:

    ```plaintext
    API_TOKEN_HASH=your_secret_key
    ```

2. **Adding the Middleware to a Route**: You can add this middleware to routes that need HMAC authentication as follows:

    ```javascript
    import express from 'express';
    import authenticateHmac from './middlewares/authenticateHmac.js'; // Ensure the correct path to the middleware

    const app = express();

    app.use(express.json());

    // Route protected by HMAC middleware
    app.post('/api/test', authenticateHmac, (req, res) => {
      res.status(200).send({
        status: 'success',
        message: 'Valid signature'
      });
    });

    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
    ```

3. **Client Example**: Here is an example of how the client might send a request with an HMAC-signed message:

    ```javascript
    const crypto = require('crypto');
    const axios = require('axios');

    const secretKey = 'API-private-key'; // Use the same secret key as the server
    const timestamp = Date.now();
    const nonce = crypto.randomBytes(16).toString('hex');
    const message = {
      "folio": "R223-81-233-002",
      "identifier": "ID_01"
    };

    const toSign = `${message}:${timestamp}:${nonce}`;
    const hmacA = crypto
      .createHmac('sha256', secretKey)
      .update(toSign)
      .digest('hex');

    axios.post('http://localhost:3000/api/test', {
      hmac: hmacA,
      timestamp,
      message,
      nonce,
    })
    .then(response => {
      console.log('Server response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
    ```

With this middleware, each request to the API protected by HMAC will verify whether the signature provided by the client matches the one generated by the server. If the signatures match, the request is authorized and processed; otherwise, a `401 Unauthorized` error is returned.

## Contributing

If you wish to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes (`git checkout -b feature-new-functionality`).
3. Make your changes and commit them (`git commit -m 'Add new functionality'`).
4. Push your changes (`git push origin feature-new-functionality`).
5. Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
