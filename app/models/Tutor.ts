// models/Tutor.ts
import mongoose from 'mongoose';

const tutorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  education: { type: String, required: true },
  experience: { type: String, required: true },
  qualificationProof: { type: String, required: true }, // Store file path/URL
  selectedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  availability: {
    monday: Boolean,
    tuesday: Boolean,
    wednesday: Boolean,
    thursday: Boolean,
    friday: Boolean,
    saturday: Boolean,
    sunday: Boolean,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  backgroundCheckStatus: {
    type: String,
    enum: ['pending', 'passed', 'failed'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Tutor =
  mongoose.models.Tutor || mongoose.model('Tutor', tutorSchema);
