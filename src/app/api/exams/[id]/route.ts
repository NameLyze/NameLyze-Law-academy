import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest, hasRole } from '@/lib/auth';
import { successResponse, errorResponse, shuffleArray, isExamActive } from '@/lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser) {
      return errorResponse('Unauthorized', 401);
    }

    const { id } = params;

    const exam = await prisma.exam.findUnique({
      where: { id },
      include: {
        course: true,
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        questions: {
          orderBy: {
            order: 'asc',
          },
        },
        _count: {
          select: {
            submissions: true,
          },
        },
      },
    });

    if (!exam) {
      return errorResponse('Exam not found', 404);
    }

    // Check access permissions
    if (currentUser.role === 'STUDENT') {
      // Check if student is enrolled in the course
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

      // Check if exam is accessible
      if (!isExamActive(exam) && exam.status !== 'COMPLETED') {
        return errorResponse('This exam is not currently active', 403);
      }

      // Get student's submission status
      const submission = await prisma.examSubmission.findUnique({
        where: {
          examId_studentId: {
            examId: id,
            studentId: currentUser.userId,
          },
        },
        include: {
          mcqAnswers: true,
          writtenAnswers: true,
        },
      });

      // For students, hide correct answers unless exam is completed and they've submitted
      let questions = exam.questions;
      if (!submission || submission.status !== 'GRADED') {
        questions = questions.map((q) => {
          const { correctAnswer, expectedAnswer, ...rest } = q;
          return rest as any;
        });
      }

      // Shuffle questions if enabled
      if (exam.shuffleQuestions && (!submission || submission.status === 'NOT_STARTED')) {
        questions = shuffleArray(questions);
      }

      return successResponse(
        {
          ...exam,
          questions,
          submission,
        },
        'Exam fetched successfully'
      );
    } else if (currentUser.role === 'TEACHER') {
      // Teachers can only see their own exams
      if (exam.teacherId !== currentUser.userId) {
        return errorResponse('You do not have permission to view this exam', 403);
      }

      // Get submission statistics
      const submissions = await prisma.examSubmission.findMany({
        where: { examId: id },
        include: {
          student: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return successResponse(
        {
          ...exam,
          submissions,
        },
        'Exam fetched successfully'
      );
    } else {
      // Admin can see everything
      const submissions = await prisma.examSubmission.findMany({
        where: { examId: id },
        include: {
          student: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return successResponse(
        {
          ...exam,
          submissions,
        },
        'Exam fetched successfully'
      );
    }
  } catch (error: any) {
    console.error('Get exam error:', error);
    return errorResponse('An error occurred while fetching exam', 500);
  }
}

// UPDATE exam
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || !hasRole(currentUser, ['TEACHER', 'ADMIN'])) {
      return errorResponse('Unauthorized', 401);
    }

    const { id } = params;
    const body = await request.json();

    // Check if exam exists
    const exam = await prisma.exam.findUnique({
      where: { id },
    });

    if (!exam) {
      return errorResponse('Exam not found', 404);
    }

    // Check permissions
    if (currentUser.role === 'TEACHER' && exam.teacherId !== currentUser.userId) {
      return errorResponse('You do not have permission to update this exam', 403);
    }

    // Update exam
    const updatedExam = await prisma.exam.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        type: body.type,
        status: body.status,
        startTime: body.startTime ? new Date(body.startTime) : undefined,
        endTime: body.endTime ? new Date(body.endTime) : undefined,
        duration: body.duration,
        totalMarks: body.totalMarks ? parseFloat(body.totalMarks) : undefined,
        passingMarks: body.passingMarks ? parseFloat(body.passingMarks) : undefined,
        shuffleQuestions: body.shuffleQuestions,
        showResults: body.showResults,
        allowReview: body.allowReview,
        enableProctoring: body.enableProctoring,
        preventTabSwitch: body.preventTabSwitch,
        requireCamera: body.requireCamera,
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

    return successResponse(updatedExam, 'Exam updated successfully');
  } catch (error: any) {
    console.error('Update exam error:', error);
    return errorResponse('An error occurred while updating exam', 500);
  }
}

// DELETE exam
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || !hasRole(currentUser, ['TEACHER', 'ADMIN'])) {
      return errorResponse('Unauthorized', 401);
    }

    const { id } = params;

    const exam = await prisma.exam.findUnique({
      where: { id },
    });

    if (!exam) {
      return errorResponse('Exam not found', 404);
    }

    if (currentUser.role === 'TEACHER' && exam.teacherId !== currentUser.userId) {
      return errorResponse('You do not have permission to delete this exam', 403);
    }

    await prisma.exam.delete({
      where: { id },
    });

    return successResponse(null, 'Exam deleted successfully');
  } catch (error: any) {
    console.error('Delete exam error:', error);
    return errorResponse('An error occurred while deleting exam', 500);
  }
}
