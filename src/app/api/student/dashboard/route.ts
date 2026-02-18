import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || currentUser.role !== 'STUDENT') {
      return errorResponse('Unauthorized', 401);
    }

    // Get enrollments
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId: currentUser.userId },
      include: {
        course: {
          include: {
            teacher: {
              select: {
                id: true,
                name: true,
              },
            },
            _count: {
              select: {
                chapters: true,
                exams: true,
              },
            },
          },
        },
      },
    });

    // Get submissions
    const submissions = await prisma.examSubmission.findMany({
      where: { studentId: currentUser.userId },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            type: true,
            totalMarks: true,
            courseId: true,
          },
        },
        grade: true,
      },
      orderBy: {
        submittedAt: 'desc',
      },
      take: 10,
    });

    // Get upcoming exams
    const upcomingExams = await prisma.exam.findMany({
      where: {
        courseId: { in: enrollments.map((e) => e.courseId) },
        status: { in: ['SCHEDULED', 'ACTIVE'] },
        startTime: { gte: new Date() },
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        startTime: 'asc',
      },
      take: 5,
    });

    // Get notifications
    const notifications = await prisma.notification.findMany({
      where: { userId: currentUser.userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    // Calculate statistics
    const totalExams = submissions.length;
    const completedExams = submissions.filter((s) => s.status === 'GRADED').length;
    const averageScore =
      completedExams > 0
        ? submissions
            .filter((s) => s.status === 'GRADED')
            .reduce((sum, s) => sum + s.percentage, 0) / completedExams
        : 0;

    // Performance by course
    const performanceByCourse = enrollments.map((enrollment) => {
      const courseSubmissions = submissions.filter(
        (s) => s.exam.courseId === enrollment.courseId && s.status === 'GRADED'
      );

      const avgScore =
        courseSubmissions.length > 0
          ? courseSubmissions.reduce((sum, s) => sum + s.percentage, 0) / courseSubmissions.length
          : 0;

      return {
        courseId: enrollment.courseId,
        courseName: enrollment.course.title,
        examsCompleted: courseSubmissions.length,
        averageScore: avgScore,
        progress: enrollment.progress,
      };
    });

    return successResponse({
      enrollments: enrollments.length,
      totalExams,
      completedExams,
      averageScore: Math.round(averageScore * 10) / 10,
      courses: enrollments.map((e) => e.course),
      recentSubmissions: submissions.slice(0, 5),
      upcomingExams,
      notifications,
      performanceByCourse,
    });
  } catch (error: any) {
    console.error('Student dashboard error:', error);
    return errorResponse('An error occurred while fetching dashboard data', 500);
  }
}
