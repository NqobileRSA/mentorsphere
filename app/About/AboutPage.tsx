'use client';
import React, { useEffect } from 'react';
import { BookOpen, Target, Users, Award, CheckCircle } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const timeline = [
    {
      year: '2020',
      title: 'Foundation',
      description:
        'Started with a vision to make quality education accessible to everyone through personalized tutoring.',
      milestone: '100 tutors joined',
    },
    {
      year: '2021',
      title: 'Digital Transformation',
      description:
        'Launched our innovative online learning platform, enabling students to connect with tutors worldwide.',
      milestone: '5,000 students enrolled',
    },
    {
      year: '2022',
      title: 'Curriculum Expansion',
      description:
        'Expanded our subject offerings and introduced specialized courses for standardized test preparation.',
      milestone: '250+ courses available',
    },
    {
      year: '2023',
      title: 'Global Recognition',
      description:
        'Recognized as one of the top online tutoring platforms, with students from over 50 countries.',
      milestone: '10,000+ active students',
    },
    {
      year: '2024',
      title: 'Innovation & Growth',
      description:
        'Introduced AI-powered learning tools and expanded our network of expert tutors across all subjects.',
      milestone: '500+ expert tutors',
    },
  ];

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description:
        'We strive for excellence in every interaction, ensuring the highest quality of education.',
    },
    {
      icon: Users,
      title: 'Inclusivity',
      description:
        'Education should be accessible to all, regardless of background or location.',
    },
    {
      icon: Target,
      title: 'Innovation',
      description:
        'We continuously evolve our methods to provide the best learning experience.',
    },
    {
      icon: BookOpen,
      title: 'Empowerment',
      description:
        'We believe in empowering students to take control of their educational journey.',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-slate-800 py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-slate-700/30" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1
            className="mb-6 text-4xl font-bold text-white lg:text-5xl"
            data-aos="fade-down"
          >
            Transforming Education Through Connection
          </h1>
          <p
            className="mx-auto max-w-2xl text-lg text-blue-100"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            We&apos;re building a future where quality education is accessible
            to everyone, connecting passionate tutors with eager learners
            worldwide.
          </p>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Mission */}
            <div className="rounded-2xl bg-gray-50 p-8" data-aos="fade-right">
              <h2 className="mb-6 text-3xl font-bold text-slate-800">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600">
                To democratize education by connecting students with expert
                tutors, providing personalized learning experiences that empower
                individuals to achieve their academic goals and unlock their
                full potential.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'Personalized Learning',
                  'Expert Guidance',
                  'Global Access',
                  'Continuous Support',
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center space-x-3"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <CheckCircle className="h-5 w-5 text-slate-800" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision */}
            <div className="rounded-2xl bg-gray-50 p-8" data-aos="fade-left">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600">
                To be the world&apos;s leading platform for educational
                connection and growth, where every student has access to
                transformative learning experiences and the guidance they need
                to succeed in their academic journey.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'Innovation in Education',
                  'Global Community',
                  'Student Success',
                  'Quality Assurance',
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center space-x-3"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <CheckCircle className="h-5 w-5 text-slate-800" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2
            className="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl"
            data-aos="fade-down"
          >
            Our Core Values
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-8 shadow-sm transition-all hover:shadow-md"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <value.icon className="mb-4 h-10 w-10 text-slate-800" />
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2
            className="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl"
            data-aos="fade-down"
          >
            Our Journey
          </h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-blue-200 lg:left-1/2" />

            {/* Timeline Events */}
            <div className="space-y-12">
              {timeline.map((event, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col lg:items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Year Bubble */}
                  <div className="absolute left-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-white lg:left-1/2 lg:-translate-x-1/2">
                    <div className="h-3 w-3 rounded-full bg-white" />
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-12 w-full lg:ml-0 lg:w-5/12 ${
                      index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'
                    }`}
                    data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                  >
                    <div className="rounded-xl bg-gray-50 p-6 shadow-sm">
                      <div className="mb-2 text-sm font-bold text-slate-800">
                        {event.year}
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-gray-900">
                        {event.title}
                      </h3>
                      <p className="mb-4 text-gray-600">{event.description}</p>
                      <div className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-slate-800">
                        {event.milestone}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
