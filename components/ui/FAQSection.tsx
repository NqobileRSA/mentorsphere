'use client';
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const faqs: FAQItem[] = [
    {
      question: 'How do I choose the right tutor for my needs?',
      answer:
        'Our platform matches you with tutors based on your subject, level, and learning goals. You can review tutor profiles, ratings, and specializations before booking. We also offer a free initial consultation to ensure a good fit.',
      category: 'Getting Started',
    },
    {
      question: "What happens if I'm not satisfied with my tutoring session?",
      answer:
        "We offer a 100% satisfaction guarantee. If you're not completely satisfied with your session, we'll either arrange a free session with another tutor or provide a full refund.",
      category: 'Policies',
    },
    {
      question: 'How much do tutoring sessions cost?',
      answer:
        "Tutoring rates vary based on subject, level, and tutor expertise. Most sessions range from $30-80 per hour. You can see exact rates on each tutor's profile before booking.",
      category: 'Pricing',
    },
    {
      question: 'Can I change my scheduled session time?',
      answer:
        'Yes, you can reschedule or cancel sessions up to 24 hours before the scheduled time at no cost. Changes made within 24 hours may incur a fee.',
      category: 'Scheduling',
    },
    {
      question: 'Are the tutoring sessions online or in-person?',
      answer:
        'We offer both online and in-person tutoring options. You can choose your preferred format when booking. Online sessions use our interactive virtual classroom platform.',
      category: 'Getting Started',
    },
    {
      question: 'How are your tutors vetted?',
      answer:
        'All tutors undergo a rigorous verification process including background checks, credential verification, teaching demos, and subject matter expertise tests. Only 5% of applicants are accepted.',
      category: 'Policies',
    },
  ];

  const categories = ['All', ...new Set(faqs.map((faq) => faq.category))];

  const filteredFaqs =
    selectedCategory === 'All'
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Find answers to common questions about our tutoring services,
            policies, and procedures.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-3xl space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-white transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <Minus className="h-5 w-5 text-blue-600" />
                ) : (
                  <Plus className="h-5 w-5 text-gray-400" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="border-t border-gray-200 p-6 text-gray-600">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Still have questions?{' '}
            <a
              href="/contact"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
