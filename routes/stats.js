const express = require('express');
const router = express.Router();
const { db } = require('../database/db');
const { authenticateToken } = require('../middleware/auth');

// Track page view (public)
router.post('/track', (req, res) => {
	const { page } = req.body;
	const ipAddress = req.ip || req.connection.remoteAddress;
	const userAgent = req.get('User-Agent') || '';

	try {
		db.prepare('INSERT INTO page_views (page, ip_address, user_agent) VALUES (?, ?, ?)')
			.run(page || '/', ipAddress, userAgent);
		res.json({ success: true });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi ghi nhận lượt xem' });
	}
});

// Get overview stats (admin)
router.get('/overview', authenticateToken, (req, res) => {
	try {
		// Total page views
		const totalViews = db.prepare('SELECT COUNT(*) as count FROM page_views').get().count;

		// Today's views
		const todayViews = db.prepare(`
			SELECT COUNT(*) as count FROM page_views 
			WHERE date(created_at) = date('now')
		`).get().count;

		// This week's views
		const weekViews = db.prepare(`
			SELECT COUNT(*) as count FROM page_views 
			WHERE created_at >= datetime('now', '-7 days')
		`).get().count;

		// This month's views
		const monthViews = db.prepare(`
			SELECT COUNT(*) as count FROM page_views 
			WHERE created_at >= datetime('now', '-30 days')
		`).get().count;

		// Unique visitors (by IP)
		const uniqueVisitors = db.prepare('SELECT COUNT(DISTINCT ip_address) as count FROM page_views').get().count;

		// Total bookings
		const totalBookings = db.prepare('SELECT COUNT(*) as count FROM bookings').get().count;

		// Total menu items
		const totalMenuItems = db.prepare('SELECT COUNT(*) as count FROM menu_items').get().count;

		// Total blog posts
		const totalPosts = db.prepare('SELECT COUNT(*) as count FROM blog_posts WHERE is_published = 1').get().count;

		res.json({
			totalViews,
			todayViews,
			weekViews,
			monthViews,
			uniqueVisitors,
			totalBookings,
			totalMenuItems,
			totalPosts
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Lỗi khi lấy thống kê' });
	}
});

// Get views by day (last 30 days)
router.get('/views-by-day', authenticateToken, (req, res) => {
	try {
		const data = db.prepare(`
			SELECT date(created_at) as date, COUNT(*) as views
			FROM page_views
			WHERE created_at >= datetime('now', '-30 days')
			GROUP BY date(created_at)
			ORDER BY date ASC
		`).all();
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy thống kê theo ngày' });
	}
});

// Get bookings by day (last 30 days)
router.get('/bookings-by-day', authenticateToken, (req, res) => {
	try {
		const data = db.prepare(`
			SELECT date(created_at) as date, COUNT(*) as count
			FROM bookings
			WHERE created_at >= datetime('now', '-30 days')
			GROUP BY date(created_at)
			ORDER BY date ASC
		`).all();
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy thống kê đặt bàn' });
	}
});

// Get bookings by status
router.get('/bookings-by-status', authenticateToken, (req, res) => {
	try {
		const data = db.prepare(`
			SELECT status, COUNT(*) as count
			FROM bookings
			GROUP BY status
		`).all();
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy thống kê trạng thái' });
	}
});

// Get popular pages
router.get('/popular-pages', authenticateToken, (req, res) => {
	try {
		const data = db.prepare(`
			SELECT page, COUNT(*) as views
			FROM page_views
			GROUP BY page
			ORDER BY views DESC
			LIMIT 10
		`).all();
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy trang phổ biến' });
	}
});

// Get recent visitors
router.get('/recent-visitors', authenticateToken, (req, res) => {
	try {
		const data = db.prepare(`
			SELECT page, ip_address, user_agent, created_at
			FROM page_views
			ORDER BY created_at DESC
			LIMIT 20
		`).all();
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy khách truy cập gần đây' });
	}
});

module.exports = router;
