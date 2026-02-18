import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken } from '@/lib/auth';
import { successResponse, errorResponse, isValidEmail } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      name,
      role = 'STUDENT',
      phone,
      fathersName,
      mothersName,
      gender,
      dateOfBirth,
      presentAddress,
      permanentAddress,
      bloodGroup,
      nationalId,
      occupation,
      institution,
      educationalQualification,
      emergencyContact
    } = body;

    // Validation
    if (!email || !password || !name) {
      return errorResponse('Email, password, and name are required', 400);
    }

    if (!isValidEmail(email)) {
      return errorResponse('Invalid email format', 400);
    }

    if (password.length < 6) {
      return errorResponse('Password must be at least 6 characters long', 400);
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    });

    if (existingUser) {
      return errorResponse('User with this email already exists', 409);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role.toUpperCase(),
        status: 'ACTIVE',
        phone,
        fathersName,
        mothersName,
        gender,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        presentAddress,
        permanentAddress,
        bloodGroup,
        nationalId,
        occupation,
        institution,
        educationalQualification,
        emergencyContact,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        avatar: true,
        phone: true,
        fathersName: true,
        presentAddress: true,
        createdAt: true,
      },
    });

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        activityType: 'LOGIN',
        description: 'User registered and logged in',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      },
    });

    return successResponse(
      {
        token,
        user,
      },
      'Registration successful',
      201
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return errorResponse('An error occurred during registration', 500);
  }
}
