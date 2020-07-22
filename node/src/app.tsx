import React, { useState, useEffect, ReactElement, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	startConnect,
	closeConnect,
	broadcastMessageAction,
	messageRoomAction,
	messageSelfAction,
	updateBroadcastMessageAction,
	joinRoom
} from './actions';
import { RootState } from './repositories/redux/reducer';
import { ChatState } from './repositories/redux/reducer/chat';

function Chat(): ReactElement {
	const [room, setRoom] = useState('');
	const [input, setInput] = useState('');
	const chatReducer = useSelector<RootState, ChatState>(state => state.chatReducer);
	const { messages } = chatReducer;
	console.log(chatReducer, messages);
	const dispatch = useDispatch();

	useEffect(() => {
		setRoom('room1');
		joinRoom('room1');
	}, []);

	const _handleConnect = (e: React.MouseEvent) => {
		console.log('start');
		e.preventDefault();
		dispatch(startConnect());
	}

	const _handleDisconnect = (e: React.MouseEvent) => {
		e.preventDefault();
		dispatch(closeConnect());
	}

	const _handleChangeRoom = (e: React.ChangeEvent) => {
		const { value } = e.target as HTMLSelectElement;
		if (value) {
			setRoom(value);
			joinRoom(value);
		}
	}

	const _handleBroadcastMessage = (e: React.MouseEvent) => {
		e.preventDefault();
		dispatch(broadcastMessageAction(input));
	}

	const _handleSendMessage = (e: React.MouseEvent) => {
		e.preventDefault();
		dispatch(messageRoomAction(input));
	}

	const _handleMessageSelf = (e: React.MouseEvent) => {
		e.preventDefault();
		dispatch(messageSelfAction(input));
	}

	return (
		<>
			<div>
				<button onClick={_handleConnect}>Connect</button>
				<button onClick={_handleDisconnect}>Disconnect</button>
				<select value={room} onChange={_handleChangeRoom}>
					<option value={"room1"}>room1</option>
					<option value={"room2"}>room2</option>
				</select>
			</div>
			{messages.map((message, index) =>
				<div key={index}>{message}</div>
			)}
			<div>
				<input type="text" value={input} onChange={e => setInput(e.target.value)} />
				<button onClick={_handleBroadcastMessage}>Broadcast</button>
				<button onClick={_handleSendMessage}>Room</button>
				<button onClick={_handleMessageSelf}>Self</button>
			</div>
		</>
	);
}

export default Chat;
