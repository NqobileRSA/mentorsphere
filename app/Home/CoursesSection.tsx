'use client';
import React, { useState } from 'react';
import {
  Search,
  GraduationCap,
  Clock,
  Users,
  Star,
  Filter,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  subject: string;
  level: string;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  image: string;
  price: number;
  tutor: {
    name: string;
    image: string;
  };
}

interface FilterOptions {
  subjects: string[];
  levels: string[];
  priceRanges: string[];
}

const CoursesSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedPrice, setSelectedPrice] = useState('All Prices');
  const [showFilters, setShowFilters] = useState(false);

  const filterOptions: FilterOptions = {
    subjects: [
      'All Subjects',
      'Mathematics',
      'Science',
      'English',
      'History',
      'Computer Science',
    ],
    levels: ['All Levels', 'Beginner', 'Intermediate', 'Advanced'],
    priceRanges: ['All Prices', 'Under $50', '$50 - $100', 'Over $100'],
  };

  // Sample courses data
  const courses: Course[] = [
    {
      id: '1',
      title: 'Advanced Calculus Mastery',
      subject: 'Mathematics',
      level: 'Advanced',
      rating: 4.8,
      reviews: 128,
      students: 1250,
      duration: '12 weeks',
      image: '/api/placeholder/400/300',
      price: 89.99,
      tutor: {
        name: 'Dr. Sarah Johnson',
        image: '/api/placeholder/64/64',
      },
    },
    {
      id: '2',
      title: 'Physics Fundamentals',
      subject: 'Science',
      level: 'Beginner',
      rating: 4.6,
      reviews: 95,
      students: 890,
      duration: '8 weeks',
      image: '/api/placeholder/400/300',
      price: 69.99,
      tutor: {
        name: 'Prof. Michael Chen',
        image: '/api/placeholder/64/64',
      },
    },
    {
      id: '3',
      title: 'Creative Writing Workshop',
      subject: 'English',
      level: 'Intermediate',
      rating: 4.9,
      reviews: 156,
      students: 1500,
      duration: '10 weeks',
      image: '/api/placeholder/400/300',
      price: 79.99,
      tutor: {
        name: 'Emily Roberts',
        image: '/api/placeholder/64/64',
      },
    },
    // Add more courses as needed
  ];

  const FilterButton = ({
    options,
    selected,
    onChange,
    label,
  }: {
    options: string[];
    selected: string;
    onChange: (value: string) => void;
    label: string;
  }) => (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  const CourseCard = ({ course }: { course: Course }) => (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md">
      {/* Course Image */}
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="h-48 w-full object-cover"
        />
        <div className="absolute bottom-4 left-4">
          <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm">
            {course.subject}
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
            {course.level}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">
              {course.rating} ({course.reviews})
            </span>
          </div>
        </div>

        <h3 className="mb-2 flex-1 text-xl font-bold text-gray-900">
          {course.title}
        </h3>

        <div className="mb-4 flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            {course.students} students
          </div>
        </div>

        {/* Tutor Info */}
        <div className="mb-4 flex items-center space-x-3">
          <img
            src={course.tutor.image}
            alt={course.tutor.name}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {course.tutor.name}
            </p>
            <p className="text-sm text-gray-600">Tutor</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-2xl font-bold text-blue-600">
            ${course.price}
          </span>
          <button className="group flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-700">
            Enroll Now
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
            Explore Our Courses
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Find the perfect tutor and course to help you master any subject.
            From mathematics to literature, we've got you covered.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="mb-6 flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            {/* Search Bar */}
            <div className="relative flex-1 lg:max-w-xl">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 lg:ml-4"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mb-6 grid gap-4 rounded-lg border bg-white p-6 shadow-sm lg:grid-cols-3">
              <FilterButton
                options={filterOptions.subjects}
                selected={selectedSubject}
                onChange={setSelectedSubject}
                label="Subject"
              />
              <FilterButton
                options={filterOptions.levels}
                selected={selectedLevel}
                onChange={setSelectedLevel}
                label="Level"
              />
              <FilterButton
                options={filterOptions.priceRanges}
                selected={selectedPrice}
                onChange={setSelectedPrice}
                label="Price Range"
              />
            </div>
          )}
        </div>

        {/* Course Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="group inline-flex items-center rounded-lg border-2 border-blue-600 px-6 py-3 font-semibold text-blue-600 transition-all hover:bg-blue-600 hover:text-white">
            Load More Courses
            <BookOpen className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
