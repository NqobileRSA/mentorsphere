// models/Course.ts
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  level: { type: String, required: true },
  price: { type: Number, required: true },
  tutors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tutor' }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Course =
  mongoose.models.Course || mongoose.model('Course', courseSchema);
