import express from 'express';
import http from 'http';
import path from 'path';
import socketIo from 'socket.io';
import { chat } from './chat';
import { router } from './router';

//Port from environment variable or default - 4001
const port = process.env.PORT || 4001;

//Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join('public')));
app.use(router);

//Setting up a socket with the namespace "connection" for new sockets
io.on("connection", (socket) => chat(socket, io));

server.listen(port, () => console.log(`Listening on port ${port}`));
