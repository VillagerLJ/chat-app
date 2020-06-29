import { v4 } from "uuid";
import { camelize } from "./camelize";
import { Socket } from 'socket.io';

type Message = string;
type Id = string;
type Room = string;

const users = new Map();

export function broadcast(ws: Socket, message: Message, userId: Id): void {
	if (!message) return;

	console.log('broadcast:', message);
	ws.broadcast.emit('UPDATE_BROADCAST_MESSAGE', { message, userId });
}

export function whichRoom(ws: Socket): Room {
	return Object.keys(ws.rooms).find(room => {
		return room !== ws.id
	}) || 'Not in room';
}

export function leftRoomMessage(ws: Socket, room: Room, userId: Id): void {
	ws.to(room).emit('UPDATE_ROOM', `${userId} has left ${room}`);
}

export function chat(ws: Socket, io: SocketIO.Server): void {
	const userId = v4();

	// Register user connection
	users.set('userId', userId);
	console.log(users);
	broadcast(ws, `> User with the id ${userId} is connected`, userId);

	ws.on('JOIN_ROOM', async (action) => {
		console.log(action);
		const inRoom = whichRoom(ws);
		if (inRoom) {
			await ws.leave(inRoom);
			await leftRoomMessage(ws, inRoom, userId);
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
		const inRoom = whichRoom(ws);
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
    ws.on("disconnect", (reason) => {
		console.log(`${userId}: ${reason}`);
		// Unregister user conection
		users.delete(userId);
		broadcast(ws, `> User with the id ${userId} is disconnected`, userId);
	});
}
