import { NextResponse } from 'next/server';
import { GridFSBucket, ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { Readable } from 'stream';

export async function GET(
  request: Request,
  { params }: { params: { fileId: string } }
) {
  try {
    const conn = mongoose.connection;
    const bucket = new GridFSBucket(conn.db, {
      bucketName: 'uploads',
    });

    const fileId = new ObjectId(params.fileId);
    const file = await bucket.find({ _id: fileId }).next();

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'File not found' },
        { status: 404 }
      );
    }

    const downloadStream = bucket.openDownloadStream(fileId);
    const chunks: Buffer[] = [];

    return new Promise((resolve, reject) => {
      downloadStream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      downloadStream.on('error', (error) => {
        console.error('Error streaming file:', error);
        reject(error);
      });
      downloadStream.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve(
          new NextResponse(buffer, {
            headers: {
              'Content-Type': file.contentType || 'application/octet-stream',
              'Content-Disposition': `inline; filename="${file.filename}"`,
            },
          })
        );
      });
    });
  } catch (error) {
    console.error('File retrieval error:', error);
    return NextResponse.json(
      { success: false, message: 'Error retrieving file' },
      { status: 500 }
    );
  }
}
