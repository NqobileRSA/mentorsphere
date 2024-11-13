import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

// Ensure upload directories exist
async function ensureUploadDirs() {
  const dirs = ['./public/uploads/qualifications', './public/uploads/payments'];

  for (const dir of dirs) {
    await mkdir(dir, { recursive: true });
  }
}

export async function saveFile(
  file: File,
  type: 'qualification' | 'payment'
): Promise<string> {
  await ensureUploadDirs();

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const fileHash = crypto.randomBytes(16).toString('hex');
  const extension = file.name.split('.').pop();
  const fileName = `${fileHash}.${extension}`;

  const directory = type === 'qualification' ? 'qualifications' : 'payments';

  const filePath = path.join('public', 'uploads', directory, fileName);

  await writeFile(filePath, fileBuffer);

  // Return the URL path that will be used to access the file
  return `/uploads/${directory}/${fileName}`;
}

export function validateFile(file: File, allowedTypes: string[]): boolean {
  if (!file) return false;
  const extension = file.name.split('.').pop()?.toLowerCase();
  return extension ? allowedTypes.includes(extension) : false;
}

// Helper to get file size in MB
export function getFileSizeInMB(file: File): number {
  return file.size / (1024 * 1024);
}

// Validate file size (default max: 5MB)
export function validateFileSize(file: File, maxSizeMB: number = 5): boolean {
  return getFileSizeInMB(file) <= maxSizeMB;
}
