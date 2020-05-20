export const SEND_MESSAGE = 'SEND_MESSAGE';
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export const MESSAGE_SELF = 'MESSAGE_SELF';
export const UPDATE_SELF_MESSAGE = 'UPDATE_SELF_MESSAGE';

export function sendMessageAction(message) {
    return {
        type: SEND_MESSAGE,
        message,
    };
}

export function updateMessageAction(message) {
    return {
        type: UPDATE_MESSAGE,
        message,
    };
}

export function messageSelfAction(message) {
    return {
        type: MESSAGE_SELF,
        message,
    };
}

export function updateMessageSelfAction(message) {
    return {
        type: UPDATE_SELF_MESSAGE,
        message,
    };
}
