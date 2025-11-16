"use client";

import React from 'react';
import type { Blog } from '@/app/(main)/editor/components/forms/BlogsForm';
import { BookOpen, ArrowRight } from 'lucide-react';

interface BlogsViewProps {
  blogs: Blog[];
  limit?: number;
}

const getReadTime = (description: string) => {
  const wordCount = description?.split(/\s+/).length || 0;
  const minRead = Math.max(1, Math.ceil(wordCount / 200));
  return `${minRead} min read`;
}

const formatDate = (index: number) => {
  const dates = [
    "January 21 2025",
    "April 2 2024",
    "July 18 2022",
    "September 22 2021"
  ];
  return dates[index] || "Recent";
};

const BlogsView: React.FC<BlogsViewProps> = ({ blogs, limit }) => {
  const displayBlogs = limit ? blogs.slice(0, limit) : blogs;
  const isLatestSection = !!limit;
  
  if (!displayBlogs || displayBlogs.length === 0) {
    if (isLatestSection) return null;
    return (
      <section className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-5xl font-bold text-white mb-8">Blog</h2>
        <p className="text-gray-400">No blog posts have been added yet.</p>
      </section>
    );
  }
  
  // Full Blog Page View
  if (!isLatestSection) {
    return (
      <section className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-4">Blog</h1>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl">
          This is where I share my writings on programming, tutorials, and my experiences.
        </p>
        
        {/* Search Bar */}
        <div className="relative mb-16">
          <input 
            type="text" 
            placeholder="Search articles" 
            className="w-full bg-transparent border-b-2 border-gray-800 text-white text-lg p-4 pr-12 focus:outline-none focus:border-green-400 transition-colors placeholder-gray-600"
          />
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" width="22" height="22" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 15.75L20 20M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"/>
          </svg>
        </div>

        <div className="space-y-10">
          {displayBlogs.map((blog, index) => (
            <a 
              key={index}
              href={blog.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <article className="flex flex-col md:flex-row gap-8 py-6 border-b border-gray-800 hover:border-gray-700 transition-colors">
                <div className="w-full md:w-48 flex-shrink-0">
                  <div className="text-gray-500 text-sm">
                    {formatDate(index)} • {getReadTime(blog.description)}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors mb-3">
                    {blog.name || 'Untitled Blog Post'}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-3">
                    {blog.description || 'No description available.'}
                  </p>
                </div>
              </article>
            </a>
          ))}
        </div>
      </section>
    );
  }

  // Latest Articles Section (Home Page)
  return (
    <section className="py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <BookOpen size={20} className="text-white"/>
          Latest Article.
        </h2>
        <button 
          onClick={() => {
            // This will be handled by the parent component
            const event = new CustomEvent('navigate-to-blogs');
            window.dispatchEvent(event);
          }}
          className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors text-sm font-medium cursor-pointer"
        >
          View all articles <ArrowRight size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {displayBlogs.map((blog, index) => (
          <a 
            href={blog.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            key={index} 
            className="block bg-[#0d1117] border border-gray-800 rounded-xl p-6 group hover:border-gray-700 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
              {blog.name || 'Untitled Blog Post'}
            </h3>
            <p className="text-xs text-gray-500">
              {formatDate(index)} • {getReadTime(blog.description)}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default BlogsView;