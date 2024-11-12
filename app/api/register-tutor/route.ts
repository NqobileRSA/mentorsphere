import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Tutor } from '@/models/Tutor';
import { parseForm, uploadToGridFS } from '@/utils/fileUpload';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const formData = await parseForm(req);
    const { fields, files } = formData as any;

    // Upload qualification proof to GridFS
    const qualificationProofUrl = await uploadToGridFS(
      files.qualificationProof,
      'tutor-qualifications'
    );

    const tutorData = {
      ...fields,
      qualificationProof: qualificationProofUrl,
      selectedCourses: JSON.parse(fields.selectedCourses),
      availability: JSON.parse(fields.availability),
    };

    const tutor = await Tutor.create(tutorData);

    return NextResponse.json({
      success: true,
      message: 'Tutor registration successful',
      data: tutor,
    });
  } catch (error: any) {
    console.error('Tutor registration error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
