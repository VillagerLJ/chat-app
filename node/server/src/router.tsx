import express from 'express';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import Home from '../../src/home';

export const router = express.Router();

router.get(/^\//, function (req, res) {
	// if (req) res.sendFile(path.resolve('dist', 'index.html'));

	const content = renderToNodeStream(<Home />);

	const html = `
	<!DOCTYPE HTML>
	<html>
		<head></head>
		<body>
		<div id="root">${content}</div>
		<script type="text/javascript" src="/dist/main.js"></script>
		</body>
	</html>
	`;

	res.send(html);
});
