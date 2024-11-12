'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, GraduationCap, Clock, Users } from 'lucide-react';

interface CarouselSlide {
  title: string;
  subtitle: string;
  image: string;
}

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: CarouselSlide[] = [
    {
      title: 'Expert Tutors for Every Subject',
      subtitle: 'Connect with qualified tutors and achieve your academic goals',
      image: '/image1.jpg',
    },
    {
      title: 'Flexible Learning Schedule',
      subtitle: 'Book lessons that fit your timetable, 24/7 availability',
      image: '/image3.jpg',
    },
    {
      title: 'Personalized Learning Experience',
      subtitle: 'Get one-on-one attention tailored to your learning style',
      image: '/image2.jpg',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: GraduationCap, value: '500+', label: 'Expert Tutors' },
    { icon: Users, value: '10,000+', label: 'Happy Students' },
    { icon: Clock, value: '24/7', label: 'Support' },
  ];

  return (
    <div className="relative h-[800px] overflow-hidden bg-gray-900">
      {/* Carousel */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/50" />
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full">
        <div className="container mx-auto px-4 ">
          <div className="flex h-full flex-col items-center justify-center text-center text-white pt-[200px]">
            <h1 className="mb-6 text-4xl font-bold transition-all duration-500 md:text-6xl">
              {slides[currentSlide].title}
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-gray-200">
              {slides[currentSlide].subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="mb-12 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link
                href="/book-tutor"
                className="group flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-all hover:bg-blue-700"
              >
                Book a Tutor
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/become-tutor"
                className="rounded-lg border-2 border-white px-6 py-3 text-lg font-semibold text-white transition-all hover:bg-white hover:text-gray-900"
              >
                Become a Tutor
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <stat.icon className="mb-2 h-8 w-8" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                currentSlide === index
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
