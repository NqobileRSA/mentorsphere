'use client';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
  }, []);

  return (
    <section className="bg-slate-800 py-16 lg:py-20" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h2
            className="mb-4 max-w-2xl text-3xl font-bold text-white lg:text-4xl"
            data-aos="fade-up"
          >
            Ready to Transform Your Learning Journey?
          </h2>
          <p
            className="mb-8 max-w-2xl text-lg text-blue-100"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Join thousands of students who have already improved their grades
            and confidence with our expert tutors.
          </p>
          <div
            className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <button className="group flex items-center justify-center rounded-lg bg-white px-8 py-3 font-semibold text-bg-slate-800 transition-all hover:bg-gray-100">
              Find a Tutor
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-all hover:bg-white hover:text-bg-slate-800">
              Become a Tutor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
