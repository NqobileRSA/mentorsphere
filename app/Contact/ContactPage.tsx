'use client';
import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    setSubmitted(true);
    // Reset form after submission
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const locations = [
    {
      city: 'New York',
      address: '123 Education Ave, New York, NY 10001',
      phone: '+1 (212) 555-0123',
      email: 'nyc@mentorsphere.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
    },
    {
      city: 'London',
      address: '456 Learning Lane, London, UK EC1A 1BB',
      phone: '+44 20 7123 4567',
      email: 'london@mentorsphere.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
    },
    {
      city: 'Singapore',
      address: '789 Knowledge Road, Singapore 018956',
      phone: '+65 6789 0123',
      email: 'singapore@mentorsphere.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
    },
  ];

  const subjects = [
    'General Inquiry',
    'Become a Tutor',
    'Technical Support',
    'Billing Question',
    'Partnership Opportunity',
    'Other',
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-600 py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-blue-700/30" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold text-white lg:text-5xl">
            Get in Touch
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-blue-100">
            Have questions? We&apos;d love to hear from you. Send us a message
            and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="rounded-2xl bg-gray-50 p-8">
            <div className="mb-8">
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                Send Us a Message
              </h2>
              <p className="text-gray-600">
                Fill out the form below and we&apos;ll get back to you within 24
                hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white transition-all hover:bg-blue-700"
              >
                Send Message
                <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              {submitted && (
                <div className="rounded-lg bg-green-50 p-4 text-center text-green-800">
                  Thank you for your message! We&apos;ll get back to you soon.
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-12">
            {/* Quick Contact */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Quick Contact
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex items-center space-x-4 rounded-lg bg-gray-50 p-4">
                  <Phone className="h-6 w-6 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">Call Us</div>
                    <div className="font-medium text-gray-900">
                      +1 (888) 123-4567
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 rounded-lg bg-gray-50 p-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">Email Us</div>
                    <div className="font-medium text-gray-900">
                      support@mentorsphere.com
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Our Offices
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {locations.map((location) => (
                  <div
                    key={location.city}
                    className="rounded-lg bg-gray-50 p-6"
                  >
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                      {location.city}
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start space-x-3">
                        <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-blue-600" />
                        <span className="text-gray-600">
                          {location.address}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 flex-shrink-0 text-blue-600" />
                        <span className="text-gray-600">{location.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 flex-shrink-0 text-blue-600" />
                        <span className="text-gray-600">{location.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-4 w-4 flex-shrink-0 text-blue-600" />
                        <span className="text-gray-600">{location.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Connect With Us
              </h2>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="rounded-lg bg-gray-50 p-3 text-gray-600 transition-all hover:bg-blue-600 hover:text-white"
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-12 text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              <div className="rounded-lg bg-white p-6 text-left shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  How quickly can I expect a response?
                </h3>
                <p className="text-gray-600">
                  We typically respond to all inquiries within 24 hours during
                  business days. For urgent matters, please call our support
                  hotline.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 text-left shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  What are your support hours?
                </h3>
                <p className="text-gray-600">
                  Our support team is available Monday through Friday, 9:00 AM
                  to 6:00 PM in each office&apos;s local time zone.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 text-left shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  How can I become a tutor?
                </h3>
                <p className="text-gray-600">
                  Visit our &quot;Become a Tutor&quot; page or select
                  &quot;Become a Tutor&quot; in the contact form above.
                  We&apos;ll guide you through the application process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
