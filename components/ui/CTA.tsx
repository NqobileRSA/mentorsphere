import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="bg-blue-600 py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h2 className="mb-4 max-w-2xl text-3xl font-bold text-white lg:text-4xl">
            Ready to Transform Your Learning Journey?
          </h2>
          <p className="mb-8 max-w-2xl text-lg text-blue-100">
            Join thousands of students who have already improved their grades
            and confidence with our expert tutors.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <button className="group flex items-center justify-center rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition-all hover:bg-gray-100">
              Find a Tutor
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-all hover:bg-white hover:text-blue-600">
              Become a Tutor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
