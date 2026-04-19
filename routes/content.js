const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { db } = require('../database/db');
const { authenticateToken } = require('../middleware/auth');

// Configure multer for file uploads
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
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
	fileFilter: (req, file, cb) => {
		const filetypes = /jpeg|jpg|png|gif|webp|ico|svg/;
		const mimetype = filetypes.test(file.mimetype) || file.mimetype === 'image/x-icon' || file.mimetype === 'image/vnd.microsoft.icon';
		const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

		if (mimetype || extname) {
			return cb(null, true);
		}
		cb(new Error('Chỉ chấp nhận file ảnh (jpeg, jpg, png, gif, webp, ico, svg)'));
	}
});

// Get restaurant info (public)
router.get('/info', (req, res) => {
	try {
		const info = db.prepare('SELECT * FROM restaurant_info WHERE id = 1').get();
		res.json(info || {});
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy thông tin nhà hàng' });
	}
});

// Update restaurant info (protected)
router.put('/info', authenticateToken, (req, res) => {
	const { name, description, address, phone, email, opening_hours, hero_title, hero_subtitle, google_map_url, facebook_url, zalo_phone } = req.body;

	try {
		db.prepare(`
      UPDATE restaurant_info 
      SET name = ?, description = ?, address = ?, phone = ?, email = ?, opening_hours = ?, 
          hero_title = ?, hero_subtitle = ?, google_map_url = ?, facebook_url = ?, zalo_phone = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `).run(name, description, address, phone, email, opening_hours, hero_title, hero_subtitle, google_map_url, facebook_url, zalo_phone);

		const updated = db.prepare('SELECT * FROM restaurant_info WHERE id = 1').get();
		res.json({ message: 'Cập nhật thành công', data: updated });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi cập nhật thông tin' });
	}
});

// Upload logo
router.post('/upload/logo', authenticateToken, upload.single('logo'), (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: 'Không có file được upload' });
	}

	const logoUrl = '/uploads/' + req.file.filename;

	try {
		db.prepare('UPDATE restaurant_info SET logo_url = ? WHERE id = 1').run(logoUrl);
		res.json({ message: 'Upload logo thành công', url: logoUrl });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lưu logo' });
	}
});

// Upload banner
router.post('/upload/banner', authenticateToken, upload.single('banner'), (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: 'Không có file được upload' });
	}

	const bannerUrl = '/uploads/' + req.file.filename;

	try {
		db.prepare('UPDATE restaurant_info SET banner_url = ? WHERE id = 1').run(bannerUrl);
		res.json({ message: 'Upload banner thành công', url: bannerUrl });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lưu banner' });
	}
});

// Upload favicon
router.post('/upload/favicon', authenticateToken, upload.single('favicon'), (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: 'Không có file được upload' });
	}

	const faviconUrl = '/uploads/' + req.file.filename;

	try {
		db.prepare('UPDATE restaurant_info SET favicon_url = ? WHERE id = 1').run(faviconUrl);
		res.json({ message: 'Upload favicon thành công', url: faviconUrl });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lưu favicon' });
	}
});

// Update section visibility (protected)
router.put('/sections', authenticateToken, (req, res) => {
	const { show_promotions, show_menu, show_gallery, show_reviews } = req.body;

	try {
		db.prepare(`
      UPDATE restaurant_info 
      SET show_promotions = ?, show_menu = ?, show_gallery = ?, show_reviews = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `).run(
			show_promotions ? 1 : 0,
			show_menu ? 1 : 0,
			show_gallery ? 1 : 0,
			show_reviews ? 1 : 0
		);

		const updated = db.prepare('SELECT * FROM restaurant_info WHERE id = 1').get();
		res.json({ message: 'Cập nhật thành công', data: updated });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi cập nhật cài đặt hiển thị' });
	}
});

// Gallery endpoints
router.get('/gallery', (req, res) => {
	try {
		const images = db.prepare('SELECT * FROM gallery ORDER BY created_at DESC').all();
		res.json(images);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy thư viện ảnh' });
	}
});

router.post('/gallery', authenticateToken, upload.single('image'), (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: 'Không có file được upload' });
	}

	const imageUrl = '/uploads/' + req.file.filename;
	const { caption } = req.body;

	try {
		const result = db.prepare('INSERT INTO gallery (image_url, caption) VALUES (?, ?)').run(imageUrl, caption || '');
		res.json({
			message: 'Thêm ảnh thành công',
			data: { id: result.lastInsertRowid, image_url: imageUrl, caption }
		});
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi thêm ảnh' });
	}
});

router.delete('/gallery/:id', authenticateToken, (req, res) => {
	try {
		db.prepare('DELETE FROM gallery WHERE id = ?').run(req.params.id);
		res.json({ message: 'Xóa ảnh thành công' });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi xóa ảnh' });
	}
});

// Space images endpoints
router.get('/space-images', (req, res) => {
	try {
		const images = db.prepare('SELECT * FROM space_images ORDER BY sort_order ASC, created_at DESC').all();
		res.json(images);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy ảnh không gian' });
	}
});

router.post('/space-images', authenticateToken, upload.single('image'), (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: 'Không có file được upload' });
	}
	const imageUrl = '/uploads/' + req.file.filename;
	const { caption, sort_order } = req.body;
	try {
		const result = db.prepare('INSERT INTO space_images (image_url, caption, sort_order) VALUES (?, ?, ?)').run(imageUrl, caption || '', sort_order || 0);
		res.json({ message: 'Thêm ảnh thành công', data: { id: result.lastInsertRowid, image_url: imageUrl, caption } });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi thêm ảnh không gian' });
	}
});

router.delete('/space-images/:id', authenticateToken, (req, res) => {
	try {
		db.prepare('DELETE FROM space_images WHERE id = ?').run(req.params.id);
		res.json({ message: 'Xóa ảnh thành công' });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi xóa ảnh không gian' });
	}
});

module.exports = router;
