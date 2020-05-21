import {
	BROADCAST_MESSAGE,
	UPDATE_BROADCAST_MESSAGE,
	MESSAGE_ROOM,
	UPDATE_ROOM_MESSAGE,
	MESSAGE_SELF,
	UPDATE_SELF_MESSAGE,
	JOIN_ROOM,
	UPDATE_ROOM,
} from '../../../actions';

const initialState = {
	messages: [],
}

export default function chatReducer(state = initialState, action) {
    switch(action.type) {
		case BROADCAST_MESSAGE:
		case MESSAGE_ROOM:
		case MESSAGE_SELF:
		case JOIN_ROOM:
			return state;
		case UPDATE_BROADCAST_MESSAGE:
		case UPDATE_ROOM_MESSAGE:
		case UPDATE_SELF_MESSAGE:
		case UPDATE_ROOM: {
			const { message } = action;

			return {
				...state,
				messages: [ ...state.messages, message],
			};
		}
		default:
			return state;
    }
}
