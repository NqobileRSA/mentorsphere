'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from 'lucide-react';

const Footer = () => {
  useEffect(() => {
    // Initialize AOS
    if (typeof window !== 'undefined') {
      const AOS = require('aos');
      AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-out',
      });
    }
  }, []);

  const links = {
    company: [
      { label: 'About Us', href: '/About' },
      { label: 'Courses', href: '/Courses' },
      { label: 'Blog', href: '/Blog' },
      { label: 'Register', href: '/Register' },
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Safety Center', href: '/safety' },
      { label: 'Community Guidelines', href: '/guidelines' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
    legal: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Accessibility', href: '/accessibility' },
      { label: 'Sitemap', href: '/sitemap' },
    ],
  };

  const socialLinks = [
    { Icon: Facebook, href: '#', label: 'Facebook' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div
            className="flex flex-col items-center justify-between gap-8 lg:flex-row"
            data-aos="fade-up"
          >
            <div>
              <h3 className="mb-2 text-2xl font-bold text-white">
                Stay Updated with Mentor Sphere
              </h3>
              <p>Get the latest news and resources delivered to your inbox.</p>
            </div>
            <div className="w-full max-w-md">
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-l-lg border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button className="group flex items-center rounded-r-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700">
                  Subscribe
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-6" data-aos="fade-right" data-aos-delay="100">
            <Link href="/" className="text-2xl font-bold text-white">
              Mentor Sphere
            </Link>
            <p className="text-gray-400">
              Empowering students through personalized learning and expert
              tutoring since 2020.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, href, label }, index) => (
                <a
                  key={label}
                  href={href}
                  className="rounded-full bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                  aria-label={label}
                  data-aos="zoom-in"
                  data-aos-delay={150 + index * 50}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            {Object.entries(links).map(([title, items], columnIndex) => (
              <div
                key={title}
                data-aos="fade-up"
                data-aos-delay={200 + columnIndex * 100}
              >
                <h4 className="mb-4 text-lg font-semibold text-white">
                  {title.charAt(0).toUpperCase() + title.slice(1)}
                </h4>
                <ul className="space-y-2">
                  {items.map((item, itemIndex) => (
                    <li
                      key={item.label}
                      data-aos="fade-left"
                      data-aos-delay={300 + itemIndex * 50}
                    >
                      <Link
                        href={item.href}
                        className="text-gray-400 transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div data-aos="fade-left" data-aos-delay="400">
            <h4 className="mb-4 text-lg font-semibold text-white">Contact</h4>
            <div className="space-y-4">
              <div
                className="flex items-center space-x-3"
                data-aos="fade-left"
                data-aos-delay="450"
              >
                <MapPin className="h-5 w-5 text-gray-400" />
                <span>Durban kzn , South Africa</span>
              </div>
              <div
                className="flex items-center space-x-3"
                data-aos="fade-left"
                data-aos-delay="500"
              >
                <Phone className="h-5 w-5 text-gray-400" />
                <span>+61 2 9385 1000</span>
              </div>
              <div
                className="flex items-center space-x-3"
                data-aos="fade-left"
                data-aos-delay="550"
              >
                <Mail className="h-5 w-5 text-gray-400" />
                <a href="#" className="hover:text-white">
                  mentorsphere@edu.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 border-t border-gray-800 pt-8"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 lg:flex-row">
            <p>© 2024 Mentor Sphere. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white">
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
