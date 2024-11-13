// src/lib/models/Student.ts
import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  educationLevel: { type: String, required: true },
  selectedCourse: { type: String, required: true },
  paymentProofUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'active', 'inactive'],
  },
});

export default mongoose.models.Student ||
  mongoose.model('Student', StudentSchema);
