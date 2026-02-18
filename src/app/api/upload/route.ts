import { NextRequest } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { uploadFile, validateFile } from '@/lib/upload';
import { successResponse, errorResponse } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser) {
      return errorResponse('Unauthorized', 401);
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'general';

    if (!file) {
      return errorResponse('No file provided', 400);
    }

    // Define allowed file types based on folder
    let allowedTypes: string[] = [];
    let maxSize = 10485760; // 10MB default

    switch (folder) {
      case 'videos':
        allowedTypes = ['video/mp4', 'video/mpeg', 'video/quicktime'];
        maxSize = 104857600; // 100MB for videos
        break;
      case 'pdfs':
      case 'materials':
        allowedTypes = ['application/pdf'];
        maxSize = 20971520; // 20MB for PDFs
        break;
      case 'answers':
        allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        maxSize = 10485760; // 10MB
        break;
      case 'images':
      case 'avatars':
        allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        maxSize = 5242880; // 5MB for images
        break;
      default:
        allowedTypes = [
          'application/pdf',
          'image/jpeg',
          'image/png',
          'video/mp4',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
    }

    // Validate file
    const validation = validateFile(file, allowedTypes, maxSize);
    if (!validation.valid) {
      return errorResponse(validation.error || 'File validation failed', 400);
    }

    // Upload file
    const result = await uploadFile(file, folder);

    return successResponse(result, 'File uploaded successfully', 201);
  } catch (error: any) {
    console.error('Upload error:', error);
    return errorResponse('An error occurred while uploading file', 500);
  }
}

