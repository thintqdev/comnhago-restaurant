const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const db = new Database(path.join(__dirname, 'restaurant.db'));

// Enable foreign keys
db.pragma('foreign_keys = ON');

function init() {
	// Table: users (admin accounts)
	db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

	// Table: restaurant_info (thông tin nhà hàng)
	db.exec(`
    CREATE TABLE IF NOT EXISTS restaurant_info (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      name TEXT NOT NULL,
      description TEXT,
      address TEXT,
      phone TEXT,
      email TEXT,
      opening_hours TEXT,
      logo_url TEXT,
      banner_url TEXT,
      hero_title TEXT,
      hero_subtitle TEXT,
      google_map_url TEXT,
      facebook_url TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

	// Add new columns if they don't exist (for existing databases)
	const columns = db.prepare("PRAGMA table_info(restaurant_info)").all().map(c => c.name);
	if (!columns.includes('hero_title')) {
		db.exec('ALTER TABLE restaurant_info ADD COLUMN hero_title TEXT');
	}
	if (!columns.includes('hero_subtitle')) {
		db.exec('ALTER TABLE restaurant_info ADD COLUMN hero_subtitle TEXT');
	}
	if (!columns.includes('google_map_url')) {
		db.exec('ALTER TABLE restaurant_info ADD COLUMN google_map_url TEXT');
	}
	if (!columns.includes('facebook_url')) {
		db.exec('ALTER TABLE restaurant_info ADD COLUMN facebook_url TEXT');
	}

	// Table: menu_items (món ăn)
	db.exec(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      category TEXT,
      image_url TEXT,
      available BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

	// Table: menu_reviews (đánh giá món ăn)
	db.exec(`
    CREATE TABLE IF NOT EXISTS menu_reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      menu_item_id INTEGER NOT NULL,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      review_text TEXT,
      customer_name TEXT,
      approved BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (menu_item_id) REFERENCES menu_items (id) ON DELETE CASCADE
    )
  `);

	// Table: gallery (thư viện ảnh)
	db.exec(`
    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_url TEXT NOT NULL,
      caption TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

	// Table: bookings (đặt bàn)
	db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      guests INTEGER NOT NULL,
      note TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

	// Table: reviews (đánh giá khách hàng)
	db.exec(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      avatar_url TEXT,
      rating INTEGER DEFAULT 5,
      comment TEXT,
      is_visible BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

	// Table: promotions (khuyến mãi)
	db.exec(`
    CREATE TABLE IF NOT EXISTS promotions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      discount_text TEXT,
      image_url TEXT,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

	// Add new columns if they don't exist
	const menuColumns = db.prepare("PRAGMA table_info(menu_items)").all().map(c => c.name);
	if (!menuColumns.includes('is_featured')) {
		db.exec('ALTER TABLE menu_items ADD COLUMN is_featured BOOLEAN DEFAULT 0');
	}

	// Add zalo_phone to restaurant_info
	if (!columns.includes('zalo_phone')) {
		db.exec('ALTER TABLE restaurant_info ADD COLUMN zalo_phone TEXT');
	}

	// Add favicon_url to restaurant_info
	if (!columns.includes('favicon_url')) {
		db.exec('ALTER TABLE restaurant_info ADD COLUMN favicon_url TEXT');
	}

	// Add SEO columns to restaurant_info
	if (!columns.includes('meta_description')) {
		db.exec('ALTER TABLE restaurant_info ADD COLUMN meta_description TEXT');
	}
	if (!columns.includes('meta_keywords')) {
		db.exec('ALTER TABLE restaurant_info ADD COLUMN meta_keywords TEXT');
	}
	if (!columns.includes('og_image')) {
		db.exec('ALTER TABLE restaurant_info ADD COLUMN og_image TEXT');
	}

	// Add section visibility columns
	if (!columns.includes('show_promotions')) {
		db.exec('ALTER TABLE restaurant_info ADD COLUMN show_promotions BOOLEAN DEFAULT 1');
	}
	if (!columns.includes('show_menu')) {
		db.exec('ALTER TABLE restaurant_info ADD COLUMN show_menu BOOLEAN DEFAULT 1');
	}
	if (!columns.includes('show_gallery')) {
		db.exec('ALTER TABLE restaurant_info ADD COLUMN show_gallery BOOLEAN DEFAULT 1');
	}
	if (!columns.includes('show_reviews')) {
		db.exec('ALTER TABLE restaurant_info ADD COLUMN show_reviews BOOLEAN DEFAULT 1');
	}

	// Table: blog_posts
	db.exec(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      title_en TEXT,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT,
      excerpt_en TEXT,
      content TEXT NOT NULL,
      content_en TEXT,
      image_url TEXT,
      is_published BOOLEAN DEFAULT 0,
      views INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

	// Table: space_images (không gian quán)
	db.exec(`
    CREATE TABLE IF NOT EXISTS space_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_url TEXT NOT NULL,
      caption TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

	// Table: page_views (statistics)
	db.exec(`
    CREATE TABLE IF NOT EXISTS page_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page TEXT NOT NULL,
      ip_address TEXT,
      user_agent TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

	// Table: translations (for multi-language content)
	db.exec(`
    CREATE TABLE IF NOT EXISTS translations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE NOT NULL,
      vi TEXT NOT NULL,
      en TEXT
    )
  `);

	// Add English columns to restaurant_info
	if (!columns.includes('name_en')) {
		db.exec('ALTER TABLE restaurant_info ADD COLUMN name_en TEXT');
	}
	if (!columns.includes('description_en')) {
		db.exec('ALTER TABLE restaurant_info ADD COLUMN description_en TEXT');
	}
	if (!columns.includes('hero_title_en')) {
		db.exec('ALTER TABLE restaurant_info ADD COLUMN hero_title_en TEXT');
	}
	if (!columns.includes('hero_subtitle_en')) {
		db.exec('ALTER TABLE restaurant_info ADD COLUMN hero_subtitle_en TEXT');
	}

	// Add English columns to menu_items
	if (!menuColumns.includes('name_en')) {
		db.exec('ALTER TABLE menu_items ADD COLUMN name_en TEXT');
	}
	if (!menuColumns.includes('description_en')) {
		db.exec('ALTER TABLE menu_items ADD COLUMN description_en TEXT');
	}

	// Add approved column to menu_reviews if not exists
	const reviewColumns = db.prepare("PRAGMA table_info(menu_reviews)").all().map(c => c.name);
	if (!reviewColumns.includes('approved')) {
		db.exec('ALTER TABLE menu_reviews ADD COLUMN approved BOOLEAN DEFAULT 0');
	}

	// Create admin user if not exists
	const adminUser = db.prepare('SELECT * FROM users WHERE username = ?').get(process.env.ADMIN_USERNAME || 'admin');

	if (!adminUser) {
		const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', 10);
		db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(
			process.env.ADMIN_USERNAME || 'admin',
			hashedPassword
		);
		console.log('✅ Admin user đã được tạo');
	}

	// Initialize default restaurant info if not exists
	const info = db.prepare('SELECT * FROM restaurant_info WHERE id = 1').get();

	if (!info) {
		db.prepare(`
      INSERT INTO restaurant_info (id, name, description, address, phone, email, opening_hours, hero_title, hero_subtitle)
      VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
			'Nhà Hàng Của Tôi',
			'Nhà hàng phục vụ các món ăn ngon với không gian ấm cúng',
			'123 Đường ABC, Quận 1, TP.HCM',
			'0123 456 789',
			'contact@restaurant.com',
			'Thứ 2 - Chủ nhật: 10:00 - 22:00',
			'Chào mừng đến với Nhà Hàng',
			'Trải nghiệm ẩm thực tuyệt vời cùng gia đình và bạn bè'
		);
		console.log('✅ Thông tin nhà hàng mặc định đã được tạo');
	}

	console.log('✅ Database đã được khởi tạo');
}

module.exports = {
	db,
	init
};
