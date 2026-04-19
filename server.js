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

// Generate sitemap.xml for SEO
app.get('/sitemap.xml', (req, res) => {
	const baseUrl = `http://${req.get('host')}`;
	const today = new Date().toISOString().split('T')[0];

	try {
		const blogPosts = db.prepare('SELECT id, slug, created_at FROM blog_posts WHERE is_published = 1').all();
		const menuItems = db.prepare('SELECT id, updated_at FROM menu_items WHERE available = 1').all();

		let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
		xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

		// Homepage
		xml += '  <url>\n';
		xml += `    <loc>${baseUrl}/</loc>\n`;
		xml += `    <lastmod>${today}</lastmod>\n`;
		xml += '    <changefreq>daily</changefreq>\n';
		xml += '    <priority>1.0</priority>\n';
		xml += '  </url>\n';

		// Menu page
		xml += '  <url>\n';
		xml += `    <loc>${baseUrl}/menu</loc>\n`;
		xml += `    <lastmod>${today}</lastmod>\n`;
		xml += '    <changefreq>weekly</changefreq>\n';
		xml += '    <priority>0.9</priority>\n';
		xml += '  </url>\n';

		// Blog page
		xml += '  <url>\n';
		xml += `    <loc>${baseUrl}/blog</loc>\n`;
		xml += `    <lastmod>${today}</lastmod>\n`;
		xml += '    <changefreq>daily</changefreq>\n';
		xml += '    <priority>0.8</priority>\n';
		xml += '  </url>\n';

		// Individual blog posts
		if (blogPosts && blogPosts.length > 0) {
			blogPosts.forEach(post => {
				xml += '  <url>\n';
				xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
				const lastmod = post.created_at ? post.created_at.split(' ')[0] : today;
				xml += `    <lastmod>${lastmod}</lastmod>\n`;
				xml += '    <changefreq>monthly</changefreq>\n';
				xml += '    <priority>0.7</priority>\n';
				xml += '  </url>\n';
			});
		}

		// Individual menu items
		if (menuItems && menuItems.length > 0) {
			menuItems.forEach(item => {
				xml += '  <url>\n';
				xml += `    <loc>${baseUrl}/menu/${item.id}</loc>\n`;
				const lastmod = item.updated_at ? item.updated_at.split(' ')[0] : today;
				xml += `    <lastmod>${lastmod}</lastmod>\n`;
				xml += '    <changefreq>monthly</changefreq>\n';
				xml += '    <priority>0.6</priority>\n';
				xml += '  </url>\n';
			});
		}

		xml += '</urlset>';

		res.header('Content-Type', 'application/xml');
		res.send(xml);
	} catch (error) {
		console.error('Sitemap generation error:', error);
		res.status(500).send('Error generating sitemap');
	}
});

// Initialize database
db.init();

app.listen(PORT, () => {
	console.log(`🍽️  Server đang chạy tại http://localhost:${PORT}`);
	console.log(`📊 Admin panel: http://localhost:${PORT}/admin`);
});
