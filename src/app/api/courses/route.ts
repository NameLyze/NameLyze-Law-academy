import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest, hasRole } from '@/lib/auth';
import { successResponse, errorResponse, generateCode } from '@/lib/utils';

// GET all courses
export async function GET(request: NextRequest) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser) {
      return errorResponse('Unauthorized', 401);
    }

    const { searchParams } = new URL(request.url);
    const isPublished = searchParams.get('published');

    const where: any = {};

    // Role-based filtering
    if (currentUser.role === 'STUDENT') {
      where.isPublished = true;
    } else if (currentUser.role === 'TEACHER') {
      where.teacherId = currentUser.userId;
    }

    if (isPublished !== null) {
      where.isPublished = isPublished === 'true';
    }

    const courses = await prisma.course.findMany({
      where,
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            chapters: true,
            exams: true,
            enrollments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Add enrollment status for students
    if (currentUser.role === 'STUDENT') {
      const enrollments = await prisma.enrollment.findMany({
        where: {
          studentId: currentUser.userId,
          courseId: { in: courses.map((c) => c.id) },
        },
      });

      const enrollmentMap = new Map(enrollments.map((e) => [e.courseId, e]));
      const coursesWithEnrollment = courses.map((course) => ({
        ...course,
        enrollment: enrollmentMap.get(course.id) || null,
        isEnrolled: enrollmentMap.has(course.id),
      }));

      return successResponse(coursesWithEnrollment, 'Courses fetched successfully');
    }

    return successResponse(courses, 'Courses fetched successfully');
  } catch (error: any) {
    console.error('Get courses error:', error);
    return errorResponse('An error occurred while fetching courses', 500);
  }
}

// CREATE new course
export async function POST(request: NextRequest) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || !hasRole(currentUser, ['TEACHER', 'ADMIN'])) {
      return errorResponse('Unauthorized', 401);
    }

    const body = await request.json();
    const { title, description, thumbnail } = body;

    if (!title) {
      return errorResponse('Course title is required', 400);
    }

    // Generate unique course code
    let code;
    let attempts = 0;
    while (attempts < 10) {
      code = `COURSE-${generateCode(6)}`;
      const existing = await prisma.course.findUnique({ where: { code } });
      if (!existing) break;
      attempts++;
    }

    if (!code) {
      return errorResponse('Failed to generate unique course code', 500);
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        code,
        thumbnail,
        teacherId: currentUser.userId,
        isPublished: false,
      },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return successResponse(course, 'Course created successfully', 201);
  } catch (error: any) {
    console.error('Create course error:', error);
    return errorResponse('An error occurred while creating course', 500);
  }
}
