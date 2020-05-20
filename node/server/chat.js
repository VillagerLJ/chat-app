const { v4 } = require("uuid");
const { camelize } = require("./camelize");

const users = new Map();

function broadcast(ws, message, userId) {
	if (!message) return;

	console.log('broadcast:', message);
	ws.broadcast.emit('UPDATE_MESSAGE', { message, userId });
}

function chat(ws) {
	const userId = v4();

	// Register user connection
	users.set('userId', userId);
	console.log(users);
	broadcast(ws, `> User with the id ${userId} is connected`, userId);

	ws.on('SEND_MESSAGE', (action) => {
		console.log(action);
		const { message: msg } = action;
		const message = camelize(typeof msg === "string" ? msg : "");

		broadcast(ws, `> ${userId}: ${message}`, userId);
	});

	ws.on('MESSAGE_SELF', (action) => {
		const { message: msg } = action;
		const message = `> ${userId}: ${camelize(typeof msg === "string" ? msg : "")}`;

		console.log('message:', message);
		ws.emit('UPDATE_SELF_MESSAGE', { message });
	});

    //A special namespace "disconnect" for when a client disconnects
    ws.on("disconnect", () => {
		// Unregister user conection
		users.delete(userId);
		broadcast(ws, `> User with the id ${userId} is disconnected`, userId);
	});
}

module.exports.chat = chat;
