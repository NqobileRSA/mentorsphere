import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Student } from '@/models/Student';
import { Course } from '@/models/Course';
import { Tutor } from '@/models/Tutor';
import { parseForm, uploadToGridFS } from '@/utils/fileUpload';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const formData = await parseForm(req);
    const { fields, files } = formData as any;

    // Upload payment proof to GridFS
    const paymentProofUrl = await uploadToGridFS(
      files.paymentProof,
      'student-payments'
    );

    // Find available tutor
    const availableTutor = await Tutor.findOne({
      selectedCourses: fields.selectedCourse,
      status: 'approved',
    }).sort({ createdAt: 1 });

    if (!availableTutor) {
      return NextResponse.json(
        { success: false, message: 'No tutors available for this course' },
        { status: 400 }
      );
    }

    const studentData = {
      ...fields,
      paymentProof: paymentProofUrl,
      assignedTutor: availableTutor._id,
    };

    const student = await Student.create(studentData);

    // Update course with new student
    await Course.findByIdAndUpdate(fields.selectedCourse, {
      $push: { students: student._id },
    });

    return NextResponse.json({
      success: true,
      message: 'Student registration successful',
      data: student,
    });
  } catch (error: any) {
    console.error('Student registration error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
