import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest, hasRole } from '@/lib/auth';
import { successResponse, errorResponse, paginate } from '@/lib/utils';

// GET all exams
export async function GET(request: NextRequest) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser) {
      return errorResponse('Unauthorized', 401);
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const courseId = searchParams.get('courseId');
    const status = searchParams.get('status');
    const type = searchParams.get('type');

    const where: any = {};

    // Role-based filtering
    if (currentUser.role === 'STUDENT') {
      // Students see only active/scheduled exams for their enrolled courses
      const enrollments = await prisma.enrollment.findMany({
        where: { studentId: currentUser.userId },
        select: { courseId: true },
      });
      where.courseId = { in: enrollments.map((e) => e.courseId) };
      where.status = { in: ['ACTIVE', 'SCHEDULED', 'COMPLETED'] };
    } else if (currentUser.role === 'TEACHER') {
      // Teachers see only their exams
      where.teacherId = currentUser.userId;
    }

    if (courseId) where.courseId = courseId;
    if (status) where.status = status;
    if (type) where.type = type;

    const exams = await prisma.exam.findMany({
      where,
      include: {
        course: {
          select: {
            id: true,
            title: true,
            code: true,
          },
        },
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            questions: true,
            submissions: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Add submission status for students
    let examsWithStatus = exams;
    if (currentUser.role === 'STUDENT') {
      const submissions = await prisma.examSubmission.findMany({
        where: {
          studentId: currentUser.userId,
          examId: { in: exams.map((e) => e.id) },
        },
        select: {
          examId: true,
          status: true,
          obtainedScore: true,
          percentage: true,
          submittedAt: true,
        },
      });

      const submissionMap = new Map(submissions.map((s) => [s.examId, s]));
      examsWithStatus = exams.map((exam) => ({
        ...exam,
        submission: submissionMap.get(exam.id) || null,
      }));
    }

    const paginatedData = paginate(examsWithStatus, page, limit);

    return successResponse(paginatedData, 'Exams fetched successfully');
  } catch (error: any) {
    console.error('Get exams error:', error);
    return errorResponse('An error occurred while fetching exams', 500);
  }
}

// CREATE new exam
export async function POST(request: NextRequest) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || !hasRole(currentUser, ['TEACHER', 'ADMIN'])) {
      return errorResponse('Unauthorized', 401);
    }

    const body = await request.json();
    const {
      title,
      description,
      type,
      courseId,
      startTime,
      endTime,
      duration,
      totalMarks,
      passingMarks,
      shuffleQuestions = false,
      showResults = true,
      allowReview = false,
      enableProctoring = false,
      preventTabSwitch = false,
      requireCamera = false,
      questions = [],
    } = body;

    // Validation
    if (!title || !type || !courseId || !duration || !totalMarks || !passingMarks) {
      return errorResponse('Missing required fields', 400);
    }

    // Verify course exists and user has access
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return errorResponse('Course not found', 404);
    }

    if (currentUser.role === 'TEACHER' && course.teacherId !== currentUser.userId) {
      return errorResponse('You do not have permission to create exam for this course', 403);
    }

    // Create exam
    const exam = await prisma.exam.create({
      data: {
        title,
        description,
        type,
        courseId,
        teacherId: currentUser.userId,
        startTime: startTime ? new Date(startTime) : null,
        endTime: endTime ? new Date(endTime) : null,
        duration,
        totalMarks: parseFloat(totalMarks),
        passingMarks: parseFloat(passingMarks),
        shuffleQuestions,
        showResults,
        allowReview,
        enableProctoring,
        preventTabSwitch,
        requireCamera,
        status: 'DRAFT',
      },
      include: {
        course: true,
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Create questions if provided
    if (questions.length > 0) {
      await prisma.question.createMany({
        data: questions.map((q: any, index: number) => ({
          examId: exam.id,
          type: q.type,
          questionText: q.questionText,
          order: index + 1,
          marks: parseFloat(q.marks),
          optionA: q.optionA,
          optionB: q.optionB,
          optionC: q.optionC,
          optionD: q.optionD,
          correctAnswer: q.correctAnswer,
          wordLimit: q.wordLimit ? parseInt(q.wordLimit) : null,
          expectedAnswer: q.expectedAnswer,
        })),
      });
    }

    return successResponse(exam, 'Exam created successfully', 201);
  } catch (error: any) {
    console.error('Create exam error:', error);
    return errorResponse('An error occurred while creating exam', 500);
  }
}
