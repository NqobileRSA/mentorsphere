'use client';
import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Star,
  Clock,
  Users,
  BookOpen,
  GraduationCap,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CoursesPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    subject: 'All Subjects',
    level: 'All Levels',
    price: 'All Prices',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out',
    });
  }, []);

  const courseDetails = {
    'Full Stack Web Development': {
      overview:
        'Master both frontend and backend development with modern technologies including React, Node.js, and databases.',
      skills: [
        'HTML/CSS/JavaScript',
        'React & Redux',
        'Node.js & Express',
        'MongoDB',
        'RESTful APIs',
        'Git & DevOps',
      ],
      outcomes: [
        'Build full-stack web applications',
        'Implement secure user authentication',
        'Deploy applications to cloud platforms',
        'Work with databases and APIs',
      ],
      curriculum: [
        {
          title: 'Frontend Fundamentals',
          weeks: '4 weeks',
          topics: [
            'HTML5 & CSS3',
            'JavaScript ES6+',
            'Responsive Design',
            'Web Accessibility',
          ],
        },
        {
          title: 'React Development',
          weeks: '4 weeks',
          topics: [
            'React Fundamentals',
            'State Management',
            'Hooks & Context',
            'Performance Optimization',
          ],
        },
        {
          title: 'Backend Development',
          weeks: '4 weeks',
          topics: ['Node.js', 'Express', 'REST APIs', 'Database Design'],
        },
        {
          title: 'Full Stack Integration',
          weeks: '4 weeks',
          topics: ['Authentication', 'Deployment', 'Testing', 'Project Work'],
        },
      ],
    },
    'Ethical Hacking': {
      overview:
        'Learn advanced cybersecurity techniques and ethical hacking methodologies to protect organizations from cyber threats.',
      skills: [
        'Penetration Testing',
        'Network Security',
        'Vulnerability Assessment',
        'Security Tools',
        'Incident Response',
      ],
      outcomes: [
        'Conduct professional security audits',
        'Identify and exploit system vulnerabilities',
        'Implement security best practices',
        'Develop incident response plans',
      ],
      curriculum: [
        {
          title: 'Security Fundamentals',
          weeks: '3 weeks',
          topics: [
            'Network Basics',
            'Security Principles',
            'Linux Systems',
            'Information Gathering',
          ],
        },
        {
          title: 'Vulnerability Assessment',
          weeks: '3 weeks',
          topics: [
            'Scanning Techniques',
            'Vulnerability Analysis',
            'System Hacking',
            'Social Engineering',
          ],
        },
        {
          title: 'Advanced Exploitation',
          weeks: '3 weeks',
          topics: [
            'Wireless Attacks',
            'Web Applications',
            'Mobile Platforms',
            'IoT Security',
          ],
        },
        {
          title: 'Security Management',
          weeks: '3 weeks',
          topics: [
            'Incident Handling',
            'Report Writing',
            'Legal Framework',
            'Career Development',
          ],
        },
      ],
    },
    'Data Science': {
      overview:
        'Master data science techniques using Python, from statistical analysis to machine learning and AI applications.',
      skills: [
        'Python',
        'Machine Learning',
        'Statistical Analysis',
        'Data Visualization',
        'Deep Learning',
        'Big Data',
      ],
      outcomes: [
        'Build predictive models',
        'Analyze complex datasets',
        'Create data visualizations',
        'Deploy machine learning solutions',
      ],
      curriculum: [
        {
          title: 'Python for Data Science',
          weeks: '5 weeks',
          topics: [
            'Python Basics',
            'NumPy & Pandas',
            'Data Cleaning',
            'Exploratory Analysis',
          ],
        },
        {
          title: 'Statistical Learning',
          weeks: '5 weeks',
          topics: [
            'Probability',
            'Statistical Tests',
            'Regression Analysis',
            'Feature Engineering',
          ],
        },
        {
          title: 'Machine Learning',
          weeks: '5 weeks',
          topics: [
            'Supervised Learning',
            'Unsupervised Learning',
            'Model Evaluation',
            'Ensemble Methods',
          ],
        },
        {
          title: 'Advanced Topics',
          weeks: '5 weeks',
          topics: [
            'Deep Learning',
            'Natural Language Processing',
            'Computer Vision',
            'Project Portfolio',
          ],
        },
      ],
    },
    'Cloud Architecture': {
      overview:
        'Learn to design, implement and manage cloud infrastructure using AWS services and DevOps practices.',
      skills: [
        'AWS Services',
        'Infrastructure as Code',
        'Containerization',
        'CI/CD',
        'Cloud Security',
      ],
      outcomes: [
        'Design cloud architectures',
        'Implement DevOps pipelines',
        'Manage cloud infrastructure',
        'Optimize cloud costs',
      ],
      curriculum: [
        {
          title: 'Cloud Fundamentals',
          weeks: '3 weeks',
          topics: [
            'AWS Core Services',
            'Cloud Concepts',
            'IAM & Security',
            'Networking',
          ],
        },
        {
          title: 'Infrastructure as Code',
          weeks: '4 weeks',
          topics: [
            'Terraform',
            'CloudFormation',
            'Infrastructure Design',
            'Best Practices',
          ],
        },
        {
          title: 'DevOps Practices',
          weeks: '4 weeks',
          topics: ['Docker', 'Kubernetes', 'CI/CD Pipelines', 'Monitoring'],
        },
        {
          title: 'Advanced Architecture',
          weeks: '3 weeks',
          topics: [
            'Microservices',
            'Serverless',
            'High Availability',
            'Cost Optimization',
          ],
        },
      ],
    },
    'Mobile Development': {
      overview:
        'Build cross-platform mobile applications using Flutter and Firebase, learning modern app development practices.',
      skills: [
        'Flutter',
        'Dart',
        'Firebase',
        'State Management',
        'UI/UX Design',
        'App Publishing',
      ],
      outcomes: [
        'Create cross-platform apps',
        'Implement complex UI designs',
        'Integrate backend services',
        'Deploy to app stores',
      ],
      curriculum: [
        {
          title: 'Flutter Basics',
          weeks: '3 weeks',
          topics: [
            'Dart Programming',
            'Widget System',
            'Layouts',
            'Navigation',
          ],
        },
        {
          title: 'Advanced UI',
          weeks: '3 weeks',
          topics: [
            'Custom Widgets',
            'Animations',
            'Responsive Design',
            'State Management',
          ],
        },
        {
          title: 'Backend Integration',
          weeks: '3 weeks',
          topics: [
            'Firebase Setup',
            'Authentication',
            'Cloud Firestore',
            'Storage',
          ],
        },
        {
          title: 'Production & Deployment',
          weeks: '3 weeks',
          topics: [
            'Testing',
            'Performance',
            'App Store Guidelines',
            'Publishing',
          ],
        },
      ],
    },
    'System Architecture': {
      overview:
        'Master advanced system architecture principles and network security, focusing on enterprise-level solutions.',
      skills: [
        'System Design',
        'Network Security',
        'Enterprise Architecture',
        'Security Frameworks',
        'Risk Management',
      ],
      outcomes: [
        'Design secure systems',
        'Implement security frameworks',
        'Manage enterprise architecture',
        'Lead security initiatives',
      ],
      curriculum: [
        {
          title: 'Architecture Principles',
          weeks: '4 weeks',
          topics: [
            'Design Patterns',
            'Architectural Styles',
            'Quality Attributes',
            'Documentation',
          ],
        },
        {
          title: 'Security Architecture',
          weeks: '4 weeks',
          topics: [
            'Security Models',
            'Threat Modeling',
            'Access Control',
            'Cryptography',
          ],
        },
        {
          title: 'Enterprise Systems',
          weeks: '4 weeks',
          topics: [
            'Integration Patterns',
            'Scalability',
            'Performance',
            'Monitoring',
          ],
        },
        {
          title: 'Governance & Compliance',
          weeks: '4 weeks',
          topics: [
            'Risk Management',
            'Compliance Frameworks',
            'Audit Preparation',
            'Business Continuity',
          ],
        },
      ],
    },
  };

  const courses = [
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
        image: '/testimonial/avatar1.jpg',
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
        image: '/testimonial/avatar1.jpg',
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
        image: '/testimonial/avatar1.jpg',
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
        image: '/testimonial/avatar1.jpg',
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
        image: '/teacher/img-2.png',
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
        image: '/teacher/img-3.png',
      },
    },
  ];
  const getCourseDetails = (title) => {
    const titleMap = {
      'Full Stack Web Development with React & Node.js':
        'Full Stack Web Development',
      'Certified Ethical Hacking & Penetration Testing': 'Ethical Hacking',
      'Data Science & Machine Learning with Python': 'Data Science',
      'AWS Cloud Architecture & DevOps': 'Cloud Architecture',
      'Mobile App Development with Flutter & Firebase': 'Mobile Development',
      'Advanced System Architecture & Network Security': 'System Architecture',
    };
    return (
      courseDetails[titleMap[title]] ||
      courseDetails['Full Stack Web Development']
    );
  };

  const DetailCard = ({ title, children, delay = 0 }) => (
    <div
      className="mb-8 rounded-xl border bg-white p-6 shadow-sm"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <h3 className="mb-4 text-xl font-bold text-gray-900">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-slate-800 py-16">
        <div className="container mx-auto px-4">
          <h1
            className="mb-4 text-center text-4xl font-bold text-white lg:text-5xl"
            data-aos="fade-down"
          >
            Transform Your Career with Our IT Courses
          </h1>
          <p
            className="mx-auto mb-8 max-w-2xl text-center text-lg text-blue-100"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Industry-aligned, NQF-accredited courses designed to help you master
            the latest technologies and advance your career in tech.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Course Cards */}
          <div className="lg:col-span-2">
            {courses.map((course, index) => {
              const details = getCourseDetails(course.title);
              return (
                <div
                  key={course.id}
                  className="mb-8 overflow-hidden rounded-xl border bg-white shadow-sm"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-[450px] w-full object-cover"
                    data-aos="zoom-in"
                    data-aos-delay={index * 100 + 100}
                  />
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-slate-800">
                        NQF Level {course.nqfLevel}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                        <span className="text-sm font-medium text-gray-700">
                          {course.rating} ({course.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    <h2
                      className="mb-4 text-2xl font-bold text-gray-900"
                      data-aos="fade-up"
                      data-aos-delay={index * 100 + 200}
                    >
                      {course.title}
                    </h2>

                    <div className="mb-6 grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div
                        className="flex items-center"
                        data-aos="fade-right"
                        data-aos-delay={index * 100 + 300}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {course.duration}
                      </div>
                      <div
                        className="flex items-center"
                        data-aos="fade-left"
                        data-aos-delay={index * 100 + 300}
                      >
                        <Users className="mr-2 h-4 w-4" />
                        {course.students} students
                      </div>
                      <div
                        className="flex items-center"
                        data-aos="fade-right"
                        data-aos-delay={index * 100 + 400}
                      >
                        <GraduationCap className="mr-2 h-4 w-4" />
                        Professional Certificate
                      </div>
                      <div
                        className="flex items-center"
                        data-aos="fade-left"
                        data-aos-delay={index * 100 + 400}
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        Online Learning
                      </div>
                    </div>

                    <DetailCard
                      title="Course Overview"
                      delay={index * 100 + 500}
                    >
                      <p className="text-gray-600">{details.overview}</p>
                    </DetailCard>

                    <DetailCard
                      title="What You'll Learn"
                      delay={index * 100 + 600}
                    >
                      <div className="grid gap-3 sm:grid-cols-2">
                        {details.outcomes.map((outcome, outcomeIndex) => (
                          <div
                            key={outcomeIndex}
                            className="flex items-start space-x-2"
                            data-aos="fade-up"
                            data-aos-delay={
                              index * 100 + outcomeIndex * 50 + 700
                            }
                          >
                            <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                            <span className="text-gray-600">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </DetailCard>

                    <div
                      className="mt-6 flex items-center justify-between border-t pt-6"
                      data-aos="fade-up"
                      data-aos-delay={index * 100 + 800}
                    >
                      <div>
                        <span className="text-3xl font-bold text-slate-800">
                          R{course.price.toLocaleString()}
                        </span>
                        <span className="ml-2 text-sm text-gray-600">
                          once-off payment
                        </span>
                      </div>
                      <button
                        className="group flex items-center rounded-lg bg-slate-800 px-6 py-3 font-semibold text-white transition-all hover:bg-slate-800"
                        onClick={() => setSelectedCourse(course.title)}
                      >
                        View Details
                        <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-4 space-y-6"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  Course Curriculum
                </h3>
                <div className="space-y-4">
                  {selectedCourse ? (
                    getCourseDetails(selectedCourse).curriculum.map(
                      (module, index) => (
                        <div
                          key={index}
                          className="rounded-lg border p-4"
                          data-aos="fade-up"
                          data-aos-delay={index * 100}
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900">
                              {module.title}
                            </h4>
                            <span className="text-sm text-gray-600">
                              {module.weeks}
                            </span>
                          </div>
                          <ul className="ml-4 list-disc text-sm text-gray-600">
                            {module.topics.map((topic, topicIndex) => (
                              <li
                                key={topicIndex}
                                data-aos="fade-left"
                                data-aos-delay={index * 100 + topicIndex * 50}
                              >
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    )
                  ) : (
                    <p className="text-gray-600">
                      Select a course to view its curriculum
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
