'use client';
import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  subject: string;
}

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Alex Thompson',
      role: 'University Student',
      image: '/api/placeholder/80/80',
      content:
        'The personalized attention I received from my calculus tutor was incredible. My grades improved significantly, and I finally gained the confidence I needed in mathematics.',
      rating: 5,
      subject: 'Calculus',
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      role: 'High School Senior',
      image: '/api/placeholder/80/80',
      content:
        'Finding a physics tutor who could explain complex concepts in simple terms was a game-changer. I went from struggling to excelling in my AP Physics class.',
      rating: 5,
      subject: 'Physics',
    },
    {
      id: 3,
      name: 'David Chen',
      role: 'Parent',
      image: '/api/placeholder/80/80',
      content:
        "My daughter's English literature grades have improved dramatically since working with her tutor. The flexible scheduling made it easy to fit sessions into her busy schedule.",
      rating: 5,
      subject: 'English Literature',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      role: 'Graduate Student',
      image: '/api/placeholder/80/80',
      content:
        "The GMAT prep tutoring I received was exceptional. My tutor's strategy-focused approach helped me achieve a 700+ score and get into my dream business school.",
      rating: 5,
      subject: 'GMAT Prep',
    },
    {
      id: 5,
      name: 'James Miller',
      role: 'High School Junior',
      image: '/api/placeholder/80/80',
      content:
        'Chemistry was always challenging for me, but my tutor made it interesting and relatable. The practice problems and study guides were incredibly helpful.',
      rating: 5,
      subject: 'Chemistry',
    },
    {
      id: 6,
      name: 'Emma Davis',
      role: 'College Freshman',
      image: '/api/placeholder/80/80',
      content:
        "The computer science tutoring helped me catch up when I felt behind in my intro programming course. Now I'm considering it as my major!",
      rating: 5,
      subject: 'Computer Science',
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setActiveIndex((prev) => (prev + 2) % testimonials.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [isPaused, testimonials.length]);

  const nextTestimonials = () => {
    setActiveIndex((prev) => (prev + 2) % testimonials.length);
  };

  const previousTestimonials = () => {
    setActiveIndex(
      (prev) => (prev - 2 + testimonials.length) % testimonials.length
    );
  };

  // Get current pair of testimonials
  const getCurrentTestimonials = () => {
    const first = testimonials[activeIndex];
    const secondIndex = (activeIndex + 1) % testimonials.length;
    const second = testimonials[secondIndex];
    return [first, second];
  };

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <div
      className="relative flex h-full flex-col rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Quote className="absolute right-8 top-8 h-12 w-12 text-blue-100" />

      <div className="relative z-10">
        {/* Rating */}
        <div className="mb-6 flex items-center space-x-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
          ))}
        </div>

        {/* Content */}
        <blockquote className="mb-8 flex-1">
          <p className="text-lg text-gray-700">
            &ldquo;{testimonial.content}&ldquo;
          </p>
        </blockquote>

        {/* Author */}
        <div className="flex items-center space-x-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-gray-900">
              {testimonial.name}
            </div>
            <div className="text-sm text-gray-600">
              {testimonial.role} • {testimonial.subject}
            </div>
          </div>
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
            What Our Students Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Discover how our tutoring services have helped students achieve
            their academic goals and boost their confidence.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {getCurrentTestimonials().map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 justify-between px-4">
            <button
              onClick={previousTestimonials}
              className="rounded-full bg-white p-2 shadow-lg transition-all hover:bg-gray-50"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonials}
              className="rounded-full bg-white p-2 shadow-lg transition-all hover:bg-gray-50"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className="mt-8 flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(testimonials.length / 2) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index * 2)}
                className={`h-2 rounded-full transition-all ${
                  Math.floor(activeIndex / 2) === index
                    ? 'w-8 bg-blue-600'
                    : 'w-2 bg-gray-300'
                }`}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
