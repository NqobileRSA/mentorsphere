// models/Student.ts
const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  educationLevel: { type: String, required: true },
  selectedCourse: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  assignedTutor: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor' },
  paymentProof: { type: String, required: true }, // Store file path/URL
  paymentStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Student =
  mongoose.models.Student || mongoose.model('Student', studentSchema);
