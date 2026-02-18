# 🌞 Green Energy Pakistan - Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
# or
pnpm install
```

### Step 2: Create `.env.local`
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/green-energy
NEXTAUTH_SECRET=your-32-character-secret-key
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=+923001234567
```

### Step 3: Generate Secrets
```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32
```

### Step 4: Load Dummy Data
```bash
node scripts/seed-data.js
```

### Step 5: Start Development
```bash
npm run dev
```

Visit:
- **Frontend:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin
- **Admin Login:** http://localhost:3000/admin/(auth)/login

---

## 🔐 Admin Login

**Email:** admin@greenenergy.com
**Password:** admin123

> Change password after first login in Admin Settings

---

## 📦 What's Included

### Pages
- ✅ Home (with hero carousel)
- ✅ About (company story & values)
- ✅ Products (series filtering)
- ✅ Product Details
- ✅ Contact (with form)
- ✅ Policies (Privacy, Terms, Warranty)

### Admin Features
- ✅ Dashboard with stats
- ✅ Series Management
- ✅ Product Management
- ✅ Admin Settings
- ✅ Authentication

### Components
- ✅ Hero Carousel (4 slides)
- ✅ Navigation & Footer
- ✅ Product Cards
- ✅ Series Filter
- ✅ Contact Form
- ✅ Loading Spinner

---

## 🎨 Key Features

### Hero Carousel
- Auto-slide with manual controls
- 4 compelling slides
- Animated backgrounds
- Responsive design

### Product Filtering
- Filter by 4 series
- Real-time count display
- Smooth animations
- Mobile-friendly

### Contact Integration
- WhatsApp button everywhere
- Contact form on home page
- Email integration ready
- Message validation

---

## 🗄️ Dummy Data

**12 Products across 4 Series:**

1. **REX Series** (Residential)
   - 400W Solar Panel
   - 500W Solar Panel
   - Mounting Kit

2. **Titan Series** (Commercial)
   - 600W Industrial Panel
   - 800W Industrial Panel
   - Professional Array

3. **VoltMax Series** (Inverters)
   - 5kW Inverter
   - 10kW Inverter
   - Smart Controller

4. **PowerX Series** (Storage)
   - 10kWh Battery System
   - 20kWh Battery System
   - Battery Management System

---

## 🚀 Deploy to Vercel

```bash
# 1. Push to GitHub
git push origin main

# 2. Deploy to Vercel
vercel

# 3. Set environment variables in Vercel dashboard

# 4. Redeploy
```

---

## 📝 Common Tasks

### Change WhatsApp Number
Edit `.env.local`:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=+923001234567
```

### Change Admin Password
1. Go to Admin Settings
2. Update password (hashed automatically)
3. Or use:
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('newpass', 10));"
```

### Add New Product Series
1. Login to Admin
2. Go to Series → Create New
3. Add name, slug, description
4. Save

### Add New Product
1. Login to Admin
2. Go to Products → Create New
3. Select Series
4. Fill details, specifications, features
5. Add image URL
6. Save

---

## 🛠️ Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** MongoDB
- **ORM:** Mongoose
- **Auth:** NextAuth v5
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **UI Components:** shadcn/ui
- **Forms:** React Hook Form
- **Validation:** Zod

---

## 📚 Additional Resources

- [Setup Guide](./SETUP_GUIDE.md) - Detailed configuration
- [Updates](./UPDATES.md) - Recent improvements
- [API Routes](./SETUP_GUIDE.md#api-endpoints) - API documentation

---

## ⚠️ Troubleshooting

### Products Not Showing?
```bash
node scripts/seed-data.js
```

### Admin Login Not Working?
- Check `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your domain
- Try incognito mode (clear cookies)

### MongoDB Connection Error?
- Verify `MONGODB_URI` is correct
- Check IP whitelist in MongoDB Atlas
- Ensure connection string has `?retryWrites=true`

### Styling Not Working?
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run dev`

---

## 💡 Tips

- Use admin panel to manage content
- WhatsApp integration available on all CTAs
- Contact form data saved to database
- Images from Unsplash (change URLs anytime)
- SEO-friendly structure with metadata

---

## 📞 Support

- Email: support@greenenergy.pk
- WhatsApp: +923001234567
- GitHub Issues: [Your repo]

---

## 📄 License

© 2024 Green Energy Pakistan. All rights reserved.

**Ready to launch? Start with `npm install && npm run dev`** 🚀
