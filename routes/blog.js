const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { db } = require('../database/db');
const { authenticateToken } = require('../middleware/auth');

// Configure multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, 'uploads/'),
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
		cb(null, 'blog-' + uniqueSuffix + path.extname(file.originalname));
	}
});

const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		const filetypes = /jpeg|jpg|png|gif|webp/;
		if (filetypes.test(file.mimetype) && filetypes.test(path.extname(file.originalname).toLowerCase())) {
			return cb(null, true);
		}
		cb(new Error('Chỉ chấp nhận file ảnh'));
	}
});

// Generate slug from title
function generateSlug(title) {
	return title
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/đ/g, 'd')
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.trim();
}

// Get all published posts (public)
router.get('/', (req, res) => {
	try {
		const posts = db.prepare(`
			SELECT id, title, slug, excerpt, image_url, views, created_at 
			FROM blog_posts 
			WHERE is_published = 1 
			ORDER BY created_at DESC
		`).all();
		res.json(posts);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy danh sách bài viết' });
	}
});

// Get all posts (admin)
router.get('/all', authenticateToken, (req, res) => {
	try {
		const posts = db.prepare('SELECT * FROM blog_posts ORDER BY created_at DESC').all();
		res.json(posts);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy danh sách bài viết' });
	}
});

// Get single post by slug (public)
router.get('/post/:slug', (req, res) => {
	try {
		const post = db.prepare('SELECT * FROM blog_posts WHERE slug = ? AND is_published = 1').get(req.params.slug);
		if (!post) {
			return res.status(404).json({ error: 'Không tìm thấy bài viết' });
		}
		// Increment views
		db.prepare('UPDATE blog_posts SET views = views + 1 WHERE id = ?').run(post.id);
		res.json(post);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy bài viết' });
	}
});

// Get single post by id (admin)
router.get('/:id', authenticateToken, (req, res) => {
	try {
		const post = db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(req.params.id);
		if (!post) {
			return res.status(404).json({ error: 'Không tìm thấy bài viết' });
		}
		res.json(post);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy bài viết' });
	}
});

// Create post (admin)
router.post('/', authenticateToken, upload.single('image'), (req, res) => {
	const { title, excerpt, content, is_published } = req.body;

	if (!title || !content) {
		return res.status(400).json({ error: 'Tiêu đề và nội dung là bắt buộc' });
	}

	const slug = generateSlug(title) + '-' + Date.now();
	const imageUrl = req.file ? '/uploads/' + req.file.filename : null;

	try {
		const result = db.prepare(`
			INSERT INTO blog_posts (title, slug, excerpt, content, image_url, is_published)
			VALUES (?, ?, ?, ?, ?, ?)
		`).run(title, slug, excerpt || null, content, imageUrl, is_published === 'true' || is_published === true ? 1 : 0);

		res.json({ message: 'Tạo bài viết thành công', id: result.lastInsertRowid, slug });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Lỗi khi tạo bài viết' });
	}
});

// Update post (admin)
router.put('/:id', authenticateToken, upload.single('image'), (req, res) => {
	const { title, excerpt, content, is_published } = req.body;
	const postId = req.params.id;

	try {
		const existing = db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(postId);
		if (!existing) {
			return res.status(404).json({ error: 'Không tìm thấy bài viết' });
		}

		const imageUrl = req.file ? '/uploads/' + req.file.filename : existing.image_url;

		db.prepare(`
			UPDATE blog_posts 
			SET title = ?, excerpt = ?, content = ?, image_url = ?, is_published = ?, updated_at = CURRENT_TIMESTAMP
			WHERE id = ?
		`).run(
			title || existing.title,
			excerpt || existing.excerpt,
			content || existing.content,
			imageUrl,
			is_published === 'true' || is_published === true ? 1 : 0,
			postId
		);

		res.json({ message: 'Cập nhật bài viết thành công' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Lỗi khi cập nhật bài viết' });
	}
});

// Delete post (admin)
router.delete('/:id', authenticateToken, (req, res) => {
	try {
		db.prepare('DELETE FROM blog_posts WHERE id = ?').run(req.params.id);
		res.json({ message: 'Xóa bài viết thành công' });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi xóa bài viết' });
	}
});

module.exports = router;
