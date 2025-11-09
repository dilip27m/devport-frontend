"use client";

import React from 'react';
// Correctly import the Blog type definition
import type { Blog } from '@/app/(main)/editor/components/forms/BlogsForm';
import { ExternalLink, Image as ImageIcon } from 'lucide-react';

const BlogsView: React.FC<{ blogs: Blog[] }> = ({ blogs }) => {

  // Handle the case where no blogs have been added
  if (!blogs || blogs.length === 0) {
    return (
      <section>
        <h2 className="text-4xl font-bold text-white mb-8">Blogs & Articles</h2>
        <p className="text-gray-400">No blog posts have been added yet.</p>
      </section>
    );
  }
  
  return (
    <section>
      <h2 className="text-4xl font-bold text-white mb-8">Blogs & Articles</h2>
      
      {/* Container for the grid of blog post cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(blogs).map((blog, index) => (
          // Each card is a clickable link that opens the blog post in a new tab
          <a 
             href={blog.link}
             target="_blank"
             rel="noopener noreferrer"
             key={index} 
             className="block bg-black/20 border border-gray-800 rounded-lg overflow-hidden group hover:border-gray-700 transition-colors"
          >
            {/* Image Section */}
            <div className="h-40 bg-gray-900 flex items-center justify-center overflow-hidden">
              {blog.image ? (
                <img 
                  src={blog.image} 
                  alt={blog.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              ) : (
                <ImageIcon size={40} className="text-gray-700"/>
              )}
            </div>
            
            {/* Content Section */}
            <div className="p-4">
                <p className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">{blog.category || 'General'}</p>
                <h3 className="text-lg font-bold text-white mt-1 truncate group-hover:text-cyan-400 transition-colors">{blog.name}</h3>
                <p className="text-sm text-gray-400 mt-2 line-clamp-2 h-10">{blog.description}</p>
                
                <div className="flex items-center text-xs text-blue-400 mt-3">
                  Read More
                  <ExternalLink size={14} className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default BlogsView;