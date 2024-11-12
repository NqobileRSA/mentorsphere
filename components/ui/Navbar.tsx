'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  Search,
  X,
  MapPin,
  Phone,
  Mail,
  User,
  ChevronDown,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/About',
  },
  {
    label: 'Courses',
    href: '/courses',
    children: [
      { label: 'Courses List', href: '/courses/list' },
      { label: 'Courses Grid', href: '/courses/grid' },
      { label: 'Single Course', href: '/courses/single' },
    ],
  },
  {
    label: 'Register',
    href: '/Register',
  },
  {
    label: 'Blog',
    href: '/Blog',
  },
  { label: 'Contact', href: '/Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="hidden bg-black text-white py-2 lg:block">
        <div className="container mx-auto flex justify-between px-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Sydney NSW 2052, Australia</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span className="text-sm">+61 2 9385 1000</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <a
                href="mailto:hello@brightuniversity.edu"
                className="text-sm hover:text-blue-600"
              >
                hello@brightuniversity.edu
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <Link href="/login" className="text-sm hover:text-blue-600">
                Login
              </Link>
              <span className="text-sm">/</span>
              <Link href="/register" className="text-sm hover:text-blue-600">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-black">
                Mentor Sphere
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {navigation.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <button
                      className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-blue-600"
                      onClick={() => toggleDropdown(item.label)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-3 py-2 text-gray-700 hover:text-blue-600"
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {item.children && activeDropdown === item.label && (
                    <div className="absolute left-0 top-full z-10 min-w-[200px] rounded-md border bg-white py-2 shadow-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Search and Mobile Menu Buttons */}
            <div className="flex items-center space-x-4 text-black">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:text-blue-600"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 hover:text-blue-600"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute left-0 top-0 z-50 h-full w-full bg-white px-4 py-4">
            <div className="container mx-auto flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border-none text-xl outline-none"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:text-blue-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden">
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
                              className="block py-2 text-sm text-gray-600"
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
                      className="block py-2 text-base text-gray-900"
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
