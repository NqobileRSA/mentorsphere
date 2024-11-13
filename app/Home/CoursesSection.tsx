'use client';
import React, { useState, useEffect } from 'react';
import { Search, Clock, Users, Star, Filter, ChevronRight } from 'lucide-react';
import AOS from 'aos';

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
  tutor: {
    name: string;
    image: string;
  };
}

interface FilterOptions {
  subjects: string[];
  nqfLevels: number[];
  priceRanges: string[];
}

const CoursesSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedPrice, setSelectedPrice] = useState('All Prices');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out',
    });
  }, []);

  const filterOptions: FilterOptions = {
    subjects: [
      'All Subjects',
      'Web Development',
      'Cybersecurity',
      'Data Science',
      'Cloud Computing',
      'Software Engineering',
    ],
    nqfLevels: [5, 6, 7, 8],
    priceRanges: ['All Prices', 'Under R5000', 'R5000 - R10000', 'Over R10000'],
  };

  // Sample courses data (unchanged)
  const courses: Course[] = [
    {
      id: '1',
      title: 'Full Stack Web Development with React & Node.js',
      subject: 'Web Development',
      nqfLevel: 6,
      rating: 4.8,
      reviews: 328,
      students: 2450,
      duration: '16 weeks',
      image: '/courses/webdev.jpg',
      price: 8999,
      tutor: {
        name: 'David van der Merwe',
        image: '/teacher/thumb-teacher-1.jpg',
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
      image: '/courses/hacking.jpg',
      price: 12999,
      tutor: {
        name: 'Themba Nkosi',
        image: '/teacher/thumb-teacher-2.jpg',
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
      image: '/courses/data.jpg',
      price: 15999,
      tutor: {
        name: 'Dr. Sarah Botha',
        image: '/teacher/thumb-teacher-3.jpg',
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
      image: '/courses/aws.jpg',
      price: 13999,
      tutor: {
        name: 'Jayden Naidoo',
        image: '/teacher/thumb-teacher-1.jpg',
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
      image: '/courses/mobiledev.jpg',
      price: 9999,
      tutor: {
        name: 'Lisa Parker',
        image: '/teacher/thumb-teacher-2.jpg',
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
      image: '/courses/cyber.jpg',
      price: 16999,
      tutor: {
        name: 'Prof. Ahmed Patel',
        image: '/teacher/thumb-teacher-3.jpg',
      },
    },
  ];

  const FilterButton = ({
    options,
    selected,
    onChange,
    label,
  }: {
    options: string[] | number[];
    selected: string;
    onChange: (value: string) => void;
    label: string;
  }) => (
    <div
      className="flex flex-col space-y-2"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800"
      >
        <option value="All Levels">All Levels</option>
        {options.map((option) => (
          <option key={option.toString()} value={option.toString()}>
            {label === 'NQF Level' ? `NQF Level ${option}` : option}
          </option>
        ))}
      </select>
    </div>
  );

  const CourseCard = ({ course, index }: { course: Course; index: number }) => (
    <div
      data-aos="fade-up"
      data-aos-delay={100 * (index + 1)}
      className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md hover:scale-105"
    >
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

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-slate-800">
            NQF Level {course.nqfLevel}
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
          <span className="text-2xl font-bold text-slate-800">
            R{course.price.toLocaleString()}
          </span>
          <button className="group flex items-center rounded-lg bg-slate-800 px-4 py-2 text-white transition-all hover:bg-slate-800">
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
        <div className="mb-12 text-center" data-aos="fade-up">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
            Explore Our IT Courses
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Level up your tech career with our industry-aligned IT courses. From
            web development to cybersecurity, we offer NQF-accredited programs
            taught by industry experts.
          </p>
        </div>

        <div className="mb-8" data-aos="fade-up" data-aos-delay="50">
          <div className="mb-6 flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="relative flex-1 lg:max-w-xl">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search IT courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 shadow-sm focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 lg:ml-4"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="mb-6 grid gap-4 rounded-lg border bg-white p-6 shadow-sm lg:grid-cols-3">
              <FilterButton
                options={filterOptions.subjects}
                selected={selectedSubject}
                onChange={setSelectedSubject}
                label="Subject"
              />
              <FilterButton
                options={filterOptions.nqfLevels}
                selected={selectedLevel}
                onChange={setSelectedLevel}
                label="NQF Level"
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

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
