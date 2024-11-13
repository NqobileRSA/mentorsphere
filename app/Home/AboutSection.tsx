'use client';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CheckCircle, Users, Trophy, Bookmark, ArrowRight } from 'lucide-react';

interface Feature {
  icon: React.ComponentType;
  title: string;
  description: string;
}

const AboutSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
  }, []);

  const features: Feature[] = [
    {
      icon: Users,
      title: 'Expert Tutors',
      description:
        'Our tutors are thoroughly vetted professionals with proven track records in their respective fields.',
    },
    {
      icon: Trophy,
      title: 'Proven Results',
      description:
        'Students who use our platform see an average grade improvement of two letter grades.',
    },
    {
      icon: Bookmark,
      title: 'Flexible Learning',
      description:
        'Choose from online or in-person sessions with scheduling that works around your lifestyle.',
    },
  ];

  const highlights = [
    'Personalized learning plans tailored to your goals',
    'Interactive online learning tools and resources',
    'Progress tracking and regular feedback',
    'Flexible scheduling with 24/7 availability',
    'Money-back satisfaction guarantee',
  ];

  return (
    <section className="py-16 lg:py-24" data-aos="fade-up">
      <div className="container mx-auto px-4">
        {/* Main Content */}
        <div className="mb-16 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left Column - Image */}
          <div className="relative" data-aos="fade-right">
            <div className="aspect-square overflow-hidden rounded-2xl">
              <img
                src="/about.jpg"
                alt="Students learning"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Stats Card */}
            <div className="absolute -bottom-8 -right-8 rounded-xl bg-white p-6 shadow-xl lg:-right-12">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-800">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-800">15k+</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div data-aos="fade-left">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              Empowering Students to Reach Their Full Potential
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              At Mentor Sphere, we believe every student deserves access to
              quality education. Our platform connects dedicated learners with
              expert tutors who are passionate about helping students succeed.
              Whether you&lsquo;re struggling with a specific subject or aiming
              to excel beyond your current level, we&lsquo;re here to support
              your journey.
            </p>

            {/* Highlights */}
            <div className="mb-8">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="mb-3 flex items-center space-x-3"
                  data-aos="fade-up"
                  data-aos-delay={index * 100} // Stagger animations
                >
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-slate-800" />
                  <span className="text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              className="group inline-flex items-center rounded-lg bg-slate-800 px-6 py-3 text-white transition-all hover:bg-slate-800"
              data-aos="fade-up"
            >
              Learn More About Us
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl bg-gray-50 p-8 transition-all hover:bg-gray-100"
              data-aos="zoom-in"
              data-aos-delay={index * 150}
            >
              <feature.icon />
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
