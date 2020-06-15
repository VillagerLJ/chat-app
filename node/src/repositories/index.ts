import { createStore, applyMiddleware } from 'redux';
import reducer from './redux/reducer'
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { socket } from '../socket';

// events for registering
const events = ['UPDATE_BROADCAST_MESSAGE', 'UPDATE_ROOM_MESSAGE', 'UPDATE_SELF_MESSAGE', 'UPDATE_ROOM'];

function createSocketIoMiddleware(socket, criteria = [],
	{ execute = defaultExecute } = {}) {
	const emitBound = socket.emit.bind(socket);

	return ({ dispatch, getState }) => {
		// Wire socket.io to dispatch actions sent by the server.
		events.forEach(event => socket.on(event, (data) => {
			dispatch({ ...data, type: event });
			return dispatch;
		}));
		return (next) => (action) => {
			if (evaluate(action, criteria) && socket.connected) {
				return execute(action, emitBound, next, dispatch);
			}
			return next(action);
		};
	};

	function evaluate(action, option) {
		if (!action || !action.type) {
			return false;
		}

		const { type } = action;
		let matched = false;
		if (typeof option === 'function') {
			// Test function
			matched = option(type, action);
		} else if (typeof option === 'string') {
			// String prefix
			matched = type.indexOf(option) === 0;
		} else if (Array.isArray(option)) {
			// Array of types
			matched = option.some(item => type.indexOf(item) === 0);
		}
		return matched;
	}
}

function defaultExecute(action, emit, next, dispatch) {
	console.log(action);
	const { type } = action;
	if (type && socket.connected) {
		emit(type, action);
	}
    next(action);
}

const socketIoMiddleware = createSocketIoMiddleware(socket, "");

const middlewares = [thunkMiddleware, socketIoMiddleware];

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(...middlewares))
);

store.subscribe(() => {
	console.log('new state', store.getState());
});

export default store;
