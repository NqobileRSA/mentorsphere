// src/lib/models/Tutor.ts
import mongoose from 'mongoose';

const TutorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  education: { type: String, required: true },
  experience: { type: String, required: true },
  qualificationProofUrl: { type: String, required: true },
  selectedCourses: [{ type: String }],
  availability: {
    monday: Boolean,
    tuesday: Boolean,
    wednesday: Boolean,
    thursday: Boolean,
    friday: Boolean,
    saturday: Boolean,
    sunday: Boolean,
  },
  backgroundCheck: { type: Boolean, required: true },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'approved', 'rejected'],
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Tutor || mongoose.model('Tutor', TutorSchema);
