# Green Energy Pakistan - Setup Guide

## Quick Start

### 1. Environment Variables

Create a `.env.local` file in the project root:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/green-energy

# NextAuth Configuration
NEXTAUTH_SECRET=your-32-character-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# WhatsApp Integration
NEXT_PUBLIC_WHATSAPP_NUMBER=+923001234567

# Cloudinary (Optional - for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 2. Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

### 3. Seed Database with Dummy Data

```bash
# Install dependencies first
npm install
# or
pnpm install

# Run seed script
node scripts/seed-data.js
```

This will create:
- 4 Product Series (REX, Titan, VoltMax, PowerX)
- 12 Products with full specifications and images

### 4. Admin Credentials

Default admin credentials:
- **Email:** admin@greenenergy.com
- **Password:** admin123 (Change in `.env.local` after first login)

To hash a new password, use this Node.js snippet:

```javascript
const bcrypt = require('bcryptjs');
const password = 'your-new-password';
const hash = bcrypt.hashSync(password, 10);
console.log(hash);
```

Add the hash to your `.env.local`:

```env
ADMIN_PASSWORD_HASH=your-hashed-password-here
```

### 5. Start Development Server

```bash
npm run dev
# or
pnpm dev
```

Visit:
- **Frontend:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3000/admin
- **Admin Login:** http://localhost:3000/admin/login

---

## Database Setup

### Using MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user and get connection string
4. Update `MONGODB_URI` in `.env.local`

### Using Local MongoDB

```bash
mongod
```

Use: `mongodb://localhost:27017/green-energy`

---

## Features Implemented

### Public Pages
- **Home:** Hero carousel, company info, products showcase, contact form
- **About:** Company story, mission, vision, team section
- **Products:** Series filtering, product grid, detailed product pages
- **Contact:** Contact form with validation
- **Policies:** Privacy, Terms, Warranty, Delivery policies

### Admin Panel
- **Dashboard:** Stats and overview
- **Series Management:** Create, edit, delete product series
- **Products Management:** Full CRUD operations with image support
- **Settings:** Account management

### Features
- Premium solar energy theme with green color palette
- Framer Motion animations and transitions
- Responsive design (mobile-first)
- WhatsApp integration throughout
- Form validation and error handling
- MongoDB backend with REST APIs
- NextAuth authentication
- Admin protection with role-based access

---

## API Endpoints

### Series
- `GET /api/series` - Get all series
- `POST /api/series` - Create series (admin only)
- `PATCH /api/series/[id]` - Update series (admin only)
- `DELETE /api/series/[id]` - Delete series (admin only)

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (admin only)
- `PATCH /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

### Contact
- `POST /api/contact` - Submit contact form

---

## Customization

### Change Company Colors

Edit `/app/globals.css` and modify the color tokens:

```css
:root {
  --primary: 84 66% 42%; /* Green */
  --secondary: 117 55% 45%; /* Teal */
  /* ... other colors ... */
}
```

### Add WhatsApp Number

Update in `.env.local`:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=+92XXXXXXXXXX
```

### Configure Contact Email

Add to `.env.local`:

```env
ADMIN_EMAIL=your-email@example.com
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
```

---

## Deployment

### Deploy to Vercel

```bash
# Push to Git
git push origin main

# Deploy
vercel
```

### Environment Variables on Vercel

1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add all variables from `.env.local`
3. Redeploy

---

## Troubleshooting

### Admin Login Not Working
- Check `NEXTAUTH_SECRET` is set and 32+ characters
- Verify `NEXTAUTH_URL` matches your domain
- Check password hash in auth configuration

### Products Not Showing
- Run seed script: `node scripts/seed-data.js`
- Check MongoDB connection: `MONGODB_URI`
- Verify MongoDB is running

### Images Not Loading
- Update image URLs in seed data
- Configure Cloudinary if using image uploads
- Check CORS settings

---

## Support

For issues or questions:
- Email: support@greenenergy.pk
- WhatsApp: +923001234567
- GitHub Issues: [Your repository]

---

## License

© 2024 Green Energy Pakistan. All rights reserved.
