const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: './server/src/index.ts',
	target: 'node',
	externals: [nodeExternals()],
	output: {
		path: path.resolve(__dirname, './server/dist'),
		filename: 'index.js'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx|js|jsx)$/,
				use: 'babel-loader',
				exclude: /(node_modules|bower_components)/,
			},
		]
	}
};