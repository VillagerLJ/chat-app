import { combineReducers } from 'redux';
import chatReducer from './chat';
import connectionReducer from './connection';

const rootReducer = combineReducers({
	chatReducer,
	connectionReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
