import http from 'http'
import app from './app.js'
import dotenv from "dotenv"
import process from "process"
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
const port = process.env.PORT || 3000

const server = http.createServer(app);

server.listen(port);
