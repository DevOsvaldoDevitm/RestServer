

import { config as configDotenv } from 'dotenv';
import Server from './models/server.js';
configDotenv();


const server = new Server();

server.listen();
