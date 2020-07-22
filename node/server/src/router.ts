import express from 'express';
import path from 'path';

export const router = express.Router();

router.get(/^\//, function (req, res) {
	if (req) res.sendFile(path.resolve('dist', 'index.html'));
});
