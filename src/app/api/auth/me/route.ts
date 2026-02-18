import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const currentUser = getUserFromRequest(request);

    if (!currentUser) {
      return errorResponse('Unauthorized', 401);
    }

    // Fetch user details
    const user = await prisma.user.findUnique({
      where: { id: currentUser.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        avatar: true,
        phone: true,
        fathersName: true,
        mothersName: true,
        gender: true,
        dateOfBirth: true,
        presentAddress: true,
        permanentAddress: true,
        bloodGroup: true,
        nationalId: true,
        occupation: true,
        institution: true,
        educationalQualification: true,
        emergencyContact: true,
        createdAt: true,
        lastLoginAt: true,
      },
    });

    if (!user) {
      return errorResponse('User not found', 404);
    }

    return successResponse(user, 'User fetched successfully');
  } catch (error: any) {
    console.error('Get user error:', error);
    return errorResponse('An error occurred while fetching user', 500);
  }
}
