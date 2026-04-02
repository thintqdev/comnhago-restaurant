require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./database/db');
const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const menuRoutes = require('./routes/menu');
const bookingRoutes = require('./routes/booking');
const reviewsRoutes = require('./routes/reviews');
const promotionsRoutes = require('./routes/promotions');
const blogRoutes = require('./routes/blog');
const statsRoutes = require('./routes/stats');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/promotions', promotionsRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/stats', statsRoutes);

// Serve admin page
app.get('/admin', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Serve blog page
app.get('/blog', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

// Serve blog post by slug
app.get('/blog/:slug', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

// Serve menu page
app.get('/menu', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

// Serve menu item detail
app.get('/menu/:id', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

// Initialize database
db.init();

app.listen(PORT, () => {
	console.log(`🍽️  Server đang chạy tại http://localhost:${PORT}`);
	console.log(`📊 Admin panel: http://localhost:${PORT}/admin`);
});
