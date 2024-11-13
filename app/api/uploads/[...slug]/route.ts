// src/app/api/uploads/[...slug]/route.ts
import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  try {
    const filePath = path.join(
      process.cwd(),
      'public',
      'uploads',
      ...params.slug
    );

    const file = await readFile(filePath);

    // Determine content type based on file extension
    const extension = path.extname(filePath).toLowerCase();
    let contentType = 'application/octet-stream';

    switch (extension) {
      case '.pdf':
        contentType = 'application/pdf';
        break;
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.doc':
      case '.docx':
        contentType = 'application/msword';
        break;
    }

    return new NextResponse(file, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
