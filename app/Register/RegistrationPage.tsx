'use client';
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  ChevronLeft,
  User,
  GraduationCap,
  CheckCircle,
} from 'lucide-react';

// Types
type UserType = 'tutor' | 'student' | null;

interface Tutor {
  name: string;
  image: string;
}

interface Course {
  id: string;
  title: string;
  subject: string;
  nqfLevel: number;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  image: string;
  price: number;
  tutor: Tutor;
}

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
    [key: string]: boolean;
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

const COURSES: Course[] = [
  {
    id: '1',
    title: 'Full Stack Web Development with React & Node.js',
    subject: 'Web Development',
    nqfLevel: 6,
    rating: 4.8,
    reviews: 328,
    students: 2450,
    duration: '16 weeks',
    image: '/api/placeholder/400/300',
    price: 8999,
    tutor: {
      name: 'David van der Merwe',
      image: '/api/placeholder/64/64',
    },
  },
  {
    id: '2',
    title: 'Certified Ethical Hacking & Penetration Testing',
    subject: 'Cybersecurity',
    nqfLevel: 7,
    rating: 4.9,
    reviews: 195,
    students: 1290,
    duration: '12 weeks',
    image: '/api/placeholder/400/300',
    price: 12999,
    tutor: {
      name: 'Themba Nkosi',
      image: '/api/placeholder/64/64',
    },
  },
  {
    id: '3',
    title: 'Data Science & Machine Learning with Python',
    subject: 'Data Science',
    nqfLevel: 8,
    rating: 4.7,
    reviews: 256,
    students: 1800,
    duration: '20 weeks',
    image: '/api/placeholder/400/300',
    price: 15999,
    tutor: {
      name: 'Dr. Sarah Botha',
      image: '/api/placeholder/64/64',
    },
  },
  {
    id: '4',
    title: 'AWS Cloud Architecture & DevOps',
    subject: 'Cloud Computing',
    nqfLevel: 7,
    rating: 4.8,
    reviews: 182,
    students: 1560,
    duration: '14 weeks',
    image: '/api/placeholder/400/300',
    price: 13999,
    tutor: {
      name: 'Jayden Naidoo',
      image: '/api/placeholder/64/64',
    },
  },
  {
    id: '5',
    title: 'Mobile App Development with Flutter & Firebase',
    subject: 'Software Engineering',
    nqfLevel: 6,
    rating: 4.6,
    reviews: 145,
    students: 980,
    duration: '12 weeks',
    image: '/api/placeholder/400/300',
    price: 9999,
    tutor: {
      name: 'Lisa Parker',
      image: '/api/placeholder/64/64',
    },
  },
  {
    id: '6',
    title: 'Advanced System Architecture & Network Security',
    subject: 'Cybersecurity',
    nqfLevel: 8,
    rating: 4.9,
    reviews: 167,
    students: 750,
    duration: '16 weeks',
    image: '/api/placeholder/400/300',
    price: 16999,
    tutor: {
      name: 'Prof. Ahmed Patel',
      image: '/api/placeholder/64/64',
    },
  },
];

const INITIAL_TUTOR_DATA: TutorFormData = {
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
};

const INITIAL_STUDENT_DATA: StudentFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  educationLevel: '',
  selectedCourse: '',
  paymentProof: null,
};

// Form Step Components
const PersonalInfoTutor = ({
  data,
  onChange,
}: {
  data: TutorFormData;
  onChange: (field: string, value: string) => void;
}) => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold">Personal Information</h3>
    <div className="grid gap-4 sm:grid-cols-2">
      <input
        type="text"
        placeholder="First Name"
        value={data.firstName}
        onChange={(e) => onChange('firstName', e.target.value)}
        className="rounded-lg border p-2"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={data.lastName}
        onChange={(e) => onChange('lastName', e.target.value)}
        className="rounded-lg border p-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={(e) => onChange('email', e.target.value)}
        className="rounded-lg border p-2"
      />
      <input
        type="tel"
        placeholder="Phone"
        value={data.phone}
        onChange={(e) => onChange('phone', e.target.value)}
        className="rounded-lg border p-2"
      />
    </div>
  </div>
);

const QualificationsTutor = ({
  data,
  onChange,
}: {
  data: TutorFormData;
  onChange: (field: string, value: string | File | null) => void;
}) => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold">Qualifications</h3>
    <textarea
      placeholder="Education Background"
      value={data.education}
      onChange={(e) => onChange('education', e.target.value)}
      className="w-full rounded-lg border p-2"
      rows={3}
    />
    <textarea
      placeholder="Teaching Experience"
      value={data.experience}
      onChange={(e) => onChange('experience', e.target.value)}
      className="w-full rounded-lg border p-2"
      rows={3}
    />
    <div className="rounded-lg border p-4">
      <p className="mb-2 font-medium">Upload Qualification Proof</p>
      <input
        type="file"
        onChange={(e) =>
          onChange('qualificationProof', e.target.files?.[0] || null)
        }
        className="w-full"
        accept=".pdf,.doc,.docx"
      />
    </div>
  </div>
);

const CourseSelectionTutor = ({
  data,
  onChange,
}: {
  data: TutorFormData;
  onChange: (field: string, value: string[]) => void;
}) => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold">Course Selection</h3>
    <div className="space-y-4">
      {COURSES.map((course) => (
        <label
          key={course.id}
          className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-gray-50"
        >
          <input
            type="checkbox"
            checked={data.selectedCourses.includes(course.id)}
            onChange={(e) => {
              const newSelected = e.target.checked
                ? [...data.selectedCourses, course.id]
                : data.selectedCourses.filter((id) => id !== course.id);
              onChange('selectedCourses', newSelected);
            }}
            className="mt-1 h-4 w-4 rounded border-gray-300"
          />
          <div className="flex-1">
            <span className="font-medium">{course.title}</span>
            <div className="mt-1 text-sm text-gray-600">
              <p>Subject: {course.subject}</p>
              <p>NQF Level: {course.nqfLevel}</p>
              <p>Duration: {course.duration}</p>
            </div>
          </div>
        </label>
      ))}
    </div>
  </div>
);

const AvailabilityTutor = ({
  data,
  onChange,
}: {
  data: TutorFormData;
  onChange: (field: string, value: { [key: string]: boolean }) => void;
}) => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold">Availability</h3>
    {Object.entries(data.availability).map(([day, checked]) => (
      <label key={day} className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            const newAvailability = {
              ...data.availability,
              [day]: e.target.checked,
            };
            onChange('availability', newAvailability);
          }}
          className="h-4 w-4 rounded border-gray-300"
        />
        <span className="capitalize">{day}</span>
      </label>
    ))}
  </div>
);

const TermsTutor = ({
  data,
  onChange,
}: {
  data: TutorFormData;
  onChange: (field: string, value: boolean) => void;
}) => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold">Terms & Conditions</h3>
    <div className="rounded-lg border p-4">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={data.backgroundCheck}
          onChange={(e) => onChange('backgroundCheck', e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        <span>
          I agree to undergo a background check and understand that my
          application is subject to approval
        </span>
      </label>
    </div>
  </div>
);

const PersonalInfoStudent = ({
  data,
  onChange,
}: {
  data: StudentFormData;
  onChange: (field: string, value: string) => void;
}) => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold">Personal Information</h3>
    <div className="grid gap-4 sm:grid-cols-2">
      <input
        type="text"
        placeholder="First Name"
        value={data.firstName}
        onChange={(e) => onChange('firstName', e.target.value)}
        className="rounded-lg border p-2"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={data.lastName}
        onChange={(e) => onChange('lastName', e.target.value)}
        className="rounded-lg border p-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={(e) => onChange('email', e.target.value)}
        className="rounded-lg border p-2"
      />
      <input
        type="tel"
        placeholder="Phone"
        value={data.phone}
        onChange={(e) => onChange('phone', e.target.value)}
        className="rounded-lg border p-2"
      />
    </div>
  </div>
);

const CourseSelectionStudent = ({
  data,
  onChange,
}: {
  data: StudentFormData;
  onChange: (field: string, value: string) => void;
}) => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold">Course Selection</h3>
    <div className="space-y-4">
      {COURSES.map((course) => (
        <label
          key={course.id}
          className={`flex cursor-pointer items-start space-x-3 rounded-lg border p-4 ${
            data.selectedCourse === course.id
              ? 'border-blue-500 bg-blue-50'
              : 'hover:bg-gray-50'
          }`}
        >
          <input
            type="radio"
            name="course"
            value={course.id}
            checked={data.selectedCourse === course.id}
            onChange={(e) => onChange('selectedCourse', e.target.value)}
            className="mt-1 h-4 w-4 border-gray-300"
          />
          <div className="flex-1">
            <div className="flex justify-between">
              <span className="font-medium">{course.title}</span>
              <span className="font-semibold">
                R{course.price.toLocaleString()}
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-600">
              <p>Subject: {course.subject}</p>
              <p>NQF Level: {course.nqfLevel}</p>
              <p>Duration: {course.duration}</p>
              <p>Tutor: {course.tutor.name}</p>
              <p>
                Rating: {course.rating}/5 ({course.reviews} reviews)
              </p>
            </div>
          </div>
        </label>
      ))}
    </div>
    <select
      value={data.educationLevel}
      onChange={(e) => onChange('educationLevel', e.target.value)}
      className="mt-4 w-full rounded-lg border p-2"
    >
      <option value="">Select your education level</option>
      <option value="high_school">High School</option>
      <option value="undergraduate">Undergraduate</option>
      <option value="graduate">Graduate</option>
      <option value="other">Other</option>
    </select>
  </div>
);

const PaymentStudent = ({
  data,
  onChange,
}: {
  data: StudentFormData;
  onChange: (field: string, value: File | null) => void;
}) => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold">Payment Confirmation</h3>
    <div className="rounded-lg border p-4">
      <p className="mb-4 text-gray-600">
        Please upload proof of payment for the selected course.
      </p>
      <input
        type="file"
        onChange={(e) => onChange('paymentProof', e.target.files?.[0] || null)}
        className="w-full"
        accept=".pdf,.jpg,.jpeg,.png"
      />
    </div>
  </div>
);

export default function RegistrationPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [tutorFormData, setTutorFormData] =
    useState<TutorFormData>(INITIAL_TUTOR_DATA);
  const [studentFormData, setStudentFormData] =
    useState<StudentFormData>(INITIAL_STUDENT_DATA);

  const handleTutorChange = useCallback((field: string, value: any) => {
    setTutorFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleStudentChange = useCallback((field: string, value: any) => {
    setStudentFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleTutorSubmit = async () => {
    setIsSubmitting(true);
    setFormError('');

    try {
      const formData = new FormData();

      // Add all regular fields
      Object.entries(tutorFormData).forEach(([key, value]) => {
        if (key === 'qualificationProof') {
          // Handle file separately
          if (value) {
            formData.append('qualificationProof', value);
          }
        } else if (key === 'selectedCourses' || key === 'availability') {
          // Convert arrays and objects to JSON strings
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      });

      const response = await fetch('/api/register/tutor', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Failed to submit tutor application'
        );
      }

      const data = await response.json();
      setSubmitSuccess(true);
    } catch (error: any) {
      setFormError(
        error.message || 'An error occurred while submitting the application'
      );
      console.error('Tutor registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStudentSubmit = async () => {
    setIsSubmitting(true);
    setFormError('');

    try {
      const formData = new FormData();

      // Add all regular fields
      Object.entries(studentFormData).forEach(([key, value]) => {
        if (key === 'paymentProof') {
          // Handle file separately
          if (value) {
            formData.append('paymentProof', value);
          }
        } else {
          formData.append(key, String(value));
        }
      });

      const response = await fetch('/api/register/student', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Failed to complete student registration'
        );
      }

      const data = await response.json();
      setSubmitSuccess(true);
    } catch (error: any) {
      setFormError(
        error.message || 'An error occurred while completing registration'
      );
      console.error('Student registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTutorForm = () => {
    const steps = [
      <PersonalInfoTutor
        key="personal"
        data={tutorFormData}
        onChange={handleTutorChange}
      />,
      <QualificationsTutor
        key="qualifications"
        data={tutorFormData}
        onChange={handleTutorChange}
      />,
      <CourseSelectionTutor
        key="courses"
        data={tutorFormData}
        onChange={handleTutorChange}
      />,
      <AvailabilityTutor
        key="availability"
        data={tutorFormData}
        onChange={handleTutorChange}
      />,
      <TermsTutor
        key="terms"
        data={tutorFormData}
        onChange={handleTutorChange}
      />,
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

  const renderStudentForm = () => {
    const steps = [
      <PersonalInfoStudent
        key="personal"
        data={studentFormData}
        onChange={handleStudentChange}
      />,
      <CourseSelectionStudent
        key="course"
        data={studentFormData}
        onChange={handleStudentChange}
      />,
      <PaymentStudent
        key="payment"
        data={studentFormData}
        onChange={handleStudentChange}
      />,
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

  const UserTypeSelection = () => (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">
        Choose Registration Type
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <button
          onClick={() => {
            setUserType('student');
            setCurrentStep(1);
            setFormError('');
          }}
          className="flex flex-col items-center rounded-xl border-2 border-gray-200 p-6 text-center transition-all hover:border-blue-600 hover:bg-blue-50"
        >
          <User className="mb-4 h-12 w-12 text-blue-600" />
          <h3 className="text-lg font-semibold">Student</h3>
          <p className="mt-2 text-sm text-gray-600">
            Register as a student to enroll in courses
          </p>
        </button>
        <button
          onClick={() => {
            setUserType('tutor');
            setCurrentStep(1);
            setFormError('');
          }}
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
          {formError && (
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600">
              {formError}
            </div>
          )}

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
                  {Array.from({
                    length: userType === 'tutor' ? 5 : 3,
                  }).map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 flex-1 rounded-full ${
                        index + 1 <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {userType === 'tutor' ? renderTutorForm() : renderStudentForm()}
            </div>
          )}

          {submitSuccess && <SuccessMessage />}
        </div>
      </div>
    </div>
  );
}
