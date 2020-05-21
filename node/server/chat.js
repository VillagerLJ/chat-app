const { v4 } = require("uuid");
const { camelize } = require("./camelize");

const users = new Map();

function broadcast(ws, message, userId) {
	if (!message) return;

	console.log('broadcast:', message);
	ws.broadcast.emit('UPDATE_BROADCAST_MESSAGE', { message, userId });
}

function chat(ws, io) {
	const userId = v4();

	// Register user connection
	users.set('userId', userId);
	console.log(users);
	broadcast(ws, `> User with the id ${userId} is connected`, userId);

	ws.on('JOIN_ROOM', async (action) => {
		console.log(action);
		const inRoom = Object.keys(ws.rooms).find(room => {
			return room !== ws.id
		})
		if (inRoom) {
			await ws.leave(inRoom);
		}

		const { room } = action;
		const message = `${userId} id added to ${room}！`;

		await ws.join(room);
		await io.in(room).emit('UPDATE_ROOM', { message, userId });
	});

	ws.on('BROADCAST_MESSAGE', (action) => {
		console.log(action);
		const { message: msg } = action;
		const message = camelize(typeof msg === "string" ? msg : "");

		broadcast(ws, `> ${userId}: ${message}`, userId);
	});

	ws.on('MESSAGE_ROOM', (action) => {
		console.log(action, ws.rooms);
		const { message: msg } = action;
		const inRoom = Object.keys(ws.rooms).find(room => {
			return room !== ws.id
		})
		const message = `> ${inRoom}/${userId}: ${camelize(typeof msg === "string" ? msg : "")}`;
		console.log('message:', message);
		ws.to(inRoom).emit('UPDATE_ROOM', { message, userId });
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
