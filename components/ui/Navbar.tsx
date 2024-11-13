'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, MapPin, Phone, Mail, ChevronDown } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/About' },
  { label: 'Courses', href: '/Courses' },
  { label: 'Register', href: '/Register' },
  { label: 'Blog', href: '/Blog' },
  { label: 'Contact', href: '/Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div
        className="hidden bg-slate-800 text-white py-2 lg:block"
        data-aos="fade-down"
      >
        <div className="container mx-auto flex justify-between px-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Durban, KZN, South Africa</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span className="text-sm">+61 234 567 1000</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <a href="#" className="text-sm hover:text-slate-400">
                mentorsphere@edu.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="border-b bg-white shadow-sm" data-aos="fade-down">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center" data-aos="fade-right">
              <span className="text-xl font-bold text-slate-600">
                Mentor Sphere
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div
              className="hidden lg:flex lg:items-center lg:space-x-8"
              data-aos="fade-left"
            >
              {navigation.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <button
                      className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-slate-800"
                      onClick={() => toggleDropdown(item.label)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-3 py-2 ${
                        isActive(item.href)
                          ? 'bg-slate-800 text-white font-medium rounded-md'
                          : 'text-gray-700 hover:text-slate-800'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:text-blue-600"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden" data-aos="fade-down">
            <div className="space-y-1 px-4 pb-3 pt-2">
              {navigation.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        className="flex w-full items-center justify-between py-2 text-base"
                        onClick={() => toggleDropdown(item.label)}
                      >
                        {item.label}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      {activeDropdown === item.label && (
                        <div className="ml-4 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className={`block py-2 text-sm ${
                                isActive(child.href)
                                  ? 'text-blue-600 font-medium'
                                  : 'text-gray-600 hover:text-blue-600'
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block py-2 text-base ${
                        isActive(item.href)
                          ? 'text-blue-600 font-medium'
                          : 'text-gray-900 hover:text-blue-600'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
