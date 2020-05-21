import React, { useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	broadcastMessageAction,
	messageRoomAction,
	messageSelfAction,
	updateBroadcastMessageAction,
	joinRoom
} from './actions';

const propTypes = {
	messages: PropTypes.array,
	broadcastMessageAction: PropTypes.func.isRequired,
	messageRoomAction: PropTypes.func.isRequired,
	messageSelfAction: PropTypes.func.isRequired,
	joinRoom: PropTypes.func.isRequired,
};

function Chat({
	messages,
	broadcastMessageAction,
	messageRoomAction,
	messageSelfAction,
	joinRoom,
}) {
	const [room, setRoom] = useState('');
	const [input, setInput] = useState('');

	useEffect(() => {
		setRoom('room1');
		joinRoom('room1');
	}, []);

	const _handleChangeRoom = (e) => {
		const value = e.target.value;
		setRoom(value);
		joinRoom(value);
	}

	const _handleBroadcastMessage = e => {
		e.preventDefault();
		broadcastMessageAction(input);
	}

	const _handleSendMessage = e => {
		e.preventDefault();
		messageRoomAction(input);
	}

	const _handleMessageSelf = e => {
		e.preventDefault();
		messageSelfAction(input);
	}

	return (
		<>
			<div>
				<select value={room} onChange={_handleChangeRoom}>
					<option value={"room1"}>room1</option>
					<option value={"room2"}>room2</option>
				</select>
			</div>
			{messages.map((message, index) => 
				<div key={index}>{message}</div>
			)}
			<div>
				<input type="text" value={input} onChange={e => setInput(e.target.value)}/>
				<button onClick={_handleBroadcastMessage}>Broadcast</button>
				<button onClick={_handleSendMessage}>Room</button>
				<button onClick={_handleMessageSelf}>Self</button>
			</div>
		</>
	);
}

Chat.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		messages: state.messages,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		broadcastMessageAction: (msg) => dispatch(broadcastMessageAction(msg)),
		messageRoomAction: (msg) => dispatch(messageRoomAction(msg)),
		messageSelfAction: (msg) => dispatch(messageSelfAction(msg)),
		updateBroadcastMessageAction: () => dispatch(updateBroadcastMessageAction()),
		joinRoom: (room) => dispatch(joinRoom(room)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
