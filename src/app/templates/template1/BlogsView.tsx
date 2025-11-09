// src/app/templates/template1/BlogsView.tsx

"use client";

import React from 'react';
// Correctly import the Blog type definition
import type { Blog } from '@/app/(main)/editor/components/forms/BlogsForm';
import { ExternalLink, Image as ImageIcon } from 'lucide-react';

const BlogsView: React.FC<{ blogs: Blog[] }> = ({ blogs }) => {

  if (!blogs || blogs.length === 0) {
    return (
      <section id="blogs" className="p-6 md:p-8 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">My Blogs</h2>
        <p className="text-gray-500">No blog posts have been added yet.</p>
      </section>
    );
  }
  
  return (
    <section id="blogs" className="p-6 md:p-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">My Blogs</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(blogs).map((blog, index) => (
          <div key={index} className="bg-white border rounded-lg shadow-md overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            {/* Image Section */}
            <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
              {blog.image ? (
                <img src={blog.image} alt={blog.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <ImageIcon className="text-gray-400" size={48} />
              )}
            </div>

            {/* Content Section */}
            <div className="p-6 flex-grow flex flex-col">
              <p className="text-sm font-semibold text-blue-500 uppercase">{blog.category || 'General'}</p>
              <h3 className="text-xl font-bold text-gray-900 mt-2">{blog.name}</h3>
              <p className="text-gray-600 mt-2 flex-grow">{blog.description}</p>
              
              <a 
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold mt-4"
              >
                Read More <ExternalLink size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogsView;