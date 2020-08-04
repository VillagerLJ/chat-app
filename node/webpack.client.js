const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MODE = 'development';

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'public/dist'),
		filename: '[name].bundle.js',
	},
	devtool: 'source-map',
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
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 1234
	},
	plugins: [
		new CompressionPlugin({
			test: /\.js(\?.*)?$/i,
		}),
		new HtmlWebpackPlugin({
			title: 'chat-app',
			filename: '../index.html',
			template: 'views/index.html',
		}),
	],
	performance: {
		hints: "warning",
		// Calculates sizes of gziped bundles.
		assetFilter: function (assetFilename) {
			return assetFilename.endsWith(".js.gz");
		},
	},
	optimization: {
		runtimeChunk: true,
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
};
