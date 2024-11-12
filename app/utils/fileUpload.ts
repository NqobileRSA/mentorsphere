import { IncomingForm } from 'formidable';
import { mongo, GridFSBucket } from 'mongodb';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

export const uploadToGridFS = async (file: any, folder: string) => {
  const conn = mongoose.connection;
  const bucket = new GridFSBucket(conn.db, {
    bucketName: 'uploads',
  });

  const fileName = `${folder}/${Date.now()}-${file.originalFilename}`;
  const fileStream = fs.createReadStream(file.filepath);

  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(fileName, {
      contentType: file.mimetype,
      metadata: {
        folder: folder,
        originalName: file.originalFilename,
      },
    });

    fileStream
      .pipe(uploadStream)
      .on('error', (error) => {
        console.error('Error uploading to GridFS:', error);
        reject(error);
      })
      .on('finish', () => {
        // Generate URL-safe ID for file retrieval
        const fileId = uploadStream.id.toString();
        resolve(`/api/files/${fileId}`);
      });
  });
};

export const parseForm = async (req: any) => {
  const form = new IncomingForm();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};
