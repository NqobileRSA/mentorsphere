// src/app/api/register/tutor/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongobd';
import Tutor from '@/lib/models/Tutors';
import { saveFile, validateFile, validateFileSize } from '@/utils/uploadUtils';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const qualificationProof = formData.get('qualificationProof') as File;

    // Validate file
    if (!validateFile(qualificationProof, ['pdf', 'doc', 'docx'])) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed types: PDF, DOC, DOCX' },
        { status: 400 }
      );
    }

    // Validate file size
    if (!validateFileSize(qualificationProof)) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    // Save file locally
    const fileUrl = await saveFile(qualificationProof, 'qualification');

    // Parse JSON strings back to objects
    const availability = JSON.parse(formData.get('availability') as string);
    const selectedCourses = JSON.parse(
      formData.get('selectedCourses') as string
    );

    // Create tutor record
    const tutorData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      education: formData.get('education'),
      experience: formData.get('experience'),
      qualificationProofUrl: fileUrl,
      selectedCourses,
      availability,
      backgroundCheck: formData.get('backgroundCheck') === 'true',
    };

    const tutor = await Tutor.create(tutorData);

    return NextResponse.json({
      success: true,
      tutor,
    });
  } catch (error: any) {
    console.error('Tutor registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
