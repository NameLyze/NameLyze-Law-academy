import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest, hasRole } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || !hasRole(currentUser, ['TEACHER', 'ADMIN'])) {
      return errorResponse('Unauthorized', 401);
    }

    const where = currentUser.role === 'TEACHER' ? { teacherId: currentUser.userId } : {};

    // Get courses
    const courses = await prisma.course.findMany({
      where,
      include: {
        _count: {
          select: {
            enrollments: true,
            exams: true,
            chapters: true,
          },
        },
      },
    });

    // Get exams
    const exams = await prisma.exam.findMany({
      where,
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
        _count: {
          select: {
            submissions: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    // Get submissions needing grading
    const needsGrading = await prisma.examSubmission.findMany({
      where: {
        status: 'SUBMITTED',
        exam: where,
      },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            courseId: true,
          },
        },
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        submittedAt: 'asc',
      },
    });

    // Get recent activity
    const recentActivity = await prisma.activityLog.findMany({
      where: {
        userId: currentUser.userId,
        activityType: { in: ['EXAM_CREATE', 'GRADE_PUBLISH'] },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    // Calculate statistics
    const totalStudents = await prisma.enrollment.count({
      where: {
        courseId: { in: courses.map((c) => c.id) },
      },
    });

    const totalSubmissions = await prisma.examSubmission.count({
      where: {
        exam: where,
      },
    });

    const activeExams = exams.filter((e) => e.status === 'ACTIVE').length;

    // Get performance statistics
    const allSubmissions = await prisma.examSubmission.findMany({
      where: {
        exam: where,
        status: 'GRADED',
      },
      select: {
        percentage: true,
        examId: true,
      },
    });

    const averagePerformance =
      allSubmissions.length > 0
        ? allSubmissions.reduce((sum, s) => sum + s.percentage, 0) / allSubmissions.length
        : 0;

    // Exam statistics
    const examStats = exams.map((exam) => {
      const examSubmissions = allSubmissions.filter((s) => s.examId === exam.id);
      const avgScore =
        examSubmissions.length > 0
          ? examSubmissions.reduce((sum, s) => sum + s.percentage, 0) / examSubmissions.length
          : 0;

      return {
        examId: exam.id,
        examTitle: exam.title,
        courseName: exam.course.title,
        submissions: exam._count.submissions,
        averageScore: Math.round(avgScore * 10) / 10,
      };
    });

    return successResponse({
      totalCourses: courses.length,
      totalExams: exams.length,
      activeExams,
      totalStudents,
      totalSubmissions,
      needsGrading: needsGrading.length,
      averagePerformance: Math.round(averagePerformance * 10) / 10,
      courses,
      recentExams: exams.slice(0, 5),
      submissionsToGrade: needsGrading,
      recentActivity,
      examStats: examStats.slice(0, 5),
    });
  } catch (error: any) {
    console.error('Teacher dashboard error:', error);
    return errorResponse('An error occurred while fetching dashboard data', 500);
  }
}
