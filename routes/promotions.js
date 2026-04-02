const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { db } = require('../database/db');
const { authenticateToken } = require('../middleware/auth');

// Configure multer for promo image uploads
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
		cb(null, 'promo-' + uniqueSuffix + path.extname(file.originalname));
	}
});

const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		const filetypes = /jpeg|jpg|png|gif|webp/;
		const mimetype = filetypes.test(file.mimetype);
		if (mimetype) {
			return cb(null, true);
		}
		cb(new Error('Chỉ chấp nhận file ảnh'));
	}
});

// Get active promotions (public)
router.get('/', (req, res) => {
	try {
		const promotions = db.prepare('SELECT * FROM promotions WHERE is_active = 1 ORDER BY created_at DESC').all();
		res.json(promotions);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy danh sách khuyến mãi' });
	}
});

// Get all promotions (admin)
router.get('/all', authenticateToken, (req, res) => {
	try {
		const promotions = db.prepare('SELECT * FROM promotions ORDER BY created_at DESC').all();
		res.json(promotions);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy danh sách khuyến mãi' });
	}
});

// Create promotion (admin)
router.post('/', authenticateToken, upload.single('image'), (req, res) => {
	const { title, description, discount_text } = req.body;
	const image_url = req.file ? '/uploads/' + req.file.filename : null;

	try {
		const result = db.prepare(`
			INSERT INTO promotions (title, description, discount_text, image_url)
			VALUES (?, ?, ?, ?)
		`).run(title, description, discount_text, image_url);

		res.status(201).json({
			message: 'Thêm khuyến mãi thành công',
			data: { id: result.lastInsertRowid }
		});
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi thêm khuyến mãi' });
	}
});

// Update promotion (admin)
router.put('/:id', authenticateToken, upload.single('image'), (req, res) => {
	const { id } = req.params;
	const { title, description, discount_text, is_active } = req.body;

	try {
		const existing = db.prepare('SELECT * FROM promotions WHERE id = ?').get(id);
		if (!existing) {
			return res.status(404).json({ error: 'Không tìm thấy khuyến mãi' });
		}

		const image_url = req.file ? '/uploads/' + req.file.filename : existing.image_url;

		db.prepare(`
			UPDATE promotions 
			SET title = ?, description = ?, discount_text = ?, image_url = ?, is_active = ?
			WHERE id = ?
		`).run(
			title || existing.title,
			description !== undefined ? description : existing.description,
			discount_text !== undefined ? discount_text : existing.discount_text,
			image_url,
			is_active !== undefined ? (is_active === 'true' || is_active === true ? 1 : 0) : existing.is_active,
			id
		);

		res.json({ message: 'Cập nhật khuyến mãi thành công' });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi cập nhật khuyến mãi' });
	}
});

// Delete promotion (admin)
router.delete('/:id', authenticateToken, (req, res) => {
	const { id } = req.params;

	try {
		db.prepare('DELETE FROM promotions WHERE id = ?').run(id);
		res.json({ message: 'Xóa khuyến mãi thành công' });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi xóa khuyến mãi' });
	}
});

module.exports = router;
