# 🍽️ Website Quảng Bá Nhà Hàng

Website quảng bá nhà hàng hiện đại với trang admin đầy đủ tính năng, được xây dựng bằng các framework nhẹ.

## 🚀 Tech Stack

### Backend

- **Node.js** + **Express** - Server framework nhẹ
- **SQLite** (better-sqlite3) - Database không cần cài đặt
- **JWT** - Authentication
- **Multer** - Upload file

### Frontend

- **HTML/CSS/JavaScript** thuần
- **Alpine.js** (~15KB) - Reactive framework nhẹ
- **TailwindCSS** (CDN) - UI styling

## ✨ Tính năng

### Trang Public (/)

- ✅ Hiển thị thông tin nhà hàng
- ✅ Menu món ăn với filter theo danh mục
- ✅ Thư viện ảnh
- ✅ Thông tin liên hệ
- ✅ Responsive design

### Trang Admin (/admin)

- ✅ Đăng nhập bảo mật
- ✅ Quản lý thông tin nhà hàng
- ✅ Upload logo và banner
- ✅ Quản lý menu món ăn (CRUD)
- ✅ Quản lý thư viện ảnh
- ✅ Bật/tắt hiển thị món ăn

## 📦 Cài đặt

### Yêu cầu

- Node.js 14+
- npm hoặc yarn

### Các bước cài đặt

1. **Clone hoặc vào thư mục project**

```bash
cd restaurant
```

2. **Cài đặt dependencies**

```bash
npm install
```

3. **Tạo file cấu hình**

```bash
cp .env.example .env
```

4. **Chỉnh sửa file .env** (tùy chọn)

```env
PORT=3000
JWT_SECRET=your_secret_key_here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

5. **Chạy server**

```bash
npm start
```

Hoặc chạy ở chế độ development với auto-reload:

```bash
npm run dev
```

## 🌐 Truy cập

- **Trang chủ**: http://localhost:3000
- **Admin panel**: http://localhost:3000/admin

### Thông tin đăng nhập admin mặc định:

- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Lưu ý**: Hãy thay đổi thông tin đăng nhập mặc định trong file `.env` trước khi deploy production!

## 📁 Cấu trúc project

```
restaurant/
├── database/
│   └── db.js                 # Database setup & initialization
├── middleware/
│   └── auth.js               # JWT authentication middleware
├── routes/
│   ├── auth.js               # Authentication routes
│   ├── content.js            # Restaurant info & gallery routes
│   └── menu.js               # Menu management routes
├── public/
│   ├── index.html            # Trang chủ public
│   └── admin.html            # Trang admin
├── uploads/                  # Thư mục lưu file upload
├── server.js                 # Entry point
├── package.json
└── .env                      # Config (tạo từ .env.example)
```

## 🔌 API Endpoints

### Public Endpoints

- `GET /api/content/info` - Lấy thông tin nhà hàng
- `GET /api/menu` - Lấy danh sách menu
- `GET /api/content/gallery` - Lấy thư viện ảnh

### Protected Endpoints (Yêu cầu authentication)

- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất
- `PUT /api/content/info` - Cập nhật thông tin
- `POST /api/content/upload/logo` - Upload logo
- `POST /api/content/upload/banner` - Upload banner
- `POST /api/menu` - Tạo món mới
- `PUT /api/menu/:id` - Cập nhật món
- `DELETE /api/menu/:id` - Xóa món
- `POST /api/content/gallery` - Thêm ảnh
- `DELETE /api/content/gallery/:id` - Xóa ảnh

## 🎨 Customization

### Thay đổi màu sắc

Mở file `public/index.html` hoặc `public/admin.html`, tìm class `purple-600` và thay bằng màu khác:

- `blue-600` - Xanh dương
- `green-600` - Xanh lá
- `red-600` - Đỏ
- `orange-600` - Cam

### Thêm danh mục menu mới

Vào admin panel, khi thêm món ăn, nhập tên danh mục mới vào field "Danh mục"

## 🚀 Deploy

### Deploy lên VPS/Server

1. Upload code lên server
2. Cài đặt Node.js trên server
3. Chạy `npm install --production`
4. Sử dụng PM2 để chạy production:

```bash
npm install -g pm2
pm2 start server.js --name restaurant
pm2 save
pm2 startup
```

### Deploy lên Heroku

1. Tạo `Procfile`:

```
web: node server.js
```

2. Deploy:

```bash
heroku create your-app-name
git push heroku main
```

## 📝 To-do / Cải tiến

- [ ] Thêm tính năng đặt bàn online
- [ ] Thêm hệ thống review/đánh giá
- [ ] Tích hợp thanh toán online
- [ ] Multi-language support
- [ ] SEO optimization
- [ ] Email notifications
- [ ] Social media integration

## 🤝 Contributing

Mọi đóng góp đều được chào đón! Hãy tạo issue hoặc pull request.

## 📄 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.

## 💬 Hỗ trợ

Nếu bạn gặp vấn đề, hãy tạo issue trên repository.

---

**Chúc bạn thành công với website nhà hàng! 🎉**
