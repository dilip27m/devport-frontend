"use client";
import React from "react";
import type { Blog } from "@/app/(main)/editor/components/forms/BlogsForm";
import { ArrowUpRight } from "lucide-react";

const BlogsView: React.FC<{ blogs?: Blog[] }> = ({ blogs }) => {
  const safeBlogs = blogs || [];

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">Blogs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {safeBlogs.map((blog, i) => (
          <a
            href={blog.link}
            target="_blank"
            rel="noopener noreferrer"
            key={i}
            // make anchor a full-height column flex so content can be positioned and shrink correctly
            className="group block bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-gray-800/50 rounded-2xl overflow-hidden hover:border-gray-700 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 h-full flex flex-col min-w-0"
          >
            {/* Image area: flex-none so it doesn't stretch */}
            {blog.image ? (
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-950 to-black flex-none">
                <img
                  src={blog.image}
                  alt={blog.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />

                {/* Category Badge */}
                {blog.category && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full uppercase tracking-wide">
                      {blog.category}
                    </span>
                  </div>
                )}

                {/* Arrow Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-blue-500">
                  <ArrowUpRight size={20} className="text-white" />
                </div>
              </div>
            ) : (
              <div className="relative h-56 bg-gradient-to-br from-gray-950 to-black flex items-center justify-center flex-none">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>

                {blog.category && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full uppercase tracking-wide">
                      {blog.category}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Content area: flex-1 so it fills remaining space; min-h-0 allows internal overflow control; min-w-0 allows internal children to shrink */}
            <div className="p-6 flex flex-col flex-1 min-h-0 min-w-0">
              {/* Title: clamp to 2 lines + break long words */}
              <h3
                className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-snug line-clamp-2 mb-2 break-words break-all"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                }}
              >
                {blog.name}
              </h3>

              {/* Description: clamp to 2 lines, break long tokens */}
              {blog.description && (
                <p
                  className="text-gray-400 text-sm leading-relaxed mb-3 break-words break-all whitespace-normal overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }}
                >
                  {blog.description}
                </p>
              )}

              <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-blue-400 transition-colors mt-auto">
                <span>Read article</span>
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </div>
            </div>
          </a>
        ))}
      </div>

      {(!safeBlogs || safeBlogs.length === 0) && (
        <div className="text-center py-20">
          <div className="inline-block p-6 rounded-full bg-gray-900/50 mb-6">
            <svg
              className="w-16 h-16 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">No blog posts to display yet.</p>
        </div>
      )}
    </section>
  );
};

export default BlogsView;
