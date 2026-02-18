import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, generateToken } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return errorResponse('Email and password are required', 400);
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        role: true,
        status: true,
        avatar: true,
      },
    });

    if (!user) {
      return errorResponse('Invalid credentials', 401);
    }

    // Check if account is active
    if (user.status !== 'ACTIVE') {
      return errorResponse('Your account is not active. Please contact administrator.', 403);
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return errorResponse('Invalid credentials', 401);
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        activityType: 'LOGIN',
        description: 'User logged in',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return successResponse(
      {
        token,
        user: userWithoutPassword,
      },
      'Login successful'
    );
  } catch (error: any) {
    console.error('Login error:', error);
    return errorResponse('An error occurred during login', 500);
  }
}
