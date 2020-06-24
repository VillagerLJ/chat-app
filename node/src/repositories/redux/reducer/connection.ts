import {
	CONNECT,
	DISCONNECT,
	Action,
} from '../../../actions';

type ConnectionState = {
	readonly connection: boolean,
}

const initialState = {
	connection: false,
}

export default function connectionReducer(state: ConnectionState = initialState, action: Action): ConnectionState {
    switch(action.type) {
		case CONNECT:
			return { connection: true, };
		case DISCONNECT:
			return { connection: false, };
		default:
			return state;
    }
}
