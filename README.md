# Project Setup

Follow these steps to set up the project:

1. **Install Dependencies**
    - Run `npm install` to install all necessary dependencies. (Node.js v20.17.0)

2. **Create the .env File**
    - Copy the `.env.example` file to a new file named `.env`.
    - Configure the `.env` file with the necessary data.

3. **Generate Token**
    - Run the `gen-token.sh` script to generate the required token.

4. **Configure Kafka**
    - Edit the `kafka.config.js` file to match your environment settings.

5. **Database Setup**
    - Ensure your database is set up and configured correctly.
    - Run any necessary migration scripts.

6. **Run the Application**
    - Use `npm start` to run the application.

## Troubleshooting

- **Common Issues**
  - Ensure Docker is running if you encounter issues with Kafka.
  - Double-check your `.env` file for any missing or incorrect values.

- **Getting Help**
  - Refer to the project's [wiki](#) or [issue tracker](#) for more information and support.

## Contributing

- Fork the repository.
- Create a new branch (`git checkout -b feature-branch`).
- Commit your changes (`git commit -m 'Add some feature'`).
- Push to the branch (`git push origin feature-branch`).
- Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
