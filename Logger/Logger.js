import { fileURLToPath } from 'url';

import util from 'util';
import path from 'path';
import fs   from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFilePath = path.join(__dirname, 'logger.log');
const logFile = fs.createWriteStream(logFilePath, { flags: 'a' });
const logStdout = process.stdout;

export default function Logger() {
    console.log = function (message) {
        const formattedMessage = `[${new Date()}] - ${util.format(message)}\n`;
        logFile.write(formattedMessage, (err) => {
            if (err) {
                logStdout.write(`Error writing to log file: ${err.message}\n`);
            }
        });
        logStdout.write(formattedMessage);
    };
}