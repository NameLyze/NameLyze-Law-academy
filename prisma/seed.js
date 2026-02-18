const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.activityLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.performanceMetric.deleteMany();
  await prisma.grade.deleteMany();
  await prisma.writtenAnswer.deleteMany();
  await prisma.mCQAnswer.deleteMany();
  await prisma.examSubmission.deleteMany();
  await prisma.question.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.material.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@examtracker.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  const teacher1 = await prisma.user.create({
    data: {
      email: 'teacher@examtracker.com',
      password: hashedPassword,
      name: 'John Teacher',
      role: 'TEACHER',
      status: 'ACTIVE',
    },
  });

  const teacher2 = await prisma.user.create({
    data: {
      email: 'sarah.teacher@examtracker.com',
      password: hashedPassword,
      name: 'Sarah Wilson',
      role: 'TEACHER',
      status: 'ACTIVE',
    },
  });

  const students = await Promise.all([
    prisma.user.create({
      data: {
        email: 'student1@examtracker.com',
        password: hashedPassword,
        name: 'Alice Student',
        role: 'STUDENT',
        status: 'ACTIVE',
      },
    }),
    prisma.user.create({
      data: {
        email: 'student2@examtracker.com',
        password: hashedPassword,
        name: 'Bob Student',
        role: 'STUDENT',
        status: 'ACTIVE',
      },
    }),
    prisma.user.create({
      data: {
        email: 'student3@examtracker.com',
        password: hashedPassword,
        name: 'Charlie Student',
        role: 'STUDENT',
        status: 'ACTIVE',
      },
    }),
  ]);

  console.log('✅ Users created');

  // Create Courses
  const mathCourse = await prisma.course.create({
    data: {
      title: 'Class 9 - Mathematics',
      description: 'Complete mathematics curriculum for class 9 students',
      code: 'MATH-09',
      teacherId: teacher1.id,
      isPublished: true,
    },
  });

  const scienceCourse = await prisma.course.create({
    data: {
      title: 'Class 9 - Science',
      description: 'Physics, Chemistry, and Biology for class 9',
      code: 'SCI-09',
      teacherId: teacher2.id,
      isPublished: true,
    },
  });

  console.log('✅ Courses created');

  // Create Chapters for Math
  const algebraChapter = await prisma.chapter.create({
    data: {
      title: 'Algebra Basics',
      description: 'Introduction to algebraic expressions and equations',
      order: 1,
      courseId: mathCourse.id,
    },
  });

  const geometryChapter = await prisma.chapter.create({
    data: {
      title: 'Geometry',
      description: 'Shapes, angles, and theorems',
      order: 2,
      courseId: mathCourse.id,
    },
  });

  console.log('✅ Chapters created');

  // Create Materials
  await prisma.material.createMany({
    data: [
      {
        title: 'Algebra Introduction Video',
        type: 'VIDEO',
        fileUrl: 'https://example.com/videos/algebra-intro.mp4',
        duration: 1200,
        order: 1,
        chapterId: algebraChapter.id,
      },
      {
        title: 'Algebra Practice PDF',
        type: 'PDF',
        fileUrl: 'https://example.com/pdfs/algebra-practice.pdf',
        fileSize: 2048000,
        order: 2,
        chapterId: algebraChapter.id,
      },
      {
        title: 'Geometry Fundamentals',
        type: 'VIDEO',
        fileUrl: 'https://example.com/videos/geometry-basics.mp4',
        duration: 1800,
        order: 1,
        chapterId: geometryChapter.id,
      },
    ],
  });

  console.log('✅ Materials created');

  // Create Enrollments
  for (const student of students) {
    await prisma.enrollment.create({
      data: {
        studentId: student.id,
        courseId: mathCourse.id,
        progress: Math.random() * 100,
      },
    });
  }

  console.log('✅ Enrollments created');

  // Create MCQ Exam
  const mcqExam = await prisma.exam.create({
    data: {
      title: 'Algebra Quiz 1',
      description: 'Test your knowledge of basic algebra',
      type: 'MCQ',
      status: 'ACTIVE',
      courseId: mathCourse.id,
      teacherId: teacher1.id,
      startTime: new Date(),
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      duration: 30,
      totalMarks: 20,
      passingMarks: 12,
      shuffleQuestions: true,
      showResults: true,
    },
  });

  // Create MCQ Questions
  await prisma.question.createMany({
    data: [
      {
        examId: mcqExam.id,
        type: 'MCQ',
        questionText: 'What is the value of x in the equation: 2x + 5 = 15?',
        order: 1,
        marks: 2,
        optionA: 'x = 3',
        optionB: 'x = 5',
        optionC: 'x = 7',
        optionD: 'x = 10',
        correctAnswer: 'B',
      },
      {
        examId: mcqExam.id,
        type: 'MCQ',
        questionText: 'Simplify: 3(x + 2) = ?',
        order: 2,
        marks: 2,
        optionA: '3x + 2',
        optionB: '3x + 5',
        optionC: '3x + 6',
        optionD: 'x + 6',
        correctAnswer: 'C',
      },
      {
        examId: mcqExam.id,
        type: 'MCQ',
        questionText: 'What is the capital of Bangladesh?',
        order: 3,
        marks: 2,
        optionA: 'Dhaka',
        optionB: 'Chittagong',
        optionC: 'Khulna',
        optionD: 'Rajshahi',
        correctAnswer: 'A',
      },
      {
        examId: mcqExam.id,
        type: 'MCQ',
        questionText: 'Which of these is a prime number?',
        order: 4,
        marks: 2,
        optionA: '15',
        optionB: '21',
        optionC: '23',
        optionD: '27',
        correctAnswer: 'C',
      },
      {
        examId: mcqExam.id,
        type: 'MCQ',
        questionText: 'Solve for y: y/4 = 3',
        order: 5,
        marks: 2,
        optionA: 'y = 7',
        optionB: 'y = 10',
        optionC: 'y = 12',
        optionD: 'y = 16',
        correctAnswer: 'C',
      },
    ],
  });

  console.log('✅ MCQ Exam created');

  // Create Written Exam
  const writtenExam = await prisma.exam.create({
    data: {
      title: 'Geometry Essay Exam',
      description: 'Write detailed answers about geometry concepts',
      type: 'WRITTEN',
      status: 'SCHEDULED',
      courseId: mathCourse.id,
      teacherId: teacher1.id,
      startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      endTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      duration: 60,
      totalMarks: 30,
      passingMarks: 18,
      showResults: false,
    },
  });

  // Create Written Questions
  await prisma.question.createMany({
    data: [
      {
        examId: writtenExam.id,
        type: 'WRITTEN',
        questionText: 'Explain the Pythagorean theorem and provide an example.',
        order: 1,
        marks: 10,
        wordLimit: 300,
        expectedAnswer:
          'The Pythagorean theorem states that in a right-angled triangle, the square of the hypotenuse equals the sum of squares of the other two sides (a² + b² = c²).',
      },
      {
        examId: writtenExam.id,
        type: 'WRITTEN',
        questionText: 'What are the properties of a parallelogram? List at least 4 properties.',
        order: 2,
        marks: 10,
        wordLimit: 250,
      },
      {
        examId: writtenExam.id,
        type: 'WRITTEN',
        questionText: 'Calculate the area of a circle with radius 7 cm. Show your work.',
        order: 3,
        marks: 10,
        wordLimit: 200,
      },
    ],
  });

  console.log('✅ Written Exam created');

  // Create Sample Submission for student1
  const questions = await prisma.question.findMany({
    where: { examId: mcqExam.id },
  });

  const submission = await prisma.examSubmission.create({
    data: {
      examId: mcqExam.id,
      studentId: students[0].id,
      status: 'SUBMITTED',
      startedAt: new Date(),
      submittedAt: new Date(),
      totalScore: 20,
      obtainedScore: 16,
      percentage: 80,
    },
  });

  // Create MCQ Answers for the submission
  await prisma.mCQAnswer.createMany({
    data: questions.map((q, index) => ({
      submissionId: submission.id,
      questionId: q.id,
      selectedAnswer: index < 4 ? q.correctAnswer : 'A', // 4 correct, 1 wrong
      isCorrect: index < 4,
      marksObtained: index < 4 ? q.marks : 0,
    })),
  });

  console.log('✅ Sample submission created');

  // Create Notifications
  for (const student of students) {
    await prisma.notification.create({
      data: {
        userId: student.id,
        type: 'EXAM_SCHEDULED',
        title: 'New Exam Scheduled',
        message: 'Algebra Quiz 1 has been scheduled for next week',
        link: `/student/exams/${mcqExam.id}`,
      },
    });
  }

  console.log('✅ Notifications created');

  console.log('✨ Database seeded successfully!');
  console.log('\n📝 Login Credentials:');
  console.log('Admin: admin@examtracker.com / password123');
  console.log('Teacher: teacher@examtracker.com / password123');
  console.log('Student: student1@examtracker.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
