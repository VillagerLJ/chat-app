export const BROADCAST_MESSAGE = 'BROADCAST_MESSAGE';
export const UPDATE_BROADCAST_MESSAGE = 'UPDATE_BROADCAST_MESSAGE';
export const MESSAGE_ROOM = 'MESSAGE_ROOM';
export const UPDATE_ROOM_MESSAGE = 'UPDATE_ROOM_MESSAGE';
export const MESSAGE_SELF = 'MESSAGE_SELF';
export const UPDATE_SELF_MESSAGE = 'UPDATE_SELF_MESSAGE';
export const JOIN_ROOM = 'JOIN_ROOM';
export const UPDATE_ROOM = 'UPDATE_ROOM';

export function broadcastMessageAction(message) {
    return {
        type: BROADCAST_MESSAGE,
        message,
    };
}

export function updateBroadcastMessageAction(message) {
    return {
        type: UPDATE_BROADCAST_MESSAGE,
        message,
    };
}

export function messageRoomAction(message) {
    return {
        type: MESSAGE_ROOM,
        message,
    };
}

export function updateRoomMessageAction(message) {
    return {
        type: UPDATE_ROOM_MESSAGE,
        message,
    };
}

export function messageSelfAction(message) {
    return {
        type: MESSAGE_SELF,
        message,
    };
}

export function updateSelfMessageAction(message) {
    return {
        type: UPDATE_SELF_MESSAGE,
        message,
    };
}

export function joinRoom(room) {
    return {
        type: JOIN_ROOM,
        room,
    };
}

export function updateRoom(message) {
    return {
        type: UPDATE_ROOM,
        message,
    };
}
