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

## Contributing

If you wish to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes (`git checkout -b feature-new-functionality`).
3. Make your changes and commit them (`git commit -m 'Add new functionality'`).
4. Push your changes (`git push origin feature-new-functionality`).
5. Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
