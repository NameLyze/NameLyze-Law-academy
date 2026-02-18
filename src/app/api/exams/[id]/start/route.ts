import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, isExamActive } from '@/lib/utils';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || currentUser.role !== 'STUDENT') {
      return errorResponse('Only students can start exams', 403);
    }

    const { id: examId } = params;

    // Get exam details
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: {
        questions: true,
        course: true,
      },
    });

    if (!exam) {
      return errorResponse('Exam not found', 404);
    }

    // Check if student is enrolled
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId: currentUser.userId,
          courseId: exam.courseId,
        },
      },
    });

    if (!enrollment) {
      return errorResponse('You are not enrolled in this course', 403);
    }

    // Check if exam is active
    if (!isExamActive(exam)) {
      return errorResponse('This exam is not currently active', 403);
    }

    // Check if student has already submitted
    let submission = await prisma.examSubmission.findUnique({
      where: {
        examId_studentId: {
          examId,
          studentId: currentUser.userId,
        },
      },
    });

    if (submission && submission.status === 'SUBMITTED') {
      return errorResponse('You have already submitted this exam', 400);
    }

    // Create or update submission
    if (!submission) {
      submission = await prisma.examSubmission.create({
        data: {
          examId,
          studentId: currentUser.userId,
          status: 'IN_PROGRESS',
          startedAt: new Date(),
          totalScore: exam.totalMarks,
        },
      });

      // Log activity
      await prisma.activityLog.create({
        data: {
          userId: currentUser.userId,
          activityType: 'EXAM_START',
          description: `Started exam: ${exam.title}`,
          metadata: { examId, submissionId: submission.id },
        },
      });
    } else if (submission.status === 'NOT_STARTED') {
      submission = await prisma.examSubmission.update({
        where: { id: submission.id },
        data: {
          status: 'IN_PROGRESS',
          startedAt: new Date(),
        },
      });
    }

    return successResponse(
      {
        submission,
        exam: {
          id: exam.id,
          title: exam.title,
          duration: exam.duration,
          totalMarks: exam.totalMarks,
          questionCount: exam.questions.length,
        },
      },
      'Exam started successfully'
    );
  } catch (error: any) {
    console.error('Start exam error:', error);
    return errorResponse('An error occurred while starting exam', 500);
  }
}
