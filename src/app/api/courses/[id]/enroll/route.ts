import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/utils';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || currentUser.role !== 'STUDENT') {
      return errorResponse('Only students can enroll in courses', 403);
    }

    const { id: courseId } = params;

    // Check if course exists and is published
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return errorResponse('Course not found', 404);
    }

    if (!course.isPublished) {
      return errorResponse('This course is not available for enrollment', 400);
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId: currentUser.userId,
          courseId,
        },
      },
    });

    if (existingEnrollment) {
      return errorResponse('You are already enrolled in this course', 400);
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: currentUser.userId,
        courseId,
      },
      include: {
        course: {
          include: {
            teacher: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        userId: currentUser.userId,
        type: 'COURSE_UPDATE',
        title: 'Course Enrollment Successful',
        message: `You have successfully enrolled in "${course.title}"`,
        link: `/student/courses/${courseId}`,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: currentUser.userId,
        activityType: 'COURSE_ENROLL',
        description: `Enrolled in course: ${course.title}`,
        metadata: { courseId },
      },
    });

    return successResponse(enrollment, 'Enrollment successful', 201);
  } catch (error: any) {
    console.error('Enrollment error:', error);
    return errorResponse('An error occurred during enrollment', 500);
  }
}

// Unenroll from course
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || currentUser.role !== 'STUDENT') {
      return errorResponse('Unauthorized', 401);
    }

    const { id: courseId } = params;

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId: currentUser.userId,
          courseId,
        },
      },
    });

    if (!enrollment) {
      return errorResponse('You are not enrolled in this course', 404);
    }

    await prisma.enrollment.delete({
      where: {
        id: enrollment.id,
      },
    });

    return successResponse(null, 'Unenrolled successfully');
  } catch (error: any) {
    console.error('Unenrollment error:', error);
    return errorResponse('An error occurred during unenrollment', 500);
  }
}
