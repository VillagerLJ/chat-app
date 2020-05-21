import {
	CONNECT,
	DISCONNECT,
} from '../../../actions';

const initialState = {
	connection: false,
}

export default function connectionReducer(state = initialState, action) {
    switch(action.type) {
		case CONNECT:
			return { connection: true, };
		case DISCONNECT:
			return { connection: false, };
		default:
			return state;
    }
}
