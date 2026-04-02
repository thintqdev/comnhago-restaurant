const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../database/db');

// Login
router.post('/login', (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ error: 'Username và password là bắt buộc' });
	}

	try {
		const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

		if (!user || !bcrypt.compareSync(password, user.password)) {
			return res.status(401).json({ error: 'Username hoặc password không đúng' });
		}

		const token = jwt.sign(
			{ id: user.id, username: user.username },
			process.env.JWT_SECRET,
			{ expiresIn: '24h' }
		);

		res.cookie('token', token, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000 // 24 hours
		});

		res.json({
			message: 'Đăng nhập thành công',
			token,
			user: { id: user.id, username: user.username }
		});
	} catch (error) {
		res.status(500).json({ error: 'Lỗi server' });
	}
});

// Logout
router.post('/logout', (req, res) => {
	res.clearCookie('token');
	res.json({ message: 'Đăng xuất thành công' });
});

// Verify token
router.get('/verify', (req, res) => {
	const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

	if (!token) {
		return res.status(401).json({ authenticated: false });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		res.json({ authenticated: true, user: decoded });
	} catch (error) {
		res.status(403).json({ authenticated: false });
	}
});

module.exports = router;
