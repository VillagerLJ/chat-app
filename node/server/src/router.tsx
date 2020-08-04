import express from 'express';
import path from 'path';
import fs from 'fs';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import Home from '../../src/home';

export const router = express.Router();

router.get(/^\//, function (req, res) {
	const fileName = path.join('public', 'index.html');

	fs.readFile(fileName, "utf8", (err, file) => {
		if (err) {
			throw err;
		}

		const [head, tail] = file.split("{react-app}");
		res.write(head);
		const stream = renderToNodeStream(<Home />);
		stream.pipe(res, { end: false });
		stream.on("end", () => {
			res.write(tail);
			res.end();
		});
	});
});
