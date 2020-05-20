import {
	SEND_MESSAGE,
	UPDATE_MESSAGE,
	MESSAGE_SELF,
	UPDATE_SELF_MESSAGE,
} from '../../../actions';

const initialState = {
	messages: [],
}

export default function chatReducer(state = initialState, action) {
    switch(action.type) {
		case SEND_MESSAGE:
			return state;
		case MESSAGE_SELF:
			return state;
		case UPDATE_MESSAGE:
		case UPDATE_SELF_MESSAGE: {
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
