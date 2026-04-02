const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { db } = require('../database/db');
const { authenticateToken } = require('../middleware/auth');

// Configure multer for avatar uploads
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
		cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
	}
});

const upload = multer({
	storage,
	limits: { fileSize: 2 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		const filetypes = /jpeg|jpg|png|gif|webp/;
		const mimetype = filetypes.test(file.mimetype);
		if (mimetype) {
			return cb(null, true);
		}
		cb(new Error('Chỉ chấp nhận file ảnh'));
	}
});

// Get all visible reviews (public)
router.get('/', (req, res) => {
	try {
		const reviews = db.prepare('SELECT * FROM reviews WHERE is_visible = 1 ORDER BY created_at DESC').all();
		res.json(reviews);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy danh sách đánh giá' });
	}
});

// Get all reviews including hidden (admin)
router.get('/all', authenticateToken, (req, res) => {
	try {
		const reviews = db.prepare('SELECT * FROM reviews ORDER BY created_at DESC').all();
		res.json(reviews);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy danh sách đánh giá' });
	}
});

// Create review (admin)
router.post('/', authenticateToken, upload.single('avatar'), (req, res) => {
	const { customer_name, rating, comment } = req.body;
	const avatar_url = req.file ? '/uploads/' + req.file.filename : null;

	try {
		const result = db.prepare(`
			INSERT INTO reviews (customer_name, avatar_url, rating, comment)
			VALUES (?, ?, ?, ?)
		`).run(customer_name, avatar_url, rating || 5, comment);

		res.status(201).json({
			message: 'Thêm đánh giá thành công',
			data: { id: result.lastInsertRowid }
		});
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi thêm đánh giá' });
	}
});

// Update review (admin)
router.put('/:id', authenticateToken, upload.single('avatar'), (req, res) => {
	const { id } = req.params;
	const { customer_name, rating, comment, is_visible } = req.body;

	try {
		const existing = db.prepare('SELECT * FROM reviews WHERE id = ?').get(id);
		if (!existing) {
			return res.status(404).json({ error: 'Không tìm thấy đánh giá' });
		}

		const avatar_url = req.file ? '/uploads/' + req.file.filename : existing.avatar_url;

		db.prepare(`
			UPDATE reviews 
			SET customer_name = ?, avatar_url = ?, rating = ?, comment = ?, is_visible = ?
			WHERE id = ?
		`).run(
			customer_name || existing.customer_name,
			avatar_url,
			rating || existing.rating,
			comment !== undefined ? comment : existing.comment,
			is_visible !== undefined ? (is_visible === 'true' || is_visible === true ? 1 : 0) : existing.is_visible,
			id
		);

		res.json({ message: 'Cập nhật đánh giá thành công' });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi cập nhật đánh giá' });
	}
});

// Delete review (admin)
router.delete('/:id', authenticateToken, (req, res) => {
	const { id } = req.params;

	try {
		db.prepare('DELETE FROM reviews WHERE id = ?').run(id);
		res.json({ message: 'Xóa đánh giá thành công' });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi xóa đánh giá' });
	}
});

module.exports = router;
