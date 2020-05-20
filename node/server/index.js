const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { chat } = require("./chat");

//Port from environment variable or default - 4001
const port = process.env.PORT || 4001;

//Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//Setting up a socket with the namespace "connection" for new sockets
io.on("connection", chat);

server.listen(port, () => console.log(`Listening on port ${port}`));
