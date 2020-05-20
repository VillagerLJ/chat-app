import io from 'socket.io-client';

export const API_BASE = "http://localhost:5000";

const WS_BASE = "http://localhost:4001";

export const socket = io(WS_BASE);
