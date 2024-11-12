'use client';
import React, { useState } from 'react';
import { Search, BookOpen, Clock, ChevronRight, Filter } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    image: string;
  };
  readTime: string;
  date: string;
  image: string;
}

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'All',
    'Study Tips',
    'Student Success',
    'Teaching Methods',
    'Education Technology',
    'Career Guidance',
  ];

  // Sample blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'How to Develop Effective Study Habits for Remote Learning',
      excerpt:
        'Discover proven techniques to maintain focus and productivity while studying from home. Learn how to create a structured routine that works for you.',
      category: 'Study Tips',
      tags: ['Remote Learning', 'Productivity', 'Study Habits'],
      author: {
        name: 'Dr. Sarah Johnson',
        role: 'Education Specialist',
        image: '/api/placeholder/64/64',
      },
      readTime: '5 min read',
      date: 'Mar 15, 2024',
      image: '/api/placeholder/800/400',
    },
    {
      id: '2',
      title: 'The Future of Education: AI-Powered Personalized Learning',
      excerpt:
        'Explore how artificial intelligence is revolutionizing education by providing tailored learning experiences for students of all levels.',
      category: 'Education Technology',
      tags: ['AI', 'EdTech', 'Future of Education'],
      author: {
        name: 'Prof. Michael Chen',
        role: 'Tech Innovation Lead',
        image: '/api/placeholder/64/64',
      },
      readTime: '7 min read',
      date: 'Mar 12, 2024',
      image: '/api/placeholder/800/400',
    },
    {
      id: '3',
      title: `Building Confidence: A Student's Guide to Academic Success`,
      excerpt:
        'Learn practical strategies to overcome academic challenges and build the confidence needed to excel in your studies.',
      category: 'Student Success',
      tags: ['Confidence', 'Academic Success', 'Personal Growth'],
      author: {
        name: 'Emily Roberts',
        role: 'Student Counselor',
        image: '/api/placeholder/64/64',
      },
      readTime: '6 min read',
      date: 'Mar 10, 2024',
      image: '/api/placeholder/800/400',
    },
  ];

  const BlogPostCard = ({ post }: { post: BlogPost }) => (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className="h-48 w-full object-cover"
        />
        <div className="absolute bottom-4 left-4">
          <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
            {post.category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {post.readTime}
          </div>
          <div>{post.date}</div>
        </div>

        <h3 className="mb-3 text-xl font-bold text-gray-900 hover:text-blue-600">
          {post.title}
        </h3>

        <p className="mb-4 flex-1 text-gray-600">{post.excerpt}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center space-x-3">
            <img
              src={post.author.image}
              alt={post.author.name}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {post.author.name}
              </p>
              <p className="text-sm text-gray-600">{post.author.role}</p>
            </div>
          </div>
          <button className="group flex items-center text-blue-600 hover:text-blue-700">
            Read More
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-600 py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-blue-700/30" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold text-white lg:text-5xl">
            Educational Insights & Resources
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-blue-100">
            Explore our collection of articles, guides, and expert advice to
            enhance your learning journey and stay updated with the latest in
            education.
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Search and Filters */}
        <div className="mb-12">
          <div className="mb-6 flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            {/* Search Bar */}
            <div className="relative flex-1 lg:max-w-xl">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 lg:ml-4"
            >
              <Filter className="h-5 w-5" />
              <span>Filter by Category</span>
            </button>
          </div>

          {/* Category Filters */}
          {showFilters && (
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">
            Featured Article
          </h2>
          <BlogPostCard post={blogPosts[0]} />
        </div>

        {/* Latest Posts Grid */}
        <div>
          <h2 className="mb-8 text-2xl font-bold text-gray-900">
            Latest Articles
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(1).map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="group inline-flex items-center rounded-lg border-2 border-blue-600 px-6 py-3 font-semibold text-blue-600 transition-all hover:bg-blue-600 hover:text-white">
            Load More Articles
            <BookOpen className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
