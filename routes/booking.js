const express = require('express');
const router = express.Router();
const { db } = require('../database/db');
const { authenticateToken } = require('../middleware/auth');

// Create booking (public - cho khách đặt bàn)
router.post('/', (req, res) => {
	const { customer_name, phone, email, date, time, guests, note } = req.body;

	// Validate required fields
	if (!customer_name || !phone || !date || !time || !guests) {
		return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin bắt buộc' });
	}

	try {
		const result = db.prepare(`
			INSERT INTO bookings (customer_name, phone, email, date, time, guests, note)
			VALUES (?, ?, ?, ?, ?, ?, ?)
		`).run(customer_name, phone, email || '', date, time, guests, note || '');

		res.json({
			message: 'Đặt bàn thành công! Chúng tôi sẽ liên hệ xác nhận.',
			data: { id: result.lastInsertRowid }
		});
	} catch (error) {
		console.error('Booking error:', error);
		res.status(500).json({ error: 'Lỗi khi đặt bàn' });
	}
});

// Get all bookings (protected - admin only)
router.get('/', authenticateToken, (req, res) => {
	try {
		const bookings = db.prepare(`
			SELECT * FROM bookings 
			ORDER BY date DESC, time DESC
		`).all();
		res.json(bookings);
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy danh sách đặt bàn' });
	}
});

// Get booking stats (protected)
router.get('/stats', authenticateToken, (req, res) => {
	try {
		const total = db.prepare('SELECT COUNT(*) as count FROM bookings').get();
		const pending = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'").get();
		const confirmed = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'confirmed'").get();
		const today = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE date = date('now')").get();

		res.json({
			total: total.count,
			pending: pending.count,
			confirmed: confirmed.count,
			today: today.count
		});
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi lấy thống kê' });
	}
});

// Update booking status (protected)
router.put('/:id', authenticateToken, (req, res) => {
	const { status } = req.body;
	const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];

	if (!validStatuses.includes(status)) {
		return res.status(400).json({ error: 'Trạng thái không hợp lệ' });
	}

	try {
		db.prepare('UPDATE bookings SET status = ? WHERE id = ?').run(status, req.params.id);
		const updated = db.prepare('SELECT * FROM bookings WHERE id = ?').get(req.params.id);
		res.json({ message: 'Cập nhật trạng thái thành công', data: updated });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi cập nhật trạng thái' });
	}
});

// Delete booking (protected)
router.delete('/:id', authenticateToken, (req, res) => {
	try {
		db.prepare('DELETE FROM bookings WHERE id = ?').run(req.params.id);
		res.json({ message: 'Xóa đặt bàn thành công' });
	} catch (error) {
		res.status(500).json({ error: 'Lỗi khi xóa đặt bàn' });
	}
});

module.exports = router;
