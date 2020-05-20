import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	sendMessageAction,
	messageSelfAction,
	updateMessageAction,
} from './actions';

const propTypes = {
	messages: PropTypes.array,
	sendMessageAction: PropTypes.func.isRequired,
	messageSelfAction: PropTypes.func.isRequired,
};

function Chat({
	messages,
	sendMessageAction,
	messageSelfAction,
}) {
	const [input, setInput] = useState('');

	const onSendMessage = e => {
		e.preventDefault();
		sendMessageAction(input);
	}

	const onMessageSelf = e => {
		e.preventDefault();
		messageSelfAction(input);
	}

	return (
		<>
			{messages.map((message, index) => 
				<div key={index}>{message}</div>
			)}
			<div>
				<input type="text" value={input} onChange={e => setInput(e.target.value)}/>
				<button onClick={onSendMessage}>Send</button>
				<button onClick={onMessageSelf}>Self</button>
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
		sendMessageAction: (msg) => dispatch(sendMessageAction(msg)),
		messageSelfAction: (msg) => dispatch(messageSelfAction(msg)),
		updateMessageAction: () => dispatch(updateMessageAction()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
