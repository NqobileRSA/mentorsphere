'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  ChevronLeft,
  User,
  GraduationCap,
  CheckCircle,
} from 'lucide-react';

// Types for form data
interface TutorFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  education: string;
  experience: string;
  qualificationProof: File | null;
  selectedCourses: string[];
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  backgroundCheck: boolean;
}

interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  educationLevel: string;
  selectedCourse: string;
  paymentProof: File | null;
}

// Sample course data (in production, fetch from MongoDB)
const SAMPLE_COURSES = [
  {
    id: '1',
    title: 'Advanced Calculus',
    subject: 'Mathematics',
    level: 'Advanced',
    price: 89.99,
  },
  {
    id: '2',
    title: 'Physics Fundamentals',
    subject: 'Science',
    level: 'Beginner',
    price: 69.99,
  },
  {
    id: '3',
    title: 'Creative Writing',
    subject: 'English',
    level: 'Intermediate',
    price: 79.99,
  },
];

const RegistrationPage = () => {
  const router = useRouter();
  const [userType, setUserType] = useState<'tutor' | 'student' | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [tutorFormData, setTutorFormData] = useState<TutorFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    qualificationProof: null,
    selectedCourses: [],
    availability: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    backgroundCheck: false,
  });

  const [studentFormData, setStudentFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    educationLevel: '',
    selectedCourse: '',
    paymentProof: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleTutorSubmit = async () => {
    setIsSubmitting(true);
    try {
      // In production, replace with actual API endpoint
      const formData = new FormData();
      Object.entries(tutorFormData).forEach(([key, value]) => {
        if (key === 'qualificationProof' && value) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });

      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting tutor form:', error);
    }
    setIsSubmitting(false);
  };

  const handleStudentSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(studentFormData).forEach(([key, value]) => {
        if (key === 'paymentProof' && value) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });

      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting student form:', error);
    }
    setIsSubmitting(false);
  };

  const UserTypeSelection = () => (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">
        Choose Registration Type
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <button
          onClick={() => setUserType('student')}
          className="flex flex-col items-center rounded-xl border-2 border-gray-200 p-6 text-center transition-all hover:border-blue-600 hover:bg-blue-50"
        >
          <User className="mb-4 h-12 w-12 text-blue-600" />
          <h3 className="text-lg font-semibold">Student</h3>
          <p className="mt-2 text-sm text-gray-600">
            Register as a student to enroll in courses
          </p>
        </button>
        <button
          onClick={() => setUserType('tutor')}
          className="flex flex-col items-center rounded-xl border-2 border-gray-200 p-6 text-center transition-all hover:border-blue-600 hover:bg-blue-50"
        >
          <GraduationCap className="mb-4 h-12 w-12 text-blue-600" />
          <h3 className="text-lg font-semibold">Tutor</h3>
          <p className="mt-2 text-sm text-gray-600">
            Register as a tutor to teach courses
          </p>
        </button>
      </div>
    </div>
  );

  const TutorForm = () => {
    const steps = [
      // Step 1: Personal Information
      <div key="personal" className="space-y-4">
        <h3 className="text-xl font-semibold">Personal Information</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="First Name"
            value={tutorFormData.firstName}
            onChange={(e) =>
              setTutorFormData((prev) => ({
                ...prev,
                firstName: e.target.value,
              }))
            }
            className="rounded-lg border p-2"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={tutorFormData.lastName}
            onChange={(e) =>
              setTutorFormData((prev) => ({
                ...prev,
                lastName: e.target.value,
              }))
            }
            className="rounded-lg border p-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={tutorFormData.email}
            onChange={(e) =>
              setTutorFormData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            className="rounded-lg border p-2"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={tutorFormData.phone}
            onChange={(e) =>
              setTutorFormData((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
            className="rounded-lg border p-2"
          />
        </div>
      </div>,

      // Step 2: Qualifications
      <div key="qualifications" className="space-y-4">
        <h3 className="text-xl font-semibold">Qualifications</h3>
        <textarea
          placeholder="Education Background"
          value={tutorFormData.education}
          onChange={(e) =>
            setTutorFormData((prev) => ({
              ...prev,
              education: e.target.value,
            }))
          }
          className="w-full rounded-lg border p-2"
          rows={3}
        />
        <textarea
          placeholder="Teaching Experience"
          value={tutorFormData.experience}
          onChange={(e) =>
            setTutorFormData((prev) => ({
              ...prev,
              experience: e.target.value,
            }))
          }
          className="w-full rounded-lg border p-2"
          rows={3}
        />
        <div className="rounded-lg border p-4">
          <p className="mb-2 font-medium">Upload Qualification Proof</p>
          <input
            type="file"
            onChange={(e) =>
              setTutorFormData((prev) => ({
                ...prev,
                qualificationProof: e.target.files?.[0] || null,
              }))
            }
            className="w-full"
            accept=".pdf,.doc,.docx"
          />
        </div>
      </div>,

      // Step 3: Course Selection
      <div key="courses" className="space-y-4">
        <h3 className="text-xl font-semibold">Course Selection</h3>
        <div className="space-y-2">
          {SAMPLE_COURSES.map((course) => (
            <label key={course.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={tutorFormData.selectedCourses.includes(course.id)}
                onChange={(e) => {
                  const newSelected = e.target.checked
                    ? [...tutorFormData.selectedCourses, course.id]
                    : tutorFormData.selectedCourses.filter(
                        (id) => id !== course.id
                      );
                  setTutorFormData((prev) => ({
                    ...prev,
                    selectedCourses: newSelected,
                  }));
                }}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span>
                {course.title} - {course.level}
              </span>
            </label>
          ))}
        </div>
      </div>,

      // Step 4: Availability
      <div key="availability" className="space-y-4">
        <h3 className="text-xl font-semibold">Availability</h3>
        {Object.entries(tutorFormData.availability).map(([day, checked]) => (
          <label key={day} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) =>
                setTutorFormData((prev) => ({
                  ...prev,
                  availability: {
                    ...prev.availability,
                    [day]: e.target.checked,
                  },
                }))
              }
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="capitalize">{day}</span>
          </label>
        ))}
      </div>,

      // Step 5: Terms and Background Check
      <div key="terms" className="space-y-4">
        <h3 className="text-xl font-semibold">Terms & Conditions</h3>
        <div className="rounded-lg border p-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={tutorFormData.backgroundCheck}
              onChange={(e) =>
                setTutorFormData((prev) => ({
                  ...prev,
                  backgroundCheck: e.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-gray-300"
            />
            <span>
              I agree to undergo a background check and understand that my
              application is subject to approval
            </span>
          </label>
        </div>
      </div>,
    ];

    return (
      <div>
        {steps[currentStep - 1]}
        <div className="mt-8 flex justify-between">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="flex items-center rounded-lg border px-4 py-2 text-gray-600 hover:bg-gray-50"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </button>
          )}
          {currentStep < steps.length ? (
            <button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="ml-auto flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleTutorSubmit}
              disabled={isSubmitting}
              className="ml-auto flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  };

  const StudentForm = () => {
    const steps = [
      // Step 1: Personal Information
      <div key="personal" className="space-y-4">
        <h3 className="text-xl font-semibold">Personal Information</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="First Name"
            value={studentFormData.firstName}
            onChange={(e) =>
              setStudentFormData((prev) => ({
                ...prev,
                firstName: e.target.value,
              }))
            }
            className="rounded-lg border p-2"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={studentFormData.lastName}
            onChange={(e) =>
              setStudentFormData((prev) => ({
                ...prev,
                lastName: e.target.value,
              }))
            }
            className="rounded-lg border p-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={studentFormData.email}
            onChange={(e) =>
              setStudentFormData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            className="rounded-lg border p-2"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={studentFormData.phone}
            onChange={(e) =>
              setStudentFormData((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
            className="rounded-lg border p-2"
          />
        </div>
      </div>,

      // Step 2: Course Selection
      <div key="course" className="space-y-4">
        <h3 className="text-xl font-semibold">Course Selection</h3>
        <select
          value={studentFormData.selectedCourse}
          onChange={(e) =>
            setStudentFormData((prev) => ({
              ...prev,
              selectedCourse: e.target.value,
            }))
          }
          className="w-full rounded-lg border p-2"
        >
          <option value="">Select a course</option>
          {SAMPLE_COURSES.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title} - {course.level} (${course.price})
            </option>
          ))}
        </select>
        <select
          value={studentFormData.educationLevel}
          onChange={(e) =>
            setStudentFormData((prev) => ({
              ...prev,
              educationLevel: e.target.value,
            }))
          }
          className="w-full rounded-lg border p-2"
        >
          <option value="">Select your education level</option>
          <option value="high_school">High School</option>
          <option value="undergraduate">Undergraduate</option>
          <option value="graduate">Graduate</option>
          <option value="other">Other</option>
        </select>
      </div>,

      // Step 3: Payment
      <div key="payment" className="space-y-4">
        <h3 className="text-xl font-semibold">Payment Confirmation</h3>
        <div className="rounded-lg border p-4">
          <p className="mb-4 text-gray-600">
            Please upload proof of payment for the selected course. Accepted
            formats: .pdf, .jpg, .png
          </p>
          <input
            type="file"
            onChange={(e) =>
              setStudentFormData((prev) => ({
                ...prev,
                paymentProof: e.target.files?.[0] || null,
              }))
            }
            className="w-full"
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
      </div>,
    ];

    return (
      <div>
        {steps[currentStep - 1]}
        <div className="mt-8 flex justify-between">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="flex items-center rounded-lg border px-4 py-2 text-gray-600 hover:bg-gray-50"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </button>
          )}
          {currentStep < steps.length ? (
            <button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="ml-auto flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleStudentSubmit}
              disabled={isSubmitting}
              className="ml-auto flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isSubmitting ? 'Submitting...' : 'Complete Registration'}
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  };

  const SuccessMessage = () => (
    <div className="text-center">
      <div className="mb-4 flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-600" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-gray-900">
        {userType === 'tutor'
          ? 'Application Submitted Successfully!'
          : 'Registration Complete!'}
      </h2>
      <p className="mb-6 text-gray-600">
        {userType === 'tutor'
          ? 'We will review your application and contact you soon for the next steps.'
          : 'You have been successfully enrolled in the course. You will receive an email with further instructions.'}
      </p>
      <button
        onClick={() => router.push('/')}
        className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
      >
        Return to Home
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          {!userType && !submitSuccess && <UserTypeSelection />}

          {userType && !submitSuccess && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  {userType === 'tutor'
                    ? 'Tutor Application'
                    : 'Student Registration'}
                </h1>
                <div className="mt-4 flex space-x-4">
                  {Array.from({ length: userType === 'tutor' ? 5 : 3 }).map(
                    (_, index) => (
                      <div
                        key={index}
                        className={`h-2 flex-1 rounded-full ${
                          index + 1 <= currentStep
                            ? 'bg-blue-600'
                            : 'bg-gray-200'
                        }`}
                      />
                    )
                  )}
                </div>
              </div>

              {userType === 'tutor' ? <TutorForm /> : <StudentForm />}
            </div>
          )}

          {submitSuccess && <SuccessMessage />}
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
