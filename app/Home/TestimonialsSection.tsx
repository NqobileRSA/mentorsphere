'use client';
import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import AOS from 'aos';

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

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  // Refresh AOS when testimonials change
  useEffect(() => {
    AOS.refresh();
  }, [activeIndex]);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sipho Mahlangu',
      role: 'Junior Developer at Standard Bank',
      image: '/testimonial/avatar1.jpg',
      content: `'The Full Stack Web Development course was exactly what I needed to transition from my IT support role. David van der Merwe's practical approach and focus on local industry needs helped me land my dream job in Sandton.'`,
      rating: 5,
      subject: 'Web Development',
    },
    {
      id: 2,
      name: 'Nomvula Dlamini',
      role: 'Security Analyst',
      image: '/testimonial/avatar2.jpg',
      content: `'Themba Nkosi's Ethical Hacking course was intense but incredibly rewarding. The hands-on labs and focus on South African compliance frameworks like POPIA gave me the expertise I needed for my role at Vodacom.'`,
      rating: 5,
      subject: 'Cybersecurity',
    },
    {
      id: 3,
      name: 'Pieter van Wyk',
      role: 'Data Scientist at Discovery',
      image: '/testimonial/avatar3.jpg',
      content: `'Dr. Botha's Data Science course struck the perfect balance between theory and practical application. The project using South African healthcare data helped me understand how ML can solve local challenges.'`,
      rating: 5,
      subject: 'Data Science',
    },
    {
      id: 4,
      name: 'Thandi Moyo',
      role: 'Cloud Engineer at Rain',
      image: '/testimonial/avatar4.jpg',
      content: `'The AWS & DevOps course by Jayden Naidoo was excellent. His experience with local enterprises helped me understand how to architect solutions that work with our unique infrastructure challenges.'`,
      rating: 5,
      subject: 'Cloud Computing',
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

  const TestimonialCard = ({
    testimonial,
    index,
  }: {
    testimonial: Testimonial;
    index: number;
  }) => (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 200}
      className="relative flex h-full flex-col rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Quote
        className="absolute right-8 top-8 h-12 w-12 text-blue-100"
        data-aos="fade-left"
        data-aos-delay={index * 200 + 200}
      />

      <div className="relative z-10">
        {/* Rating */}
        <div
          className="mb-6 flex items-center space-x-1"
          data-aos="fade-right"
          data-aos-delay={index * 200 + 100}
        >
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
          ))}
        </div>

        {/* Content */}
        <blockquote
          className="mb-8 flex-1"
          data-aos="fade-up"
          data-aos-delay={index * 200 + 300}
        >
          <p className="text-lg text-gray-700">
            &ldquo;{testimonial.content}&ldquo;
          </p>
        </blockquote>

        {/* Author */}
        <div
          className="flex items-center space-x-4"
          data-aos="fade-up"
          data-aos-delay={index * 200 + 400}
        >
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
          <h2
            className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl"
            data-aos="fade-down"
          >
            What Our Students Say
          </h2>
          <p
            className="mx-auto max-w-2xl text-lg text-gray-600"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Discover how our tutoring services have helped students achieve
            their academic goals and boost their confidence.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {getCurrentTestimonials().map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div
          className="mt-8 flex justify-center space-x-2"
          data-aos="fade-up"
          data-aos-delay="600"
        >
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
