# 📡 API Documentation

Complete API reference for Online Exam Tracker

## Base URL
```
Development: http://localhost:3000/api
Production: https://yourdomain.com/api
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## 🔐 Authentication Endpoints

### Login

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate user and receive JWT token

**Request Body:**
```json
{
  "email": "student@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user-uuid",
      "email": "student@example.com",
      "name": "John Doe",
      "role": "STUDENT",
      "status": "ACTIVE"
    }
  }
}
```

**Errors:**
- 400: Missing required fields
- 401: Invalid credentials
- 403: Account not active

---

### Register

**Endpoint:** `POST /api/auth/register`

**Description:** Create new user account

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "Jane Smith",
  "role": "STUDENT"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "new-user-uuid",
      "email": "newuser@example.com",
      "name": "Jane Smith",
      "role": "STUDENT"
    }
  }
}
```

**Errors:**
- 400: Validation error
- 409: Email already exists

---

### Get Current User

**Endpoint:** `GET /api/auth/me`

**Description:** Get authenticated user's profile

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "user-uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "STUDENT",
    "status": "ACTIVE",
    "avatar": null,
    "phone": "+1234567890",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 📚 Course Endpoints

### List All Courses

**Endpoint:** `GET /api/courses`

**Description:** Get all courses (filtered by role)

**Query Parameters:**
- `published` (optional): Filter by published status (true/false)

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "course-uuid",
      "title": "Class 9 - Mathematics",
      "description": "Complete math curriculum",
      "code": "MATH-09",
      "thumbnail": "https://example.com/image.jpg",
      "isPublished": true,
      "teacher": {
        "id": "teacher-uuid",
        "name": "Mr. Smith",
        "email": "teacher@example.com"
      },
      "_count": {
        "chapters": 5,
        "exams": 3,
        "enrollments": 25
      },
      "isEnrolled": true
    }
  ]
}
```

---

### Create Course

**Endpoint:** `POST /api/courses`

**Description:** Create new course (Teacher/Admin only)

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Physics 101",
  "description": "Introduction to Physics",
  "thumbnail": "https://example.com/physics.jpg"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "id": "new-course-uuid",
    "title": "Physics 101",
    "code": "COURSE-ABC123",
    "isPublished": false
  }
}
```

---

### Enroll in Course

**Endpoint:** `POST /api/courses/{courseId}/enroll`

**Description:** Enroll student in course

**Headers:** `Authorization: Bearer <token>`

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Enrollment successful",
  "data": {
    "id": "enrollment-uuid",
    "studentId": "student-uuid",
    "courseId": "course-uuid",
    "enrolledAt": "2024-01-15T10:00:00.000Z",
    "progress": 0
  }
}
```

**Errors:**
- 400: Already enrolled
- 404: Course not found

---

### Unenroll from Course

**Endpoint:** `DELETE /api/courses/{courseId}/enroll`

**Description:** Remove enrollment

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Unenrolled successfully"
}
```

---

## 📝 Exam Endpoints

### List All Exams

**Endpoint:** `GET /api/exams`

**Description:** Get all exams (filtered by role and enrollment)

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `courseId` (optional): Filter by course
- `status` (optional): Filter by status (DRAFT, SCHEDULED, ACTIVE, COMPLETED)
- `type` (optional): Filter by type (MCQ, WRITTEN, MIXED)

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "exam-uuid",
        "title": "Algebra Quiz 1",
        "description": "Test your algebra knowledge",
        "type": "MCQ",
        "status": "ACTIVE",
        "courseId": "course-uuid",
        "startTime": "2024-01-20T09:00:00.000Z",
        "endTime": "2024-01-27T09:00:00.000Z",
        "duration": 30,
        "totalMarks": 20,
        "passingMarks": 12,
        "course": {
          "id": "course-uuid",
          "title": "Mathematics",
          "code": "MATH-09"
        },
        "_count": {
          "questions": 10,
          "submissions": 5
        },
        "submission": {
          "status": "GRADED",
          "percentage": 85.5,
          "obtainedScore": 17
        }
      }
    ],
    "meta": {
      "total": 50,
      "page": 1,
      "limit": 10,
      "totalPages": 5,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

---

### Create Exam

**Endpoint:** `POST /api/exams`

**Description:** Create new exam (Teacher/Admin only)

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Biology Chapter 1 Test",
  "description": "Covers cells and tissues",
  "type": "MIXED",
  "courseId": "course-uuid",
  "startTime": "2024-02-01T10:00:00.000Z",
  "endTime": "2024-02-08T10:00:00.000Z",
  "duration": 60,
  "totalMarks": 50,
  "passingMarks": 25,
  "shuffleQuestions": true,
  "showResults": true,
  "enableProctoring": false,
  "questions": [
    {
      "type": "MCQ",
      "questionText": "What is the powerhouse of the cell?",
      "marks": 2,
      "optionA": "Nucleus",
      "optionB": "Mitochondria",
      "optionC": "Ribosome",
      "optionD": "Golgi body",
      "correctAnswer": "B"
    },
    {
      "type": "WRITTEN",
      "questionText": "Explain the process of photosynthesis",
      "marks": 10,
      "wordLimit": 300
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Exam created successfully",
  "data": {
    "id": "new-exam-uuid",
    "title": "Biology Chapter 1 Test",
    "status": "DRAFT",
    "totalMarks": 50
  }
}
```

---

### Get Exam Details

**Endpoint:** `GET /api/exams/{examId}`

**Description:** Get detailed exam information with questions

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK) - Student View:**
```json
{
  "success": true,
  "data": {
    "id": "exam-uuid",
    "title": "Algebra Quiz 1",
    "type": "MCQ",
    "duration": 30,
    "totalMarks": 20,
    "questions": [
      {
        "id": "question-uuid",
        "type": "MCQ",
        "questionText": "Solve: 2x + 5 = 15",
        "marks": 2,
        "optionA": "x = 3",
        "optionB": "x = 5",
        "optionC": "x = 7",
        "optionD": "x = 10"
      }
    ],
    "submission": {
      "id": "submission-uuid",
      "status": "IN_PROGRESS",
      "startedAt": "2024-01-20T10:00:00.000Z"
    }
  }
}
```

**Response (200 OK) - Teacher View:**
```json
{
  "success": true,
  "data": {
    "id": "exam-uuid",
    "title": "Algebra Quiz 1",
    "questions": [...],
    "submissions": [
      {
        "id": "submission-uuid",
        "student": {
          "id": "student-uuid",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "status": "GRADED",
        "percentage": 85,
        "submittedAt": "2024-01-20T10:25:00.000Z"
      }
    ]
  }
}
```

---

### Start Exam

**Endpoint:** `POST /api/exams/{examId}/start`

**Description:** Start taking an exam (Student only)

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Exam started successfully",
  "data": {
    "submission": {
      "id": "submission-uuid",
      "examId": "exam-uuid",
      "status": "IN_PROGRESS",
      "startedAt": "2024-01-20T10:00:00.000Z"
    },
    "exam": {
      "id": "exam-uuid",
      "title": "Algebra Quiz 1",
      "duration": 30,
      "questionCount": 10
    }
  }
}
```

**Errors:**
- 403: Not enrolled or exam not active
- 400: Already submitted

---

### Submit Exam

**Endpoint:** `POST /api/exams/{examId}/submit`

**Description:** Submit exam answers

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "mcqAnswers": [
    {
      "questionId": "question-uuid-1",
      "selectedAnswer": "B"
    },
    {
      "questionId": "question-uuid-2",
      "selectedAnswer": "A"
    }
  ],
  "writtenAnswers": [
    {
      "questionId": "question-uuid-3",
      "answerText": "Photosynthesis is the process by which plants..."
    }
  ]
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Exam submitted successfully",
  "data": {
    "submission": {
      "id": "submission-uuid",
      "status": "GRADED",
      "submittedAt": "2024-01-20T10:28:00.000Z"
    },
    "score": 16,
    "totalMarks": 20,
    "percentage": 80,
    "needsGrading": false
  }
}
```

---

### Update Exam

**Endpoint:** `PUT /api/exams/{examId}`

**Description:** Update exam details (Teacher/Admin only)

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Updated Title",
  "status": "ACTIVE",
  "startTime": "2024-02-01T10:00:00.000Z"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Exam updated successfully",
  "data": {
    "id": "exam-uuid",
    "title": "Updated Title",
    "status": "ACTIVE"
  }
}
```

---

### Delete Exam

**Endpoint:** `DELETE /api/exams/{examId}`

**Description:** Delete exam (Teacher/Admin only)

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Exam deleted successfully"
}
```

---

## ✍️ Grading Endpoints

### Grade Submission

**Endpoint:** `POST /api/submissions/{submissionId}/grade`

**Description:** Grade written answers (Teacher/Admin only)

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "gradedAnswers": [
    {
      "id": "written-answer-uuid",
      "marksObtained": 8,
      "feedback": "Good explanation, but missing some details."
    }
  ],
  "remarks": "Overall good performance. Keep practicing."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Submission graded successfully",
  "data": {
    "submission": {
      "id": "submission-uuid",
      "status": "GRADED",
      "obtainedScore": 42,
      "percentage": 84
    },
    "grade": "A",
    "totalObtained": 42,
    "percentage": 84
  }
}
```

---

## 📊 Dashboard Endpoints

### Student Dashboard

**Endpoint:** `GET /api/student/dashboard`

**Description:** Get student dashboard data

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "enrollments": 3,
    "totalExams": 15,
    "completedExams": 12,
    "averageScore": 82.5,
    "courses": [...],
    "recentSubmissions": [...],
    "upcomingExams": [...],
    "notifications": [...],
    "performanceByCourse": [
      {
        "courseId": "course-uuid",
        "courseName": "Mathematics",
        "examsCompleted": 5,
        "averageScore": 85.2,
        "progress": 60
      }
    ]
  }
}
```

---

### Teacher Dashboard

**Endpoint:** `GET /api/teacher/dashboard`

**Description:** Get teacher dashboard data

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalCourses": 3,
    "totalExams": 10,
    "activeExams": 2,
    "totalStudents": 45,
    "totalSubmissions": 120,
    "needsGrading": 5,
    "averagePerformance": 78.5,
    "courses": [...],
    "recentExams": [...],
    "submissionsToGrade": [...],
    "examStats": [
      {
        "examId": "exam-uuid",
        "examTitle": "Algebra Quiz",
        "courseName": "Mathematics",
        "submissions": 25,
        "averageScore": 82.3
      }
    ]
  }
}
```

---

## 📁 File Upload

### Upload File

**Endpoint:** `POST /api/upload`

**Description:** Upload file to server or S3

**Headers:** 
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body (FormData):**
```
file: <file-binary>
folder: "materials" | "videos" | "pdfs" | "answers" | "images"
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "url": "https://s3.amazonaws.com/bucket/materials/uuid-filename.pdf",
    "fileName": "uuid-filename.pdf",
    "fileSize": 1024000,
    "mimeType": "application/pdf"
  }
}
```

**Allowed File Types:**
- `videos`: mp4, mpeg, quicktime (max 100MB)
- `pdfs/materials`: pdf (max 20MB)
- `answers`: pdf, jpg, png (max 10MB)
- `images/avatars`: jpg, png, gif, webp (max 5MB)

---

## ⚠️ Error Responses

All endpoints may return these error formats:

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "email": "Invalid email format"
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "You do not have permission to perform this action"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "An error occurred while processing your request"
}
```

---

## 📝 Rate Limiting

API requests are rate-limited:
- Authenticated users: 100 requests per minute
- Unauthenticated: 20 requests per minute
- File uploads: 10 per minute

---

## 🔒 Security Notes

1. Always use HTTPS in production
2. Store JWT tokens securely (httpOnly cookies recommended)
3. Never expose JWT_SECRET or NEXTAUTH_SECRET
4. Validate and sanitize all inputs
5. Use prepared statements (Prisma does this automatically)
6. Implement CORS properly
7. Rate limit sensitive endpoints

---

## 📚 Example Usage

### JavaScript/TypeScript

```typescript
// Login example
const login = async (email: string, password: string) => {
  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  
  if (data.success) {
    localStorage.setItem('token', data.data.token);
    return data.data.user;
  }
  
  throw new Error(data.message);
};

// Authenticated request example
const getExams = async (token: string) => {
  const response = await fetch('http://localhost:3000/api/exams', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return await response.json();
};
```

### cURL

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"password123"}'

# Get exams
curl -X GET http://localhost:3000/api/exams \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Submit exam
curl -X POST http://localhost:3000/api/exams/EXAM_ID/submit \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"mcqAnswers":[{"questionId":"Q1","selectedAnswer":"B"}]}'
```

---

**API Documentation Complete! 🎉**
