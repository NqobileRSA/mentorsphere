import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongobd';
import Student from '@/lib/models/Student';
import { saveFile, validateFile, validateFileSize } from '@/utils/uploadUtils';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const paymentProof = formData.get('paymentProof') as File;

    // Validate file
    if (!validateFile(paymentProof, ['pdf', 'jpg', 'jpeg', 'png'])) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed types: PDF, JPG, PNG' },
        { status: 400 }
      );
    }

    // Validate file size
    if (!validateFileSize(paymentProof)) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    // Save file locally
    const fileUrl = await saveFile(paymentProof, 'payment');

    // Create student record
    const studentData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      educationLevel: formData.get('educationLevel'),
      selectedCourse: formData.get('selectedCourse'),
      paymentProofUrl: fileUrl,
    };

    const student = await Student.create(studentData);

    return NextResponse.json({
      success: true,
      student,
    });
  } catch (error: any) {
    console.error('Student registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
