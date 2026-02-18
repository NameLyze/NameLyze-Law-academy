import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const USE_S3 = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY;

// Initialize S3 client if credentials are available
const s3Client = USE_S3
  ? new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    })
  : null;

const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'exam-tracker-files';
const UPLOAD_DIR = process.env.UPLOAD_DIR || './public/uploads';

export interface UploadResult {
  url: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

/**
 * Upload file to S3 or local storage
 */
export async function uploadFile(
  file: File,
  folder: string = 'general'
): Promise<UploadResult> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${folder}/${uuidv4()}-${file.name}`;
  const fileSize = buffer.length;
  const mimeType = file.type;

  if (USE_S3 && s3Client) {
    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: mimeType,
    });

    await s3Client.send(command);

    return {
      url: `https://${BUCKET_NAME}.s3.amazonaws.com/${fileName}`,
      fileName,
      fileSize,
      mimeType,
    };
  } else {
    // Upload to local storage
    const uploadPath = path.join(process.cwd(), UPLOAD_DIR, folder);
    
    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const filePath = path.join(uploadPath, `${uuidv4()}-${file.name}`);
    fs.writeFileSync(filePath, buffer);

    return {
      url: `/uploads/${folder}/${path.basename(filePath)}`,
      fileName: path.basename(filePath),
      fileSize,
      mimeType,
    };
  }
}

/**
 * Upload file from buffer
 */
export async function uploadFromBuffer(
  buffer: Buffer,
  fileName: string,
  mimeType: string,
  folder: string = 'general'
): Promise<UploadResult> {
  const fullFileName = `${folder}/${uuidv4()}-${fileName}`;
  const fileSize = buffer.length;

  if (USE_S3 && s3Client) {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fullFileName,
      Body: buffer,
      ContentType: mimeType,
    });

    await s3Client.send(command);

    return {
      url: `https://${BUCKET_NAME}.s3.amazonaws.com/${fullFileName}`,
      fileName: fullFileName,
      fileSize,
      mimeType,
    };
  } else {
    const uploadPath = path.join(process.cwd(), UPLOAD_DIR, folder);
    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const filePath = path.join(uploadPath, `${uuidv4()}-${fileName}`);
    fs.writeFileSync(filePath, buffer);

    return {
      url: `/uploads/${folder}/${path.basename(filePath)}`,
      fileName: path.basename(filePath),
      fileSize,
      mimeType,
    };
  }
}

/**
 * Validate file type and size
 */
export function validateFile(
  file: File,
  allowedTypes: string[],
  maxSize: number = 10485760 // 10MB default
): { valid: boolean; error?: string } {
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} not allowed. Allowed types: ${allowedTypes.join(', ')}`,
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size ${(file.size / 1024 / 1024).toFixed(2)}MB exceeds maximum ${(maxSize / 1024 / 1024).toFixed(2)}MB`,
    };
  }

  return { valid: true };
}
