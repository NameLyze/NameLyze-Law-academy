# 📚 Online Exam Tracker - Complete System

A full-stack online examination and learning management system built with Next.js, PostgreSQL, and Prisma.

## ✨ Features

### 🎓 For Students
- Browse and enroll in courses
- Access learning materials (videos, PDFs, documents)
- Take MCQ and written exams
- View real-time results and feedback
- Track performance over time
- Receive notifications

### 👨‍🏫 For Teachers
- Create and manage courses
- Upload learning materials
- Create MCQ and written exams
- Grade written answers
- View student performance analytics
- Manage exam schedules

### 🔐 For Admins
- Manage users (teachers, students)
- Monitor system-wide analytics
- Manage courses and exams
- View detailed reports

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL with Prisma ORM
- **File Storage:** AWS S3 (or local storage)
- **Authentication:** JWT
- **UI Components:** Custom React components

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL 14+
- AWS account (optional, for S3 storage)

## 🚀 Installation & Setup

### 1. Clone and Install Dependencies

```bash
cd online-exam-tracker
npm install
```

### 2. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE exam_tracker;
```

### 3. Environment Configuration

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Update the `.env` file with your credentials:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/exam_tracker?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"

# JWT
JWT_SECRET="your-jwt-secret-key-change-this"
JWT_EXPIRES_IN="7d"

# AWS S3 (optional - can use local storage)
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="exam-tracker-files"
```

### 4. Database Migration & Seeding

```bash
# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate

# Seed with sample data
npm run db:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 👥 Demo Accounts

After seeding, you can login with:

### Admin
- Email: `admin@examtracker.com`
- Password: `password123`

### Teacher
- Email: `teacher@examtracker.com`
- Password: `password123`

### Student
- Email: `student1@examtracker.com`
- Password: `password123`

## 📁 Project Structure

```
online-exam-tracker/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.js             # Sample data
├── src/
│   ├── app/
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # Authentication
│   │   │   ├── exams/      # Exam management
│   │   │   ├── courses/    # Course management
│   │   │   └── ...
│   │   ├── student/        # Student pages
│   │   ├── teacher/        # Teacher pages
│   │   ├── admin/          # Admin pages
│   │   └── page.tsx        # Login page
│   ├── components/
│   │   ├── ui/             # Reusable UI components
│   │   ├── exam/           # Exam-specific components
│   │   └── dashboard/      # Dashboard components
│   ├── lib/
│   │   ├── prisma.ts       # Prisma client
│   │   ├── auth.ts         # Authentication utilities
│   │   ├── upload.ts       # File upload utilities
│   │   └── utils.ts        # Helper functions
│   └── types/              # TypeScript types
├── public/
│   └── uploads/            # Local file uploads
├── .env.example            # Environment template
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Exams
- `GET /api/exams` - List all exams
- `POST /api/exams` - Create exam (Teacher/Admin)
- `GET /api/exams/[id]` - Get exam details
- `PUT /api/exams/[id]` - Update exam
- `DELETE /api/exams/[id]` - Delete exam
- `POST /api/exams/[id]/start` - Start exam (Student)
- `POST /api/exams/[id]/submit` - Submit exam (Student)

### Courses
- `GET /api/courses` - List courses
- `POST /api/courses` - Create course (Teacher/Admin)
- `POST /api/courses/[id]/enroll` - Enroll in course (Student)

### Grading
- `POST /api/submissions/[id]/grade` - Grade submission (Teacher)

### Dashboard
- `GET /api/student/dashboard` - Student dashboard data
- `GET /api/teacher/dashboard` - Teacher dashboard data

### File Upload
- `POST /api/upload` - Upload files

## 🎨 Frontend Components

### UI Components
- `Button` - Customizable button with variants
- `Card` - Container component
- `Input`, `TextArea`, `Select` - Form inputs
- `Modal` - Modal dialog
- `Badge` - Status badges

### Exam Components
- `MCQQuestion` - Multiple choice question
- `WrittenQuestion` - Written answer question
- `ExamTimer` - Countdown timer

## 📊 Database Schema

Key models:
- `User` - Students, teachers, admins
- `Course` - Course information
- `Chapter` - Course chapters
- `Material` - Learning materials (videos, PDFs)
- `Exam` - Exam details
- `Question` - MCQ and written questions
- `ExamSubmission` - Student submissions
- `MCQAnswer` - MCQ responses
- `WrittenAnswer` - Written responses
- `Grade` - Final grades and feedback
- `Enrollment` - Student-course relationships
- `Notification` - System notifications
- `ActivityLog` - User activity tracking

## 🚢 Deployment

### Vercel (Recommended for Next.js)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker

```bash
docker build -t exam-tracker .
docker run -p 3000:3000 exam-tracker
```

### Traditional Server

```bash
npm run build
npm start
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- SQL injection prevention (Prisma)
- XSS protection
- CSRF protection

## 📈 Future Enhancements

- [ ] Video proctoring with webcam
- [ ] Advanced analytics with charts
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Real-time chat
- [ ] Certificate generation
- [ ] Payment integration for courses
- [ ] AI-powered grading
- [ ] Question bank management
- [ ] Bulk import/export

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Prisma Issues
```bash
# Regenerate Prisma client
npx prisma generate

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset
```

### Port Already in Use
```bash
# Kill process on port 3000
kill -9 $(lsof -ti:3000)

# Or use different port
PORT=3001 npm run dev
```

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

For issues or questions:
- Create an issue on GitHub
- Email: support@examtracker.com (example)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- Tailwind CSS for utility-first styling
- All contributors and users

---

Built with ❤️ for education
