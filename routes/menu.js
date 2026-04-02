const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { db } = require('../database/db');
const { authenticateToken } = require('../middleware/auth');

// Configure multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
		cb(null, uniqueSuffix + path.extname(file.originalname));
	}
});

const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		const filetypes = /jpeg|jpg|png|gif|webp/;
		const mimetype = filetypes.test(file.mimetype);
		const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

		if (mimetype && extname) {
			return cb(null, true);
		}
		cb(new Error('Chỉ chấp nhận file ảnh'));
	}
});

// Get all menu items (public)
router.get('/', (req, res) => {
	try {
		const items = db.prepare('SELECT * FROM menu_items WHERE available = 1 ORDER BY category, name').all();
		res.json(items);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy menu' });
	}
});

// Get featured menu items (public)
router.get('/featured', (req, res) => {
	try {
		const items = db.prepare('SELECT * FROM menu_items WHERE available = 1 AND is_featured = 1 ORDER BY name LIMIT 6').all();
		res.json(items);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy món nổi bật' });
	}
});

// Get all menu items including unavailable (admin)
router.get('/all', authenticateToken, (req, res) => {
	try {
		const items = db.prepare('SELECT * FROM menu_items ORDER BY category, name').all();
		res.json(items);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy menu' });
	}
});

// Get single menu item
router.get('/:id', (req, res) => {
	try {
		const item = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(req.params.id);
		if (!item) {
			return res.status(404).json({ error: 'Không tìm thấy món ăn' });
		}
		res.json(item);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy thông tin món ăn' });
	}
});

// Create menu item (protected)
router.post('/', authenticateToken, upload.single('image'), (req, res) => {
	const { name, description, price, category } = req.body;

	if (!name || !price) {
		return res.status(400).json({ error: 'Tên và giá là bắt buộc' });
	}

	const imageUrl = req.file ? '/uploads/' + req.file.filename : null;

	try {
		const result = db.prepare(`
      INSERT INTO menu_items (name, description, price, category, image_url)
      VALUES (?, ?, ?, ?, ?)
    `).run(name, description || '', parseFloat(price), category || 'Khác', imageUrl);

		const newItem = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(result.lastInsertRowid);
		res.status(201).json({ message: 'Thêm món ăn thành công', data: newItem });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi thêm món ăn' });
	}
});

// Update menu item (protected)
router.put('/:id', authenticateToken, upload.single('image'), (req, res) => {
	const { name, description, price, category, available, is_featured } = req.body;
	const id = req.params.id;

	try {
		const item = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(id);
		if (!item) {
			return res.status(404).json({ error: 'Không tìm thấy món ăn' });
		}

		const imageUrl = req.file ? '/uploads/' + req.file.filename : item.image_url;

		db.prepare(`
      UPDATE menu_items 
      SET name = ?, description = ?, price = ?, category = ?, image_url = ?, available = ?, is_featured = ?
      WHERE id = ?
    `).run(
			name || item.name,
			description !== undefined ? description : item.description,
			price ? parseFloat(price) : item.price,
			category || item.category,
			imageUrl,
			available !== undefined ? (available === 'true' || available === true ? 1 : 0) : item.available,
			is_featured !== undefined ? (is_featured === 'true' || is_featured === true ? 1 : 0) : (item.is_featured || 0),
			id
		);

		const updated = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(id);
		res.json({ message: 'Cập nhật món ăn thành công', data: updated });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi cập nhật món ăn' });
	}
});

// Delete menu item (protected)
router.delete('/:id', authenticateToken, (req, res) => {
	try {
		const result = db.prepare('DELETE FROM menu_items WHERE id = ?').run(req.params.id);
		if (result.changes === 0) {
			return res.status(404).json({ error: 'Không tìm thấy món ăn' });
		}
		res.json({ message: 'Xóa món ăn thành công' });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi xóa món ăn' });
	}
});

// Get reviews for a menu item
router.get('/:id/reviews', (req, res) => {
	try {
		const reviews = db.prepare('SELECT * FROM menu_reviews WHERE menu_item_id = ? AND approved = 1 ORDER BY created_at DESC').all(req.params.id);
		res.json(reviews);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy đánh giá' });
	}
});

// Create review for a menu item
router.post('/:id/reviews', (req, res) => {
	const { rating, review_text, customer_name } = req.body;
	const menu_item_id = req.params.id;

	if (!rating || rating < 1 || rating > 5) {
		return res.status(400).json({ error: 'Đánh giá phải từ 1 đến 5 sao' });
	}

	try {
		// Check if menu item exists
		const item = db.prepare('SELECT id FROM menu_items WHERE id = ?').get(menu_item_id);
		if (!item) {
			return res.status(404).json({ error: 'Không tìm thấy món ăn' });
		}

		const result = db.prepare(`
      INSERT INTO menu_reviews (menu_item_id, rating, review_text, customer_name, approved)
      VALUES (?, ?, ?, ?, 0)
    `).run(menu_item_id, parseInt(rating), review_text || '', customer_name || 'Khách hàng');

		const newReview = db.prepare('SELECT * FROM menu_reviews WHERE id = ?').get(result.lastInsertRowid);
		res.status(201).json({ message: 'Đánh giá đã được gửi và đang chờ duyệt', data: newReview });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi gửi đánh giá' });
	}
});

// Get all reviews (admin only) - including pending approval
router.get('/admin/reviews', authenticateToken, (req, res) => {
	try {
		const reviews = db.prepare(`
      SELECT mr.*, mi.name as menu_item_name 
      FROM menu_reviews mr 
      JOIN menu_items mi ON mr.menu_item_id = mi.id 
      ORDER BY mr.created_at DESC
    `).all();
		res.json(reviews);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy danh sách đánh giá' });
	}
});

// Approve or reject review (admin only)
router.put('/admin/reviews/:id', authenticateToken, (req, res) => {
	const { approved } = req.body;
	const reviewId = req.params.id;

	try {
		const result = db.prepare('UPDATE menu_reviews SET approved = ? WHERE id = ?').run(approved ? 1 : 0, reviewId);
		if (result.changes === 0) {
			return res.status(404).json({ error: 'Không tìm thấy đánh giá' });
		}
		res.json({ message: approved ? 'Đánh giá đã được duyệt' : 'Đánh giá đã bị từ chối' });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi cập nhật trạng thái đánh giá' });
	}
});

// Delete review (admin only)
router.delete('/admin/reviews/:id', authenticateToken, (req, res) => {
	try {
		const result = db.prepare('DELETE FROM menu_reviews WHERE id = ?').run(req.params.id);
		if (result.changes === 0) {
			return res.status(404).json({ error: 'Không tìm thấy đánh giá' });
		}
		res.json({ message: 'Đánh giá đã được xóa' });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi xóa đánh giá' });
	}
});

module.exports = router;
