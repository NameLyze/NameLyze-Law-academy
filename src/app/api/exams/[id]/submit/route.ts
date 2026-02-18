import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, calculateGrade } from '@/lib/utils';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || currentUser.role !== 'STUDENT') {
      return errorResponse('Only students can submit exams', 403);
    }

    const { id: examId } = params;
    const body = await request.json();
    const { mcqAnswers = [], writtenAnswers = [] } = body;

    // Get exam and submission
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: {
        questions: true,
      },
    });

    if (!exam) {
      return errorResponse('Exam not found', 404);
    }

    const submission = await prisma.examSubmission.findUnique({
      where: {
        examId_studentId: {
          examId,
          studentId: currentUser.userId,
        },
      },
    });

    if (!submission) {
      return errorResponse('Submission not found. Please start the exam first.', 404);
    }

    if (submission.status === 'SUBMITTED') {
      return errorResponse('Exam already submitted', 400);
    }

    let totalObtained = 0;

    // Process MCQ answers
    if (mcqAnswers.length > 0) {
      for (const answer of mcqAnswers) {
        const question = exam.questions.find((q) => q.id === answer.questionId);
        if (!question || question.type !== 'MCQ') continue;

        const isCorrect = answer.selectedAnswer === question.correctAnswer;
        const marksObtained = isCorrect ? question.marks : 0;
        totalObtained += marksObtained;

        // Create or update MCQ answer
        await prisma.mcqAnswer.upsert({
          where: {
            submissionId_questionId: {
              submissionId: submission.id,
              questionId: answer.questionId,
            },
          },
          update: {
            selectedAnswer: answer.selectedAnswer,
            isCorrect,
            marksObtained,
          },
          create: {
            submissionId: submission.id,
            questionId: answer.questionId,
            selectedAnswer: answer.selectedAnswer,
            isCorrect,
            marksObtained,
          },
        });
      }
    }

    // Process written answers
    if (writtenAnswers.length > 0) {
      for (const answer of writtenAnswers) {
        const question = exam.questions.find((q) => q.id === answer.questionId);
        if (!question || question.type !== 'WRITTEN') continue;

        await prisma.writtenAnswer.upsert({
          where: {
            submissionId_questionId: {
              submissionId: submission.id,
              questionId: answer.questionId,
            },
          },
          update: {
            answerText: answer.answerText,
            answerFileUrl: answer.answerFileUrl,
          },
          create: {
            submissionId: submission.id,
            questionId: answer.questionId,
            studentId: currentUser.userId,
            answerText: answer.answerText,
            answerFileUrl: answer.answerFileUrl,
          },
        });
      }
    }

    // Calculate percentage
    const percentage = (totalObtained / exam.totalMarks) * 100;

    // Determine submission status
    // If there are written questions, mark as SUBMITTED (needs grading)
    // If only MCQ, mark as GRADED
    const hasWrittenQuestions = exam.questions.some((q) => q.type === 'WRITTEN');
    const newStatus = hasWrittenQuestions ? 'SUBMITTED' : 'GRADED';

    // Update submission
    const updatedSubmission = await prisma.examSubmission.update({
      where: { id: submission.id },
      data: {
        status: newStatus,
        submittedAt: new Date(),
        obtainedScore: totalObtained,
        percentage,
      },
      include: {
        mcqAnswers: {
          include: {
            question: true,
          },
        },
        writtenAnswers: {
          include: {
            question: true,
          },
        },
      },
    });

    // Create grade if auto-graded (MCQ only)
    if (!hasWrittenQuestions) {
      const grade = calculateGrade(percentage);
      await prisma.grade.create({
        data: {
          submissionId: submission.id,
          grade,
          remarks: percentage >= exam.passingMarks ? 'Passed' : 'Failed',
          gradedById: currentUser.userId, // Auto-graded
          publishedAt: exam.showResults ? new Date() : null,
        },
      });

      // Create notification
      await prisma.notification.create({
        data: {
          userId: currentUser.userId,
          type: 'RESULT_PUBLISHED',
          title: 'Exam Result Available',
          message: `Your result for "${exam.title}" is now available.`,
          link: `/student/exams/${examId}/result`,
        },
      });
    }

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: currentUser.userId,
        activityType: 'EXAM_SUBMIT',
        description: `Submitted exam: ${exam.title}`,
        metadata: { examId, submissionId: submission.id, score: totalObtained },
      },
    });

    return successResponse(
      {
        submission: updatedSubmission,
        score: totalObtained,
        totalMarks: exam.totalMarks,
        percentage,
        status: newStatus,
        needsGrading: hasWrittenQuestions,
      },
      'Exam submitted successfully'
    );
  } catch (error: any) {
    console.error('Submit exam error:', error);
    return errorResponse('An error occurred while submitting exam', 500);
  }
}
