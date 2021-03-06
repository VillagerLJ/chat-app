import React, { ReactElement } from 'react';
import App from './app';
import { Provider } from 'react-redux';
import store from './repositories';

const Home = (): ReactElement => {
	return (
		<div>
			<div>Homepage</div>
			<button onClick={() => console.log("click me")}>click me</button>
			<Provider store={store}>
					<App />
			</Provider>
		</div>
	);
};

export default Home;
