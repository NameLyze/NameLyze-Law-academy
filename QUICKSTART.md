# 🚀 Quick Start Guide - Online Exam Tracker

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies (1 minute)
```bash
cd online-exam-tracker
npm install
```

### Step 2: Setup Database (2 minutes)
```bash
# Install PostgreSQL if you don't have it
# Ubuntu/Debian:
sudo apt-get install postgresql

# macOS:
brew install postgresql

# Create database
createdb exam_tracker

# Or use PostgreSQL command:
psql -U postgres
CREATE DATABASE exam_tracker;
\q
```

### Step 3: Configure Environment (1 minute)
```bash
# Copy environment file
cp .env.example .env

# Edit .env - minimum required:
# DATABASE_URL="postgresql://user:password@localhost:5432/exam_tracker"
# NEXTAUTH_SECRET="any-random-string-here"
# JWT_SECRET="another-random-string"
```

### Step 4: Initialize Database (1 minute)
```bash
# Push schema and seed data
npm run db:push
npm run db:seed
```

### Step 5: Start Development Server
```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## 🎯 First Login

Use these demo accounts:

| Role | Email | Password |
|------|-------|----------|
| Student | student1@examtracker.com | password123 |
| Teacher | teacher@examtracker.com | password123 |
| Admin | admin@examtracker.com | password123 |

---

## 📱 What to Try First

### As a Student:
1. Login with student account
2. Browse available courses
3. Enroll in "Class 9 - Mathematics"
4. Take "Algebra Quiz 1" exam
5. View your results and performance

### As a Teacher:
1. Login with teacher account
2. View your courses
3. Create a new exam
4. Add MCQ questions
5. Grade student submissions

### As an Admin:
1. Login with admin account
2. View system analytics
3. Manage users
4. Monitor all activities

---

## 🔧 Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:push         # Push schema changes
npm run db:migrate      # Run migrations
npm run db:seed         # Seed sample data
npm run db:studio       # Open Prisma Studio (DB GUI)

# Code Quality
npm run lint            # Check code quality
```

---

## 🎨 Customize Your Instance

### Change Branding
- Edit `src/app/page.tsx` for login page
- Update `src/app/layout.tsx` for site metadata
- Modify colors in `tailwind.config.js`

### Add Your Logo
- Place logo in `public/logo.png`
- Update references in components

### Configure Features
- Edit `.env` for feature flags
- Modify `prisma/schema.prisma` for data model

---

## 🚨 Common Issues & Fixes

### "Connection refused" - Database Error
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL
sudo systemctl start postgresql
```

### "Port 3000 already in use"
```bash
# Use different port
PORT=3001 npm run dev

# Or kill the process
npx kill-port 3000
```

### Prisma Client Error
```bash
# Regenerate client
npx prisma generate
```

### Reset Everything
```bash
# WARNING: Deletes all data
npm run db:migrate reset
npm run db:seed
```

---

## 📊 Database GUI

View and edit database visually:
```bash
npm run db:studio
```
Opens at: http://localhost:5555

---

## 🌐 Deploy to Production

### Vercel (Easiest)
1. Push to GitHub
2. Import on Vercel
3. Add DATABASE_URL in env vars
4. Deploy!

### Railway
1. Create new project
2. Add PostgreSQL plugin
3. Connect GitHub repo
4. Deploy

### AWS/DigitalOcean
```bash
npm run build
NODE_ENV=production npm start
```

---

## 📞 Need Help?

1. Check README.md for detailed docs
2. View API documentation in code comments
3. Check console for error messages
4. Enable debug mode: `NODE_ENV=development`

---

## ✅ Checklist for Production

- [ ] Change all default passwords
- [ ] Set strong JWT_SECRET
- [ ] Configure proper DATABASE_URL
- [ ] Set up AWS S3 for file storage
- [ ] Configure email notifications
- [ ] Enable SSL/HTTPS
- [ ] Set up backups
- [ ] Configure monitoring
- [ ] Review security settings
- [ ] Test all user flows

---

**Ready to build the future of online education! 🎓**
