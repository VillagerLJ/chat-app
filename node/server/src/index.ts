import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import { chat } from './chat';

//Port from environment variable or default - 4001
const port = process.env.PORT || 4001;

//Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//Setting up a socket with the namespace "connection" for new sockets
io.on("connection", (socket) => chat(socket, io));

server.listen(port, () => console.log(`Listening on port ${port}`));
