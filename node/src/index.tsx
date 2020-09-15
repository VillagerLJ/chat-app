import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home';

ReactDOM.render(
	<Home />,
	document.getElementById('root')
);

window.addEventListener('load', async () => {
	if ('serviceWorker' in navigator) {
		try {
			const registration = await navigator.serviceWorker.register('dist/service-worker.js');
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		} catch (err) {
			console.error('ServiceWorker registration failed: ', err);
		}
	}
});
