import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest, hasRole } from '@/lib/auth';
import { successResponse, errorResponse, calculateGrade } from '@/lib/utils';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || !hasRole(currentUser, ['TEACHER', 'ADMIN'])) {
      return errorResponse('Unauthorized', 401);
    }

    const { id: submissionId } = params;
    const body = await request.json();
    const { gradedAnswers, remarks } = body;

    // Get submission
    const submission = await prisma.examSubmission.findUnique({
      where: { id: submissionId },
      include: {
        exam: {
          include: {
            questions: true,
          },
        },
        mcqAnswers: true,
        writtenAnswers: true,
      },
    });

    if (!submission) {
      return errorResponse('Submission not found', 404);
    }

    // Check if teacher owns this exam
    if (currentUser.role === 'TEACHER' && submission.exam.teacherId !== currentUser.userId) {
      return errorResponse('You do not have permission to grade this submission', 403);
    }

    let totalObtained = 0;

    // Calculate MCQ score
    totalObtained += submission.mcqAnswers.reduce((sum, ans) => sum + ans.marksObtained, 0);

    // Update written answers with grades
    for (const gradedAnswer of gradedAnswers) {
      const written = await prisma.writtenAnswer.update({
        where: { id: gradedAnswer.id },
        data: {
          marksObtained: parseFloat(gradedAnswer.marksObtained),
          feedback: gradedAnswer.feedback,
          gradedAt: new Date(),
        },
      });

      totalObtained += written.marksObtained || 0;
    }

    // Calculate percentage
    const percentage = (totalObtained / submission.exam.totalMarks) * 100;
    const grade = calculateGrade(percentage);

    // Update submission
    const updatedSubmission = await prisma.examSubmission.update({
      where: { id: submissionId },
      data: {
        status: 'GRADED',
        obtainedScore: totalObtained,
        percentage,
      },
    });

    // Create or update grade
    await prisma.grade.upsert({
      where: { submissionId },
      update: {
        grade,
        remarks,
        gradedById: currentUser.userId,
        publishedAt: new Date(),
      },
      create: {
        submissionId,
        grade,
        remarks,
        gradedById: currentUser.userId,
        publishedAt: new Date(),
      },
    });

    // Create notification for student
    await prisma.notification.create({
      data: {
        userId: submission.studentId,
        type: 'RESULT_PUBLISHED',
        title: 'Exam Graded',
        message: `Your exam "${submission.exam.title}" has been graded.`,
        link: `/student/exams/${submission.examId}/result`,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: currentUser.userId,
        activityType: 'GRADE_PUBLISH',
        description: `Graded submission for exam: ${submission.exam.title}`,
        metadata: { submissionId, studentId: submission.studentId, grade },
      },
    });

    return successResponse(
      {
        submission: updatedSubmission,
        grade,
        totalObtained,
        percentage,
      },
      'Submission graded successfully'
    );
  } catch (error: any) {
    console.error('Grade submission error:', error);
    return errorResponse('An error occurred while grading submission', 500);
  }
}
